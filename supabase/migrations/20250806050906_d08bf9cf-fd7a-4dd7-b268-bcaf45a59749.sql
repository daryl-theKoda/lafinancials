-- Fix remaining function search path issues
CREATE OR REPLACE FUNCTION public.generate_client_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    new_number TEXT;
    counter INTEGER := 1;
BEGIN
    LOOP
        new_number := 'LAF-' || LPAD(counter::TEXT, 6, '0');
        
        -- Check if this number already exists
        IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE client_number = new_number) THEN
            RETURN new_number;
        END IF;
        
        counter := counter + 1;
        
        -- Safety check to prevent infinite loop
        IF counter > 999999 THEN
            RAISE EXCEPTION 'Unable to generate unique client number';
        END IF;
    END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION public.create_payment_follow_up()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;