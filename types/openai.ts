// =====================================================
// OpenAI Types and Interfaces
// =====================================================

export interface GeneratedQuestion {
    question: string;
    question_type: 'technical' | 'behavioral' | 'situational' | 'general';
    difficulty_level: 'easy' | 'medium' | 'hard';
    category: string;
    explanation: string;
}

export interface GeneratedAnswer {
    answer_text: string;
    answer_type: string;
    key_points: string[];
    tips?: string;
}

export interface JobDescriptionImprovement {
    original_length: number;
    improved_length: number;
    improved_description: string;
}

export interface FollowUpQuestion {
    question: string;
    reasoning: string;
    difficulty_level: 'easy' | 'medium' | 'hard';
}

// =====================================================
// AI Models Configuration
// =====================================================

export const AI_MODELS = {
    GPT_4: 'gpt-4',
    GPT_4_TURBO: 'gpt-4-turbo-preview',
    GPT_3_5_TURBO: 'gpt-3.5-turbo',
} as const;

export type AIModel = (typeof AI_MODELS)[keyof typeof AI_MODELS];
