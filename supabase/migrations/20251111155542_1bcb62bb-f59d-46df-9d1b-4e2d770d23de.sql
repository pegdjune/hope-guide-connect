-- Créer la table des cliniques
CREATE TABLE public.clinics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Données du CSV
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- Privée ou Publique
  total_clinics_country INTEGER,
  reporting_clinics INTEGER,
  country_configuration TEXT,
  
  -- Données additionnelles (optionnelles pour le moment)
  rating NUMERIC(2,1) CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  success_rate TEXT,
  price_from INTEGER,
  price_currency TEXT DEFAULT 'EUR',
  specialties TEXT[],
  badges TEXT[],
  
  -- Coordonnées géographiques
  longitude NUMERIC(10,7),
  latitude NUMERIC(10,7),
  
  -- Informations supplémentaires
  logo_url TEXT,
  description TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les recherches fréquentes
CREATE INDEX idx_clinics_country ON public.clinics(country);
CREATE INDEX idx_clinics_city ON public.clinics(city);
CREATE INDEX idx_clinics_type ON public.clinics(type);
CREATE INDEX idx_clinics_coordinates ON public.clinics(longitude, latitude);

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER update_clinics_updated_at
  BEFORE UPDATE ON public.clinics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS: Les cliniques sont publiques (lecture pour tous)
ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clinics are viewable by everyone"
  ON public.clinics
  FOR SELECT
  USING (true);

-- Seuls les admins peuvent modifier les cliniques
CREATE POLICY "Admins can insert clinics"
  ON public.clinics
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update clinics"
  ON public.clinics
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete clinics"
  ON public.clinics
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));