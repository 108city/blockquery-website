
-- Create storage bucket for contact form attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('contact-attachments', 'contact-attachments', false);

-- Allow anyone to upload to contact-attachments (anon uploads)
CREATE POLICY "Anyone can upload contact attachments"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'contact-attachments');

-- Only service role can read/delete contact attachments
CREATE POLICY "Service role can read contact attachments"
ON storage.objects FOR SELECT
USING (bucket_id = 'contact-attachments' AND (auth.jwt() ->> 'role') = 'service_role');

CREATE POLICY "Service role can delete contact attachments"
ON storage.objects FOR DELETE
USING (bucket_id = 'contact-attachments' AND (auth.jwt() ->> 'role') = 'service_role');

-- Add attachment_url column to contact_submissions
ALTER TABLE public.contact_submissions
ADD COLUMN attachment_url text;
