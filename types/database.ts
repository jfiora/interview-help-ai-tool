import { GeneratedQuestion } from './openai';

// =====================================================
// Database Schema Types
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
            qa_sessions: {
                Row: {
                    id: string;
                    session_name: string;
                    job_title: string;
                    job_description: string;
                    created_at: string;
                    updated_at: string;
                    total_questions: number;
                    total_answers: number;
                    model_used: string;
                    tokens_used: number;
                    estimated_cost: number;
                };
                Insert: Omit<QASession, 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<
                    Omit<QASession, 'id' | 'created_at' | 'updated_at'>
                >;
            };
            session_questions: {
                Row: {
                    id: string;
                    session_id: string;
                    question_text: string;
                    question_type: string;
                    difficulty_level: string;
                    category: string;
                    explanation: string | null;
                    question_order: number;
                    created_at: string;
                };
                Insert: Omit<SessionQuestion, 'id' | 'created_at'>;
                Update: Partial<Omit<SessionQuestion, 'id' | 'created_at'>>;
            };
            session_answers: {
                Row: {
                    id: string;
                    question_id: string;
                    session_id: string;
                    answer_text: string;
                    answer_type: string;
                    key_points: string[];
                    tips: string | null;
                    created_at: string;
                };
                Insert: Omit<SessionAnswer, 'id' | 'created_at'>;
                Update: Partial<Omit<SessionAnswer, 'id' | 'created_at'>>;
            };
            job_description_templates: {
                Row: {
                    id: string;
                    title: string;
                    description: string;
                    industry: string | null;
                    experience_level: string | null;
                    is_public: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    JobDescriptionTemplate,
                    'id' | 'created_at' | 'updated_at'
                >;
                Update: Partial<
                    Omit<
                        JobDescriptionTemplate,
                        'id' | 'created_at' | 'updated_at'
                    >
                >;
            };
            user_preferences: {
                Row: {
                    id: string;
                    user_identifier: string;
                    preferred_model: string;
                    max_questions: number;
                    temperature: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    UserPreferences,
                    'id' | 'created_at' | 'updated_at'
                >;
                Update: Partial<
                    Omit<UserPreferences, 'id' | 'created_at' | 'updated_at'>
                >;
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
            complete_qa_sessions: {
                Row: CompleteQASession;
            };
            session_summaries: {
                Row: SessionSummary;
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
            create_qa_session: {
                Args: {
                    p_session_name: string;
                    p_job_title: string;
                    p_job_description: string;
                    p_model_used: string;
                };
                Returns: string;
            };
            add_session_questions: {
                Args: {
                    p_session_id: string;
                    p_questions: unknown;
                };
                Returns: number;
            };
            add_session_answers: {
                Args: {
                    p_session_id: string;
                    p_answers: unknown;
                };
                Returns: number;
            };
            calculate_session_cost: {
                Args: {
                    p_session_id: string;
                };
                Returns: number;
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
// Q&A Sessions and History Types
// =====================================================

export interface QASession {
    id: string;
    user_id: string;
    session_name: string;
    job_title: string;
    job_description: string;
    created_at: string;
    updated_at: string;
    total_questions: number;
    total_answers: number;
    model_used: string;
    tokens_used: number;
    estimated_cost: number;
}

export interface SessionQuestion {
    id: string;
    session_id: string;
    question_text: string;
    question_type: string;
    difficulty_level: string;
    category: string;
    explanation: string | null;
    question_order: number;
    created_at: string;
}

export interface SessionAnswer {
    id: string;
    question_id: string;
    session_id: string;
    answer_text: string;
    answer_type: string;
    key_points: string[];
    tips: string | null;
    created_at: string;
}

export interface JobDescriptionTemplate {
    id: string;
    title: string;
    description: string;
    industry: string | null;
    experience_level: string | null;
    is_public: boolean;
    created_at: string;
    updated_at: string;
}

export interface UserPreferences {
    id: string;
    user_identifier: string;
    preferred_model: string;
    max_questions: number;
    temperature: number;
    created_at: string;
    updated_at: string;
}

export interface CompleteQASession {
    session_id: string;
    session_name: string;
    job_title: string;
    job_description: string;
    created_at: string;
    total_questions: number;
    total_answers: number;
    model_used: string;
    estimated_cost: number;
    question_text: string | null;
    question_type: string | null;
    difficulty_level: string | null;
    category: string | null;
    explanation: string | null;
    question_order: number | null;
    answer_text: string | null;
    key_points: string[] | null;
    tips: string | null;
}

export interface SessionSummary {
    id: string;
    session_name: string;
    job_title: string;
    created_at: string;
    total_questions: number;
    total_answers: number;
    model_used: string;
    estimated_cost: number;
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
// API Request/Response Types
// =====================================================

export interface CreateSessionRequest {
    session_name: string;
    job_title: string;
    job_description: string;
    model_used: string;
}

export interface SaveQuestionsRequest {
    session_id: string;
    questions: GeneratedQuestion[];
}

export interface SaveAnswersRequest {
    session_id: string;
    answers: Array<{
        question_order: number;
        answer_text: string;
        answer_type: string;
        key_points: string[];
        tips?: string;
    }>;
}

export interface SessionResponse {
    success: boolean;
    data: QASession;
    message: string;
}

export interface SessionsListResponse {
    success: boolean;
    data: SessionSummary[];
    message: string;
}

export interface CompleteSessionResponse {
    success: boolean;
    data: CompleteQASession[];
    message: string;
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
