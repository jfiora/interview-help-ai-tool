'use client';

import React, { useState } from 'react';
import { useQuestionGeneration } from '../hooks/useAI';
import { GeneratedQuestion, AI_MODELS } from '../types/openai';

// =====================================================
// Component Interface
// =====================================================

interface AIQuestionGeneratorProps {
    jobTitle: string;
    jobDescription: string;
    onQuestionsGenerated?: (questions: GeneratedQuestion[]) => void;
    className?: string;
}

// =====================================================
// Component Implementation
// =====================================================

export default function AIQuestionGenerator({
    jobTitle,
    jobDescription,
    onQuestionsGenerated,
    className = '',
}: AIQuestionGeneratorProps) {
    const [selectedModel, setSelectedModel] =
        useState<keyof typeof AI_MODELS>('GPT_4_TURBO');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const { isLoading, error, questions, generateQuestions, clearError } =
        useQuestionGeneration();

    // =====================================================
    // Event Handlers
    // =====================================================

    const handleGenerateQuestions = async () => {
        try {
            const generatedQuestions = await generateQuestions(
                jobTitle,
                jobDescription,
                AI_MODELS[selectedModel]
            );

            if (onQuestionsGenerated) {
                onQuestionsGenerated(generatedQuestions);
            }
        } catch (error) {
            // Error is handled by the hook
            console.error('Failed to generate questions:', error);
        }
    };

    const handleModelChange = (model: keyof typeof AI_MODELS) => {
        setSelectedModel(model);
    };

    const handleClearError = () => {
        clearError();
    };

    // =====================================================
    // Render Functions
    // =====================================================

    const renderModelSelector = () => (
        <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
                AI Model
            </label>
            <div className='grid grid-cols-3 gap-2'>
                {Object.entries(AI_MODELS).map(([key, value]) => (
                    <button
                        key={key}
                        onClick={() =>
                            handleModelChange(key as keyof typeof AI_MODELS)
                        }
                        className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                            selectedModel === key
                                ? 'bg-primary text-white border-primary shadow-md'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-primary hover:bg-gray-50'
                        }`}
                    >
                        {key.replace('_', ' ')}
                    </button>
                ))}
            </div>
            <p className='text-xs text-gray-500 mt-1'>
                GPT-4 Turbo: Best quality, GPT-3.5: Faster & cheaper
            </p>
        </div>
    );

    const renderAdvancedOptions = () => (
        <div className='mb-4 p-4 bg-gray-50 rounded-lg'>
            <div className='flex items-center justify-between mb-2'>
                <h4 className='text-sm font-medium text-gray-700'>
                    Advanced Options
                </h4>
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className='text-primary hover:text-primary-dark text-sm'
                >
                    {showAdvanced ? 'Hide' : 'Show'}
                </button>
            </div>

            {showAdvanced && (
                <div className='space-y-3'>
                    <div>
                        <label className='block text-xs text-gray-600 mb-1'>
                            Temperature (Creativity)
                        </label>
                        <input
                            type='range'
                            min='0'
                            max='1'
                            step='0.1'
                            defaultValue='0.7'
                            className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                        />
                        <div className='flex justify-between text-xs text-gray-500'>
                            <span>Focused</span>
                            <span>Creative</span>
                        </div>
                    </div>

                    <div>
                        <label className='block text-xs text-gray-600 mb-1'>
                            Max Questions
                        </label>
                        <select className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg'>
                            <option value='5'>5 questions</option>
                            <option value='7' selected>
                                7 questions
                            </option>
                            <option value='10'>10 questions</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );

    const renderGeneratedQuestions = () => {
        if (!questions.length) return null;

        return (
            <div className='mt-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    Generated Questions ({questions.length})
                </h3>
                <div className='space-y-4'>
                    {questions.map((question, index) => (
                        <div
                            key={index}
                            className='p-4 bg-white border border-gray-200 rounded-lg shadow-sm'
                        >
                            <div className='flex items-start justify-between mb-2'>
                                <h4 className='font-medium text-gray-900'>
                                    {question.question}
                                </h4>
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
                                            question.difficulty_level === 'easy'
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

                            <div className='mb-2'>
                                <span className='text-xs font-medium text-gray-600'>
                                    Category:
                                </span>
                                <span className='text-sm text-gray-700 ml-2'>
                                    {question.category}
                                </span>
                            </div>

                            <p className='text-sm text-gray-600'>
                                {question.explanation}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderError = () => {
        if (!error) return null;

        return (
            <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <svg
                            className='w-5 h-5 text-red-400 mr-2'
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
                        onClick={handleClearError}
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

    // =====================================================
    // Main Render
    // =====================================================

    return (
        <div
            className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}
        >
            <div className='mb-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-2'>
                    🤖 AI Question Generator
                </h2>
                <p className='text-gray-600'>
                    Generate personalized interview questions using AI based on
                    your job description.
                </p>
            </div>

            {renderModelSelector()}
            {renderAdvancedOptions()}

            <div className='mb-6'>
                <button
                    onClick={handleGenerateQuestions}
                    disabled={isLoading || !jobTitle || !jobDescription}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                        isLoading || !jobTitle || !jobDescription
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                    }`}
                >
                    {isLoading ? (
                        <div className='flex items-center justify-center'>
                            <svg
                                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                            >
                                <circle
                                    className='opacity-25'
                                    cx='12'
                                    cy='12'
                                    r='10'
                                    stroke='currentColor'
                                    strokeWidth='4'
                                ></circle>
                                <path
                                    className='opacity-75'
                                    fill='currentColor'
                                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                ></path>
                            </svg>
                            Generating Questions...
                        </div>
                    ) : (
                        '🚀 Generate AI Questions'
                    )}
                </button>
            </div>

            {renderError()}
            {renderGeneratedQuestions()}

            {questions.length > 0 && (
                <div className='mt-6 pt-4 border-t border-gray-200'>
                    <div className='flex gap-3'>
                        <button className='flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'>
                            📥 Download Questions
                        </button>
                        <button className='flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'>
                            🔄 Generate More
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
