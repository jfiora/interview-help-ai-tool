export interface JobDescription {
    title: string;
    roleSummary: string;
    responsibilities: string[];
}

export const jobDescriptions: Record<string, JobDescription> = {
    'Custom Job Description': {
        title: 'Custom Job Description',
        roleSummary: `Enter your own custom job description here. This allows you to tailor the interview questions specifically to your unique role requirements and company needs.

You can include:
- Job Title
- Role Summary
- Responsibilities
- Requirements
- Any other relevant information

Feel free to copy and paste from real job postings or write your own description.`,
        responsibilities: [
            'Customize this section with your specific job requirements',
            'Add relevant responsibilities for your position',
            'Include any special qualifications or skills needed',
        ],
    },
    'Business Analyst': {
        title: 'Business Analyst',
        roleSummary: `Job Title: Business Analyst

Role Summary: We are seeking a skilled Business Analyst to bridge the gap between business needs and technical solutions. This role involves analyzing business processes, identifying improvement opportunities, and working closely with stakeholders to implement effective solutions.

Responsibilities:
- Analyze business processes and identify areas for improvement
- Gather and document business requirements from stakeholders
- Create detailed business requirement documents and user stories
- Collaborate with development teams to ensure requirements are met
- Conduct user acceptance testing and validate solutions
- Facilitate communication between business and technical teams
- Monitor project progress and ensure deliverables meet business objectives

Requirements:
- Bachelor's degree in Business Administration, Information Technology, or related field
- 2-5 years of experience in business analysis or related role
- Strong analytical and problem-solving skills
- Excellent communication and stakeholder management abilities
- Experience with requirements gathering and documentation
- Knowledge of business process modeling and analysis techniques
- Familiarity with Agile methodologies and project management tools
- Ability to work independently and manage multiple priorities`,
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
        roleSummary: `Job Title: Product Manager

Role Summary: We are looking for a strategic Product Manager to lead product development from conception to launch. This role requires strong leadership skills, market research capabilities, and the ability to work cross-functionally to deliver successful products.

Responsibilities:
- Define product vision, strategy, and roadmap
- Conduct market research and competitive analysis
- Gather and prioritize product requirements from stakeholders
- Work closely with engineering, design, and marketing teams
- Analyze product metrics and make data-driven decisions
- Manage product lifecycle from ideation to end-of-life
- Coordinate with sales and customer success teams
- Monitor market trends and customer feedback

Requirements:
- Bachelor's degree in Business, Engineering, or related field
- 3-7 years of product management experience
- Strong analytical and strategic thinking skills
- Excellent communication and leadership abilities
- Experience with product development methodologies (Agile, Scrum)
- Knowledge of market research and competitive analysis
- Familiarity with product analytics and user research tools
- Ability to work in fast-paced, cross-functional environments`,
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
        roleSummary: `Job Title: Software Engineer

Role Summary: We are seeking a talented Software Engineer to design, develop, and maintain high-quality software solutions. This role involves working with modern technologies, collaborating with cross-functional teams, and contributing to technical architecture decisions.

Responsibilities:
- Design and implement scalable software solutions
- Write clean, maintainable, and efficient code
- Collaborate with product managers and designers
- Participate in code reviews and technical discussions
- Debug and resolve software issues and bugs
- Contribute to technical architecture and system design
- Write technical documentation and specifications
- Mentor junior developers and share knowledge

Requirements:
- Bachelor's degree in Computer Science, Software Engineering, or related field
- 2-6 years of software development experience
- Proficiency in one or more programming languages (Java, Python, JavaScript, etc.)
- Experience with modern frameworks and technologies
- Knowledge of software development best practices and design patterns
- Familiarity with version control systems (Git)
- Understanding of database design and SQL
- Strong problem-solving and analytical skills`,
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
        roleSummary: `Job Title: Marketing Specialist

Role Summary: We are looking for a creative Marketing Specialist to develop and execute marketing campaigns that drive brand awareness and customer engagement. This role requires strong analytical skills and the ability to create compelling content across various channels.

Responsibilities:
- Develop and execute marketing campaigns across multiple channels
- Create engaging content for social media, email, and web
- Analyze marketing performance metrics and optimize campaigns
- Manage social media presence and community engagement
- Collaborate with design and content teams
- Conduct market research and competitive analysis
- Manage email marketing campaigns and automation
- Track ROI and campaign performance

Requirements:
- Bachelor's degree in Marketing, Communications, or related field
- 2-4 years of marketing experience
- Strong creative and analytical skills
- Experience with digital marketing tools and platforms
- Knowledge of social media marketing and content creation
- Familiarity with email marketing and automation tools
- Understanding of marketing analytics and performance metrics
- Excellent written and verbal communication skills`,
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
        roleSummary: `Job Title: Data Analyst

Role Summary: We are seeking a detail-oriented Data Analyst to transform raw data into actionable insights. This role involves collecting, analyzing, and interpreting data to help drive business decisions and improve operational efficiency.

Responsibilities:
- Collect and clean data from various sources
- Analyze data using statistical methods and tools
- Create reports and visualizations to communicate findings
- Identify trends and patterns in data
- Present insights to stakeholders in a clear manner
- Develop and maintain data collection systems
- Collaborate with business teams to understand data needs
- Ensure data quality and accuracy

Requirements:
- Degree in Statistics, Mathematics, Computer Science, Information Systems, Economics, or a related field
- 0-3 years of experience in data analysis or a related field
- Strong analytical skills with the ability to collect, organize, analyze, and disseminate significant amounts of information with attention to detail and accuracy
- Familiarity with data visualization tools and techniques
- Proficient in SQL and understanding of relational databases
- Excellent written and verbal communication skills
- Ability to work independently and with team members from different backgrounds
- Highly organized, detail-oriented, and proactive`,
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
        roleSummary: `Job Title: Customer Service Representative

Role Summary: We are looking for a compassionate Customer Service Representative to provide exceptional support to our customers. This role requires strong communication skills, problem-solving abilities, and a commitment to customer satisfaction.

Responsibilities:
- Respond to customer inquiries via phone, email, and chat
- Resolve customer complaints and issues promptly
- Provide product information and support
- Maintain accurate customer records and interactions
- Escalate complex issues to appropriate departments
- Process orders, returns, and exchanges
- Follow up with customers to ensure satisfaction
- Contribute to customer service improvement initiatives

Requirements:
- High school diploma or equivalent (Bachelor's degree preferred)
- 1-3 years of customer service experience
- Excellent communication and interpersonal skills
- Strong problem-solving and conflict resolution abilities
- Patience and empathy when dealing with customers
- Basic computer skills and familiarity with CRM systems
- Ability to work in a fast-paced environment
- Flexibility to work various shifts including weekends`,
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
        roleSummary: `Job Title: Sales Representative

Role Summary: We are seeking a motivated Sales Representative to drive revenue growth through relationship building and consultative selling. This role requires strong interpersonal skills, persistence, and the ability to understand customer needs.

Responsibilities:
- Prospect and qualify new sales leads
- Conduct product demonstrations and presentations
- Negotiate contracts and close sales deals
- Build and maintain relationships with clients
- Meet or exceed sales targets and quotas
- Develop and implement sales strategies
- Collaborate with marketing and product teams
- Maintain accurate sales records and forecasts

Requirements:
- Bachelor's degree in Business, Marketing, or related field
- 2-5 years of sales experience in B2B or B2C environment
- Proven track record of meeting or exceeding sales targets
- Strong negotiation and closing skills
- Excellent communication and presentation abilities
- Self-motivated and results-oriented
- Ability to build and maintain client relationships
- Familiarity with CRM systems and sales processes`,
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
        roleSummary: `Job Title: Human Resources Specialist

Role Summary: We are seeking a detail-oriented Human Resources Specialist to join our team. This position offers the opportunity to be involved in a broad range of HR functions, providing excellent experience in the field.

Responsibilities:
- Assist with all internal and external HR-related matters
- Participate in developing organizational guidelines and procedures
- Recommend strategies to motivate employees
- Assist with the recruitment process by identifying candidates, conducting reference checks, and issuing employment contracts
- Support the HR team in various administrative tasks
- Help maintain employee records and HR databases
- Assist with employee onboarding and offboarding processes
- Support HR projects and initiatives

Requirements:
- Bachelor's degree in Human Resources, Business Administration, or related field
- 1-3 years of HR experience or relevant internship experience
- Knowledge of HR principles and practices
- Strong organizational and administrative skills
- Excellent communication and interpersonal abilities
- Attention to detail and confidentiality
- Familiarity with HRIS systems and Microsoft Office
- Understanding of employment laws and regulations`,
        responsibilities: [
            'Assist with all internal and external HR-related matters',
            'Participate in developing organizational guidelines and procedures',
            'Recommend strategies to motivate employees',
            'Assist with the recruitment process by identifying candidates, conducting reference checks, and issuing employment contracts',
        ],
    },
    'UX/UI Designer': {
        title: 'UX/UI Designer',
        roleSummary: `Job Title: UX/UI Designer

Role Summary: We are looking for a creative UX/UI Designer to create intuitive and engaging user experiences. This role involves understanding user needs, creating wireframes and prototypes, and collaborating with development teams to implement designs.

Responsibilities:
- Conduct user research and usability testing
- Create wireframes, prototypes, and high-fidelity designs
- Design user interfaces that are intuitive and accessible
- Collaborate with product managers and developers
- Maintain design consistency across all products
- Conduct user interviews and surveys
- Analyze user behavior and feedback
- Create design systems and style guides

Requirements:
- Bachelor's degree in Design, Human-Computer Interaction, or related field
- 2-5 years of UX/UI design experience
- Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)
- Strong understanding of user-centered design principles
- Experience with prototyping and user testing
- Knowledge of design systems and component libraries
- Familiarity with web accessibility standards
- Excellent visual design and typography skills`,
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
        roleSummary: `Job Title: QA Engineer

Role Summary: We are seeking a meticulous QA Engineer to ensure the quality and reliability of our software products. This role involves designing test plans, executing test cases, and working closely with development teams to identify and resolve issues.

Responsibilities:
- Design and execute comprehensive test plans and test cases
- Perform manual and automated testing across different platforms
- Identify, document, and track software defects
- Collaborate with development teams to resolve issues
- Contribute to continuous improvement of testing processes
- Develop and maintain automated test scripts
- Conduct regression testing and performance testing
- Participate in release planning and quality gates

Requirements:
- Bachelor's degree in Computer Science, Software Engineering, or related field
- 2-4 years of QA/testing experience
- Strong analytical and problem-solving skills
- Experience with manual and automated testing
- Knowledge of testing methodologies and best practices
- Familiarity with testing tools and bug tracking systems
- Understanding of software development lifecycle
- Excellent attention to detail and documentation skills`,
        responsibilities: [
            'Design and execute comprehensive test plans and test cases',
            'Perform manual and automated testing across different platforms',
            'Identify, document, and track software defects',
            'Collaborate with development teams to resolve issues',
            'Contribute to continuous improvement of testing processes',
        ],
    },
};
