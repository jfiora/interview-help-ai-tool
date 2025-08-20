-- =====================================================
-- Interview Help AI Tool - Database Schema
-- Supabase PostgreSQL Database Setup
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Jobs table - stores job titles and basic information
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job descriptions table - stores detailed job descriptions
CREATE TABLE job_descriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    role_summary TEXT NOT NULL,
    responsibilities TEXT[],
    requirements TEXT[],
    experience_level VARCHAR(50),
    salary_range VARCHAR(100),
    location VARCHAR(255),
    is_custom BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Interview questions table - stores questions for each job
CREATE TABLE interview_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    question_type VARCHAR(50) DEFAULT 'general', -- general, technical, behavioral, situational
    difficulty_level VARCHAR(20) DEFAULT 'medium', -- easy, medium, hard
    category VARCHAR(100), -- e.g., 'technical skills', 'problem solving', 'communication'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sample answers table - stores model answers for questions
CREATE TABLE sample_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES interview_questions(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    answer_type VARCHAR(50) DEFAULT 'model', -- model, alternative, beginner, expert
    key_points TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table - for future user management features
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    is_pro_member BOOLEAN DEFAULT false,
    subscription_tier VARCHAR(50) DEFAULT 'free', -- free, pro, enterprise
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User sessions table - tracks job selections and custom descriptions
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    selected_job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
    custom_job_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours')
);

-- =====================================================
-- LOOKUP TABLES
-- =====================================================

-- Job categories lookup
CREATE TABLE job_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Question categories lookup
CREATE TABLE question_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Jobs table indexes
CREATE INDEX idx_jobs_title ON jobs(title);
CREATE INDEX idx_jobs_slug ON jobs(slug);
CREATE INDEX idx_jobs_category ON jobs(category);
CREATE INDEX idx_jobs_active ON jobs(is_active);

-- Job descriptions table indexes
CREATE INDEX idx_job_descriptions_job_id ON job_descriptions(job_id);
CREATE INDEX idx_job_descriptions_custom ON job_descriptions(is_custom);

-- Interview questions table indexes
CREATE INDEX idx_interview_questions_job_id ON interview_questions(job_id);
CREATE INDEX idx_interview_questions_type ON interview_questions(question_type);
CREATE INDEX idx_interview_questions_difficulty ON interview_questions(difficulty_level);
CREATE INDEX idx_interview_questions_category ON interview_questions(category);
CREATE INDEX idx_interview_questions_active ON interview_questions(is_active);

-- Sample answers table indexes
CREATE INDEX idx_sample_answers_question_id ON sample_answers(question_id);
CREATE INDEX idx_sample_answers_type ON sample_answers(answer_type);
CREATE INDEX idx_sample_answers_active ON sample_answers(is_active);

-- User sessions table indexes
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_descriptions_updated_at BEFORE UPDATE ON job_descriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_interview_questions_updated_at BEFORE UPDATE ON interview_questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sample_answers_updated_at BEFORE UPDATE ON sample_answers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sample_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Public read access for jobs, descriptions, questions, and answers
CREATE POLICY "Public read access for jobs" ON jobs FOR SELECT USING (true);
CREATE POLICY "Public read access for job descriptions" ON job_descriptions FOR SELECT USING (true);
CREATE POLICY "Public read access for interview questions" ON interview_questions FOR SELECT USING (true);
CREATE POLICY "Public read access for sample answers" ON sample_answers FOR SELECT USING (true);

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- User sessions policies
CREATE POLICY "Users can manage own sessions" ON user_sessions FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Insert job categories
INSERT INTO job_categories (name, description) VALUES
('Technology', 'Software development, IT, and technical roles'),
('Business', 'Business analysis, management, and operations'),
('Creative', 'Design, marketing, and creative roles'),
('Human Resources', 'HR, recruitment, and people management'),
('Sales', 'Sales, business development, and customer success'),
('Data & Analytics', 'Data science, analysis, and business intelligence');

-- Insert default jobs
INSERT INTO jobs (title, slug, category) VALUES
('Custom Job Description', 'custom-job-description', 'Business'),
('Business Analyst', 'business-analyst', 'Business'),
('Product Manager', 'product-manager', 'Business'),
('Software Engineer', 'software-engineer', 'Technology'),
('Marketing Specialist', 'marketing-specialist', 'Creative'),
('Data Analyst', 'data-analyst', 'Data & Analytics'),
('Customer Service Representative', 'customer-service-representative', 'Business'),
('Sales Representative', 'sales-representative', 'Sales'),
('Human Resources Specialist', 'human-resources-specialist', 'Human Resources'),
('UX/UI Designer', 'ux-ui-designer', 'Creative'),
('QA Engineer', 'qa-engineer', 'Technology');

-- Insert job descriptions (truncated for brevity)
INSERT INTO job_descriptions (job_id, role_summary, responsibilities, requirements) 
SELECT 
    j.id,
    'We are seeking a detail-oriented ' || j.title || ' to join our team. This position offers the opportunity to be involved in a broad range of functions, providing excellent experience in the field.',
    ARRAY['Assist with all internal and external matters', 'Participate in developing organizational guidelines', 'Recommend strategies to motivate team members'],
    ARRAY['Bachelor''s degree in relevant field', '1-3 years of experience', 'Strong communication skills']
FROM jobs j
WHERE j.title != 'Custom Job Description';

-- Insert interview questions for Data Analyst
INSERT INTO interview_questions (job_id, question, question_type, difficulty_level, category) VALUES
((SELECT id FROM jobs WHERE title = 'Data Analyst'), 'Can you walk me through your data analysis process?', 'technical', 'medium', 'Technical Skills'),
((SELECT id FROM jobs WHERE title = 'Data Analyst'), 'What tools and technologies are you most comfortable with?', 'technical', 'easy', 'Technical Skills'),
((SELECT id FROM jobs WHERE title = 'Data Analyst'), 'How do you handle missing or incomplete data?', 'technical', 'medium', 'Problem Solving'),
((SELECT id FROM jobs WHERE title = 'Data Analyst'), 'Describe a time when your analysis led to a significant business impact.', 'behavioral', 'hard', 'Business Impact'),
((SELECT id FROM jobs WHERE title = 'Data Analyst'), 'How do you ensure your analysis is accurate and reliable?', 'technical', 'medium', 'Quality Assurance');

-- Insert sample answers for Data Analyst questions
INSERT INTO sample_answers (question_id, answer_text, answer_type, key_points) VALUES
((SELECT q.id FROM interview_questions q JOIN jobs j ON q.job_id = j.id WHERE j.title = 'Data Analyst' AND q.question LIKE '%data analysis process%'), 
'My data analysis process typically follows these steps:

1. **Data Collection**: I start by gathering data from various sources and ensuring data quality
2. **Data Cleaning**: I identify and handle missing values, outliers, and inconsistencies
3. **Exploratory Analysis**: I use statistical methods to understand patterns and relationships
4. **Modeling**: I apply appropriate analytical techniques based on the business question
5. **Validation**: I test my findings and ensure they''re statistically sound
6. **Communication**: I present insights in a clear, actionable format for stakeholders', 
'model', 
ARRAY['Systematic approach', 'Quality focus', 'Clear communication', 'Statistical validation']);

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for job details with descriptions
CREATE VIEW job_details AS
SELECT 
    j.id,
    j.title,
    j.slug,
    j.category,
    jd.role_summary,
    jd.responsibilities,
    jd.requirements,
    jd.experience_level,
    jd.salary_range,
    jd.location,
    j.is_active,
    j.created_at,
    j.updated_at
FROM jobs j
LEFT JOIN job_descriptions jd ON j.id = jd.job_id;

-- View for questions with answers
CREATE VIEW question_answers AS
SELECT 
    iq.id as question_id,
    iq.question,
    iq.question_type,
    iq.difficulty_level,
    iq.category as question_category,
    j.title as job_title,
    sa.id as answer_id,
    sa.answer_text,
    sa.answer_type,
    sa.key_points
FROM interview_questions iq
JOIN jobs j ON iq.job_id = j.id
LEFT JOIN sample_answers sa ON iq.id = sa.question_id
WHERE iq.is_active = true AND (sa.id IS NULL OR sa.is_active = true);

-- =====================================================
-- FUNCTIONS FOR COMMON OPERATIONS
-- =====================================================

-- Function to get questions for a specific job
CREATE OR REPLACE FUNCTION get_job_questions(job_title_param VARCHAR)
RETURNS TABLE (
    question_id UUID,
    question TEXT,
    question_type VARCHAR,
    difficulty_level VARCHAR,
    category VARCHAR,
    answer_id UUID,
    answer_text TEXT,
    answer_type VARCHAR,
    key_points TEXT[]
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        iq.id,
        iq.question,
        iq.question_type,
        iq.difficulty_level,
        iq.category,
        sa.id,
        sa.answer_text,
        sa.answer_type,
        sa.key_points
    FROM interview_questions iq
    JOIN jobs j ON iq.job_id = j.id
    LEFT JOIN sample_answers sa ON iq.id = sa.question_id
    WHERE j.title = job_title_param 
    AND iq.is_active = true 
    AND (sa.id IS NULL OR sa.is_active = true)
    ORDER BY iq.difficulty_level, iq.category;
END;
$$ LANGUAGE plpgsql;

-- Function to search jobs by keyword
CREATE OR REPLACE FUNCTION search_jobs(search_term VARCHAR)
RETURNS TABLE (
    job_id UUID,
    title VARCHAR,
    category VARCHAR,
    relevance_score INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        j.id,
        j.title,
        j.category,
        CASE 
            WHEN j.title ILIKE '%' || search_term || '%' THEN 3
            WHEN jd.role_summary ILIKE '%' || search_term || '%' THEN 2
            WHEN j.category ILIKE '%' || search_term || '%' THEN 1
            ELSE 0
        END as relevance_score
    FROM jobs j
    LEFT JOIN job_descriptions jd ON j.id = jd.job_id
    WHERE j.title ILIKE '%' || search_term || '%'
    OR jd.role_summary ILIKE '%' || search_term || '%'
    OR j.category ILIKE '%' || search_term || '%'
    ORDER BY relevance_score DESC, j.title;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE jobs IS 'Stores job titles and basic information';
COMMENT ON TABLE job_descriptions IS 'Stores detailed job descriptions with requirements';
COMMENT ON TABLE interview_questions IS 'Stores interview questions for each job';
COMMENT ON TABLE sample_answers IS 'Stores model answers for interview questions';
COMMENT ON TABLE users IS 'Stores user information for future features';
COMMENT ON TABLE user_sessions IS 'Tracks user job selections and custom descriptions';

COMMENT ON FUNCTION get_job_questions IS 'Returns all questions and answers for a specific job';
COMMENT ON FUNCTION search_jobs IS 'Searches jobs by keyword with relevance scoring';
