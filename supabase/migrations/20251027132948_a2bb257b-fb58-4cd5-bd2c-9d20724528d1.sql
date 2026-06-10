-- Fix the notify_zapier function to use correct http extension syntax
CREATE OR REPLACE FUNCTION public.notify_zapier()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
declare
  payload json;
begin
  -- Prepare JSON payload from the inserted row
  payload := row_to_json(NEW);

  -- Send HTTP POST to Zapier using correct syntax
  perform net.http_post(
    url := 'https://hooks.zapier.com/hooks/catch/23213172/ui6ue0m/',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := payload::jsonb
  );

  return NEW;
exception
  when others then
    -- Log error but don't fail the insert
    raise warning 'Failed to notify Zapier: %', SQLERRM;
    return NEW;
end;
$$;