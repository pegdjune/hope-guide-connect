-- Add 'clinic' role to the enum if not exists
-- First check if we need to alter the enum
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum 
    WHERE enumlabel = 'clinic' 
    AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'app_role')
  ) THEN
    ALTER TYPE public.app_role ADD VALUE 'clinic';
  END IF;
END $$;

-- Create blog_articles table for managing blog content
CREATE TABLE public.blog_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  author TEXT DEFAULT 'FertilitéInfo',
  published BOOLEAN DEFAULT false,
  read_time INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create leads table to track user requests to clinics
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES public.clinics(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  user_email TEXT NOT NULL,
  user_name TEXT,
  user_phone TEXT,
  treatment_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'sent', 'contacted', 'converted', 'closed')),
  sent_to_clinic_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create clinic_accounts table to link clinics to user accounts
CREATE TABLE public.clinic_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES public.clinics(id) ON DELETE CASCADE NOT NULL UNIQUE,
  user_id UUID NOT NULL,
  invitation_token TEXT UNIQUE,
  invitation_sent_at TIMESTAMP WITH TIME ZONE,
  invitation_accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinic_accounts ENABLE ROW LEVEL SECURITY;

-- Blog articles policies
CREATE POLICY "Anyone can view published articles"
ON public.blog_articles FOR SELECT
USING (published = true);

CREATE POLICY "Admins can view all articles"
ON public.blog_articles FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert articles"
ON public.blog_articles FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update articles"
ON public.blog_articles FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete articles"
ON public.blog_articles FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Leads policies
CREATE POLICY "Admins can view all leads"
ON public.leads FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage leads"
ON public.leads FOR ALL
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create leads"
ON public.leads FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own leads"
ON public.leads FOR SELECT
USING (auth.uid() = user_id);

-- Clinic accounts policies  
CREATE POLICY "Admins can manage clinic accounts"
ON public.clinic_accounts FOR ALL
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Clinic users can view own account"
ON public.clinic_accounts FOR SELECT
USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_blog_articles_updated_at
BEFORE UPDATE ON public.blog_articles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for leads by clinic
CREATE INDEX idx_leads_clinic_id ON public.leads(clinic_id);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_clinic_accounts_user_id ON public.clinic_accounts(user_id);