-- Fix: Allow service role to update payment status on self_service_reports
-- The current "No updates allowed" policy blocks ALL updates including service role

DROP POLICY IF EXISTS "No updates allowed" ON public.self_service_reports;

CREATE POLICY "Service role can update payment status"
ON public.self_service_reports
FOR UPDATE
USING ((auth.jwt() ->> 'role'::text) = 'service_role'::text)
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'service_role'::text);