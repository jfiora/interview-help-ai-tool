'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { jobDescriptions, JobDescription } from '../mock/jobDescriptions';
import JobButton from '../components/JobButton';
import JobDescriptionBox from '../components/JobDescriptionBox';
import UploadSection from '../components/UploadSection';
import Link from 'next/link';

export default function Home() {
    const router = useRouter();
    const [selectedJob, setSelectedJob] = useState<string>(
        'Human Resources Specialist'
    );
    const [jobDescription, setJobDescription] = useState<JobDescription>(
        jobDescriptions['Human Resources Specialist']
    );

    const handleJobSelect = (jobTitle: string) => {
        setSelectedJob(jobTitle);
        setJobDescription(jobDescriptions[jobTitle]);
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

    return (
        <main className='min-h-screen bg-gray-50 py-8 px-4'>
            <div className='max-w-6xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                        Interview Help AI Tool
                    </h1>
                    <p className='text-xl text-gray-600 mb-6'>
                        Generate AI-powered interview questions and answers for
                        any job role
                    </p>
                    <div className='flex justify-center space-x-4'>
                        <Link
                            href='/history'
                            className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200'
                        >
                            View History
                        </Link>
                    </div>
                </div>

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

                {/* Upload Section */}
                <UploadSection />

                {/* Generate Questions Button */}
                <div className='text-center mt-8'>
                    <button
                        onClick={handleGenerateQuestions}
                        className='bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center mx-auto'
                    >
                        Generate Questions & Answers
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
