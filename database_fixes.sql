-- Run these SQL commands in your Supabase Dashboard > SQL Editor
-- This will fix the database to allow non-authenticated form submissions

-- 1. Allow null user_id for non-authenticated loan applications
ALTER TABLE public.loan_applications 
ALTER COLUMN user_id DROP NOT NULL;

-- 2. Update the foreign key constraint to allow null values
ALTER TABLE public.loan_applications 
DROP CONSTRAINT IF EXISTS loan_applications_user_id_fkey;

ALTER TABLE public.loan_applications 
ADD CONSTRAINT loan_applications_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- 3. Update RLS policies to allow anonymous submissions
DROP POLICY IF EXISTS "Users can insert their own loan applications" ON public.loan_applications;
DROP POLICY IF EXISTS "Users can view their own loan applications" ON public.loan_applications;

-- 4. Allow anyone to insert loan applications
CREATE POLICY "Anyone can insert loan applications"
ON public.loan_applications
FOR INSERT
WITH CHECK (true);

-- 5. Allow users to view their own applications, and allow viewing of anonymous applications
CREATE POLICY "View loan applications"
ON public.loan_applications
FOR SELECT
USING (
  auth.uid() = user_id OR 
  user_id IS NULL OR
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- 6. Allow admins to update any application
CREATE POLICY "Admins can update loan applications"
ON public.loan_applications
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- 7. Apply the same fixes to business_loan_applications table
ALTER TABLE public.business_loan_applications 
ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE public.business_loan_applications 
DROP CONSTRAINT IF EXISTS business_loan_applications_user_id_fkey;

ALTER TABLE public.business_loan_applications 
ADD CONSTRAINT business_loan_applications_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- 8. Update RLS policies for business loans
DROP POLICY IF EXISTS "Users can insert their own business loan applications" ON public.business_loan_applications;
DROP POLICY IF EXISTS "Users can view their own business loan applications" ON public.business_loan_applications;

CREATE POLICY "Anyone can insert business loan applications"
ON public.business_loan_applications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "View business loan applications"
ON public.business_loan_applications
FOR SELECT
USING (
  auth.uid() = user_id OR 
  user_id IS NULL OR
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- 9. Apply the same fixes to salary_loan_applications table if it exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'salary_loan_applications') THEN
    ALTER TABLE public.salary_loan_applications ALTER COLUMN user_id DROP NOT NULL;
    
    ALTER TABLE public.salary_loan_applications 
    DROP CONSTRAINT IF EXISTS salary_loan_applications_user_id_fkey;
    
    ALTER TABLE public.salary_loan_applications 
    ADD CONSTRAINT salary_loan_applications_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;
    
    DROP POLICY IF EXISTS "Users can insert their own salary loan applications" ON public.salary_loan_applications;
    DROP POLICY IF EXISTS "Users can view their own salary loan applications" ON public.salary_loan_applications;
    
    CREATE POLICY "Anyone can insert salary loan applications"
    ON public.salary_loan_applications
    FOR INSERT
    WITH CHECK (true);
    
    CREATE POLICY "View salary loan applications"
    ON public.salary_loan_applications
    FOR SELECT
    USING (
      auth.uid() = user_id OR 
      user_id IS NULL OR
      EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() AND role = 'admin'
      )
    );
  END IF;
END $$;
