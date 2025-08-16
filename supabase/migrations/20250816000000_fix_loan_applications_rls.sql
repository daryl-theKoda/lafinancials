-- Fix RLS policies to allow non-authenticated users to submit loan applications

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can insert their own loan applications" ON public.loan_applications;

-- Create new policy that allows anyone to insert loan applications
CREATE POLICY "Anyone can insert loan applications"
ON public.loan_applications
FOR INSERT
WITH CHECK (true);

-- Update the select policy to allow users to view their own applications OR allow admins to view all
DROP POLICY IF EXISTS "Users can view their own loan applications" ON public.loan_applications;

CREATE POLICY "Users can view their own applications or admins can view all"
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

-- Allow updates for admins only
CREATE POLICY "Admins can update loan applications"
ON public.loan_applications
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);
