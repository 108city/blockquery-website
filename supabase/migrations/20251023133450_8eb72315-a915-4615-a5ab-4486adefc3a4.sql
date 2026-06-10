-- Add new columns to self_service_reports table
ALTER TABLE self_service_reports 
  DROP COLUMN IF EXISTS telegram_handle,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS scam_type text,
  ADD COLUMN IF NOT EXISTS incident_date timestamp with time zone,
  ADD COLUMN IF NOT EXISTS wallet_type text,
  ADD COLUMN IF NOT EXISTS has_wallet_access boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS company_name text;

-- Make phone_number and country_code optional (nullable)
ALTER TABLE self_service_reports 
  ALTER COLUMN phone_number DROP NOT NULL,
  ALTER COLUMN country_code DROP NOT NULL;

-- Make country required (not null) and transaction_id required (not null)
ALTER TABLE self_service_reports 
  ALTER COLUMN country SET NOT NULL,
  ALTER COLUMN transaction_id SET NOT NULL;