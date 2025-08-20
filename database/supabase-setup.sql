-- =====================================================
-- Supabase Database Setup Commands
-- Interview Help AI Tool
-- =====================================================

-- =====================================================
-- 1. SUPABASE PROJECT SETUP (CLI COMMANDS)
-- =====================================================

-- Install Supabase CLI (if not already installed)
-- npm install -g supabase

-- Login to Supabase
-- supabase login

-- Initialize Supabase in your project
-- supabase init

-- Start Supabase locally (optional, for development)
-- supabase start

-- =====================================================
-- 2. ENVIRONMENT VARIABLES SETUP
-- =====================================================

-- Create a .env.local file in your Next.js project root with:
/*
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
*/

-- =====================================================
-- 3. SUPABASE CLIENT SETUP
-- =====================================================

-- Install Supabase client in your Next.js project:
-- npm install @supabase/supabase-js

-- =====================================================
-- 4. DATABASE CONNECTION TEST
-- =====================================================

-- Test connection to your Supabase database
-- This will verify that your credentials are working

-- =====================================================
-- 5. RUN THE MAIN SCHEMA
-- =====================================================

-- Execute the main schema.sql file in your Supabase SQL editor
-- Or run it via the Supabase CLI:
-- supabase db reset

-- =====================================================
-- 6. VERIFY SETUP
-- =====================================================

-- Check if tables were created successfully
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check if sample data was inserted
SELECT COUNT(*) as job_count FROM jobs;
SELECT COUNT(*) as question_count FROM interview_questions;
SELECT COUNT(*) as answer_count FROM sample_answers;

-- =====================================================
-- 7. SUPABASE AUTH SETUP (OPTIONAL)
-- =====================================================

-- Enable authentication in your Supabase dashboard
-- Go to Authentication > Settings and configure:
-- - Site URL: http://localhost:3000 (for development)
-- - Redirect URLs: http://localhost:3000/auth/callback

-- =====================================================
-- 8. STORAGE SETUP (FOR FUTURE FEATURES)
-- =====================================================

-- Create storage buckets for resume uploads (Pro feature)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);

-- Set up storage policies
-- CREATE POLICY "Users can upload own resumes" ON storage.objects
-- FOR INSERT WITH CHECK (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Users can view own resumes" ON storage.objects
-- FOR SELECT USING (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);

-- =====================================================
-- 9. API ENDPOINTS SETUP
-- =====================================================

-- Create REST API endpoints (optional, for direct API access)
-- These can be created in your Next.js API routes instead

-- =====================================================
-- 10. MONITORING AND LOGS
-- =====================================================

-- Enable database logs in Supabase dashboard
-- Go to Settings > Database > Logs

-- =====================================================
-- 11. BACKUP AND MIGRATIONS
-- =====================================================

-- Create a migration file for future changes
-- supabase migration new add_new_feature

-- Generate types for TypeScript
-- supabase gen types typescript --project-id your_project_id > types/supabase.ts

-- =====================================================
-- 12. PERFORMANCE OPTIMIZATION
-- =====================================================

-- Enable connection pooling (if using Supabase Pro or higher)
-- Set connection string to use connection pooling

-- Monitor query performance
-- Use Supabase dashboard Analytics section

-- =====================================================
-- 13. SECURITY SETUP
-- =====================================================

-- Review and adjust RLS policies as needed
-- Ensure proper authentication is in place
-- Set up proper CORS policies in Supabase dashboard

-- =====================================================
-- 14. TESTING THE SETUP
-- =====================================================

-- Test basic CRUD operations
-- Test RLS policies
-- Test authentication (if enabled)
-- Test the views and functions

-- =====================================================
-- 15. DEPLOYMENT CHECKLIST
-- =====================================================

-- [ ] Environment variables are set in production
-- [ ] Database schema is deployed
-- [ ] RLS policies are configured
-- [ ] Authentication is configured
-- [ ] CORS policies are set
-- [ ] Storage buckets are created (if needed)
-- [ ] API endpoints are tested
-- [ ] Performance is monitored
-- [ ] Backups are configured
-- [ ] Logs are enabled
