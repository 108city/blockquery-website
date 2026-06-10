-- Insert test promo code CLITEST25
INSERT INTO public.promo_codes (
  code,
  discount_type,
  discount_value,
  valid_from,
  valid_until,
  max_uses,
  active,
  description
) VALUES (
  'CLITEST25',
  'percentage',
  25,
  now(),
  now() + interval '1 year',
  100,
  true,
  'Test promo code - 25% discount'
);