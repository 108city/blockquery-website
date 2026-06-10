-- Create promo_codes table
CREATE TABLE public.promo_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC NOT NULL CHECK (discount_value > 0),
  valid_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  max_uses INTEGER,
  current_uses INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_promo_codes_code ON public.promo_codes(code);
CREATE INDEX idx_promo_codes_active ON public.promo_codes(active);

-- Enable Row Level Security
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- Create restrictive RLS policies
CREATE POLICY "No public read access to promo codes"
ON public.promo_codes
FOR SELECT
USING (false);

CREATE POLICY "No public insert on promo codes"
ON public.promo_codes
FOR INSERT
WITH CHECK (false);

CREATE POLICY "No public update on promo codes"
ON public.promo_codes
FOR UPDATE
USING (false);

CREATE POLICY "No public delete on promo codes"
ON public.promo_codes
FOR DELETE
USING (false);

-- Add columns to self_service_reports table
ALTER TABLE public.self_service_reports
ADD COLUMN promo_code_used TEXT,
ADD COLUMN discount_amount NUMERIC,
ADD COLUMN final_price NUMERIC NOT NULL DEFAULT 99;

-- Create index for tracking promo code usage
CREATE INDEX idx_self_service_reports_promo_code ON public.self_service_reports(promo_code_used);

-- Add comment for documentation
COMMENT ON TABLE public.promo_codes IS 'Stores promotional discount codes with validation rules and usage tracking';
COMMENT ON COLUMN public.promo_codes.discount_type IS 'Type of discount: percentage (e.g., 20 for 20%) or fixed (e.g., 10 for $10 off)';
COMMENT ON COLUMN public.promo_codes.max_uses IS 'Maximum number of times this code can be used (NULL for unlimited)';
COMMENT ON COLUMN public.self_service_reports.final_price IS 'Final price after discount applied (if any)';