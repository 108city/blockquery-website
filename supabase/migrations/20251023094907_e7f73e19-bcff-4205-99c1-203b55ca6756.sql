-- Create table for self-service report submissions
CREATE TABLE IF NOT EXISTS public.self_service_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  telegram_handle TEXT,
  country_code TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  amount_lost_usd DECIMAL(15, 2) NOT NULL,
  transaction_id TEXT NOT NULL,
  incident_details TEXT NOT NULL,
  payment_completed BOOLEAN NOT NULL DEFAULT false,
  payment_link TEXT
);

-- Enable Row Level Security
ALTER TABLE public.self_service_reports ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can insert (form submissions via edge function)
CREATE POLICY "Service role can insert reports"
ON public.self_service_reports
FOR INSERT
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'service_role'::text);

-- Policy: No public read access
CREATE POLICY "No public read access"
ON public.self_service_reports
FOR SELECT
USING (false);

-- Policy: No updates allowed
CREATE POLICY "No updates allowed"
ON public.self_service_reports
FOR UPDATE
USING (false);

-- Policy: No deletes allowed
CREATE POLICY "No deletes allowed"
ON public.self_service_reports
FOR DELETE
USING (false);