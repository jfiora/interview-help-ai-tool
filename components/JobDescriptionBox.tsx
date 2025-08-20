import { JobDescription } from '../mock/jobDescriptions';

interface JobDescriptionBoxProps {
    jobDescription: JobDescription;
    onDescriptionChange: (newDescription: string) => void;
}

export default function JobDescriptionBox({
    jobDescription,
    onDescriptionChange,
}: JobDescriptionBoxProps) {
    const maxChars = 5000; // Increased character limit for full job descriptions
    const currentChars = jobDescription.roleSummary.length;
    const remainingChars = maxChars - currentChars;

    return (
        <div className='bg-white rounded-lg border border-gray-200 p-6 mb-6'>
            {/* Job Title */}
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                {jobDescription.title}
            </h2>

            {/* Full Job Description Textarea */}
            <div className='mb-4'>
                <label
                    htmlFor='fullJobDescription'
                    className='block text-sm font-medium text-gray-700 mb-2'
                >
                    Job Description:
                </label>
                <textarea
                    id='fullJobDescription'
                    value={jobDescription.roleSummary}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    className='w-full h-64 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm'
                    placeholder={`Enter the complete job description here. For example:

Job Title: Data Analyst

Role Summary: We are seeking a Data Analyst to join our team. This entry-to-mid-level position is a wonderful opportunity for those who are passionate about data-driven insights and are looking to broaden their experience in data analysis.

Responsibilities:
- Interpret data and analyze results using statistical techniques.
- Identify, analyze, and interpret trends or patterns in complex data sets.
- Develop and implement data collection systems and other strategies that optimize statistical efficiency and data quality.
- Work with management to prioritize business and information needs.
- Transform raw data into useful information using data-driven techniques.
- Collaborate with teams to implement strategies based on data analysis.

Requirements:
- Degree in Statistics, Mathematics, Computer Science, Information Systems, Economics, or a related field.
- 0-3 years of experience in data analysis or a related field.
- Strong analytical skills with the ability to collect, organize, analyze, and disseminate significant amounts of information with attention to detail and accuracy.
- Familiarity with data visualization tools and techniques.
- Proficient in SQL and understanding of relational databases.
- Excellent written and verbal communication skills.
- Ability to work independently and with team members from different backgrounds.
- Highly organized, detail-oriented, and proactive.`}
                    maxLength={maxChars}
                />
            </div>

            {/* Character Count */}
            <div className='text-right'>
                <span
                    className={`text-sm ${
                        remainingChars < 200 ? 'text-red-500' : 'text-gray-500'
                    }`}
                >
                    {remainingChars} chars left
                </span>
            </div>
        </div>
    );
}
