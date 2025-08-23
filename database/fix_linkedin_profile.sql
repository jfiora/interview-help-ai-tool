-- =====================================================
-- Fix LinkedIn Profile Issues in Database
-- =====================================================

-- 1. Drop and recreate the complete_qa_sessions view to include linkedin_profile
DROP VIEW IF EXISTS complete_qa_sessions;

CREATE VIEW complete_qa_sessions AS
SELECT 
    qs.id as session_id,
    qs.session_name,
    qs.job_title,
    qs.job_description,
    qs.created_at,
    qs.total_questions,
    qs.total_answers,
    qs.model_used,
    qs.estimated_cost,
    qs.linkedin_profile,  -- Added this field
    sq.question_text,
    sq.question_type,
    sq.difficulty_level,
    sq.category,
    sq.explanation,
    sq.question_order,
    sa.answer_text,
    sa.key_points,
    sa.tips
FROM qa_sessions qs
LEFT JOIN session_questions sq ON qs.id = sq.session_id
LEFT JOIN session_answers sa ON sq.id = sa.question_id
ORDER BY qs.created_at DESC, sq.question_order, sa.created_at;

-- 2. Drop and recreate the session_summaries view to include linkedin_profile
DROP VIEW IF EXISTS session_summaries;

CREATE VIEW session_summaries AS
SELECT 
    id,
    session_name,
    job_title,
    created_at,
    total_questions,
    total_answers,
    model_used,
    estimated_cost,
    linkedin_profile  -- Added this field
FROM qa_sessions
ORDER BY created_at DESC;

-- 3. Update the create_qa_session function to include linkedin_profile
CREATE OR REPLACE FUNCTION create_qa_session(
    p_user_id VARCHAR(255),
    p_session_name VARCHAR(255),
    p_job_title VARCHAR(255),
    p_job_description TEXT,
    p_model_used VARCHAR(100),
    p_linkedin_profile TEXT DEFAULT NULL  -- Added this parameter
) RETURNS UUID AS $$
DECLARE
    v_session_id UUID;
BEGIN
    INSERT INTO qa_sessions (user_id, session_name, job_title, job_description, model_used, linkedin_profile)
    VALUES (p_user_id, p_session_name, p_job_title, p_job_description, p_model_used, p_linkedin_profile)
    RETURNING id INTO v_session_id;
    
    RETURN v_session_id;
END;
$$ LANGUAGE plpgsql;

-- 4. Verify the qa_sessions table has the linkedin_profile column
-- If this column doesn't exist, you'll need to add it:
-- ALTER TABLE qa_sessions ADD COLUMN IF NOT EXISTS linkedin_profile TEXT;

-- 5. Test the fix by checking if the views now include linkedin_profile
-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'complete_qa_sessions' AND column_name = 'linkedin_profile';

-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'session_summaries' AND column_name = 'linkedin_profile';
