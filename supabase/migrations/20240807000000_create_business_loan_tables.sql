-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE application_status AS ENUM (
  'draft',
  'submitted',
  'under_review',
  'approved',
  'rejected',
  'requires_more_info',
  'cancelled'
);

-- Create business_loan_applications table
CREATE TABLE IF NOT EXISTS public.business_loan_applications (
  id BIGSERIAL PRIMARY KEY,
  application_number TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status application_status NOT NULL DEFAULT 'draft',
  
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

-- Create owners table (separate table for one-to-many relationship)
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

-- Create indexes for better query performance
CREATE INDEX idx_business_loan_applications_user_id ON public.business_loan_applications(user_id);
CREATE INDEX idx_business_loan_applications_status ON public.business_loan_applications(status);
CREATE INDEX idx_business_loan_applications_created_at ON public.business_loan_applications(created_at);
CREATE INDEX idx_business_loan_owners_application_id ON public.business_loan_owners(application_id);

-- Enable Row Level Security
ALTER TABLE public.business_loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_loan_owners ENABLE ROW LEVEL SECURITY;

-- RLS Policies for business_loan_applications
CREATE POLICY "Users can view their own loan applications"
  ON public.business_loan_applications
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own loan applications"
  ON public.business_loan_applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own loan applications"
  ON public.business_loan_applications
  FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for business_loan_owners
CREATE POLICY "Users can view owners for their applications"
  ON public.business_loan_owners
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.business_loan_applications
    WHERE public.business_loan_applications.id = business_loan_owners.application_id
    AND public.business_loan_applications.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert owners for their applications"
  ON public.business_loan_owners
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.business_loan_applications
    WHERE public.business_loan_applications.id = business_loan_owners.application_id
    AND public.business_loan_applications.user_id = auth.uid()
  ));

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update updated_at
CREATE TRIGGER update_business_loan_applications_updated_at
BEFORE UPDATE ON public.business_loan_applications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_loan_owners_updated_at
BEFORE UPDATE ON public.business_loan_owners
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create a function to generate application numbers
CREATE OR REPLACE FUNCTION generate_business_application_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.application_number := 'BL-' || to_char(NOW(), 'YYYYMMDD-') || 
                           LPAD(NEW.id::text, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to generate application number after insert
CREATE TRIGGER generate_business_loan_application_number
AFTER INSERT ON public.business_loan_applications
FOR EACH ROW
EXECUTE FUNCTION generate_business_application_number();

-- Create a function to set submitted_at timestamp
CREATE OR REPLACE FUNCTION set_submitted_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'submitted' AND OLD.status != 'submitted' THEN
    NEW.submitted_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to set submitted_at when status changes to 'submitted'
CREATE TRIGGER set_business_loan_submitted_at
BEFORE UPDATE ON public.business_loan_applications
FOR EACH ROW
EXECUTE FUNCTION set_submitted_at();

-- Create a function to update application status when owners are modified
CREATE OR REPLACE FUNCTION update_application_status_on_owner_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    -- If last owner is deleted, delete the application
    IF NOT EXISTS (
      SELECT 1 FROM public.business_loan_owners 
      WHERE application_id = OLD.application_id
    ) AND EXISTS (
      SELECT 1 FROM public.business_loan_applications
      WHERE id = OLD.application_id AND status = 'draft'
    ) THEN
      DELETE FROM public.business_loan_applications WHERE id = OLD.application_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to handle application status when owners are modified
CREATE TRIGGER update_application_on_owner_delete
AFTER DELETE ON public.business_loan_owners
FOR EACH ROW
EXECUTE FUNCTION update_application_status_on_owner_change();
