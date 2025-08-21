import { useState, useCallback } from 'react';
import {
    QASession,
    SessionSummary,
    CreateSessionRequest,
    SaveQuestionsRequest,
    SaveAnswersRequest,
} from '../types/database';
import { GeneratedQuestion, GeneratedAnswer } from '../types/openai';

interface SessionsState {
    isLoading: boolean;
    error: string | null;
    sessions: SessionSummary[];
    currentSession: QASession | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

interface SessionsActions {
    createSession: (data: CreateSessionRequest) => Promise<QASession | null>;
    saveQuestions: (
        sessionId: string,
        questions: GeneratedQuestion[]
    ) => Promise<boolean>;
    saveAnswers: (
        sessionId: string,
        answers: GeneratedAnswer[]
    ) => Promise<boolean>;
    listSessions: (page?: number, limit?: number) => Promise<void>;
    getSession: (sessionId: string) => Promise<void>;
    deleteSession: (sessionId: string) => Promise<boolean>;
    clearError: () => void;
}

export function useSessions(): SessionsState & SessionsActions {
    const [state, setState] = useState<SessionsState>({
        isLoading: false,
        error: null,
        sessions: [],
        currentSession: null,
        pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
        },
    });

    const clearError = useCallback(() => {
        setState((prev) => ({ ...prev, error: null }));
    }, []);

    const createSession = useCallback(
        async (data: CreateSessionRequest): Promise<QASession | null> => {
            setState((prev) => ({ ...prev, isLoading: true, error: null }));

            try {
                const response = await fetch('/api/sessions/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.error || 'Failed to create session'
                    );
                }

                const result = await response.json();

                if (!result.success) {
                    throw new Error(result.error || 'Failed to create session');
                }

                setState((prev) => ({ ...prev, isLoading: false }));
                return result.data;
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'Failed to create session';
                setState((prev) => ({
                    ...prev,
                    error: errorMessage,
                    isLoading: false,
                }));
                return null;
            }
        },
        []
    );

    const saveQuestions = useCallback(
        async (
            sessionId: string,
            questions: GeneratedQuestion[]
        ): Promise<boolean> => {
            try {
                const response = await fetch('/api/sessions/save-questions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        session_id: sessionId,
                        questions: questions,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.error || 'Failed to save questions'
                    );
                }

                const result = await response.json();
                return result.success;
            } catch (error) {
                console.error('Error saving questions:', error);
                return false;
            }
        },
        []
    );

    const saveAnswers = useCallback(
        async (
            sessionId: string,
            answers: GeneratedAnswer[]
        ): Promise<boolean> => {
            try {
                // Transform answers to include question_order
                const answersWithOrder = answers.map((answer, index) => ({
                    question_order: index + 1,
                    answer_text: answer.answer_text,
                    answer_type: answer.answer_type,
                    key_points: answer.key_points,
                    tips: answer.tips,
                }));

                const response = await fetch('/api/sessions/save-answers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        session_id: sessionId,
                        answers: answersWithOrder,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.error || 'Failed to save answers'
                    );
                }

                const result = await response.json();
                return result.success;
            } catch (error) {
                console.error('Error saving answers:', error);
                return false;
            }
        },
        []
    );

    const listSessions = useCallback(
        async (page: number = 1, limit: number = 10) => {
            setState((prev) => ({ ...prev, isLoading: true, error: null }));

            try {
                const response = await fetch(
                    `/api/sessions/list?page=${page}&limit=${limit}`
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.error || 'Failed to fetch sessions'
                    );
                }

                const result = await response.json();

                if (!result.success) {
                    throw new Error(result.error || 'Failed to fetch sessions');
                }

                setState((prev) => ({
                    ...prev,
                    sessions: result.data,
                    pagination: result.pagination,
                    isLoading: false,
                }));
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'Failed to fetch sessions';
                setState((prev) => ({
                    ...prev,
                    error: errorMessage,
                    isLoading: false,
                }));
            }
        },
        []
    );

    const getSession = useCallback(async (sessionId: string) => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {
            const response = await fetch(`/api/sessions/${sessionId}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch session');
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Failed to fetch session');
            }

            setState((prev) => ({
                ...prev,
                currentSession: result.data.session,
                isLoading: false,
            }));
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Failed to fetch session';
            setState((prev) => ({
                ...prev,
                error: errorMessage,
                isLoading: false,
            }));
        }
    }, []);

    const deleteSession = useCallback(
        async (sessionId: string): Promise<boolean> => {
            try {
                const response = await fetch(`/api/sessions/${sessionId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.error || 'Failed to delete session'
                    );
                }

                const result = await response.json();

                if (result.success) {
                    // Remove from local state
                    setState((prev) => ({
                        ...prev,
                        sessions: prev.sessions.filter(
                            (s) => s.id !== sessionId
                        ),
                        currentSession:
                            prev.currentSession?.id === sessionId
                                ? null
                                : prev.currentSession,
                    }));
                }

                return result.success;
            } catch (error) {
                console.error('Error deleting session:', error);
                return false;
            }
        },
        []
    );

    return {
        ...state,
        createSession,
        saveQuestions,
        saveAnswers,
        listSessions,
        getSession,
        deleteSession,
        clearError,
    };
}
