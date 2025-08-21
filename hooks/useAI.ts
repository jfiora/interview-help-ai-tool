import { useCallback, useState } from 'react';
import {
    GeneratedQuestion,
    GeneratedAnswer,
    FollowUpQuestion,
    AI_MODELS,
    AIModel,
} from '../types/openai';

// =====================================================
// Fixed Configuration
// =====================================================

const FIXED_MODEL: AIModel = AI_MODELS.GPT_4O_MINI; // Using the cheaper GPT-4o-mini model
const FIXED_TEMPERATURE = 0.7;
const FIXED_MAX_QUESTIONS = 6;

// =====================================================
// AI State Interface
// =====================================================

interface AIState {
    isLoading: boolean;
    error: string | null;
    questions: GeneratedQuestion[];
    answer: GeneratedAnswer | null;
    followUpQuestions: FollowUpQuestion[];
}

// =====================================================
// AI Actions Interface
// =====================================================

interface AIActions {
    generateQuestions: (
        jobTitle: string,
        jobDescription: string
    ) => Promise<void>;
    generateAnswer: (
        jobTitle: string,
        question: string,
        questionType: string,
        difficultyLevel: string
    ) => Promise<void>;
    improveDescription: (jobDescription: string) => Promise<void>;
    generateFollowUpQuestions: (
        originalQuestion: string,
        candidateAnswer: string,
        jobTitle: string
    ) => Promise<void>;
    clearError: () => void;
}

// =====================================================
// Main AI Hook
// =====================================================

export function useAI(): AIState & AIActions {
    const [state, setState] = useState<AIState>({
        isLoading: false,
        error: null,
        questions: [],
        answer: null,
        followUpQuestions: [],
    });

    const clearError = useCallback(() => {
        setState((prev) => ({ ...prev, error: null }));
    }, []);

    const generateQuestions = useCallback(
        async (jobTitle: string, jobDescription: string) => {
            setState((prev) => ({ ...prev, isLoading: true, error: null }));

            try {
                const response = await fetch('/api/ai/generate-questions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jobTitle,
                        jobDescription,
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

                setState((prev) => ({
                    ...prev,
                    questions: data.data,
                    isLoading: false,
                }));
            } catch (error) {
                setState((prev) => ({
                    ...prev,
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Failed to generate questions',
                    isLoading: false,
                }));
            }
        },
        []
    );

    const generateAnswer = useCallback(
        async (
            jobTitle: string,
            question: string,
            questionType: string,
            difficultyLevel: string
        ) => {
            setState((prev) => ({ ...prev, isLoading: true, error: null }));

            try {
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

                setState((prev) => ({
                    ...prev,
                    answer: data.data,
                    isLoading: false,
                }));
            } catch (error) {
                setState((prev) => ({
                    ...prev,
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Failed to generate answer',
                    isLoading: false,
                }));
            }
        },
        []
    );

    const improveDescription = useCallback(async (jobDescription: string) => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {
            const response = await fetch('/api/ai/improve-description', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobDescription,
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
                throw new Error(data.error || 'Failed to improve description');
            }

            setState((prev) => ({
                ...prev,
                isLoading: false,
            }));
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to improve description',
                isLoading: false,
            }));
        }
    }, []);

    const generateFollowUpQuestions = useCallback(
        async (
            originalQuestion: string,
            candidateAnswer: string,
            jobTitle: string
        ) => {
            setState((prev) => ({ ...prev, isLoading: true, error: null }));

            try {
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

                setState((prev) => ({
                    ...prev,
                    followUpQuestions: data.data,
                    isLoading: false,
                }));
            } catch (error) {
                setState((prev) => ({
                    ...prev,
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Failed to generate follow-up questions',
                    isLoading: false,
                }));
            }
        },
        []
    );

    return {
        ...state,
        generateQuestions,
        generateAnswer,
        improveDescription,
        generateFollowUpQuestions,
        clearError,
    };
}

// =====================================================
// Specialized Hooks
// =====================================================

export function useQuestionGeneration() {
    const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateQuestions = useCallback(
        async (jobTitle: string, jobDescription: string) => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('/api/ai/generate-questions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jobTitle,
                        jobDescription,
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

                setQuestions(data.data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Failed to generate questions'
                );
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        questions,
        isLoading,
        error,
        generateQuestions,
        clearError,
    };
}

export function useAnswerGeneration() {
    const [answer, setAnswer] = useState<GeneratedAnswer | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateAnswer = useCallback(
        async (
            jobTitle: string,
            question: string,
            questionType: string,
            difficultyLevel: string
        ) => {
            setIsLoading(true);
            setError(null);

            try {
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

                setAnswer(data.data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Failed to generate answer'
                );
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        answer,
        isLoading,
        error,
        generateAnswer,
        clearError,
    };
}

export function useDescriptionImprovement() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const improveDescription = useCallback(async (jobDescription: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/ai/improve-description', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobDescription,
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
                throw new Error(data.error || 'Failed to improve description');
            }
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to improve description'
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        isLoading,
        error,
        improveDescription,
        clearError,
    };
}

export function useFollowUpQuestions() {
    const [followUpQuestions, setFollowUpQuestions] = useState<
        FollowUpQuestion[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateFollowUpQuestions = useCallback(
        async (
            originalQuestion: string,
            candidateAnswer: string,
            jobTitle: string
        ) => {
            setIsLoading(true);
            setError(null);

            try {
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

                setFollowUpQuestions(data.data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Failed to generate follow-up questions'
                );
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        followUpQuestions,
        isLoading,
        error,
        generateFollowUpQuestions,
        clearError,
    };
}
