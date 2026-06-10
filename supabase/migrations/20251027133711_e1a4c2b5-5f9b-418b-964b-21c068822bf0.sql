-- Remove Zapier trigger from self_service_reports table
DROP TRIGGER IF EXISTS notify_zapier_trigger ON public.self_service_reports;

-- Remove the notify_zapier function since it's no longer needed
DROP FUNCTION IF EXISTS public.notify_zapier();