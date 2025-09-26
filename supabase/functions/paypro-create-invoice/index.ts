import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Define CORS headers directly inside the function file
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { orderDetails } = await req.json();
    const { amount, customer, items } = orderDetails;

    // Validate incoming data
    if (!amount || !customer || !items || !customer.name || !customer.email || !customer.mobile || !customer.address) {
      throw new Error("Missing required order details.");
    }
    
    if (amount < 1) {
        throw new Error("Order amount must be at least 1 PKR.");
    }

    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        throw new Error("User not authenticated: Missing Authorization header.");
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated.");
    }
    
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SERVICE_ROLE_KEY')!
    );

    // 1. Get PayPro Auth Token
    const authResponse = await fetch(`${Deno.env.get('PAYPRO_BASE_URL')}/v2/ppro/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientid: Deno.env.get('PAYPRO_CLIENT_ID'),
        clientsecret: Deno.env.get('PAYPRO_CLIENT_SECRET'),
      }),
    });

    if (!authResponse.ok) {
      const errorBody = await authResponse.text();
      console.error("PayPro Auth Error:", errorBody);
      throw new Error(`PayPro Auth Failed: ${authResponse.status} ${errorBody}`);
    }

    const authToken = authResponse.headers.get('token');

    if (!authToken) {
      throw new Error("Auth token not found in PayPro response headers.");
    }
    
    // 2. Create PayPro Single Order
    const orderNumber = `ORD-${Date.now()}`;
    const now = new Date();
    const dueDate = new Date(now);
    dueDate.setDate(dueDate.getDate() + 1); // 24 hours from now

    const formatDate = (date: Date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const payproOrderPayload = [
        { MerchantId: "Pubg_Stuff" }, // Hardcoded MerchantId as per PayPro requirements
        {
            OrderNumber: orderNumber,
            OrderAmount: Math.round(amount).toString(), // Ensure amount is an integer string
            OrderDueDate: formatDate(dueDate),
            OrderType: "Service",
            IssueDate: formatDate(now),
            OrderExpireAfterSeconds: "0",
            CustomerName: customer.name,
            CustomerMobile: customer.mobile,
            CustomerEmail: customer.email,
            CustomerAddress: customer.address
        }
    ];

    const createOrderResponse = await fetch(`${Deno.env.get('PAYPRO_BASE_URL')}/v2/ppro/co`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': authToken,
      },
      body: JSON.stringify(payproOrderPayload),
    });

    if (!createOrderResponse.ok) {
        const errorBody = await createOrderResponse.text();
        console.error("PayPro Order Creation Error:", errorBody);
        throw new Error(`PayPro Order Creation Failed: ${createOrderResponse.status} ${errorBody}`);
    }

    const payproResult = await createOrderResponse.json();
    
    // 3. Handle PayPro Response
    const statusObj = payproResult[0];
    const dataObj = payproResult[1];

    if (statusObj.Status !== "00") {
        throw new Error(`PayPro rejected the order: ${statusObj.Status} - ${JSON.stringify(dataObj)}`);
    }

    const payproId = dataObj.PayProId;
    const click2payUrl = dataObj.Click2Pay;
    
    if (!payproId || !click2payUrl) {
        throw new Error("Invalid response from PayPro order creation.");
    }

    // 4. Save Order to Supabase
    const { data: newOrder, error: dbError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: orderNumber,
        amount: amount,
        customer_name: customer.name,
        customer_mobile: customer.mobile,
        customer_email: customer.email,
        customer_address: customer.address || 'N/A',
        paypro_id: payproId,
        status: 'PENDING',
        click2pay_url: click2payUrl,
        due_date: dueDate.toISOString(),
        user_id: user.id, // Use authenticated user's ID
        items: items,
      })
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }

    // 5. Create an unclaimed surprise for the user
    const { error: surpriseError } = await supabaseAdmin
      .from('surprises')
      .insert({
        user_id: user.id,
        order_id: newOrder.id,
        surprise_content: 'unlocked_n8n_templates',
        claimed: false
      });
      
    if (surpriseError) {
        // Log the error but don't fail the transaction
        console.error('Failed to create surprise for user:', user.id, 'Error:', surpriseError.message);
    }


    return new Response(JSON.stringify({ click2pay_url: newOrder.click2pay_url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Edge function error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
