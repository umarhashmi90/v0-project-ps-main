-- Grant usage on the schema to anon and authenticated roles
grant usage on schema public to anon;
grant usage on schema public to authenticated;

-- Create the notifications table
CREATE TABLE if not exists notifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    type text,
    data jsonb,
    user_id uuid
);

-- Grant all permissions to the anon and authenticated roles
grant all on table public.notifications to anon;
grant all on table public.notifications to authenticated;

-- Enable Row Level Security for the notifications table
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows authenticated users to view all notifications
CREATE POLICY "Allow authenticated users to view all notifications"
ON public.notifications
FOR SELECT
TO authenticated
USING (true);

-- Create a policy that allows all users (including anon) to view all notifications
-- This is useful for scenarios where you might want to show some notifications to logged-out users
-- If you want to restrict this further, you can change the USING clause
CREATE POLICY "Allow all users to view notifications"
ON public.notifications
FOR SELECT
TO anon
USING (true);
