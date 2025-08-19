-- Allow anonymous and authenticated submissions by making user_id nullable
-- and adding permissive RLS policies that still protect data isolation.

-- 1) Make user_id nullable on both application tables
ALTER TABLE public.loan_applications
  ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE public.business_loan_applications
  ALTER COLUMN user_id DROP NOT NULL;

-- 2) Ensure RLS is enabled (no-op if already enabled)
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_loan_owners ENABLE ROW LEVEL SECURITY;

-- 3) RLS policies for loan_applications
--    - Authenticated users: can insert/select their own rows (user_id = auth.uid())
--    - Anonymous users: can insert rows with user_id IS NULL and select rows where user_id IS NULL

-- Insert (authenticated)
CREATE POLICY loan_apps_insert_authenticated
  ON public.loan_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Insert (anonymous)
CREATE POLICY loan_apps_insert_anon
  ON public.loan_applications
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Select (authenticated own rows)
CREATE POLICY loan_apps_select_authenticated
  ON public.loan_applications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Select (anonymous can only see anonymous rows)
CREATE POLICY loan_apps_select_anon
  ON public.loan_applications
  FOR SELECT
  TO anon
  USING (user_id IS NULL);

-- 4) RLS policies for business_loan_applications

-- Insert (authenticated)
CREATE POLICY biz_loan_apps_insert_authenticated
  ON public.business_loan_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Insert (anonymous)
CREATE POLICY biz_loan_apps_insert_anon
  ON public.business_loan_applications
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Select (authenticated own rows)
CREATE POLICY biz_loan_apps_select_authenticated
  ON public.business_loan_applications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Select (anonymous can only see anonymous rows)
CREATE POLICY biz_loan_apps_select_anon
  ON public.business_loan_applications
  FOR SELECT
  TO anon
  USING (user_id IS NULL);

-- 5) RLS policies for business_loan_owners
--    Owners rows are linked to applications via application_id. Allow access/insert
--    only when the parent application is either anonymous (user_id IS NULL) for anon
--    or belongs to the authenticated user.

-- Insert (authenticated)
CREATE POLICY biz_loan_owners_insert_authenticated
  ON public.business_loan_owners
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.business_loan_applications a
      WHERE a.id = business_loan_owners.application_id
        AND a.user_id = auth.uid()
    )
  );

-- Insert (anonymous)
CREATE POLICY biz_loan_owners_insert_anon
  ON public.business_loan_owners
  FOR INSERT
  TO anon
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.business_loan_applications a
      WHERE a.id = business_loan_owners.application_id
        AND a.user_id IS NULL
    )
  );

-- Select (authenticated)
CREATE POLICY biz_loan_owners_select_authenticated
  ON public.business_loan_owners
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.business_loan_applications a
      WHERE a.id = business_loan_owners.application_id
        AND a.user_id = auth.uid()
    )
  );

-- Select (anonymous)
CREATE POLICY biz_loan_owners_select_anon
  ON public.business_loan_owners
  FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1
      FROM public.business_loan_applications a
      WHERE a.id = business_loan_owners.application_id
        AND a.user_id IS NULL
    )
  );

-- Optional: prevent updates/deletes from anon; keep safe by omitting policies.
-- You can add explicit update/delete policies later if needed.
