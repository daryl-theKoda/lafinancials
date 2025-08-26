-- Allow anonymous submissions for business loan applications
-- 1) Relax NOT NULL on user_id so anonymous (NULL) submissions are possible
ALTER TABLE public.business_loan_applications
  ALTER COLUMN user_id DROP NOT NULL;

-- 2) RLS policies to allow anonymous users to insert/select rows where user_id IS NULL
-- Existing policies keep authenticated user access; we add explicit anon-friendly rules

-- Applications: allow INSERT when user_id IS NULL
CREATE POLICY "Anon can insert loan applications with NULL user_id"
  ON public.business_loan_applications
  FOR INSERT
  WITH CHECK (user_id IS NULL);

-- Applications: allow SELECT when user_id IS NULL
CREATE POLICY "Anon can view loan applications with NULL user_id"
  ON public.business_loan_applications
  FOR SELECT
  USING (user_id IS NULL);

-- Owners: allow INSERT when target application has NULL user_id
CREATE POLICY "Anon can insert owners for anon applications"
  ON public.business_loan_owners
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.business_loan_applications a
    WHERE a.id = business_loan_owners.application_id
      AND a.user_id IS NULL
  ));

-- Owners: allow SELECT when parent application has NULL user_id
CREATE POLICY "Anon can view owners for anon applications"
  ON public.business_loan_owners
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.business_loan_applications a
    WHERE a.id = business_loan_owners.application_id
      AND a.user_id IS NULL
  ));
