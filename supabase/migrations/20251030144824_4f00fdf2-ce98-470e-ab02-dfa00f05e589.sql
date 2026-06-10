-- Create webinar_registrations table for storing event registration applications
CREATE TABLE IF NOT EXISTS public.webinar_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  webinar_slug text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at timestamptz DEFAULT now(),
  notes text,
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create indexes for faster queries
CREATE INDEX idx_webinar_registrations_email ON public.webinar_registrations(email);
CREATE INDEX idx_webinar_registrations_webinar ON public.webinar_registrations(webinar_slug);
CREATE INDEX idx_webinar_registrations_status ON public.webinar_registrations(status);

-- Enable Row Level Security
ALTER TABLE public.webinar_registrations ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage all records
CREATE POLICY "Service role can manage webinar registrations"
  ON public.webinar_registrations
  FOR ALL
  USING ((auth.jwt() ->> 'role'::text) = 'service_role'::text)
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'service_role'::text);