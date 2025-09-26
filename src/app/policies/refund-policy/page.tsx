'use client';
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Link from "next/link";
import Cta from "@/components/landing/cta";

export default function RefundPolicyPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 bg-white text-black pt-24">
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Return and Refund Policy
                </h1>
                <p className="mt-4 text-sm text-gray-500 md:text-base">
                Last updated: Friday, 21 February 2025 in I-9, Islamabad
                </p>
            </div>

            <div className="space-y-6 md:space-y-8">
               <div className="rounded-lg border border-blue-300 bg-blue-50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl text-blue-800">Our No-Refund Policy</h2>
                <p className="mt-2 text-blue-700 md:mt-4">
                  At PubgStuff, we do not offer any refunds or returns for products purchased. All sales are final.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Software Maintenance</h2>
                <p className="mt-2 text-gray-700 md:mt-4">
                  If you purchase our software and experience any downtime due to maintenance or server issues, we will hold your license key time during the outage. Once services are restored, your time will be unheld, allowing uninterrupted access to your software.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Sale Items</h2>
                <p className="mt-2 text-gray-700 md:mt-4">
                  Items purchased on sale or at a discount are also not eligible for refunds. All sales of discounted items are final.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Exchanges</h2>
                <p className="mt-2 text-gray-700 md:mt-4">
                  We do not offer exchanges for any products. All purchases are final and cannot be replaced.
                </p>
              </div>

               <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl text-yellow-800">Important Notice for Virtual Products</h2>
                <p className="mt-2 text-yellow-700 md:mt-4">
                  These are virtual products. Once you activate them on your devices, no refunds are available.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Contact Us</h2>
                <p className="mt-2 text-gray-700 md:mt-4">
                  If you have any questions regarding our Refund Policy, please contact us:
                </p>
                <ul className="mt-2 space-y-2 text-gray-700 md:mt-4">
                  <li><strong>By email:</strong> <a href="mailto:info@pubgstuff.store" className="text-black underline">info@pubgstuff.store</a></li>
                  <li><strong>By visiting our website:</strong> <Link href="/contact" className="text-black underline">Contact Us</Link></li>
                  <li><strong>By phone:</strong> +92 335 5448505 | +92 302 1550385</li>
                  <li><strong>Address:</strong> Shams Colony H-13, Islamabad, Pakistan, 46000</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
