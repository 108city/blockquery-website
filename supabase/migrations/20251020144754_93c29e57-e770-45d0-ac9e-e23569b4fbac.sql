-- Add restrictive policies to prevent UPDATE and DELETE on contact_submissions
-- This ensures contact form submissions are immutable once created

CREATE POLICY "No one can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (false);

CREATE POLICY "No one can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
USING (false);

-- Add comment explaining the security measure
COMMENT ON POLICY "No one can update contact submissions" ON public.contact_submissions IS 'Contact submissions are immutable - prevents unauthorized modifications';
COMMENT ON POLICY "No one can delete contact submissions" ON public.contact_submissions IS 'Contact submissions cannot be deleted - prevents unauthorized data loss';