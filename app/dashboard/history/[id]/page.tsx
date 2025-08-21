'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSessions } from '../../../../hooks/useSessions';
import {
    ArrowLeft,
    Calendar,
    MessageSquare,
    Clock,
    Trash2,
} from 'lucide-react';
import Link from 'next/link';

interface SessionQuestion {
    question_text: string;
    question_type: string;
    difficulty_level: string;
    category: string;
    explanation: string | null;
    answer: {
        answer_text: string;
        key_points: string[];
        tips: string | null;
    } | null;
}

interface SessionData {
    session: {
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
    questions: SessionQuestion[];
}

export default function SessionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const sessionId = params.id as string;

    const { currentSession, getSession, deleteSession } = useSessions();
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [sessionData, setSessionData] = useState<SessionData | null>(null);

    useEffect(() => {
        if (sessionId) {
            getSession(sessionId);
        }
    }, [sessionId, getSession]);

    useEffect(() => {
        if (currentSession) {
            // The currentSession now contains the complete structured data from the API
            // which includes both session metadata and questions array
            if (
                currentSession &&
                typeof currentSession === 'object' &&
                'session' in currentSession &&
                'questions' in currentSession
            ) {
                setSessionData(currentSession as SessionData);
            }
            setIsLoading(false);
        }
    }, [currentSession]);

    const handleDeleteSession = async () => {
        if (
            confirm(
                'Are you sure you want to delete this session? This action cannot be undone.'
            )
        ) {
            setIsDeleting(true);
            const success = await deleteSession(sessionId);
            if (success) {
                router.push('/dashboard/history');
            }
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (isLoading) {
        return (
            <div className='flex flex-col items-center justify-center py-16'>
                <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4'></div>
                <p className='text-gray-600 text-lg'>Loading session...</p>
            </div>
        );
    }

    if (!sessionData) {
        return (
            <div className='text-center py-16'>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    Session Not Found
                </h2>
                <p className='text-gray-600 mb-6'>
                    The session you're looking for doesn't exist or has been
                    deleted.
                </p>
                <Link
                    href='/dashboard/history'
                    className='bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
                >
                    Back to History
                </Link>
            </div>
        );
    }

    const { session, questions } = sessionData;

    return (
        <div className='space-y-8'>
            {/* Header */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <div className='flex items-center space-x-3 mb-2'>
                            <Link
                                href='/dashboard/history'
                                className='text-gray-500 hover:text-gray-700 transition-colors duration-200'
                            >
                                <ArrowLeft className='w-5 h-5' />
                            </Link>
                            <h1 className='text-3xl font-bold text-gray-900'>
                                {session.session_name}
                            </h1>
                        </div>
                        <p className='text-gray-600 text-lg'>
                            {session.job_title}
                        </p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <button
                            onClick={handleDeleteSession}
                            disabled={isDeleting}
                            className='bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center'
                        >
                            <Trash2 className='w-4 h-4 mr-2' />
                            {isDeleting ? 'Deleting...' : 'Delete Session'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Session Info */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                    Session Information
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='flex items-center space-x-3'>
                        <Calendar className='w-5 h-5 text-gray-500' />
                        <div>
                            <p className='text-sm font-medium text-gray-700'>
                                Created
                            </p>
                            <p className='text-sm text-gray-600'>
                                {formatDate(session.created_at)}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <MessageSquare className='w-5 h-5 text-gray-500' />
                        <div>
                            <p className='text-sm font-medium text-gray-700'>
                                Questions
                            </p>
                            <p className='text-sm text-gray-600'>
                                {session.total_questions}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <Clock className='w-5 h-5 text-gray-500' />
                        <div>
                            <p className='text-sm font-medium text-gray-700'>
                                Answers
                            </p>
                            <p className='text-sm text-gray-600'>
                                {session.total_answers}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Description */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                    Job Description
                </h2>
                <div className='bg-gray-50 rounded-md p-4'>
                    <p className='text-gray-700 whitespace-pre-line'>
                        {session.job_description}
                    </p>
                </div>
            </div>

            {/* Questions and Answers */}
            {questions && questions.length > 0 ? (
                <div className='space-y-6'>
                    <h2 className='text-xl font-semibold text-gray-900'>
                        Questions & Answers
                    </h2>
                    {questions.map((question, index) => (
                        <div
                            key={index}
                            className='bg-white rounded-lg border border-gray-200 overflow-hidden'
                        >
                            {/* Question */}
                            <div className='bg-blue-50 border-b border-blue-200 p-4'>
                                <div className='flex items-start space-x-3'>
                                    <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                                        <span className='text-blue-600 font-medium text-sm'>
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className='flex-1'>
                                        <div className='flex items-center justify-between mb-2'>
                                            <p className='text-gray-900 font-medium'>
                                                Interviewer
                                            </p>
                                            <div className='flex gap-2'>
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full ${
                                                        question.question_type ===
                                                        'technical'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : question.question_type ===
                                                              'behavioral'
                                                            ? 'bg-green-100 text-green-800'
                                                            : question.question_type ===
                                                              'situational'
                                                            ? 'bg-purple-100 text-purple-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}
                                                >
                                                    {question.question_type}
                                                </span>
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full ${
                                                        question.difficulty_level ===
                                                        'easy'
                                                            ? 'bg-green-100 text-green-800'
                                                            : question.difficulty_level ===
                                                              'medium'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {question.difficulty_level}
                                                </span>
                                            </div>
                                        </div>
                                        <p className='text-gray-700'>
                                            {question.question_text}
                                        </p>
                                        <div className='mt-3 pt-3 border-t border-blue-200'>
                                            <p className='text-xs text-gray-600'>
                                                <span className='font-medium'>
                                                    Category:
                                                </span>{' '}
                                                {question.category}
                                            </p>
                                            {question.explanation && (
                                                <p className='text-xs text-gray-600 mt-1'>
                                                    {question.explanation}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Answer */}
                            {question.answer && (
                                <div className='p-4'>
                                    <div className='bg-green-50 rounded-lg border border-green-200 p-4'>
                                        <h4 className='font-medium text-green-800 mb-2'>
                                            Sample Answer
                                        </h4>
                                        <div className='prose prose-sm max-w-none'>
                                            <p className='text-green-700 whitespace-pre-line mb-3'>
                                                {question.answer.answer_text}
                                            </p>

                                            {question.answer.key_points &&
                                                question.answer.key_points
                                                    .length > 0 && (
                                                    <div className='mb-3'>
                                                        <h5 className='text-sm font-medium text-green-800 mb-2'>
                                                            Key Points:
                                                        </h5>
                                                        <ul className='list-disc list-inside space-y-1'>
                                                            {question.answer.key_points.map(
                                                                (
                                                                    point: string,
                                                                    pointIndex: number
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            pointIndex
                                                                        }
                                                                        className='text-sm text-green-700'
                                                                    >
                                                                        {point}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}

                                            {question.answer.tips && (
                                                <div className='bg-white rounded p-3 border border-green-200'>
                                                    <h5 className='text-sm font-medium text-green-800 mb-1'>
                                                        Tips:
                                                    </h5>
                                                    <p className='text-sm text-green-700'>
                                                        {question.answer.tips}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className='bg-white rounded-lg border border-gray-200 p-12 text-center'>
                    <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <MessageSquare className='w-8 h-8 text-gray-400' />
                    </div>
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                        No Questions Available
                    </h3>
                    <p className='text-gray-500 mb-6'>
                        This session doesn't have any questions or answers yet.
                    </p>
                </div>
            )}

            {/* Back Button */}
            <div className='flex justify-center'>
                <Link
                    href='/dashboard/history'
                    className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200'
                >
                    Back to History
                </Link>
            </div>
        </div>
    );
}
