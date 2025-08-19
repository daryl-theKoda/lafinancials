-- Add annual_income column to loan_applications to support personal/salary applications
-- Numeric with 2 decimals; nullable to avoid breaking existing rows

ALTER TABLE public.loan_applications
  ADD COLUMN IF NOT EXISTS annual_income numeric(12,2);

-- Optional: If you want to ensure it is always present moving forward, uncomment:
-- ALTER TABLE public.loan_applications
--   ALTER COLUMN annual_income SET NOT NULL;
