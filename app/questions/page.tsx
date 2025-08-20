'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { jobDescriptions } from '../../mock/jobDescriptions';
import { interviewQuestions } from '../../mock/interviewQuestions';
import Link from 'next/link';

export default function QuestionsPage() {
    const searchParams = useSearchParams();
    const jobTitle = searchParams.get('job') || 'Human Resources Specialist';
    const jobDescription = searchParams.get('description') || '';

    // Get the job description from our mock data if not provided in URL
    const currentJobDescription =
        jobDescription || jobDescriptions[jobTitle]?.roleSummary || '';

    // Get questions for the selected job
    const questions =
        interviewQuestions[jobTitle] || interviewQuestions['Default'];

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
                                Based on your job description
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
                            {currentJobDescription.substring(0, 300)}
                            {currentJobDescription.length > 300 ? '...' : ''}
                        </p>
                    </div>
                </div>

                {/* Interview Questions */}
                <div className='space-y-6'>
                    <h2 className='text-xl font-semibold text-gray-900'>
                        Interview Questions & Sample Answers
                    </h2>

                    {questions.map((qa, index) => (
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
                                            <p className='text-gray-900 font-medium'>
                                                Interviewer
                                            </p>
                                            <p className='text-gray-700 mt-1'>
                                                {qa.question}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Answer */}
                            <div>
                                <div className='flex items-start space-x-3'>
                                    <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                                        <svg
                                            className='w-4 h-4 text-green-600'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                                            />
                                        </svg>
                                    </div>
                                    <div className='flex-1'>
                                        <div className='bg-green-50 rounded-lg p-4'>
                                            <p className='text-gray-900 font-medium'>
                                                Candidate
                                            </p>
                                            <p className='text-gray-700 mt-1 whitespace-pre-line'>
                                                {qa.sampleAnswer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className='mt-8 flex justify-center space-x-4'>
                    <button className='bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200'>
                        Generate More Questions
                    </button>
                    <button className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200'>
                        Download Questions
                    </button>
                </div>
            </div>
        </main>
    );
}
