-- Ensure pg_net extension exists for HTTP calls from database
create extension if not exists pg_net with schema extensions;
-- Note: in Supabase, pg_net usually resides in the extensions schema