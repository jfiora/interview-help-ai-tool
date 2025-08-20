// =====================================================
// Database Types for Interview Help AI Tool
// Generated to match the Supabase database schema
// =====================================================

export interface Database {
    public: {
        Tables: {
            jobs: {
                Row: {
                    id: string;
                    title: string;
                    slug: string;
                    category: string | null;
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    title: string;
                    slug: string;
                    category?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    title?: string;
                    slug?: string;
                    category?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            job_descriptions: {
                Row: {
                    id: string;
                    job_id: string;
                    role_summary: string;
                    responsibilities: string[] | null;
                    requirements: string[] | null;
                    experience_level: string | null;
                    salary_range: string | null;
                    location: string | null;
                    is_custom: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    job_id: string;
                    role_summary: string;
                    responsibilities?: string[] | null;
                    requirements?: string[] | null;
                    experience_level?: string | null;
                    salary_range?: string | null;
                    location?: string | null;
                    is_custom?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    job_id?: string;
                    role_summary?: string;
                    responsibilities?: string[] | null;
                    requirements?: string[] | null;
                    experience_level?: string | null;
                    salary_range?: string | null;
                    location?: string | null;
                    is_custom?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            interview_questions: {
                Row: {
                    id: string;
                    job_id: string;
                    question: string;
                    question_type: string;
                    difficulty_level: string;
                    category: string | null;
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    job_id: string;
                    question: string;
                    question_type?: string;
                    difficulty_level?: string;
                    category?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    job_id?: string;
                    question?: string;
                    question_type?: string;
                    difficulty_level?: string;
                    category?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            sample_answers: {
                Row: {
                    id: string;
                    question_id: string;
                    answer_text: string;
                    answer_type: string;
                    key_points: string[] | null;
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    question_id: string;
                    answer_text: string;
                    answer_type?: string;
                    key_points?: string[] | null;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    question_id?: string;
                    answer_text?: string;
                    answer_type?: string;
                    key_points?: string[] | null;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            users: {
                Row: {
                    id: string;
                    email: string;
                    full_name: string | null;
                    avatar_url: string | null;
                    is_pro_member: boolean;
                    subscription_tier: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    email: string;
                    full_name?: string | null;
                    avatar_url?: string | null;
                    is_pro_member?: boolean;
                    subscription_tier?: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    email?: string;
                    full_name?: string | null;
                    avatar_url?: string | null;
                    is_pro_member?: boolean;
                    subscription_tier?: string;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            user_sessions: {
                Row: {
                    id: string;
                    user_id: string | null;
                    session_token: string;
                    selected_job_id: string | null;
                    custom_job_description: string | null;
                    created_at: string;
                    expires_at: string;
                };
                Insert: {
                    id?: string;
                    user_id?: string | null;
                    session_token: string;
                    selected_job_id?: string | null;
                    custom_job_description?: string | null;
                    created_at?: string;
                    expires_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string | null;
                    session_token?: string;
                    selected_job_id?: string | null;
                    custom_job_description?: string | null;
                    created_at?: string;
                    expires_at?: string;
                };
            };
            job_categories: {
                Row: {
                    id: string;
                    name: string;
                    description: string | null;
                    is_active: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    description?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    description?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                };
            };
            question_categories: {
                Row: {
                    id: string;
                    name: string;
                    description: string | null;
                    is_active: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    description?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    description?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                };
            };
        };
        Views: {
            job_details: {
                Row: {
                    id: string | null;
                    title: string | null;
                    slug: string | null;
                    category: string | null;
                    role_summary: string | null;
                    responsibilities: string[] | null;
                    requirements: string[] | null;
                    experience_level: string | null;
                    salary_range: string | null;
                    location: string | null;
                    is_active: boolean | null;
                    created_at: string | null;
                    updated_at: string | null;
                };
            };
            question_answers: {
                Row: {
                    question_id: string | null;
                    question: string | null;
                    question_type: string | null;
                    difficulty_level: string | null;
                    question_category: string | null;
                    job_title: string | null;
                    answer_id: string | null;
                    answer_text: string | null;
                    answer_type: string | null;
                    key_points: string[] | null;
                };
            };
        };
        Functions: {
            get_job_questions: {
                Args: {
                    job_title_param: string;
                };
                Returns: {
                    question_id: string;
                    question: string;
                    question_type: string;
                    difficulty_level: string;
                    category: string;
                    answer_id: string;
                    answer_text: string;
                    answer_type: string;
                    key_points: string[];
                }[];
            };
            search_jobs: {
                Args: {
                    search_term: string;
                };
                Returns: {
                    job_id: string;
                    title: string;
                    category: string;
                    relevance_score: number;
                }[];
            };
        };
    };
}

// =====================================================
// APPLICATION-SPECIFIC TYPES
// =====================================================

export interface Job {
    id: string;
    title: string;
    slug: string;
    category: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface JobDescription {
    id: string;
    job_id: string;
    role_summary: string;
    responsibilities: string[] | null;
    requirements: string[] | null;
    experience_level: string | null;
    salary_range: string | null;
    location: string | null;
    is_custom: boolean;
    created_at: string;
    updated_at: string;
}

export interface InterviewQuestion {
    id: string;
    job_id: string;
    question: string;
    question_type: string;
    difficulty_level: string;
    category: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface SampleAnswer {
    id: string;
    question_id: string;
    answer_text: string;
    answer_type: string;
    key_points: string[] | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    is_pro_member: boolean;
    subscription_tier: string;
    created_at: string;
    updated_at: string;
}

export interface UserSession {
    id: string;
    user_id: string | null;
    session_token: string;
    selected_job_id: string | null;
    custom_job_description: string | null;
    created_at: string;
    expires_at: string;
}

// =====================================================
// COMPOSITE TYPES FOR UI
// =====================================================

export interface JobWithDescription extends Job {
    description: JobDescription | null;
}

export interface QuestionWithAnswer extends InterviewQuestion {
    answers: SampleAnswer[];
}

export interface JobWithQuestions extends Job {
    description: JobDescription | null;
    questions: QuestionWithAnswer[];
}

// =====================================================
// API RESPONSE TYPES
// =====================================================

export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    count: number;
    page: number;
    limit: number;
    totalPages: number;
}

// =====================================================
// FORM TYPES
// =====================================================

export interface CreateJobForm {
    title: string;
    category: string;
    role_summary: string;
    responsibilities: string[];
    requirements: string[];
    experience_level: string;
    salary_range: string;
    location: string;
}

export interface CreateQuestionForm {
    job_id: string;
    question: string;
    question_type: string;
    difficulty_level: string;
    category: string;
}

export interface CreateAnswerForm {
    question_id: string;
    answer_text: string;
    answer_type: string;
    key_points: string[];
}

// =====================================================
// ENUM TYPES
// =====================================================

export enum QuestionType {
    GENERAL = 'general',
    TECHNICAL = 'technical',
    BEHAVIORAL = 'behavioral',
    SITUATIONAL = 'situational',
}

export enum DifficultyLevel {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export enum AnswerType {
    MODEL = 'model',
    ALTERNATIVE = 'alternative',
    BEGINNER = 'beginner',
    EXPERT = 'expert',
}

export enum SubscriptionTier {
    FREE = 'free',
    PRO = 'pro',
    ENTERPRISE = 'enterprise',
}
