
-- Fix RLS: only service role can insert, no public access otherwise
DROP POLICY "Allow anonymous inserts" ON public.report_downloads;

CREATE POLICY "Service role can insert report downloads" ON public.report_downloads
  FOR INSERT WITH CHECK ((auth.jwt() ->> 'role'::text) = 'service_role'::text);

CREATE POLICY "No public read" ON public.report_downloads
  FOR SELECT USING (false);

CREATE POLICY "No public update" ON public.report_downloads
  FOR UPDATE USING (false);

CREATE POLICY "No public delete" ON public.report_downloads
  FOR DELETE USING (false);
