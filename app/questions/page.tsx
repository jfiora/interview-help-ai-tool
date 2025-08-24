'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { useQuestionGeneration } from '../../hooks/useAI';
import { useSessions } from '../../hooks/useSessions';
import { GeneratedQuestion, GeneratedAnswer } from '../../types/openai';
import Link from 'next/link';

function QuestionsPageContent() {
    const searchParams = useSearchParams();
    const jobTitle = searchParams.get('job') || 'Human Resources Specialist';
    const jobDescription = searchParams.get('description') || '';

    const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
    const [answers, setAnswers] = useState<Record<string, GeneratedAnswer>>({});
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [hasGeneratedQuestions, setHasGeneratedQuestions] = useState(false);

    const [sessionSaved, setSessionSaved] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [linkedinProfile, setLinkedinProfile] = useState<{
        linkedinAbout: string;
        linkedinHeadline: string;
    } | null>(null);

    const {
        questions: generatedQuestions,
        isLoading: isGenerating,
        error,
        generateQuestions,
        clearQuestions,
        clearError,
    } = useQuestionGeneration();

    const { createSession, saveQuestions, saveAnswers } = useSessions();

    // Track total questions generated in this session
    const [totalQuestionsGenerated, setTotalQuestionsGenerated] = useState(0);
    const MAX_QUESTIONS = 20;

    useEffect(() => {
        if (jobTitle && jobDescription) {
            handleGenerateQuestions();
        } else {
            setIsInitialLoading(false);
        }
    }, [jobTitle, jobDescription]);

    useEffect(() => {
        const initializeSession = async () => {
            if (generatedQuestions.length > 0 && !hasGeneratedQuestions) {
                setQuestions(generatedQuestions);
                setTotalQuestionsGenerated(generatedQuestions.length);
                setHasGeneratedQuestions(true);
                setIsInitialLoading(false);

                // Extract answers from questions that already have them
                const answersMap: Record<string, GeneratedAnswer> = {};
                generatedQuestions.forEach((question, index) => {
                    if (question.answer) {
                        const questionId = `question-${index}`;
                        answersMap[questionId] = question.answer;
                    }
                });
                setAnswers(answersMap);

                // Generate LinkedIn profile and wait for it to complete
                await generateLinkedinProfile();
            }
        };

        initializeSession();
    }, [generatedQuestions, hasGeneratedQuestions]);

    // Handle additional questions being generated
    useEffect(() => {
        if (generatedQuestions.length > 0 && hasGeneratedQuestions) {
            // Calculate how many new questions were added
            const newQuestionsCount =
                generatedQuestions.length - questions.length;
            if (newQuestionsCount > 0) {
                // Update the questions state with all questions
                setQuestions(generatedQuestions);
                // Update total count
                setTotalQuestionsGenerated((prev) => prev + newQuestionsCount);

                // Extract answers from new questions that already have them
                const newQuestions = generatedQuestions.slice(
                    -newQuestionsCount
                );
                const newAnswers: Record<string, GeneratedAnswer> = {};

                newQuestions.forEach((question, index) => {
                    if (question.answer) {
                        const questionId = `question-${
                            questions.length + index
                        }`;
                        newAnswers[questionId] = question.answer;
                    }
                });

                // Update answers state with new answers
                setAnswers((prevAnswers) => ({
                    ...prevAnswers,
                    ...newAnswers,
                }));
            }
        }
    }, [generatedQuestions, hasGeneratedQuestions, questions.length]);

    const handleGenerateQuestions = async () => {
        try {
            setIsInitialLoading(true);
            clearError();

            if (!jobTitle || !jobDescription) {
                throw new Error('Job title and description are required');
            }

            await generateQuestions(jobTitle, jobDescription, false);
        } catch (error) {
            console.error('Failed to generate questions:', error);
            setIsInitialLoading(false);
        }
    };

    const handleGenerateMoreQuestions = async () => {
        try {
            clearError();

            // Check if we've reached the maximum number of questions
            if (totalQuestionsGenerated >= MAX_QUESTIONS) {
                alert(
                    `You've already generated ${MAX_QUESTIONS} questions! This is the maximum allowed per session. Please save your session to preserve all your questions and answers, or start a new session for more questions.`
                );
                return;
            }

            // Generate more questions (this will append to existing ones)
            await generateQuestions(jobTitle, jobDescription, true);
        } catch (error) {
            console.error('Failed to generate more questions:', error);
        }
    };

    const handleClearError = () => {
        clearError();
    };

    const handleSaveSession = async () => {
        if (questions.length === 0) {
            alert(
                'No questions to save. Please generate some questions first.'
            );
            return;
        }

        if (sessionSaved) {
            alert('Session already saved!');
            return;
        }

        // All questions should already have answers since they're generated together
        // Just save the current session with existing answers
        await saveSessionToDatabase(questions, Object.values(answers));
    };

    const generateLinkedinProfile = async () => {
        if (!jobTitle || !jobDescription) return;

        try {
            const response = await fetch('/api/ai/generate-linkedin-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobTitle,
                    jobDescription,
                    userEmail: 'user@example.com', // TODO: Get from user profile
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate LinkedIn profile');
            }

            const result = await response.json();
            if (result.success) {
                setLinkedinProfile(result.data);
            }
        } catch (error) {
            console.error('Failed to generate LinkedIn profile:', error);
        }
    };

    const saveSessionToDatabase = async (
        questionsList: GeneratedQuestion[],
        answersList: GeneratedAnswer[]
    ) => {
        try {
            // Create session
            const sessionName = `${jobTitle} - ${new Date().toLocaleDateString()}`;
            const session = await createSession({
                session_name: sessionName,
                job_title: jobTitle,
                job_description: jobDescription,
                model_used: 'gpt-4o-mini',
                linkedin_profile: linkedinProfile
                    ? JSON.stringify(linkedinProfile)
                    : null,
            });

            if (session) {
                setSessionId(session.id);

                // Save questions
                await saveQuestions(session.id, questionsList);

                // Save answers
                await saveAnswers(session.id, answersList);

                setSessionSaved(true);
            }
        } catch (error) {
            console.error('Failed to save session to database:', error);
        }
    };

    const renderLoadingState = () => (
        <div className='flex flex-col items-center justify-center py-16'>
            <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4'></div>
            <p className='text-gray-600 text-lg'>
                Generating interview questions...
            </p>
            <p className='text-sm text-gray-500 mt-2'>
                This may take a few moments
            </p>
        </div>
    );

    const renderErrorState = () => {
        return (
            <div className='bg-red-50 border border-red-200 rounded-md p-4 mb-8'>
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
                            Error generating questions:
                        </h3>
                        <p className='mt-1 text-sm text-red-700'>{error}</p>
                    </div>
                </div>
                <div className='mt-4'>
                    <div className='-mx-2 -my-1.5 flex'>
                        <button
                            onClick={handleGenerateQuestions}
                            type='button'
                            className='bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600'
                        >
                            Retry
                        </button>
                        <button
                            onClick={handleClearError}
                            type='button'
                            className='ml-3 bg-gray-50 px-2 py-1.5 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600'
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <main className='min-h-screen bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Header */}
                <div className='mb-8'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-900'>
                                Interview Questions & Answers
                            </h1>
                            <p className='mt-2 text-gray-600'>
                                Generated for:{' '}
                                <span className='font-medium'>{jobTitle}</span>
                            </p>
                        </div>
                        <div className='flex items-center space-x-3'>
                            <Link
                                href='/history'
                                className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200'
                            >
                                View History
                            </Link>
                            <Link
                                href='/'
                                className='bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
                            >
                                Create New
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Session Saved Notification */}
                {sessionSaved && sessionId && (
                    <div className='bg-green-50 border border-green-200 rounded-md p-4 mb-8'>
                        <div className='flex'>
                            <div className='flex-shrink-0'>
                                <svg
                                    className='h-5 w-5 text-green-400'
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
                                <h3 className='text-sm font-medium text-green-800'>
                                    Session saved successfully!
                                </h3>
                                <p className='mt-1 text-sm text-green-700'>
                                    Your Q&A session has been saved to the
                                    database.
                                </p>
                            </div>
                            <div className='ml-auto pl-3'>
                                <Link
                                    href={`/history/${sessionId}`}
                                    className='bg-green-50 px-2 py-1 rounded-md text-sm font-medium text-green-800 hover:bg-green-100'
                                >
                                    View Session
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Job Description Summary */}
                <div className='bg-white rounded-lg border border-gray-200 p-6 mb-8'>
                    <h2 className='text-lg font-semibold text-gray-900 mb-3'>
                        Job Description Summary
                    </h2>
                    <div className='bg-gray-50 rounded-md p-4'>
                        <p className='text-gray-700 text-sm whitespace-pre-line'>
                            {jobDescription.substring(0, 300)}
                            {jobDescription.length > 300 ? '...' : ''}
                        </p>
                    </div>
                </div>

                {/* LinkedIn Profile Optimization */}
                <div className='bg-white rounded-lg border border-gray-200 p-6 mb-8'>
                    <h2 className='text-lg font-semibold text-gray-900 mb-4'>
                        💼 LinkedIn Profile Optimization
                    </h2>

                    {linkedinProfile ? (
                        <div className='space-y-4'>
                            {/* LinkedIn Headline */}
                            <div>
                                <h3 className='text-sm font-medium text-gray-700 mb-2'>
                                    LinkedIn Headline
                                </h3>
                                <div className='bg-blue-50 border border-blue-200 rounded-md p-4'>
                                    <p className='text-blue-900 font-medium'>
                                        {linkedinProfile.linkedinHeadline}
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
                                        {linkedinProfile.linkedinAbout}
                                    </p>
                                </div>
                            </div>

                            {/* Copy Buttons */}
                            <div className='flex gap-3 pt-2'>
                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            linkedinProfile.linkedinHeadline
                                        )
                                    }
                                    className='bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200'
                                >
                                    Copy Headline
                                </button>
                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            linkedinProfile.linkedinAbout
                                        )
                                    }
                                    className='bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200'
                                >
                                    Copy About Section
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='text-center py-8 text-gray-500'>
                            <p className='mb-3'>
                                LinkedIn profile optimization is being generated
                                automatically...
                            </p>
                            <p className='text-sm'>
                                This will create a professional headline and
                                about section based on your job description.
                            </p>
                        </div>
                    )}
                </div>

                {/* Interview Questions */}
                <div className='space-y-6'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xl font-semibold text-gray-900'>
                            Interview Questions & Sample Answers
                        </h2>
                        <div className='flex items-center space-x-3'>
                            <span className='text-sm text-gray-600'>
                                {totalQuestionsGenerated} of {MAX_QUESTIONS}{' '}
                                questions generated
                            </span>
                            {totalQuestionsGenerated >= MAX_QUESTIONS && (
                                <span className='bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium'>
                                    Limit Reached
                                </span>
                            )}
                            {totalQuestionsGenerated >= MAX_QUESTIONS - 5 &&
                                totalQuestionsGenerated < MAX_QUESTIONS && (
                                    <span className='bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium'>
                                        {MAX_QUESTIONS -
                                            totalQuestionsGenerated}{' '}
                                        remaining
                                    </span>
                                )}
                        </div>
                    </div>

                    {isInitialLoading ? (
                        renderLoadingState()
                    ) : error ? (
                        renderErrorState()
                    ) : questions.length === 0 ? (
                        <div className='text-center py-16 text-gray-600'>
                            <p>
                                No questions generated yet. Please go back and
                                generate questions.
                            </p>
                            <Link
                                href='/'
                                className='mt-4 inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
                            >
                                Go to Home Page
                            </Link>
                        </div>
                    ) : (
                        questions.map((question, index) => {
                            const questionId = `question-${index}`;
                            const answer = answers[questionId];

                            return (
                                <div
                                    key={index}
                                    className='bg-white rounded-lg border border-gray-200 p-6'
                                >
                                    {/* Question */}
                                    <div className='mb-4'>
                                        <div className='flex items-start space-x-3'>
                                            <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                                                <svg
                                                    className='w-4 h-4 text-blue-600'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    viewBox='0 0 24 24'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        strokeWidth={2}
                                                        d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0 18 0z'
                                                    />
                                                </svg>
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
                                                                {
                                                                    question.question_type
                                                                }
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
                                                                {
                                                                    question.difficulty_level
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className='text-gray-700'>
                                                        {question.question}
                                                    </p>
                                                    <div className='mt-3 pt-3 border-t border-blue-200'>
                                                        <p className='text-xs text-gray-600'>
                                                            <span className='font-medium'>
                                                                Category:
                                                            </span>{' '}
                                                            {question.category}
                                                        </p>
                                                        <p className='text-xs text-gray-600 mt-1'>
                                                            {
                                                                question.explanation
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Answer */}
                                    <div className='ml-11'>
                                        {answer ? (
                                            <div className='mt-4 p-4 bg-green-50 rounded-lg border border-green-200'>
                                                <h4 className='font-medium text-green-800 mb-2'>
                                                    Sample Answer
                                                </h4>
                                                <div className='prose prose-sm max-w-none'>
                                                    <p className='text-green-700 whitespace-pre-line mb-3'>
                                                        {answer.answer_text}
                                                    </p>

                                                    {answer.key_points &&
                                                        answer.key_points
                                                            .length > 0 && (
                                                            <div className='mb-3'>
                                                                <h5 className='text-sm font-medium text-green-800 mb-2'>
                                                                    Key Points:
                                                                </h5>
                                                                <ul className='list-disc list-inside space-y-1'>
                                                                    {answer.key_points.map(
                                                                        (
                                                                            point: string,
                                                                            index: number
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className='text-sm text-green-700'
                                                                            >
                                                                                {
                                                                                    point
                                                                                }
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    {answer.tips && (
                                                        <div className='bg-white rounded p-3 border border-green-200'>
                                                            <h5 className='text-sm font-medium text-green-800 mb-1'>
                                                                Tips:
                                                            </h5>
                                                            <p className='text-sm text-green-700'>
                                                                {answer.tips}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200'>
                                                <div className='flex items-center justify-center'>
                                                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2'></div>
                                                    <span className='text-sm text-gray-600'>
                                                        Generating answer...
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Action Buttons */}
                <div className='mt-8 flex justify-center space-x-4'>
                    <button
                        onClick={handleGenerateMoreQuestions}
                        disabled={
                            isGenerating ||
                            totalQuestionsGenerated >= MAX_QUESTIONS
                        }
                        className={`font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center ${
                            totalQuestionsGenerated >= MAX_QUESTIONS
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-primary hover:bg-primary/90 text-white'
                        }`}
                    >
                        {isGenerating ? (
                            <>
                                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3'></div>
                                Generating...
                            </>
                        ) : totalQuestionsGenerated >= MAX_QUESTIONS ? (
                            <>
                                <svg
                                    className='w-5 h-5 mr-3'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M5 13l4 4L19 7'
                                    />
                                </svg>
                                All Questions Generated ({MAX_QUESTIONS}/
                                {MAX_QUESTIONS})
                            </>
                        ) : (
                            <>
                                Generate More Questions (
                                {totalQuestionsGenerated}/{MAX_QUESTIONS})
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleSaveSession}
                        className='bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center'
                    >
                        <svg
                            className='w-5 h-5 mr-3'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M5 13l4 4L19 7'
                            />
                        </svg>
                        Save Session
                    </button>
                    <button className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200'>
                        Download Questions
                    </button>
                </div>

                {/* Helpful Tips */}
                <div className='mt-4 text-center'>
                    <div className='bg-blue-50 border border-blue-200 rounded-md p-3'>
                        <p className='text-sm text-blue-800'>
                            💡 <strong>Tip:</strong> You can generate up to{' '}
                            {MAX_QUESTIONS} questions per session.
                            {totalQuestionsGenerated >= MAX_QUESTIONS - 5 &&
                            totalQuestionsGenerated < MAX_QUESTIONS
                                ? ` You have ${
                                      MAX_QUESTIONS - totalQuestionsGenerated
                                  } questions remaining. Consider saving your session soon!`
                                : totalQuestionsGenerated >= MAX_QUESTIONS
                                ? " You've reached the limit. Save your session to preserve all questions and answers!"
                                : ' Save your session anytime to preserve your progress.'}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function QuestionsPage() {
    return (
        <Suspense
            fallback={
                <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
                    <div className='text-center'>
                        <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4'></div>
                        <p className='text-gray-600 text-lg'>Loading...</p>
                    </div>
                </div>
            }
        >
            <QuestionsPageContent />
        </Suspense>
    );
}
