'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { jobDescriptions, JobDescription } from '../mock/jobDescriptions';
import JobButton from '../components/JobButton';
import JobDescriptionBox from '../components/JobDescriptionBox';
import UploadSection from '../components/UploadSection';
import AIQuestionGenerator from '../components/AIQuestionGenerator';
import { GeneratedQuestion } from '../types/openai';

export default function Home() {
    const router = useRouter();
    const [selectedJob, setSelectedJob] = useState<string>(
        'Human Resources Specialist'
    );
    const [jobDescription, setJobDescription] = useState<JobDescription>(
        jobDescriptions['Human Resources Specialist']
    );
    const [showAIGenerator, setShowAIGenerator] = useState(false);

    const handleJobSelect = (jobTitle: string) => {
        setSelectedJob(jobTitle);
        setJobDescription(jobDescriptions[jobTitle]);
        setShowAIGenerator(false); // Reset AI generator when job changes
    };

    const handleDescriptionChange = (newDescription: string) => {
        setJobDescription((prev) => ({
            ...prev,
            roleSummary: newDescription,
        }));
    };

    const handleGenerateQuestions = () => {
        // Navigate to the questions page with job information
        const params = new URLSearchParams({
            job: selectedJob,
            description: jobDescription.roleSummary,
        });

        router.push(`/questions?${params.toString()}`);
    };

    const handleAIQuestionsGenerated = (questions: GeneratedQuestion[]) => {
        // Questions have been generated, you can store them or navigate to questions page
        console.log('AI generated questions:', questions);

        // Optionally navigate to questions page with the generated questions
        const params = new URLSearchParams({
            job: selectedJob,
            description: jobDescription.roleSummary,
        });
        router.push(`/questions?${params.toString()}`);
    };

    const toggleAIGenerator = () => {
        setShowAIGenerator(!showAIGenerator);
    };

    return (
        <main className='min-h-screen bg-gray-50 py-8 px-4'>
            <div className='max-w-6xl mx-auto'>
                {/* Page Title */}
                <h1 className='text-3xl font-bold text-gray-900 text-center mb-8'>
                    Interview Help AI Tool
                </h1>

                {/* Job Selection Buttons */}
                <div className='mb-8'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-3'>
                        {Object.keys(jobDescriptions)
                            .slice(0, 4)
                            .map((jobTitle) => (
                                <JobButton
                                    key={jobTitle}
                                    title={jobTitle}
                                    isSelected={selectedJob === jobTitle}
                                    onClick={() => handleJobSelect(jobTitle)}
                                />
                            ))}
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-3'>
                        {Object.keys(jobDescriptions)
                            .slice(4, 8)
                            .map((jobTitle) => (
                                <JobButton
                                    key={jobTitle}
                                    title={jobTitle}
                                    isSelected={selectedJob === jobTitle}
                                    onClick={() => handleJobSelect(jobTitle)}
                                />
                            ))}
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                        {Object.keys(jobDescriptions)
                            .slice(8)
                            .map((jobTitle) => (
                                <JobButton
                                    key={jobTitle}
                                    title={jobTitle}
                                    isSelected={selectedJob === jobTitle}
                                    onClick={() => handleJobSelect(jobTitle)}
                                />
                            ))}
                    </div>
                </div>

                {/* Job Description Box */}
                <JobDescriptionBox
                    jobDescription={jobDescription}
                    onDescriptionChange={handleDescriptionChange}
                />

                {/* AI Question Generator Toggle */}
                <div className='text-center mt-6 mb-4'>
                    <button
                        onClick={toggleAIGenerator}
                        className='bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center mx-auto'
                    >
                        {showAIGenerator ? 'Hide' : 'Show'} AI Question
                        Generator
                        <svg
                            className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                                showAIGenerator ? 'rotate-180' : ''
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

                {/* AI Question Generator */}
                {showAIGenerator && (
                    <div className='mb-8'>
                        <AIQuestionGenerator
                            jobTitle={selectedJob}
                            jobDescription={jobDescription.roleSummary}
                            onQuestionsGenerated={handleAIQuestionsGenerated}
                        />
                    </div>
                )}

                {/* Upload Section */}
                <UploadSection />

                {/* Generate Questions Button */}
                <div className='text-center mt-8'>
                    <button
                        onClick={handleGenerateQuestions}
                        className='bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center mx-auto'
                    >
                        View Questions Page
                        <svg
                            className='w-5 h-5 ml-2'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M9 5l7 7-7 7'
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </main>
    );
}
