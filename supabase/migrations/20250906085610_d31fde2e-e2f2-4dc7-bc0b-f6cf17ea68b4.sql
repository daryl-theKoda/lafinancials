-- Create superuser role for managing administrators
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
        -- The enum already exists, we need to modify it to add superuser
        ALTER TYPE public.app_role ADD VALUE 'superuser';
    END IF;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- Insert the first superuser (existing admin)
DO $$
BEGIN
    -- Get the admin user's ID and update their role to superuser
    UPDATE public.user_roles 
    SET role = 'superuser'::app_role 
    WHERE user_id = (
        SELECT user_id 
        FROM public.user_roles 
        WHERE role = 'admin'::app_role 
        LIMIT 1
    );
    
    -- If no admin exists, create one for the specific email
    IF NOT FOUND THEN
        INSERT INTO public.user_roles (user_id, role)
        SELECT id, 'superuser'::app_role
        FROM auth.users 
        WHERE email = 'darylchibange4@gmail.com'
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END $$;