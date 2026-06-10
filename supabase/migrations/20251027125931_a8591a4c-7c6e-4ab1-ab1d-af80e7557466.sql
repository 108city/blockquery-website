-- Create rate limiting table for persistent storage
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  endpoint text NOT NULL,
  request_count integer DEFAULT 1,
  window_start timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT unique_ip_endpoint UNIQUE(ip_address, endpoint)
);

-- Enable RLS on rate_limits table
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Only service role can manage rate limits
CREATE POLICY "Service role can manage rate limits"
ON public.rate_limits
FOR ALL
USING ((auth.jwt() ->> 'role'::text) = 'service_role'::text)
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'service_role'::text);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip_endpoint 
ON public.rate_limits(ip_address, endpoint);

-- Fix function search_path for notify_zapier function
CREATE OR REPLACE FUNCTION public.notify_zapier()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
declare
  payload json;
  response text;
begin
  -- Prepare JSON payload from the inserted row
  payload := row_to_json(NEW);

  -- Send HTTP POST to Zapier
  perform
    http((
      'POST',
      'https://hooks.zapier.com/hooks/catch/23213172/ui6ue0m/',
      array[http_header('content-type', 'application/json')],
      payload::text
    ));

  return NEW;
end;
$function$;

-- Add comment explaining the security settings
COMMENT ON FUNCTION public.notify_zapier() IS 'Sends webhook notifications to Zapier. Uses SECURITY DEFINER with fixed search_path to prevent search_path manipulation attacks.';