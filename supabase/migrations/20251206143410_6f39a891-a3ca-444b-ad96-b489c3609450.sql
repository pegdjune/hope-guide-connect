-- Add missing columns to clinics table to match the CSV format
ALTER TABLE public.clinics
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'Non_vérifié' CHECK (verification_status IN ('Confirmé', 'À_confirmer', 'Non_vérifié')),
ADD COLUMN IF NOT EXISTS data_source TEXT,
ADD COLUMN IF NOT EXISTS data_year INTEGER,
ADD COLUMN IF NOT EXISTS collection_notes TEXT,
ADD COLUMN IF NOT EXISTS tarif_fiv_base INTEGER,
ADD COLUMN IF NOT EXISTS tarif_fiv_dpi INTEGER,
ADD COLUMN IF NOT EXISTS tarif_don_ovocytes INTEGER,
ADD COLUMN IF NOT EXISTS service_don_ovocytes BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS service_don_sperme BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS service_dpi BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS access_couples_hetero BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS access_couples_lesbiennes BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS access_femmes_seules BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS taux_reussite_fiv NUMERIC,
ADD COLUMN IF NOT EXISTS taux_reussite_icsi NUMERIC;

-- Create index for verification status filtering
CREATE INDEX IF NOT EXISTS idx_clinics_verification_status ON public.clinics(verification_status);