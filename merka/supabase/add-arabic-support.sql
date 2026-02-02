-- ============================================
-- TRANSLATIONS TABLE FOR MULTILINGUAL SUPPORT
-- Run this in your Supabase SQL Editor
-- ============================================

-- Add translations table for dynamic content
CREATE TABLE IF NOT EXISTS translations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  entity_type VARCHAR(100) NOT NULL, -- 'blog', 'project', 'service', 'style', 'typology'
  entity_id UUID NOT NULL,
  language VARCHAR(10) NOT NULL DEFAULT 'en', -- 'en', 'ar'
  field_name VARCHAR(100) NOT NULL, -- 'title', 'description', 'content', etc.
  field_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(entity_type, entity_id, language, field_name)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_translations_entity ON translations(entity_type, entity_id, language);

-- Add trigger for updated_at (drop first if exists)
DROP TRIGGER IF EXISTS update_translations_updated_at ON translations;
CREATE TRIGGER update_translations_updated_at 
  BEFORE UPDATE ON translations 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- Public can read translations (drop first if exists)
DROP POLICY IF EXISTS "Public can view translations" ON translations;
CREATE POLICY "Public can view translations" ON translations FOR SELECT USING (true);

-- Admins can manage translations (drop first if exists)
DROP POLICY IF EXISTS "Admins can do everything with translations" ON translations;
CREATE POLICY "Admins can do everything with translations" ON translations FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- ADD ARABIC TITLE/DESCRIPTION COLUMNS TO EXISTING TABLES
-- Alternative approach: Add Arabic columns directly
-- ============================================

-- Add Arabic columns to blogs
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS title_ar VARCHAR(500);
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS excerpt_ar TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS content_ar TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS sections_ar JSONB DEFAULT '[]';
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS category_ar VARCHAR(100);
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS tags_ar TEXT[] DEFAULT '{}';
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS author_ar VARCHAR(200);
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS read_time_ar VARCHAR(50);
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_title_ar VARCHAR(500);
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_description_ar TEXT;

-- Add Arabic columns to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS title_ar VARCHAR(500);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category_ar VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS location_ar VARCHAR(200);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS area_ar VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS status_ar VARCHAR(50);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS description_ar TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS full_description_ar TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sections_ar JSONB DEFAULT '[]';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS services_ar TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS features_ar TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags_ar TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS client_ar VARCHAR(200);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS budget_ar VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS timeline_ar VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS meta_title_ar VARCHAR(500);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS meta_description_ar TEXT;

-- Add Arabic columns to services
ALTER TABLE services ADD COLUMN IF NOT EXISTS title_ar VARCHAR(500);
ALTER TABLE services ADD COLUMN IF NOT EXISTS description_ar TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS full_description_ar TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS sections_ar JSONB DEFAULT '[]';
ALTER TABLE services ADD COLUMN IF NOT EXISTS features_ar TEXT[] DEFAULT '{}';
ALTER TABLE services ADD COLUMN IF NOT EXISTS benefits_ar TEXT[] DEFAULT '{}';
ALTER TABLE services ADD COLUMN IF NOT EXISTS process_steps_ar JSONB DEFAULT '[]';
ALTER TABLE services ADD COLUMN IF NOT EXISTS meta_title_ar VARCHAR(500);
ALTER TABLE services ADD COLUMN IF NOT EXISTS meta_description_ar TEXT;

-- Add Arabic columns to styles
ALTER TABLE styles ADD COLUMN IF NOT EXISTS title_ar VARCHAR(500);
ALTER TABLE styles ADD COLUMN IF NOT EXISTS short_description_ar TEXT;
ALTER TABLE styles ADD COLUMN IF NOT EXISTS description_ar TEXT;
ALTER TABLE styles ADD COLUMN IF NOT EXISTS extended_description_ar TEXT;
ALTER TABLE styles ADD COLUMN IF NOT EXISTS features_ar TEXT[] DEFAULT '{}';
ALTER TABLE styles ADD COLUMN IF NOT EXISTS applications_ar TEXT[] DEFAULT '{}';
ALTER TABLE styles ADD COLUMN IF NOT EXISTS materials_ar TEXT[] DEFAULT '{}';
ALTER TABLE styles ADD COLUMN IF NOT EXISTS compliance_ar TEXT[] DEFAULT '{}';
ALTER TABLE styles ADD COLUMN IF NOT EXISTS meta_title_ar VARCHAR(500);
ALTER TABLE styles ADD COLUMN IF NOT EXISTS meta_description_ar TEXT;

-- Add Arabic columns to typologies
ALTER TABLE typologies ADD COLUMN IF NOT EXISTS title_ar VARCHAR(500);
ALTER TABLE typologies ADD COLUMN IF NOT EXISTS short_description_ar TEXT;
ALTER TABLE typologies ADD COLUMN IF NOT EXISTS description_ar TEXT;
ALTER TABLE typologies ADD COLUMN IF NOT EXISTS extended_description_ar TEXT;
ALTER TABLE typologies ADD COLUMN IF NOT EXISTS features_ar TEXT[] DEFAULT '{}';
ALTER TABLE typologies ADD COLUMN IF NOT EXISTS considerations_ar TEXT[] DEFAULT '{}';
ALTER TABLE typologies ADD COLUMN IF NOT EXISTS regulations_ar TEXT[] DEFAULT '{}';
ALTER TABLE typologies ADD COLUMN IF NOT EXISTS applications TEXT[] DEFAULT '{}';
ALTER TABLE typologies ADD COLUMN IF NOT EXISTS applications_ar TEXT[] DEFAULT '{}';
ALTER TABLE typologies ADD COLUMN IF NOT EXISTS requirements TEXT[] DEFAULT '{}';
ALTER TABLE typologies ADD COLUMN IF NOT EXISTS requirements_ar TEXT[] DEFAULT '{}';
ALTER TABLE typologies ADD COLUMN IF NOT EXISTS meta_title_ar VARCHAR(500);
ALTER TABLE typologies ADD COLUMN IF NOT EXISTS meta_description_ar TEXT;

-- Add Arabic columns to hero_slides
ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS title_ar VARCHAR(500);
ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS subtitle_ar VARCHAR(500);

-- Add Arabic columns to team_members
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS name_ar VARCHAR(200);
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS position_ar VARCHAR(200);
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS bio_ar TEXT;

-- Add Arabic columns to media
ALTER TABLE media ADD COLUMN IF NOT EXISTS alt_text_ar VARCHAR(500);

-- ============================================
-- INSERT DEFAULT LANGUAGE SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES 
  ('language', '{"defaultLanguage": "en", "enableArabic": true}')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- COMMENTS
-- ============================================
-- After running this migration:
-- 1. Arabic content can be added via admin panel
-- 2. Frontend will display Arabic content when language is switched
-- 3. SEO meta tags will use Arabic versions when available
