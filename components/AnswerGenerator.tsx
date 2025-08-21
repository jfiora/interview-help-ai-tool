'use client';

import React, { useState } from 'react';
import { useAnswerGeneration } from '../hooks/useAI';
import { GeneratedAnswer } from '../types/openai';

interface AnswerGeneratorProps {
    jobTitle: string;
    question: string;
    questionType: string;
    difficultyLevel: string;
    onAnswerGenerated?: (answer: GeneratedAnswer) => void;
    className?: string;
}

export default function AnswerGenerator({
    jobTitle,
    question,
    questionType,
    difficultyLevel,
    onAnswerGenerated,
    className = '',
}: AnswerGeneratorProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const { isLoading, error, answer, generateAnswer, clearError } =
        useAnswerGeneration();

    const handleGenerateAnswer = async () => {
        try {
            const generatedAnswer = await generateAnswer(
                jobTitle,
                question,
                questionType,
                difficultyLevel
            );

            if (onAnswerGenerated) {
                onAnswerGenerated(generatedAnswer);
            }
        } catch (error) {
            console.error('Failed to generate answer:', error);
        }
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded && !answer) {
            handleGenerateAnswer();
        }
    };

    const renderAnswer = () => {
        if (!answer) return null;

        return (
            <div className='mt-4 p-4 bg-green-50 rounded-lg border border-green-200'>
                <h4 className='font-medium text-green-800 mb-2'>
                    Sample Answer
                </h4>
                <div className='prose prose-sm max-w-none'>
                    <p className='text-green-700 whitespace-pre-line mb-3'>
                        {answer.answer_text}
                    </p>

                    {answer.key_points && answer.key_points.length > 0 && (
                        <div className='mb-3'>
                            <h5 className='text-sm font-medium text-green-800 mb-2'>
                                Key Points:
                            </h5>
                            <ul className='list-disc list-inside space-y-1'>
                                {answer.key_points.map(
                                    (point: string, index: number) => (
                                        <li
                                            key={index}
                                            className='text-sm text-green-700'
                                        >
                                            {point}
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
        );
    };

    const renderError = () => {
        if (!error) return null;

        return (
            <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <svg
                            className='w-4 h-4 text-red-400 mr-2'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                        >
                            <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                                clipRule='evenodd'
                            />
                        </svg>
                        <span className='text-sm text-red-800'>{error}</span>
                    </div>
                    <button
                        onClick={clearError}
                        className='text-red-400 hover:text-red-600'
                    >
                        <svg
                            className='w-4 h-4'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                        >
                            <path
                                fillRule='evenodd'
                                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={`${className}`}>
            <button
                onClick={handleToggle}
                disabled={isLoading}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                    isExpanded
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
            >
                <div className='flex items-center justify-between'>
                    <span className='font-medium'>
                        {isExpanded
                            ? 'Hide Sample Answer'
                            : 'Generate Sample Answer'}
                    </span>
                    <div className='flex items-center space-x-2'>
                        {isLoading && (
                            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-green-600'></div>
                        )}
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : ''
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
                    </div>
                </div>
            </button>

            {isExpanded && (
                <div className='mt-2'>
                    {renderError()}
                    {renderAnswer()}
                </div>
            )}
        </div>
    );
}
