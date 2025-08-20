export interface JobDescription {
    title: string;
    roleSummary: string;
    responsibilities: string[];
}

export const jobDescriptions: Record<string, JobDescription> = {
    'Custom Job Description': {
        title: 'Custom Job Description',
        roleSummary:
            'Enter your own custom job description here. This allows you to tailor the interview questions specifically to your unique role requirements and company needs.',
        responsibilities: [
            'Customize this section with your specific job requirements',
            'Add relevant responsibilities for your position',
            'Include any special qualifications or skills needed',
        ],
    },
    'Business Analyst': {
        title: 'Business Analyst',
        roleSummary:
            'We are seeking a skilled Business Analyst to bridge the gap between business needs and technical solutions. This role involves analyzing business processes, identifying improvement opportunities, and working closely with stakeholders to implement effective solutions.',
        responsibilities: [
            'Analyze business processes and identify areas for improvement',
            'Gather and document business requirements from stakeholders',
            'Create detailed business requirement documents and user stories',
            'Collaborate with development teams to ensure requirements are met',
            'Conduct user acceptance testing and validate solutions',
        ],
    },
    'Product Manager': {
        title: 'Product Manager',
        roleSummary:
            'We are looking for a strategic Product Manager to lead product development from conception to launch. This role requires strong leadership skills, market research capabilities, and the ability to work cross-functionally to deliver successful products.',
        responsibilities: [
            'Define product vision, strategy, and roadmap',
            'Conduct market research and competitive analysis',
            'Gather and prioritize product requirements from stakeholders',
            'Work closely with engineering, design, and marketing teams',
            'Analyze product metrics and make data-driven decisions',
        ],
    },
    'Software Engineer': {
        title: 'Software Engineer',
        roleSummary:
            'We are seeking a talented Software Engineer to design, develop, and maintain high-quality software solutions. This role involves working with modern technologies, collaborating with cross-functional teams, and contributing to technical architecture decisions.',
        responsibilities: [
            'Design and implement scalable software solutions',
            'Write clean, maintainable, and efficient code',
            'Collaborate with product managers and designers',
            'Participate in code reviews and technical discussions',
            'Debug and resolve software issues and bugs',
        ],
    },
    'Marketing Specialist': {
        title: 'Marketing Specialist',
        roleSummary:
            'We are looking for a creative Marketing Specialist to develop and execute marketing campaigns that drive brand awareness and customer engagement. This role requires strong analytical skills and the ability to create compelling content across various channels.',
        responsibilities: [
            'Develop and execute marketing campaigns across multiple channels',
            'Create engaging content for social media, email, and web',
            'Analyze marketing performance metrics and optimize campaigns',
            'Manage social media presence and community engagement',
            'Collaborate with design and content teams',
        ],
    },
    'Data Analyst': {
        title: 'Data Analyst',
        roleSummary:
            'We are seeking a detail-oriented Data Analyst to transform raw data into actionable insights. This role involves collecting, analyzing, and interpreting data to help drive business decisions and improve operational efficiency.',
        responsibilities: [
            'Collect and clean data from various sources',
            'Analyze data using statistical methods and tools',
            'Create reports and visualizations to communicate findings',
            'Identify trends and patterns in data',
            'Present insights to stakeholders in a clear manner',
        ],
    },
    'Customer Service Representative': {
        title: 'Customer Service Representative',
        roleSummary:
            'We are looking for a compassionate Customer Service Representative to provide exceptional support to our customers. This role requires strong communication skills, problem-solving abilities, and a commitment to customer satisfaction.',
        responsibilities: [
            'Respond to customer inquiries via phone, email, and chat',
            'Resolve customer complaints and issues promptly',
            'Provide product information and support',
            'Maintain accurate customer records and interactions',
            'Escalate complex issues to appropriate departments',
        ],
    },
    'Sales Representative': {
        title: 'Sales Representative',
        roleSummary:
            'We are seeking a motivated Sales Representative to drive revenue growth through relationship building and consultative selling. This role requires strong interpersonal skills, persistence, and the ability to understand customer needs.',
        responsibilities: [
            'Prospect and qualify new sales leads',
            'Conduct product demonstrations and presentations',
            'Negotiate contracts and close sales deals',
            'Build and maintain relationships with clients',
            'Meet or exceed sales targets and quotas',
        ],
    },
    'Human Resources Specialist': {
        title: 'Human Resources Specialist',
        roleSummary:
            'We are seeking a detail-oriented Human Resources Specialist to join our team. This position offers the opportunity to be involved in a broad range of HR functions, providing excellent experience in the field.',
        responsibilities: [
            'Assist with all internal and external HR-related matters',
            'Participate in developing organizational guidelines and procedures',
            'Recommend strategies to motivate employees',
            'Assist with the recruitment process by identifying candidates, conducting reference checks, and issuing employment contracts',
        ],
    },
    'UX/UI Designer': {
        title: 'UX/UI Designer',
        roleSummary:
            'We are looking for a creative UX/UI Designer to create intuitive and engaging user experiences. This role involves understanding user needs, creating wireframes and prototypes, and collaborating with development teams to implement designs.',
        responsibilities: [
            'Conduct user research and usability testing',
            'Create wireframes, prototypes, and high-fidelity designs',
            'Design user interfaces that are intuitive and accessible',
            'Collaborate with product managers and developers',
            'Maintain design consistency across all products',
        ],
    },
    'QA Engineer': {
        title: 'QA Engineer',
        roleSummary:
            'We are seeking a meticulous QA Engineer to ensure the quality and reliability of our software products. This role involves designing test plans, executing test cases, and working closely with development teams to identify and resolve issues.',
        responsibilities: [
            'Design and execute comprehensive test plans and test cases',
            'Perform manual and automated testing across different platforms',
            'Identify, document, and track software defects',
            'Collaborate with development teams to resolve issues',
            'Contribute to continuous improvement of testing processes',
        ],
    },
};
