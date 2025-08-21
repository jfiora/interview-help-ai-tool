-- Migration: Add LinkedIn Profile Support to Q&A Sessions
-- This script resolves function conflicts and adds LinkedIn profile optimization storage

-- STEP 1: Add the linkedin_profile column
ALTER TABLE qa_sessions 
ADD COLUMN IF NOT EXISTS linkedin_profile TEXT;

-- STEP 2: Add comment for documentation
COMMENT ON COLUMN qa_sessions.linkedin_profile IS 'JSON string containing LinkedIn profile optimization data (headline and about section)';

-- STEP 3: Resolve function conflicts by removing all existing create_qa_session functions
-- This ensures a clean slate for the new function
DO $$
DECLARE
    func_record RECORD;
BEGIN
    -- Loop through all functions with the name create_qa_session
    FOR func_record IN 
        SELECT p.oid, p.proname, pg_get_function_identity_arguments(p.oid) as args
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public' 
        AND p.proname = 'create_qa_session'
    LOOP
        -- Drop each function found
        EXECUTE 'DROP FUNCTION IF EXISTS create_qa_session(' || func_record.args || ') CASCADE';
        RAISE NOTICE 'Dropped function create_qa_session(%)', func_record.args;
    END LOOP;
END $$;

-- STEP 4: Verify all functions are gone
SELECT 
    p.proname as function_name,
    pg_get_function_arguments(p.oid) as arguments,
    pg_get_function_result(p.oid) as return_type
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' 
AND p.proname = 'create_qa_session';

-- STEP 5: Create the correct function with the new signature
CREATE OR REPLACE FUNCTION create_qa_session(
    p_session_name VARCHAR(255),
    p_job_title VARCHAR(255),
    p_job_description TEXT,
    p_model_used VARCHAR(100),
    p_user_id VARCHAR(255),
    p_linkedin_profile TEXT DEFAULT NULL
) RETURNS VARCHAR(255) AS $$
DECLARE
    v_session_id VARCHAR(255);
BEGIN
    -- Insert new session
    INSERT INTO qa_sessions (
        session_name, 
        job_title, 
        job_description, 
        model_used, 
        user_id,
        linkedin_profile,
        created_at, 
        updated_at
    ) VALUES (
        p_session_name, 
        p_job_title, 
        p_job_description, 
        p_model_used, 
        p_user_id,
        p_linkedin_profile,
        NOW(), 
        NOW()
    ) RETURNING id INTO v_session_id;
    
    RETURN v_session_id;
END;
$$ LANGUAGE plpgsql;

-- STEP 6: Grant execute permission
GRANT EXECUTE ON FUNCTION create_qa_session TO authenticated;

-- STEP 7: Verify only one function exists now
SELECT 
    p.proname as function_name,
    pg_get_function_arguments(p.oid) as arguments,
    pg_get_function_result(p.oid) as return_type
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' 
AND p.proname = 'create_qa_session';
