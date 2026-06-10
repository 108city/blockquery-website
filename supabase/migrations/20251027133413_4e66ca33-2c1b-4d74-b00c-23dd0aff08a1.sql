-- Fix the notify_zapier function with correct pg_net syntax
CREATE OR REPLACE FUNCTION public.notify_zapier()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
declare
  payload jsonb;
  request_id bigint;
begin
  -- Prepare JSONB payload from the inserted row
  payload := to_jsonb(NEW);

  -- Send HTTP POST to Zapier using pg_net extension
  select extensions.http_post(
    url := 'https://hooks.zapier.com/hooks/catch/23213172/ui6ue0m/',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := payload
  ) into request_id;

  return NEW;
exception
  when others then
    -- Log error but don't fail the insert
    raise warning 'Failed to notify Zapier: %', SQLERRM;
    return NEW;
end;
$$;