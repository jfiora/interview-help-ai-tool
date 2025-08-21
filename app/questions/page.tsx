'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useQuestionGeneration } from '../../hooks/useAI';
import { GeneratedQuestion, GeneratedAnswer } from '../../types/openai';
import AnswerGenerator from '../../components/AnswerGenerator';
import Link from 'next/link';

export default function QuestionsPage() {
    const searchParams = useSearchParams();
    const jobTitle = searchParams.get('job') || 'Human Resources Specialist';
    const jobDescription = searchParams.get('description') || '';

    const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
    const [answers, setAnswers] = useState<Record<string, GeneratedAnswer>>({});
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [hasGeneratedQuestions, setHasGeneratedQuestions] = useState(false);

    const {
        isLoading: isGenerating,
        error,
        questions: generatedQuestions,
        generateQuestions,
        clearError,
    } = useQuestionGeneration();

    // =====================================================
    // Effects
    // =====================================================

    useEffect(() => {
        // Auto-generate questions when the page loads
        if (jobTitle && jobDescription && !hasGeneratedQuestions) {
            handleGenerateQuestions();
        } else {
            setIsInitialLoading(false);
        }
    }, [jobTitle, jobDescription]);

    useEffect(() => {
        // Update questions when new ones are generated
        if (generatedQuestions.length > 0) {
            setQuestions(generatedQuestions);
            setHasGeneratedQuestions(true);
            setIsInitialLoading(false);
        }
    }, [generatedQuestions]);

    // =====================================================
    // Event Handlers
    // =====================================================

    const handleGenerateQuestions = async () => {
        try {
            setIsInitialLoading(true);
            clearError();

            if (!jobTitle || !jobDescription) {
                throw new Error('Job title and description are required');
            }

            await generateQuestions(jobTitle, jobDescription);
        } catch (error) {
            console.error('Failed to generate questions:', error);
            setIsInitialLoading(false);
        }
    };

    const handleGenerateMoreQuestions = async () => {
        try {
            clearError();
            await generateQuestions(jobTitle, jobDescription);
        } catch (error) {
            console.error('Failed to generate more questions:', error);
        }
    };

    const handleClearError = () => {
        clearError();
    };

    const handleAnswerGenerated = (
        questionId: string,
        answer: GeneratedAnswer
    ) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    // =====================================================
    // Render Functions
    // =====================================================

    const renderLoadingState = () => (
        <div className='flex flex-col items-center justify-center py-16'>
            <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4'></div>
            <p className='text-gray-600 text-lg'>
                Generating interview questions...
            </p>
            <p className='text-gray-500 text-sm mt-2'>
                This may take a few moments
            </p>
        </div>
    );

    const renderErrorState = () => {
        if (!error) return null;

        return (
            <div className='bg-red-50 border border-red-200 rounded-lg p-6 mb-8'>
                <div className='flex items-start'>
                    <div className='flex-shrink-0'>
                        <svg
                            className='h-5 w-5 text-red-400'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                        >
                            <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </div>
                    <div className='ml-3 flex-1'>
                        <h3 className='text-sm font-medium text-red-800'>
                            Failed to generate questions
                        </h3>
                        <div className='mt-2 text-sm text-red-700'>
                            <p>{error}</p>
                        </div>
                        <div className='mt-4'>
                            <button
                                onClick={handleGenerateQuestions}
                                className='bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-md text-sm transition-colors'
                            >
                                Try Again
                            </button>
                            <button
                                onClick={handleClearError}
                                className='ml-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md text-sm transition-colors'
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderQuestions = () => {
        if (questions.length === 0 && !isInitialLoading) {
            return (
                <div className='text-center py-16'>
                    <div className='text-gray-400 mb-4'>
                        <svg
                            className='mx-auto h-16 w-16'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={1}
                                d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                    </div>
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                        No questions generated yet
                    </h3>
                    <p className='text-gray-500 mb-4'>
                        Click the button below to generate AI-powered interview
                        questions
                    </p>
                    <button
                        onClick={handleGenerateQuestions}
                        className='bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors'
                    >
                        Generate Questions
                    </button>
                </div>
            );
        }

        return (
            <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-xl font-semibold text-gray-900'>
                        Interview Questions & Sample Answers
                    </h2>
                    <div className='text-sm text-gray-500'>
                        {questions.length} questions generated
                    </div>
                </div>

                {questions.map((question, index) => (
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
                                            d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
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
                                                {question.explanation}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Answer Generator */}
                        <div className='ml-11'>
                            <AnswerGenerator
                                jobTitle={jobTitle}
                                question={question.question}
                                questionType={question.question_type}
                                difficultyLevel={question.difficulty_level}
                                onAnswerGenerated={(answer) =>
                                    handleAnswerGenerated(
                                        `question-${index}`,
                                        answer
                                    )
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderActionButtons = () => {
        if (questions.length === 0) return null;

        return (
            <div className='mt-8 flex justify-center space-x-4'>
                <button
                    onClick={handleGenerateMoreQuestions}
                    disabled={isGenerating}
                    className={`font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${
                        isGenerating
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-primary hover:bg-primary/90 text-white'
                    }`}
                >
                    {isGenerating ? (
                        <div className='flex items-center'>
                            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                            Generating...
                        </div>
                    ) : (
                        'Generate More Questions'
                    )}
                </button>
                <button className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200'>
                    Download Questions
                </button>
            </div>
        );
    };

    // =====================================================
    // Main Render
    // =====================================================

    return (
        <main className='min-h-screen bg-gray-50'>
            {/* Header */}
            <header className='bg-white shadow-sm border-b border-gray-200'>
                <div className='max-w-6xl mx-auto px-4 py-4'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-2xl font-bold text-gray-900'>
                                Interview Questions: {jobTitle}
                            </h1>
                            <p className='text-gray-600 mt-1'>
                                AI-generated questions based on your job
                                description
                            </p>
                        </div>
                        <Link
                            href='/'
                            className='bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center'
                        >
                            <svg
                                className='w-4 h-4 mr-2'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M10 19l-7-7m0 0l7-7m-7 7h18'
                                />
                            </svg>
                            Back to Job Selection
                        </Link>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className='max-w-4xl mx-auto px-4 py-8'>
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

                {/* Error State */}
                {renderErrorState()}

                {/* Loading State */}
                {isInitialLoading && renderLoadingState()}

                {/* Questions Content */}
                {!isInitialLoading && renderQuestions()}

                {/* Action Buttons */}
                {renderActionButtons()}
            </div>
        </main>
    );
}
