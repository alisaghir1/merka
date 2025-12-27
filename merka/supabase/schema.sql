-- Merka Architecture Admin Panel Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- BLOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  sections JSONB DEFAULT '[]',
  category VARCHAR(100),
  read_time VARCHAR(50),
  date DATE DEFAULT CURRENT_DATE,
  author VARCHAR(200) DEFAULT 'Merka Architecture Team',
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  image VARCHAR(1000),
  meta_title VARCHAR(500),
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  category VARCHAR(100),
  location VARCHAR(200),
  area VARCHAR(100),
  year VARCHAR(10),
  status VARCHAR(50),
  image VARCHAR(1000),
  description TEXT,
  full_description TEXT,
  sections JSONB DEFAULT '[]',
  services TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  gallery TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  client VARCHAR(200),
  budget VARCHAR(100),
  timeline VARCHAR(100),
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  meta_title VARCHAR(500),
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  full_description TEXT,
  sections JSONB DEFAULT '[]',
  icon VARCHAR(50),
  gradient VARCHAR(100),
  features TEXT[] DEFAULT '{}',
  process_steps JSONB DEFAULT '[]',
  benefits TEXT[] DEFAULT '{}',
  image VARCHAR(1000),
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT TRUE,
  meta_title VARCHAR(500),
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- STYLES TABLE (Architectural Styles)
-- ============================================
CREATE TABLE IF NOT EXISTS styles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  icon VARCHAR(50),
  gradient VARCHAR(100),
  short_description TEXT,
  description TEXT,
  extended_description TEXT,
  features TEXT[] DEFAULT '{}',
  applications TEXT[] DEFAULT '{}',
  materials TEXT[] DEFAULT '{}',
  compliance TEXT[] DEFAULT '{}',
  images JSONB DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT TRUE,
  meta_title VARCHAR(500),
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- TYPOLOGIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS typologies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  icon VARCHAR(50),
  gradient VARCHAR(100),
  short_description TEXT,
  description TEXT,
  extended_description TEXT,
  features TEXT[] DEFAULT '{}',
  considerations TEXT[] DEFAULT '{}',
  regulations TEXT[] DEFAULT '{}',
  images JSONB DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT TRUE,
  meta_title VARCHAR(500),
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(50),
  message TEXT,
  project_type VARCHAR(100),
  budget VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- NEWSLETTER SUBSCRIPTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(200) UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- SITE SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- TEAM MEMBERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  position VARCHAR(200),
  bio TEXT,
  image VARCHAR(1000),
  linkedin VARCHAR(500),
  email VARCHAR(200),
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- HERO SLIDES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500),
  subtitle VARCHAR(500),
  image VARCHAR(1000) NOT NULL,
  link VARCHAR(500),
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- MEDIA LIBRARY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  type VARCHAR(50),
  size INTEGER,
  alt_text VARCHAR(500),
  folder VARCHAR(200) DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at column
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_styles_updated_at BEFORE UPDATE ON styles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_typologies_updated_at BEFORE UPDATE ON typologies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_slides_updated_at BEFORE UPDATE ON hero_slides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE typologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view published blogs" ON blogs FOR SELECT USING (published = true);
CREATE POLICY "Public can view published projects" ON projects FOR SELECT USING (published = true);
CREATE POLICY "Public can view published services" ON services FOR SELECT USING (published = true);
CREATE POLICY "Public can view published styles" ON styles FOR SELECT USING (published = true);
CREATE POLICY "Public can view published typologies" ON typologies FOR SELECT USING (published = true);
CREATE POLICY "Public can view published team members" ON team_members FOR SELECT USING (published = true);
CREATE POLICY "Public can view published hero slides" ON hero_slides FOR SELECT USING (published = true);
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view media" ON media FOR SELECT USING (true);

-- Allow authenticated users (admins) full access
CREATE POLICY "Admins can do everything with blogs" ON blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything with projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything with services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything with styles" ON styles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything with typologies" ON typologies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything with contact_submissions" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything with newsletter" ON newsletter_subscriptions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything with site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything with team_members" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything with hero_slides" ON hero_slides FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything with media" ON media FOR ALL USING (auth.role() = 'authenticated');

-- Allow public to insert contact submissions
CREATE POLICY "Public can insert contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert newsletter subscriptions" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);

-- ============================================
-- INSERT DEFAULT SITE SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES 
  ('company', '{"name": "Merka Architecture", "tagline": "Crafting Tomorrow''s Landmarks", "description": "Leading architectural design studio in Dubai specializing in residential, commercial, and hospitality projects."}'),
  ('contact', '{"email": "info@merkaarchitecture.com", "phone": "+971 4 XXX XXXX", "address": "Dubai, United Arab Emirates", "whatsapp": "+971 50 XXX XXXX"}'),
  ('social', '{"instagram": "", "linkedin": "", "facebook": "", "twitter": ""}'),
  ('seo', '{"title": "Merka Architecture - Dubai''s Premier Architectural Design Studio", "description": "Leading architectural design studio in Dubai specializing in residential, commercial, and hospitality projects with modern and traditional fusion styles.", "keywords": "architecture Dubai, architectural design, residential architecture, commercial architecture, Dubai architects"}')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- CREATE STORAGE BUCKET FOR IMAGES
-- ============================================
-- Run this in Supabase Dashboard > Storage > Create new bucket
-- Bucket name: media
-- Public bucket: Yes
