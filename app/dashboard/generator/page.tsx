'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import JobButton from '../../../components/JobButton';
import JobDescriptionBox from '../../../components/JobDescriptionBox';
import UploadSection from '../../../components/UploadSection';
import { jobDescriptions } from '../../../mock/jobDescriptions';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function QAGenerator() {
    const router = useRouter();
    const [selectedJob, setSelectedJob] = useState('Custom Job Description');
    const [jobDescription, setJobDescription] = useState(() => {
        const customJob = jobDescriptions['Custom Job Description'];
        return {
            ...customJob,
            title: '', // Clear the title for custom job description
        };
    });
    const [isGenerating, setIsGenerating] = useState(false);

    const handleJobSelect = (jobTitle: string) => {
        setSelectedJob(jobTitle);
        setJobDescription(jobDescriptions[jobTitle]);

        // If user selects "Custom Job Description", clear the title to allow editing
        if (jobTitle === 'Custom Job Description') {
            setJobDescription((prev) => ({
                ...prev,
                title: '', // Clear the title so user can enter their own
            }));
        }
        // For predefined jobs, keep the title but allow editing
        // The user can modify it if they want to be more specific
    };

    const handleDescriptionChange = (newDescription: string) => {
        setJobDescription({
            ...jobDescription,
            roleSummary: newDescription,
        });
    };

    const handleTitleChange = (newTitle: string) => {
        setJobDescription({
            ...jobDescription,
            title: newTitle,
        });
    };

    const handleGenerateQuestions = () => {
        if (isGenerating) return; // Prevent multiple clicks

        setIsGenerating(true);
        const params = new URLSearchParams({
            job: selectedJob,
            description: jobDescription.roleSummary,
        });
        router.push(`/dashboard/questions?${params.toString()}`);
    };

    return (
        <div className='space-y-8'>
            {/* Header */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <div className='flex items-center space-x-3 mb-4'>
                    <div className='p-2 bg-primary rounded-lg'>
                        <Sparkles className='h-6 w-6 text-white' />
                    </div>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900'>
                            Q&A Generator
                        </h1>
                        <p className='text-gray-600 text-lg'>
                            Create AI-powered interview questions and answers
                            for any job role
                        </p>
                    </div>
                </div>
            </div>

            {/* Job Selection */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                    Select Job Role
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                    {Object.keys(jobDescriptions).map((jobTitle) => (
                        <JobButton
                            key={jobTitle}
                            title={jobTitle}
                            isSelected={selectedJob === jobTitle}
                            onClick={() => handleJobSelect(jobTitle)}
                        />
                    ))}
                </div>
            </div>

            {/* Job Description Editor */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <JobDescriptionBox
                    jobDescription={jobDescription}
                    onDescriptionChange={handleDescriptionChange}
                    onTitleChange={handleTitleChange}
                />
            </div>

            {/* Upload Section */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <UploadSection />
            </div>

            {/* Generate Button */}
            <div className='text-center'>
                <button
                    onClick={handleGenerateQuestions}
                    disabled={isGenerating || !jobDescription?.title?.trim()}
                    className='bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center mx-auto text-lg disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    <Sparkles className='w-5 h-5 mr-2' />
                    Generate Questions & Answers
                    <ArrowRight className='w-5 h-5 ml-2' />
                </button>
                <p className='text-gray-500 mt-3 text-sm'>
                    {!jobDescription?.title?.trim()
                        ? 'Please enter a job title to continue'
                        : 'This will create a new Q&A session and save it to your history'}
                </p>
            </div>
        </div>
    );
}
