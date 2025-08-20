export interface InterviewQA {
    question: string;
    sampleAnswer: string;
}

export const interviewQuestions: Record<string, InterviewQA[]> = {
    Default: [
        {
            question: 'Tell me about yourself and your background.',
            sampleAnswer:
                "I'm a passionate professional with X years of experience in [field]. I've worked on [key projects/achievements] and I'm particularly interested in [specific area]. I believe my background in [relevant experience] makes me a strong fit for this role.",
        },
        {
            question: 'Why are you interested in this position?',
            sampleAnswer:
                "I'm drawn to this role because it combines my passion for [specific aspect] with the opportunity to work on [challenging projects/innovative solutions]. The company's mission to [company goal] aligns perfectly with my career objectives.",
        },
        {
            question: 'What are your greatest strengths?',
            sampleAnswer:
                "My greatest strengths include [specific skill 1], [specific skill 2], and [specific skill 3]. For example, I've demonstrated [skill 1] by [concrete example], and [skill 2] has helped me [specific achievement].",
        },
    ],
    'Data Analyst': [
        {
            question: 'Can you walk me through your data analysis process?',
            sampleAnswer:
                "My data analysis process typically follows these steps:\n\n1. **Data Collection**: I start by gathering data from various sources and ensuring data quality\n2. **Data Cleaning**: I identify and handle missing values, outliers, and inconsistencies\n3. **Exploratory Analysis**: I use statistical methods to understand patterns and relationships\n4. **Modeling**: I apply appropriate analytical techniques based on the business question\n5. **Validation**: I test my findings and ensure they're statistically sound\n6. **Communication**: I present insights in a clear, actionable format for stakeholders",
        },
        {
            question:
                'What tools and technologies are you most comfortable with?',
            sampleAnswer:
                "I'm proficient with several key tools:\n\n- **SQL**: For data extraction and manipulation from relational databases\n- **Python**: For data analysis using pandas, numpy, and scikit-learn\n- **R**: For statistical analysis and modeling\n- **Tableau/Power BI**: For creating interactive visualizations\n- **Excel**: For quick analysis and stakeholder collaboration\n\nI'm also familiar with cloud platforms like AWS and Google Cloud for big data processing.",
        },
        {
            question: 'How do you handle missing or incomplete data?',
            sampleAnswer:
                "I approach missing data systematically:\n\n1. **Assessment**: First, I analyze the pattern and extent of missing data\n2. **Investigation**: I try to understand why data is missing (technical issues, business processes, etc.)\n3. **Strategy Selection**: I choose the appropriate method based on the data type and missing pattern:\n   - For numerical data: mean/median imputation, regression imputation\n   - For categorical data: mode imputation, multiple imputation\n4. **Validation**: I ensure my approach doesn't introduce bias\n5. **Documentation**: I clearly document what I did for transparency",
        },
        {
            question:
                'Describe a time when your analysis led to a significant business impact.',
            sampleAnswer:
                "In my previous role, I analyzed customer churn patterns and discovered that customers who didn't engage with our product within the first 7 days were 3x more likely to churn. I created a predictive model that identified at-risk customers with 85% accuracy.\n\n**Impact**: The marketing team used this insight to implement a targeted onboarding campaign, resulting in a 23% reduction in customer churn and $2.1M in additional annual revenue.\n\n**Key Learnings**: This taught me the importance of translating technical findings into actionable business recommendations.",
        },
        {
            question:
                'How do you ensure your analysis is accurate and reliable?',
            sampleAnswer:
                "I follow a rigorous validation process:\n\n1. **Data Quality Checks**: I verify data sources, check for anomalies, and validate assumptions\n2. **Methodology Review**: I ensure I'm using the right statistical methods for the question at hand\n3. **Peer Review**: I have colleagues review my approach and findings\n4. **Sensitivity Analysis**: I test how robust my results are to different assumptions\n5. **Cross-Validation**: I use techniques like k-fold cross-validation for predictive models\n6. **Business Logic**: I validate that my findings make business sense\n7. **Documentation**: I maintain clear records of my methodology and decisions",
        },
    ],
    'Software Engineer': [
        {
            question:
                'Can you explain your approach to writing clean, maintainable code?',
            sampleAnswer:
                "I follow several key principles:\n\n1. **SOLID Principles**: I ensure single responsibility, open/closed, Liskov substitution, interface segregation, and dependency inversion\n2. **Meaningful Naming**: I use descriptive names for variables, functions, and classes\n3. **Small Functions**: I keep functions focused and under 20 lines when possible\n4. **Comments**: I write comments explaining 'why' not 'what'\n5. **Testing**: I write unit tests for all public methods\n6. **Code Reviews**: I actively participate in peer reviews and welcome feedback\n7. **Refactoring**: I continuously improve code quality without changing functionality",
        },
        {
            question: 'How do you handle debugging complex issues?',
            sampleAnswer:
                "My debugging approach is systematic:\n\n1. **Reproduce**: I first ensure I can consistently reproduce the issue\n2. **Isolate**: I narrow down the problem area using logging, breakpoints, or binary search\n3. **Hypothesize**: I form theories about what might be causing the issue\n4. **Test**: I test each hypothesis systematically\n5. **Fix**: I implement the solution and verify it resolves the issue\n6. **Test**: I ensure my fix doesn't introduce new problems\n7. **Document**: I document the root cause and solution for future reference\n\nI also use tools like debuggers, logging frameworks, and monitoring systems to aid in the process.",
        },
        {
            question: 'Describe a challenging technical problem you solved.',
            sampleAnswer:
                'I once worked on optimizing a real-time data processing pipeline that was experiencing 30-second delays. The system was processing millions of records per hour.\n\n**Challenge**: The bottleneck was in the database queries and data serialization.\n\n**Solution**: I implemented several optimizations:\n- Added database indexing for frequently queried fields\n- Implemented connection pooling to reduce database overhead\n- Used Protocol Buffers instead of JSON for faster serialization\n- Added caching for frequently accessed data\n- Implemented batch processing to reduce database round trips\n\n**Result**: Reduced processing time from 30 seconds to under 2 seconds, improving user experience significantly.',
        },
        {
            question: 'How do you stay updated with technology trends?',
            sampleAnswer:
                'I maintain several learning habits:\n\n1. **Reading**: I follow tech blogs, read books, and subscribe to newsletters\n2. **Online Courses**: I take courses on platforms like Coursera, Udemy, and Pluralsight\n3. **Open Source**: I contribute to and study open-source projects\n4. **Conferences**: I attend local meetups and virtual conferences\n5. **Experimentation**: I build side projects to try new technologies\n6. **Community**: I participate in online forums and discussion groups\n7. **Mentorship**: I both mentor others and seek mentorship from senior developers\n\nI believe continuous learning is essential in our rapidly evolving field.',
        },
    ],
    'Business Analyst': [
        {
            question: 'How do you gather and document business requirements?',
            sampleAnswer:
                'My requirements gathering process involves:\n\n1. **Stakeholder Identification**: I identify all relevant stakeholders and their roles\n2. **Interviews**: I conduct one-on-one sessions to understand individual needs\n3. **Workshops**: I facilitate group sessions to align on requirements\n4. **Documentation**: I create clear, structured requirements documents including:\n   - Functional requirements\n   - Non-functional requirements\n   - User stories\n   - Acceptance criteria\n5. **Validation**: I review requirements with stakeholders to ensure accuracy\n6. **Sign-off**: I get formal approval before proceeding\n\nI use tools like JIRA, Confluence, and Visio to maintain clear documentation.',
        },
        {
            question:
                'How do you handle conflicting requirements from different stakeholders?',
            sampleAnswer:
                'I address conflicts through a structured approach:\n\n1. **Facilitation**: I bring stakeholders together to discuss the conflict openly\n2. **Root Cause Analysis**: I identify why requirements conflict (different priorities, perspectives, or constraints)\n3. **Impact Analysis**: I assess the business impact of each requirement\n4. **Prioritization**: I work with stakeholders to prioritize based on business value\n5. **Compromise**: I look for solutions that satisfy multiple stakeholders\n6. **Escalation**: If needed, I escalate to senior management for resolution\n7. **Documentation**: I clearly document the final decision and rationale\n\nMy goal is to find win-win solutions that advance the project objectives.',
        },
        {
            question: 'Describe a successful project you worked on as a BA.',
            sampleAnswer:
                'I led the requirements gathering for a customer relationship management system implementation that served 500+ users across 3 departments.\n\n**Challenge**: The existing system was fragmented across departments with no single source of truth.\n\n**My Role**: I facilitated workshops, conducted user interviews, and created detailed requirements documents.\n\n**Key Deliverables**:\n- 50+ user stories with acceptance criteria\n- Process flow diagrams for 15 core business processes\n- Data dictionary with 200+ field definitions\n- Integration requirements for 8 external systems\n\n**Result**: The system was delivered on time and under budget, with 95% user satisfaction and 40% improvement in customer response times.',
        },
    ],
    'Product Manager': [
        {
            question: 'How do you prioritize features in your product roadmap?',
            sampleAnswer:
                'I use a structured prioritization framework:\n\n1. **Business Impact**: I assess potential revenue, cost savings, or strategic value\n2. **User Value**: I evaluate how much the feature improves user experience\n3. **Effort**: I estimate development complexity and resource requirements\n4. **Risk**: I consider technical and business risks\n5. **Dependencies**: I identify what needs to be built first\n\nI use tools like RICE scoring (Reach, Impact, Confidence, Effort) and work closely with engineering to validate estimates.\n\n**Example**: I recently prioritized a user authentication feature over a nice-to-have UI enhancement because it was blocking 3 other high-value features and had significant security implications.',
        },
        {
            question: 'How do you measure product success?',
            sampleAnswer:
                'I track success through multiple metrics:\n\n**User Metrics**:\n- User acquisition, retention, and engagement\n- Feature adoption rates\n- User satisfaction scores (NPS, CSAT)\n\n**Business Metrics**:\n- Revenue impact and conversion rates\n- Cost savings and operational efficiency\n- Market share and competitive positioning\n\n**Product Metrics**:\n- Performance and reliability\n- Bug rates and resolution times\n- Development velocity and quality\n\nI set clear OKRs at the beginning of each quarter and track progress weekly. I also conduct regular user research to understand qualitative feedback.',
        },
    ],
    'Human Resources Specialist': [
        {
            question: 'How do you handle difficult employee situations?',
            sampleAnswer:
                'I approach difficult situations systematically:\n\n1. **Listen First**: I give the employee space to share their perspective without interruption\n2. **Document**: I maintain detailed, objective records of all interactions\n3. **Investigate**: I gather facts from all relevant parties and review documentation\n4. **Consult**: I discuss complex situations with my manager or legal team when appropriate\n5. **Act Fairly**: I apply policies consistently and ensure due process\n6. **Follow Up**: I check in after resolution to ensure the situation is resolved\n7. **Learn**: I reflect on what could be improved for future situations\n\n**Example**: I once mediated a conflict between two team members by facilitating a structured conversation where each person could express their concerns and work toward a resolution.',
        },
        {
            question: 'What HR systems and tools are you familiar with?',
            sampleAnswer:
                "I'm proficient with several HR systems:\n\n**HRIS**: Workday, BambooHR, ADP Workforce Now\n**ATS**: Greenhouse, Lever, Workday Recruiting\n**Performance Management**: 15Five, Lattice, Workday Performance\n**Learning Management**: Cornerstone, Workday Learning\n**Payroll**: ADP, Paychex, Workday Payroll\n\nI also use tools for:\n- Microsoft Office Suite for documentation and analysis\n- Survey tools like SurveyMonkey for employee feedback\n- Analytics tools to track HR metrics and trends\n\nI'm comfortable learning new systems quickly and can often identify opportunities to optimize HR processes through better system utilization.",
        },
    ],
};
