-- Create loan payments table
CREATE TABLE public.loan_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL,
  user_id UUID NOT NULL,
  amount_due NUMERIC NOT NULL,
  amount_paid NUMERIC DEFAULT 0,
  due_date DATE NOT NULL,
  paid_date DATE,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  transaction_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.loan_payments ENABLE ROW LEVEL SECURITY;

-- Create policies for loan payments
CREATE POLICY "Users can view their own payments" 
ON public.loan_payments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own payments" 
ON public.loan_payments 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create admin follow-ups table
CREATE TABLE public.admin_follow_ups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL,
  application_id UUID,
  follow_up_type TEXT NOT NULL,
  due_date DATE NOT NULL,
  completed BOOLEAN DEFAULT false,
  notes TEXT,
  priority TEXT DEFAULT 'medium',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for admin follow-ups
ALTER TABLE public.admin_follow_ups ENABLE ROW LEVEL SECURITY;

-- Admin can access all follow-ups (will be restricted by application logic)
CREATE POLICY "Admin can manage follow-ups" 
ON public.admin_follow_ups 
FOR ALL 
USING (true);

-- Create trigger for automatic payment due date follow-ups
CREATE OR REPLACE FUNCTION public.create_payment_follow_up()
RETURNS TRIGGER AS $$
BEGIN
  -- Create follow-up reminder 3 days before due date
  INSERT INTO public.admin_follow_ups (
    client_id,
    application_id,
    follow_up_type,
    due_date,
    notes,
    priority
  ) VALUES (
    NEW.user_id,
    NEW.application_id,
    'payment_reminder',
    NEW.due_date - INTERVAL '3 days',
    'Payment reminder for loan payment due on ' || NEW.due_date,
    CASE 
      WHEN NEW.amount_due > 50000 THEN 'high'
      WHEN NEW.amount_due > 20000 THEN 'medium'
      ELSE 'low'
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger
CREATE TRIGGER create_payment_follow_up_trigger
  AFTER INSERT ON public.loan_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.create_payment_follow_up();

-- Add trigger for timestamps
CREATE TRIGGER update_loan_payments_updated_at
  BEFORE UPDATE ON public.loan_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();