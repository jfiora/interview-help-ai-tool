'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSessions } from '../../../hooks/useSessions';
import { QASession } from '../../../types/database';
import Link from 'next/link';

interface SessionData {
    session: QASession;
    questions: Array<{
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
    }>;
}

export default function SessionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const sessionId = params.id as string;

    const {
        currentSession,
        isLoading,
        error,
        getSession,
        deleteSession,
        clearError,
    } = useSessions();

    const [sessionData, setSessionData] = useState<SessionData | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [jobDescriptionExpanded, setJobDescriptionExpanded] = useState(false);

    useEffect(() => {
        if (sessionId) {
            getSession(sessionId);
        }
    }, [sessionId, getSession]);

    useEffect(() => {
        if (currentSession) {
            // Fetch the complete session data
            fetch(`/api/sessions/${sessionId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        console.log('Session data:', data.data);
                        console.log(
                            'LinkedIn profile:',
                            data.data.session.linkedin_profile
                        );
                        setSessionData(data.data);
                    }
                })
                .catch((err) =>
                    console.error('Error fetching session data:', err)
                );
        }
    }, [currentSession, sessionId]);

    const handleDelete = async () => {
        if (
            confirm(
                'Are you sure you want to delete this session? This action cannot be undone.'
            )
        ) {
            setDeleting(true);
            const success = await deleteSession(sessionId);
            if (success) {
                router.push('/history');
            }
            setDeleting(false);
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

    const formatCost = (cost: number) => {
        return `$${cost.toFixed(4)}`;
    };

    if (isLoading) {
        return (
            <main className='min-h-screen bg-gray-50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                    <div className='flex flex-col items-center justify-center py-16'>
                        <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4'></div>
                        <p className='text-gray-600 text-lg'>
                            Loading session...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className='min-h-screen bg-gray-50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                    <div className='bg-red-50 border border-red-200 rounded-md p-4'>
                        <div className='flex'>
                            <div className='flex-shrink-0'>
                                <svg
                                    className='h-5 w-5 text-red-400'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </div>
                            <div className='ml-3'>
                                <h3 className='text-sm font-medium text-red-800'>
                                    Error loading session:
                                </h3>
                                <p className='mt-1 text-sm text-red-700'>
                                    {error}
                                </p>
                            </div>
                            <div className='ml-auto pl-3'>
                                <button
                                    onClick={clearError}
                                    className='bg-red-50 px-2 py-1 rounded-md text-sm font-medium text-red-800 hover:bg-red-100'
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <Link
                            href='/history'
                            className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200'
                        >
                            Back to History
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    if (!currentSession || !sessionData) {
        return (
            <main className='min-h-screen bg-gray-50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                    <div className='text-center py-16'>
                        <h3 className='text-lg font-medium text-gray-900'>
                            Session not found
                        </h3>
                        <p className='mt-1 text-gray-500'>
                            The session you're looking for doesn't exist.
                        </p>
                        <div className='mt-6'>
                            <Link
                                href='/history'
                                className='bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200'
                            >
                                Back to History
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className='min-h-screen bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Header */}
                <div className='mb-8'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <div className='flex items-center space-x-4 mb-2'>
                                <Link
                                    href='/history'
                                    className='text-gray-500 hover:text-gray-700 transition-colors duration-200'
                                >
                                    <svg
                                        className='w-5 h-5'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M15 19l-7-7 7-7'
                                        />
                                    </svg>
                                </Link>
                                <h1 className='text-3xl font-bold text-gray-900'>
                                    {sessionData.session.session_name}
                                </h1>
                            </div>
                            <p className='text-gray-600 text-lg'>
                                {sessionData.session.job_title}
                            </p>
                        </div>

                        <div className='flex items-center space-x-3'>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className='bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50'
                            >
                                {deleting ? 'Deleting...' : 'Delete Session'}
                            </button>
                            <Link
                                href='/'
                                className='bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
                            >
                                Create New Session
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Session Info */}
                <div className='bg-white rounded-lg border border-gray-200 p-6 mb-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        <div>
                            <h3 className='text-sm font-medium text-gray-500'>
                                Created
                            </h3>
                            <p className='mt-1 text-sm text-gray-900'>
                                {formatDate(sessionData.session.created_at)}
                            </p>
                        </div>
                        <div>
                            <h3 className='text-sm font-medium text-gray-500'>
                                Model Used
                            </h3>
                            <p className='mt-1 text-sm text-gray-900'>
                                {sessionData.session.model_used}
                            </p>
                        </div>
                        <div>
                            <h3 className='text-sm font-medium text-gray-500'>
                                Questions
                            </h3>
                            <p className='mt-1 text-sm text-gray-900'>
                                {sessionData.session.total_questions}
                            </p>
                        </div>
                        <div>
                            <h3 className='text-sm font-medium text-gray-500'>
                                Estimated Cost
                            </h3>
                            <p className='mt-1 text-sm text-gray-900'>
                                {formatCost(sessionData.session.estimated_cost)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Job Description */}
                <div className='bg-white rounded-lg border border-gray-200 p-6 mb-8'>
                    <div className='flex items-center justify-between mb-3'>
                        <h2 className='text-lg font-semibold text-gray-900'>
                            Job Description
                        </h2>
                        <button
                            onClick={() =>
                                setJobDescriptionExpanded(
                                    !jobDescriptionExpanded
                                )
                            }
                            className='text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center'
                        >
                            {jobDescriptionExpanded ? 'Collapse' : 'Expand'}
                            <svg
                                className={`w-4 h-4 ml-1 transform transition-transform ${
                                    jobDescriptionExpanded ? 'rotate-180' : ''
                                }`}
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M19 9l-7 7-7-7'
                                />
                            </svg>
                        </button>
                    </div>
                    <div className='bg-gray-50 rounded-md p-4'>
                        <p
                            className={`text-gray-700 text-sm whitespace-pre-line ${
                                !jobDescriptionExpanded &&
                                sessionData.session.job_description.length > 500
                                    ? 'line-clamp-6'
                                    : ''
                            }`}
                        >
                            {jobDescriptionExpanded
                                ? sessionData.session.job_description
                                : sessionData.session.job_description.length >
                                  500
                                ? sessionData.session.job_description.substring(
                                      0,
                                      500
                                  ) + '...'
                                : sessionData.session.job_description}
                        </p>
                    </div>
                </div>

                {/* LinkedIn Profile Optimization */}
                {sessionData.session.linkedin_profile && (
                    <div className='bg-white rounded-lg border border-gray-200 p-6 mb-8'>
                        <h2 className='text-xl font-semibold text-gray-900 mb-4 flex items-center'>
                            💼 LinkedIn Profile Optimization
                        </h2>
                        {(() => {
                            try {
                                const profileData = JSON.parse(
                                    sessionData.session.linkedin_profile
                                );
                                return (
                                    <div className='space-y-4'>
                                        {/* LinkedIn Headline */}
                                        <div>
                                            <h3 className='text-sm font-medium text-gray-700 mb-2'>
                                                LinkedIn Headline
                                            </h3>
                                            <div className='bg-blue-50 border border-blue-200 rounded-md p-4'>
                                                <p className='text-blue-900 font-medium'>
                                                    {profileData.linkedinHeadline ||
                                                        'No headline available'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* LinkedIn About */}
                                        <div>
                                            <h3 className='text-sm font-medium text-gray-700 mb-2'>
                                                LinkedIn About Section
                                            </h3>
                                            <div className='bg-green-50 border border-green-200 rounded-md p-4'>
                                                <p className='text-green-900 whitespace-pre-line'>
                                                    {profileData.linkedinAbout ||
                                                        'No about section available'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Copy Buttons */}
                                        <div className='flex gap-3 pt-2'>
                                            <button
                                                onClick={() =>
                                                    navigator.clipboard.writeText(
                                                        profileData.linkedinHeadline ||
                                                            ''
                                                    )
                                                }
                                                className='bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200'
                                            >
                                                Copy Headline
                                            </button>
                                            <button
                                                onClick={() =>
                                                    navigator.clipboard.writeText(
                                                        profileData.linkedinAbout ||
                                                            ''
                                                    )
                                                }
                                                className='bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200'
                                            >
                                                Copy About Section
                                            </button>
                                        </div>
                                    </div>
                                );
                            } catch (error) {
                                console.error(
                                    'Error parsing LinkedIn profile:',
                                    error
                                );
                                console.log(
                                    'Raw LinkedIn profile data:',
                                    sessionData.session.linkedin_profile
                                );
                                return (
                                    <div className='text-gray-500 text-center py-4'>
                                        <p>
                                            LinkedIn profile data is not
                                            available in the expected format.
                                        </p>
                                        <p className='text-xs mt-2'>
                                            Check console for debugging
                                            information.
                                        </p>
                                    </div>
                                );
                            }
                        })()}
                    </div>
                )}

                {/* Debug info - remove in production */}
                {!sessionData.session.linkedin_profile && (
                    <div className='bg-yellow-50 border border-yellow-200 p-4 mb-8 rounded-md'>
                        <p className='text-yellow-800 text-sm'>
                            <strong>Debug:</strong> No LinkedIn profile data
                            found for this session.
                        </p>
                    </div>
                )}

                {/* Questions and Answers */}
                <div className='space-y-6'>
                    <h2 className='text-xl font-semibold text-gray-900'>
                        Interview Questions & Answers
                    </h2>

                    {sessionData.questions.map((item, index) => (
                        <div
                            key={index}
                            className='bg-white rounded-lg border border-gray-200 p-6'
                        >
                            {/* Question */}
                            <div className='mb-4'>
                                <div className='flex items-start space-x-3'>
                                    <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                                        <span className='text-blue-600 font-medium text-sm'>
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className='flex-1'>
                                        <div className='bg-blue-50 rounded-lg p-4'>
                                            <div className='flex items-center justify-between mb-2'>
                                                <p className='text-gray-900 font-medium'>
                                                    Interviewer
                                                </p>
                                                <div className='flex gap-2'>
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full ${
                                                            item.question_type ===
                                                            'technical'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : item.question_type ===
                                                                  'behavioral'
                                                                ? 'bg-green-100 text-green-800'
                                                                : item.question_type ===
                                                                  'situational'
                                                                ? 'bg-purple-100 text-purple-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                    >
                                                        {item.question_type}
                                                    </span>
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full ${
                                                            item.difficulty_level ===
                                                            'easy'
                                                                ? 'bg-green-100 text-green-800'
                                                                : item.difficulty_level ===
                                                                  'medium'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                        {item.difficulty_level}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className='text-gray-700'>
                                                {item.question_text}
                                            </p>
                                            {item.explanation && (
                                                <div className='mt-3 pt-3 border-t border-blue-200'>
                                                    <p className='text-xs text-gray-600'>
                                                        <span className='font-medium'>
                                                            Category:
                                                        </span>{' '}
                                                        {item.category}
                                                    </p>
                                                    <p className='text-xs text-gray-600 mt-1'>
                                                        {item.explanation}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Answer */}
                            {item.answer && (
                                <div className='ml-11'>
                                    <div className='mt-4 p-4 bg-green-50 rounded-lg border border-green-200'>
                                        <h4 className='font-medium text-green-800 mb-2'>
                                            Sample Answer
                                        </h4>
                                        <div className='prose prose-sm max-w-none'>
                                            <p className='text-green-700 whitespace-pre-line mb-3'>
                                                {item.answer.answer_text}
                                            </p>

                                            {item.answer.key_points &&
                                                item.answer.key_points.length >
                                                    0 && (
                                                    <div className='mb-3'>
                                                        <h5 className='text-sm font-medium text-green-800 mb-2'>
                                                            Key Points:
                                                        </h5>
                                                        <ul className='list-disc list-inside space-y-1'>
                                                            {item.answer.key_points.map(
                                                                (
                                                                    point,
                                                                    pointIndex
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

                                            {item.answer.tips && (
                                                <div className='bg-white rounded p-3 border border-green-200'>
                                                    <h5 className='text-sm font-medium text-green-800 mb-1'>
                                                        Tips:
                                                    </h5>
                                                    <p className='text-sm text-green-700'>
                                                        {item.answer.tips}
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
            </div>
        </main>
    );
}
