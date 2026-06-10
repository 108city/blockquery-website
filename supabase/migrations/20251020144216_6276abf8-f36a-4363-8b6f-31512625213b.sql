-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  organization TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  area_of_expertise TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT full_name_length CHECK (char_length(full_name) <= 100 AND char_length(full_name) > 0),
  CONSTRAINT organization_length CHECK (char_length(organization) <= 200 AND char_length(organization) > 0),
  CONSTRAINT email_length CHECK (char_length(email) <= 255 AND char_length(email) > 0),
  CONSTRAINT message_length CHECK (char_length(message) <= 2000 AND char_length(message) > 0)
);

-- Add index for better query performance
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_email ON public.contact_submissions(email);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact submissions (public form)
CREATE POLICY "Anyone can submit contact form" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated admin users could view submissions (for future admin panel)
-- For now, no SELECT policy - access only via Supabase dashboard
CREATE POLICY "No public read access" 
ON public.contact_submissions 
FOR SELECT 
USING (false);

-- Add comment for documentation
COMMENT ON TABLE public.contact_submissions IS 'Stores contact form submissions from the public website';