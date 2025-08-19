-- Add marketing_consent column to loan_applications
-- Boolean with default false so existing rows are valid

ALTER TABLE public.loan_applications
  ADD COLUMN IF NOT EXISTS marketing_consent boolean NOT NULL DEFAULT false;
