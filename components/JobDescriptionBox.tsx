import { JobDescription } from '../mock/jobDescriptions';

interface JobDescriptionBoxProps {
    jobDescription: JobDescription;
    onDescriptionChange: (newDescription: string) => void;
}

export default function JobDescriptionBox({
    jobDescription,
    onDescriptionChange,
}: JobDescriptionBoxProps) {
    const maxChars = 5000;
    const currentChars = jobDescription.roleSummary.length;
    const remainingChars = maxChars - currentChars;

    return (
        <div className='bg-white rounded-lg border border-gray-200 p-6 mb-6'>
            {/* Job Title */}
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                {jobDescription.title}
            </h2>

            {/* Role Summary */}
            <div className='mb-4'>
                <label
                    htmlFor='roleSummary'
                    className='block text-sm font-medium text-gray-700 mb-2'
                >
                    Role Summary:
                </label>
                <textarea
                    id='roleSummary'
                    value={jobDescription.roleSummary}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    className='w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    placeholder='Enter the role summary...'
                    maxLength={maxChars}
                />
            </div>

            {/* Responsibilities */}
            <div className='mb-4'>
                <h3 className='text-sm font-medium text-gray-700 mb-2'>
                    Responsibilities:
                </h3>
                <ul className='list-disc list-inside space-y-1'>
                    {jobDescription.responsibilities.map(
                        (responsibility, index) => (
                            <li key={index} className='text-sm text-gray-600'>
                                {responsibility}
                            </li>
                        )
                    )}
                </ul>
            </div>

            {/* Character Count */}
            <div className='text-right'>
                <span
                    className={`text-sm ${
                        remainingChars < 100 ? 'text-red-500' : 'text-gray-500'
                    }`}
                >
                    {remainingChars} chars left
                </span>
            </div>
        </div>
    );
}
