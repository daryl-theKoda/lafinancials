-- Allow null user_id for non-authenticated loan applications
ALTER TABLE public.loan_applications 
ALTER COLUMN user_id DROP NOT NULL;

-- Update the foreign key constraint to allow null values
ALTER TABLE public.loan_applications 
DROP CONSTRAINT IF EXISTS loan_applications_user_id_fkey;

ALTER TABLE public.loan_applications 
ADD CONSTRAINT loan_applications_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Update RLS policies to allow anonymous submissions
DROP POLICY IF EXISTS "Users can insert their own loan applications" ON public.loan_applications;
DROP POLICY IF EXISTS "Users can view their own loan applications" ON public.loan_applications;

-- Allow anyone to insert loan applications
CREATE POLICY "Anyone can insert loan applications"
ON public.loan_applications
FOR INSERT
WITH CHECK (true);

-- Allow users to view their own applications, and allow viewing of anonymous applications
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

-- Allow admins to update any application
CREATE POLICY "Admins can update loan applications"
ON public.loan_applications
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);
