-- Add the existing user as an admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('faea13e3-0778-44e5-9ba2-7be3e25372c4', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Create function to get user email by user_id
CREATE OR REPLACE FUNCTION public.get_user_email(_user_id uuid)
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT email FROM auth.users WHERE id = _user_id
$$;

-- Create function to get user_id by email
CREATE OR REPLACE FUNCTION public.get_user_id_by_email(_email text)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT id FROM auth.users WHERE email = _email LIMIT 1
$$;

-- Create admin management policies
CREATE POLICY "Admins can insert admin roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) AND 
  role = 'admin'::app_role
);

CREATE POLICY "Admins can delete admin roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) AND 
  role = 'admin'::app_role
);

-- Update existing RLS policy to allow admins to view all user roles
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));