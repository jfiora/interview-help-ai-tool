-- Migration script to add user authentication to existing Q&A sessions
-- Run this script if you have an existing database without user_id field

-- Add user_id column to qa_sessions table
ALTER TABLE qa_sessions ADD COLUMN IF NOT EXISTS user_id VARCHAR(255);

-- Update existing sessions to have a default user (you can change this to a specific user ID)
-- WARNING: This will make all existing sessions belong to the specified user
-- UPDATE qa_sessions SET user_id = 'default-user-id' WHERE user_id IS NULL;

-- Make user_id NOT NULL after setting default values
-- ALTER TABLE qa_sessions ALTER COLUMN user_id SET NOT NULL;

-- Add index for user_id
CREATE INDEX IF NOT EXISTS idx_qa_sessions_user_id ON qa_sessions(user_id);

-- Update the create_qa_session function to include user_id parameter
CREATE OR REPLACE FUNCTION create_qa_session(
    p_user_id VARCHAR(255),
    p_session_name VARCHAR(255),
    p_job_title VARCHAR(255),
    p_job_description TEXT,
    p_model_used VARCHAR(100)
) RETURNS UUID AS $$
DECLARE
    v_session_id UUID;
BEGIN
    INSERT INTO qa_sessions (user_id, session_name, job_title, job_description, model_used)
    VALUES (p_user_id, p_session_name, p_job_title, p_job_description, p_model_used)
    RETURNING id INTO v_session_id;
    
    RETURN v_session_id;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS on Q&A session tables if not already enabled
ALTER TABLE qa_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_answers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own sessions" ON qa_sessions;
DROP POLICY IF EXISTS "Users can insert their own sessions" ON qa_sessions;
DROP POLICY IF EXISTS "Users can update their own sessions" ON qa_sessions;
DROP POLICY IF EXISTS "Users can delete their own sessions" ON qa_sessions;

-- Create new Clerk-based RLS policies
CREATE POLICY "Users can view their own sessions" ON qa_sessions FOR SELECT USING (user_id = current_setting('app.current_user_id', true)::VARCHAR(255));
CREATE POLICY "Users can insert their own sessions" ON qa_sessions FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true)::VARCHAR(255));
CREATE POLICY "Users can update their own sessions" ON qa_sessions FOR UPDATE USING (user_id = current_setting('app.current_user_id', true)::VARCHAR(255));
CREATE POLICY "Users can delete their own sessions" ON qa_sessions FOR DELETE USING (user_id = current_setting('app.current_user_id', true)::VARCHAR(255));

-- Create policies for session questions
DROP POLICY IF EXISTS "Users can view their session questions" ON session_questions;
DROP POLICY IF EXISTS "Users can insert their session questions" ON session_questions;

CREATE POLICY "Users can view their session questions" ON session_questions FOR SELECT USING (
    session_id IN (
        SELECT id FROM qa_sessions WHERE user_id = current_setting('app.current_user_id', true)::VARCHAR(255)
    )
);
CREATE POLICY "Users can insert their session questions" ON session_questions FOR INSERT WITH CHECK (
    session_id IN (
        SELECT id FROM qa_sessions WHERE user_id = current_setting('app.current_user_id', true)::VARCHAR(255)
    )
);

-- Create policies for session answers
DROP POLICY IF EXISTS "Users can view their session answers" ON session_answers;
DROP POLICY IF EXISTS "Users can insert their session answers" ON session_answers;

CREATE POLICY "Users can view their session answers" ON session_answers FOR SELECT USING (
    session_id IN (
        SELECT id FROM qa_sessions WHERE user_id = current_setting('app.current_user_id', true)::VARCHAR(255)
    )
);
CREATE POLICY "Users can insert their session answers" ON session_answers FOR INSERT WITH CHECK (
    session_id IN (
        SELECT id FROM qa_sessions WHERE user_id = current_setting('app.current_user_id', true)::VARCHAR(255)
    )
);
