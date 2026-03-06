-- SANA Phase 2 Schema Update Script
-- This script safely alters existing tables and updates policies for the Phase 2 requirements.

-- 1. Profiles Table Updates
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;

-- 2. Companies Table Updates
-- Ensure CUIT is unique. If there are duplicates, this will fail.
-- It's recommended to clean up any duplicate CUITs before running this if it fails.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'companies_cuit_key') THEN
        ALTER TABLE public.companies ADD CONSTRAINT companies_cuit_key UNIQUE (cuit);
    END IF;
END $$;

-- 3. Manifests Table Updates
ALTER TABLE public.manifests
ADD COLUMN IF NOT EXISTS declared_bags INTEGER,
ADD COLUMN IF NOT EXISTS declared_weight NUMERIC,
ADD COLUMN IF NOT EXISTS verified_bags INTEGER,
ADD COLUMN IF NOT EXISTS verified_weight NUMERIC;

-- Ensure plant_comments can hold long text
ALTER TABLE public.manifests
ALTER COLUMN plant_comments TYPE TEXT;

-- 4. RLS Updates summary (Policies for new fields usually inherit table policies)
-- Note: Make sure developers or service role have access to update `must_change_password`
