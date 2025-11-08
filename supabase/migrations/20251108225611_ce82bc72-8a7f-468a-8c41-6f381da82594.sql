-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create diagnostic_submissions table (quand l'utilisateur fait le simulateur)
CREATE TABLE public.diagnostic_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  situation TEXT NOT NULL,
  age_range TEXT,
  country_preference TEXT,
  budget_range TEXT,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.diagnostic_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own submissions"
  ON public.diagnostic_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own submissions"
  ON public.diagnostic_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create quotes table (devis reçus des cliniques)
CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  diagnostic_id UUID REFERENCES public.diagnostic_submissions(id) ON DELETE CASCADE,
  clinic_name TEXT NOT NULL,
  clinic_country TEXT NOT NULL,
  clinic_logo_url TEXT,
  treatment_type TEXT NOT NULL,
  price_total DECIMAL(10, 2) NOT NULL,
  price_currency TEXT DEFAULT 'EUR',
  success_rate TEXT,
  treatment_duration TEXT,
  included_services TEXT[],
  additional_notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'viewed', 'accepted', 'rejected')),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quotes"
  ON public.quotes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own quotes"
  ON public.quotes FOR UPDATE
  USING (auth.uid() = user_id);

-- Create conversations table (discussions avec les experts/cliniques)
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  clinic_name TEXT NOT NULL,
  subject TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations"
  ON public.conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create conversations"
  ON public.conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'clinic', 'expert')),
  sender_name TEXT,
  content TEXT NOT NULL,
  attachments TEXT[],
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in own conversations"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = messages.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in own conversations"
  ON public.messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = messages.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for auto-profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();