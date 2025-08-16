-- Create loan_applications table
CREATE TABLE IF NOT EXISTS public.loan_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Application Type
  application_type TEXT NOT NULL,
  group_name TEXT,
  
  -- Personal Information
  full_name TEXT NOT NULL,
  national_id TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL,
  marital_status TEXT NOT NULL,
  cell_number TEXT NOT NULL,
  email_address TEXT NOT NULL,
  residential_address TEXT NOT NULL,
  id_photo_url TEXT,
  proof_of_residence_url TEXT,
  
  -- Family & References
  spouse_full_name TEXT,
  spouse_address TEXT,
  spouse_cell_number TEXT,
  spouse_national_id TEXT,
  next_of_kin_name TEXT NOT NULL,
  next_of_kin_relationship TEXT NOT NULL,
  next_of_kin_address TEXT NOT NULL,
  next_of_kin_cell TEXT NOT NULL,
  next_of_kin_id TEXT,
  
  -- Loan & Collateral
  loan_amount DECIMAL(15, 2) NOT NULL,
  loan_purpose TEXT NOT NULL,
  collateral1 TEXT,
  collateral2 TEXT,
  collateral3 TEXT,
  collateral4 TEXT,
  collateral5 TEXT,
  
  -- Employment & Financial
  employment_status TEXT NOT NULL,
  employer TEXT,
  job_title TEXT,
  annual_income DECIMAL(15, 2),
  employment_length TEXT,
  monthly_rent DECIMAL(15, 2) DEFAULT 0,
  other_monthly_debts DECIMAL(15, 2) DEFAULT 0,
  savings_amount DECIMAL(15, 2) DEFAULT 0,
  checking_amount DECIMAL(15, 2) DEFAULT 0,
  
  -- Application Metadata
  application_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'submitted',
  loan_type TEXT NOT NULL,
  
  -- Terms & Declarations
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  declaration_accepted BOOLEAN NOT NULL DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;

-- Reset and create policies for RLS to support anonymous inserts
DROP POLICY IF EXISTS "Users can insert their own loan applications" ON public.loan_applications;
DROP POLICY IF EXISTS "Users can view their own loan applications" ON public.loan_applications;
DROP POLICY IF EXISTS "Anyone can insert loan applications" ON public.loan_applications;
DROP POLICY IF EXISTS "View loan applications" ON public.loan_applications;

-- Allow anyone to insert rows
CREATE POLICY "Anyone can insert loan applications"
ON public.loan_applications
FOR INSERT
WITH CHECK (true);

-- Allow users to view their own rows, anonymous rows, and admins
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

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_loan_applications_updated_at ON public.loan_applications;
CREATE TRIGGER update_loan_applications_updated_at
BEFORE UPDATE ON public.loan_applications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create index on frequently queried columns
CREATE INDEX IF NOT EXISTS idx_loan_applications_user_id ON public.loan_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_loan_applications_status ON public.loan_applications(status);
CREATE INDEX IF NOT EXISTS idx_loan_applications_loan_type ON public.loan_applications(loan_type);
