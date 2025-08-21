import { useCallback, useState } from 'react';
import {
    generateInterviewQuestions,
    generateSampleAnswer,
    improveJobDescription,
    generateFollowUpQuestions,
} from '../lib/openai';
import {
    GeneratedQuestion,
    GeneratedAnswer,
    FollowUpQuestion,
    AI_MODELS,
    AIModel,
} from '../types/openai';

// =====================================================
// AI Hook State Interface
// =====================================================

interface AIState {
    isLoading: boolean;
    error: string | null;
    lastGenerated: {
        questions?: GeneratedQuestion[];
        answer?: GeneratedAnswer;
        improvedDescription?: string;
        followUpQuestions?: FollowUpQuestion[];
    } | null;
}

interface AIActions {
    generateQuestions: (
        jobTitle: string,
        jobDescription: string,
        model?: AIModel
    ) => Promise<GeneratedQuestion[]>;
    generateAnswer: (
        jobTitle: string,
        question: string,
        questionType: string,
        difficultyLevel: string,
        model?: AIModel
    ) => Promise<GeneratedAnswer>;
    improveDescription: (
        jobDescription: string,
        model?: AIModel
    ) => Promise<string>;
    generateFollowUpQuestions: (
        originalQuestion: string,
        candidateAnswer: string,
        jobTitle: string,
        model?: AIModel
    ) => Promise<FollowUpQuestion[]>;
    clearError: () => void;
    reset: () => void;
}

export type UseAI = AIState & AIActions;

// =====================================================
// Custom Hook Implementation
// =====================================================

export function useAI(): UseAI {
    const [state, setState] = useState<AIState>({
        isLoading: false,
        error: null,
        lastGenerated: null,
    });

    // =====================================================
    // Utility Functions
    // =====================================================

    const setLoading = useCallback((loading: boolean) => {
        setState((prev) => ({ ...prev, isLoading: loading }));
    }, []);

    const setError = useCallback((error: string | null) => {
        setState((prev) => ({ ...prev, error, isLoading: false }));
    }, []);

    const clearError = useCallback(() => {
        setState((prev) => ({ ...prev, error: null }));
    }, []);

    const reset = useCallback(() => {
        setState({
            isLoading: false,
            error: null,
            lastGenerated: null,
        });
    }, []);

    // =====================================================
    // AI Generation Functions
    // =====================================================

    const generateQuestions = useCallback(
        async (
            jobTitle: string,
            jobDescription: string,
            model: AIModel = AI_MODELS.GPT_4_TURBO
        ): Promise<GeneratedQuestion[]> => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/ai/generate-questions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jobTitle,
                        jobDescription,
                        model,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.error || 'Failed to generate questions'
                    );
                }

                const data = await response.json();

                if (!data.success) {
                    throw new Error(
                        data.error || 'Failed to generate questions'
                    );
                }

                const questions = data.data as GeneratedQuestion[];

                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    lastGenerated: { ...prev.lastGenerated, questions },
                }));

                return questions;
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred';
                setError(errorMessage);
                throw error;
            }
        },
        []
    );

    const generateAnswer = useCallback(
        async (
            jobTitle: string,
            question: string,
            questionType: string,
            difficultyLevel: string,
            model: AIModel = AI_MODELS.GPT_4_TURBO
        ): Promise<GeneratedAnswer> => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/ai/generate-answer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jobTitle,
                        question,
                        questionType,
                        difficultyLevel,
                        model,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.error || 'Failed to generate answer'
                    );
                }

                const data = await response.json();

                if (!data.success) {
                    throw new Error(data.error || 'Failed to generate answer');
                }

                const answer = data.data as GeneratedAnswer;

                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    lastGenerated: { ...prev.lastGenerated, answer },
                }));

                return answer;
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred';
                setError(errorMessage);
                throw error;
            }
        },
        []
    );

    const improveDescription = useCallback(
        async (
            jobDescription: string,
            model: AIModel = AI_MODELS.GPT_4_TURBO
        ): Promise<string> => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/ai/improve-description', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jobDescription,
                        model,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.error || 'Failed to improve description'
                    );
                }

                const data = await response.json();

                if (!data.success) {
                    throw new Error(
                        data.error || 'Failed to improve description'
                    );
                }

                const improvedDescription = data.data
                    .improvedDescription as string;

                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    lastGenerated: {
                        ...prev.lastGenerated,
                        improvedDescription,
                    },
                }));

                return improvedDescription;
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred';
                setError(errorMessage);
                throw error;
            }
        },
        []
    );

    const generateFollowUpQuestions = useCallback(
        async (
            originalQuestion: string,
            candidateAnswer: string,
            jobTitle: string,
            model: AIModel = AI_MODELS.GPT_4_TURBO
        ): Promise<FollowUpQuestion[]> => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    '/api/ai/generate-follow-up-questions',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            originalQuestion,
                            candidateAnswer,
                            jobTitle,
                            model,
                        }),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.error ||
                            'Failed to generate follow-up questions'
                    );
                }

                const data = await response.json();

                if (!data.success) {
                    throw new Error(
                        data.error || 'Failed to generate follow-up questions'
                    );
                }

                const followUpQuestions = data.data as FollowUpQuestion[];

                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    lastGenerated: { ...prev.lastGenerated, followUpQuestions },
                }));

                return followUpQuestions;
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred';
                setError(errorMessage);
                throw error;
            }
        },
        []
    );

    // =====================================================
    // Return Hook Interface
    // =====================================================

    return {
        // State
        isLoading: state.isLoading,
        error: state.error,
        lastGenerated: state.lastGenerated,

        // Actions
        generateQuestions,
        generateAnswer,
        improveDescription,
        generateFollowUpQuestions,
        clearError,
        reset,
    };
}

// =====================================================
// Specialized Hooks for Specific Use Cases
// =====================================================

export function useQuestionGeneration() {
    const ai = useAI();

    return {
        isLoading: ai.isLoading,
        error: ai.error,
        questions: ai.lastGenerated?.questions || [],
        generateQuestions: ai.generateQuestions,
        clearError: ai.clearError,
    };
}

export function useAnswerGeneration() {
    const ai = useAI();

    return {
        isLoading: ai.isLoading,
        error: ai.error,
        answer: ai.lastGenerated?.answer,
        generateAnswer: ai.generateAnswer,
        clearError: ai.clearError,
    };
}

export function useDescriptionImprovement() {
    const ai = useAI();

    return {
        isLoading: ai.isLoading,
        error: ai.error,
        improvedDescription: ai.lastGenerated?.improvedDescription,
        improveDescription: ai.improveDescription,
        clearError: ai.clearError,
    };
}

export function useFollowUpQuestions() {
    const ai = useAI();

    return {
        isLoading: ai.isLoading,
        error: ai.error,
        followUpQuestions: ai.lastGenerated?.followUpQuestions || [],
        generateFollowUpQuestions: ai.generateFollowUpQuestions,
        clearError: ai.clearError,
    };
}
