'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { jobDescriptions, JobDescription } from '../mock/jobDescriptions';
import JobButton from '../components/JobButton';
import JobDescriptionBox from '../components/JobDescriptionBox';
import UploadSection from '../components/UploadSection';

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
                {/* Page Title */}
                <h1 className='text-3xl font-bold text-gray-900 text-center mb-8'>
                    Select a job description
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

                {/* Upload Section */}
                <UploadSection />

                {/* Generate Questions Button */}
                <div className='text-center mt-8'>
                    <button
                        onClick={handleGenerateQuestions}
                        className='bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center mx-auto'
                    >
                        Generate Questions
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
