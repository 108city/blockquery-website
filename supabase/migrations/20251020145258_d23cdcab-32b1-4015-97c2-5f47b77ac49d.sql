-- Remove the public insert policy for contact_submissions
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

-- Add a new policy that only allows inserts from the service role (Edge Function)
-- This blocks direct database access and forces all submissions through the rate-limited Edge Function
CREATE POLICY "Only service role can insert contact submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (
  -- Only allow inserts from service role (used by Edge Function)
  auth.jwt()->>'role' = 'service_role'
);

COMMENT ON POLICY "Only service role can insert contact submissions" ON public.contact_submissions IS 'Contact submissions must go through the rate-limited Edge Function for spam protection';