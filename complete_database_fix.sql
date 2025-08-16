-- Complete Database Fix for LA Financial Services
-- Run this in Supabase Dashboard > SQL Editor

-- 1. Fix loan_applications table to allow null user_id
ALTER TABLE public.loan_applications 
ALTER COLUMN user_id DROP NOT NULL;

-- 2. Update foreign key constraint to allow null values
ALTER TABLE public.loan_applications 
DROP CONSTRAINT IF EXISTS loan_applications_user_id_fkey;

ALTER TABLE public.loan_applications 
ADD CONSTRAINT loan_applications_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- 3. Update RLS policies for loan_applications
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

-- 4. Fix business_loan_applications if it exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'business_loan_applications') THEN
    -- Make user_id nullable
    ALTER TABLE public.business_loan_applications 
    ALTER COLUMN user_id DROP NOT NULL;
    
    -- Update foreign key constraint
    ALTER TABLE public.business_loan_applications 
    DROP CONSTRAINT IF EXISTS business_loan_applications_user_id_fkey;
    
    ALTER TABLE public.business_loan_applications 
    ADD CONSTRAINT business_loan_applications_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;
    
    -- Update RLS policies
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
  END IF;
END $$;

-- 5. Create business_loan_applications table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.business_loan_applications (
  id BIGSERIAL PRIMARY KEY,
  application_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  
  -- Business Information
  legal_business_name TEXT NOT NULL,
  trading_name TEXT,
  registration_number TEXT NOT NULL,
  date_of_registration DATE NOT NULL,
  tax_identification_number TEXT,
  vat_number TEXT,
  business_sector TEXT NOT NULL,
  industry TEXT NOT NULL,
  years_in_business INTEGER NOT NULL,
  number_of_employees INTEGER NOT NULL,
  business_structure TEXT NOT NULL,
  business_address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  business_email TEXT NOT NULL,
  business_phone TEXT NOT NULL,
  website TEXT,
  business_description TEXT NOT NULL,
  
  -- Financial Information
  annual_turnover DECIMAL(15, 2) NOT NULL,
  projected_turnover DECIMAL(15, 2) NOT NULL,
  gross_profit DECIMAL(15, 2) NOT NULL,
  net_profit DECIMAL(15, 2) NOT NULL,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  average_balance DECIMAL(15, 2) NOT NULL,
  financial_statements_url TEXT,
  bank_statements_url TEXT,
  tax_returns_url TEXT,
  
  -- Loan Details
  loan_amount DECIMAL(15, 2) NOT NULL,
  loan_term INTEGER NOT NULL,
  repayment_frequency TEXT NOT NULL,
  loan_purpose TEXT NOT NULL,
  collateral_items JSONB,
  business_plan_url TEXT,
  collateral_documents_url TEXT,
  other_documents_url TEXT,
  
  -- References
  business_references JSONB NOT NULL,
  
  -- Declarations
  declarations JSONB NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  
  -- Metadata
  metadata JSONB
);

-- 6. Enable RLS on business_loan_applications
ALTER TABLE public.business_loan_applications ENABLE ROW LEVEL SECURITY;

-- 7. Create business_loan_owners table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.business_loan_owners (
  id BIGSERIAL PRIMARY KEY,
  application_id BIGINT NOT NULL REFERENCES public.business_loan_applications(id) ON DELETE CASCADE,
  
  -- Owner Information
  full_name TEXT NOT NULL,
  id_number TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL,
  residential_address TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  marital_status TEXT NOT NULL,
  position TEXT NOT NULL,
  ownership_percentage DECIMAL(5, 2) NOT NULL,
  
  -- Banking Information
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  average_monthly_balance DECIMAL(15, 2) NOT NULL,
  
  -- Spouse Information
  spouse_name TEXT,
  spouse_id_number TEXT,
  spouse_phone_number TEXT,
  
  -- Next of Kin Information
  next_of_kin_name TEXT NOT NULL,
  next_of_kin_relationship TEXT NOT NULL,
  next_of_kin_address TEXT NOT NULL,
  next_of_kin_phone TEXT NOT NULL,
  next_of_kin_id_number TEXT NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  -- Ensure unique owner per application
  CONSTRAINT unique_owner_per_application UNIQUE (application_id, id_number)
);

-- 8. Enable RLS on business_loan_owners
ALTER TABLE public.business_loan_owners ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS policies for business_loan_owners
DROP POLICY IF EXISTS "Users can view owners for their applications" ON public.business_loan_owners;
DROP POLICY IF EXISTS "Users can insert owners for their applications" ON public.business_loan_owners;

CREATE POLICY "View business loan owners"
ON public.business_loan_owners
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.business_loan_applications
  WHERE public.business_loan_applications.id = business_loan_owners.application_id
  AND (public.business_loan_applications.user_id = auth.uid() OR public.business_loan_applications.user_id IS NULL)
));

CREATE POLICY "Insert business loan owners"
ON public.business_loan_owners
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.business_loan_applications
  WHERE public.business_loan_applications.id = business_loan_owners.application_id
  AND (public.business_loan_applications.user_id = auth.uid() OR public.business_loan_applications.user_id IS NULL)
));

-- 10. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_business_loan_applications_user_id ON public.business_loan_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_business_loan_applications_status ON public.business_loan_applications(status);
CREATE INDEX IF NOT EXISTS idx_business_loan_applications_created_at ON public.business_loan_applications(created_at);
CREATE INDEX IF NOT EXISTS idx_business_loan_owners_application_id ON public.business_loan_owners(application_id);

-- 11. Create or replace functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 12. Create triggers
DROP TRIGGER IF EXISTS update_business_loan_applications_updated_at ON public.business_loan_applications;
CREATE TRIGGER update_business_loan_applications_updated_at
BEFORE UPDATE ON public.business_loan_applications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_business_loan_owners_updated_at ON public.business_loan_owners;
CREATE TRIGGER update_business_loan_owners_updated_at
BEFORE UPDATE ON public.business_loan_owners
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 13. Create application number generation function
CREATE OR REPLACE FUNCTION generate_business_application_number()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.business_loan_applications 
  SET application_number = 'BL-' || to_char(NOW(), 'YYYYMMDD-') || LPAD(NEW.id::text, 6, '0')
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 14. Create trigger for application number generation
DROP TRIGGER IF EXISTS generate_business_loan_application_number ON public.business_loan_applications;
CREATE TRIGGER generate_business_loan_application_number
AFTER INSERT ON public.business_loan_applications
FOR EACH ROW
EXECUTE FUNCTION generate_business_application_number();

-- 15. Ensure required columns exist on loan_applications (idempotent)
ALTER TABLE public.loan_applications
  ADD COLUMN IF NOT EXISTS annual_income DECIMAL(15, 2),
  ADD COLUMN IF NOT EXISTS monthly_rent DECIMAL(15, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS other_monthly_debts DECIMAL(15, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS savings_amount DECIMAL(15, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS checking_amount DECIMAL(15, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT false;

-- 16. Refresh PostgREST schema cache so API sees new columns/policies
-- Requires Supabase PostgREST listener
NOTIFY pgrst, 'reload schema';
