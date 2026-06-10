-- Schema export for investigations-chainlabs
-- Generated from src/integrations/supabase/types.ts
-- Target: exlooukdjfxjltzqdxwx.supabase.co

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────────
-- Table: articles
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.articles (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title             text        NOT NULL,
  content           text        NOT NULL,
  author_name       text        NOT NULL DEFAULT '',
  slug              text        NOT NULL UNIQUE,
  excerpt           text,
  cover_image_url   text,
  published         boolean     NOT NULL DEFAULT false,
  published_at      timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published articles"
  ON public.articles FOR SELECT
  USING (published = true);

CREATE POLICY "Service role full access on articles"
  ON public.articles FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ─────────────────────────────────────────────
-- Table: contact_submissions
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name           text        NOT NULL,
  email               text        NOT NULL,
  country             text        NOT NULL,
  organization        text        NOT NULL,
  area_of_expertise   text        NOT NULL,
  message             text        NOT NULL,
  attachment_url      text,
  created_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on contact_submissions"
  ON public.contact_submissions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ─────────────────────────────────────────────
-- Table: promo_codes
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.promo_codes (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  code             text        NOT NULL UNIQUE,
  description      text,
  discount_type    text        NOT NULL,
  discount_value   numeric     NOT NULL,
  max_uses         integer,
  current_uses     integer     NOT NULL DEFAULT 0,
  active           boolean     NOT NULL DEFAULT true,
  valid_from       timestamptz NOT NULL DEFAULT now(),
  valid_until      timestamptz NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on promo_codes"
  ON public.promo_codes FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ─────────────────────────────────────────────
-- Table: rate_limits
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint        text        NOT NULL,
  ip_address      text        NOT NULL,
  request_count   integer     DEFAULT 0,
  window_start    timestamptz DEFAULT now(),
  created_at      timestamptz DEFAULT now()
);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on rate_limits"
  ON public.rate_limits FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ─────────────────────────────────────────────
-- Table: report_downloads
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.report_downloads (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   text        NOT NULL,
  email       text        NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.report_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on report_downloads"
  ON public.report_downloads FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ─────────────────────────────────────────────
-- Table: self_service_reports
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.self_service_reports (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name           text        NOT NULL,
  email               text        NOT NULL,
  country             text        NOT NULL,
  country_code        text,
  company_name        text,
  phone_number        text,
  amount_lost_usd     numeric     NOT NULL,
  incident_date       timestamptz,
  incident_details    text        NOT NULL,
  scam_type           text,
  wallet_type         text,
  has_wallet_access   boolean,
  transaction_id      text        NOT NULL,
  payment_completed   boolean     NOT NULL DEFAULT false,
  payment_link        text,
  promo_code_used     text,
  discount_amount     numeric,
  final_price         numeric     NOT NULL DEFAULT 0,
  created_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.self_service_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on self_service_reports"
  ON public.self_service_reports FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ─────────────────────────────────────────────
-- Table: webinar_registrations
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.webinar_registrations (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text        NOT NULL,
  name          text        NOT NULL,
  company       text        NOT NULL,
  webinar_slug  text        NOT NULL,
  notes         text,
  status        text        DEFAULT 'pending',
  submitted_at  timestamptz DEFAULT now()
);

ALTER TABLE public.webinar_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on webinar_registrations"
  ON public.webinar_registrations FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
