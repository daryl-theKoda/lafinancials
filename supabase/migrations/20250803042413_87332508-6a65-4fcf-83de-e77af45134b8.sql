-- Add client_number to profiles table
ALTER TABLE public.profiles ADD COLUMN client_number TEXT UNIQUE;

-- Create function to generate client number
CREATE OR REPLACE FUNCTION public.generate_client_number()
RETURNS TEXT AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the handle_new_user function to assign client numbers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, client_number)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'New User'),
    public.generate_client_number()
  );
  RETURN NEW;
END;
$$;

-- Create partners table
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on partners table
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Create policy for partners (public read access)
CREATE POLICY "Partners are publicly viewable" 
ON public.partners 
FOR SELECT 
USING (is_active = true);

-- Add trigger for partners timestamps
CREATE TRIGGER update_partners_updated_at
BEFORE UPDATE ON public.partners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample partners
INSERT INTO public.partners (name, description, display_order, website_url) VALUES
('Zimbabwe Development Bank', 'Leading development finance institution', 1, 'https://www.zdb.co.zw'),
('CBZ Bank', 'Commercial banking partner', 2, 'https://www.cbz.co.zw'),
('Steward Bank', 'Digital banking solutions', 3, 'https://www.stewardbank.co.zw'),
('Old Mutual', 'Insurance and investment services', 4, 'https://www.oldmutual.co.zw'),
('CABS', 'Building society partner', 5, 'https://www.cabs.co.zw');