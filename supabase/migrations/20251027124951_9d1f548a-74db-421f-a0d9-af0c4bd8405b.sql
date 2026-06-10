-- Fix failing inserts on self_service_reports by removing a misconfigured webhook trigger
-- The trigger "CLI-SelfServiceReport" calls supabase_functions.http_request() without a URL argument,
-- causing: P0001: "url argument is missing" on every INSERT.

-- Drop the faulty trigger to restore normal inserts
DROP TRIGGER IF EXISTS "CLI-SelfServiceReport" ON public.self_service_reports;