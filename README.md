# Interview Help AI Tool

A Next.js application that allows users to select job descriptions and generate tailored interview questions. The interface includes a job selection grid, editable job description box, and resume upload functionality.

## Features

-   **Job Selection Grid**: Click on different job titles to select them
-   **Comprehensive Job Description Editor**: Single textarea for complete job descriptions including title, summary, responsibilities, and requirements
-   **Copy & Paste Support**: Easily copy real job postings from external sources
-   **Responsive Design**: Works on desktop and mobile devices
-   **Pro Member Features**: Resume upload functionality (requires Pro membership)
-   **Modern UI**: Clean, professional interface with smooth interactions

## Technology Stack

-   **Frontend**: Next.js 15.5.0 with TypeScript
-   **React**: React 19 with new Concurrent Features
-   **Styling**: Tailwind CSS
-   **Authentication**: Clerk (Google & LinkedIn OAuth)
-   **Database**: Supabase (PostgreSQL)
-   **AI Integration**: OpenAI GPT-4o-mini
-   **Icons**: Lucide React
-   **State Management**: React hooks (useState, useEffect)
-   **Build Tool**: Next.js built-in bundler

## Getting Started

### Prerequisites

-   Node.js 20+ (recommended for Supabase compatibility)
-   npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd interview-help-ai-tool
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
interview-help-ai-tool/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── components/             # Reusable components
│   ├── JobButton.tsx      # Job selection button
│   ├── JobDescriptionBox.tsx # Comprehensive job description editor
│   └── UploadSection.tsx  # Resume upload section
├── mock/                   # Mock data
│   └── jobDescriptions.ts # Comprehensive job descriptions with requirements
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Components

### JobButton

-   Displays individual job titles as clickable buttons
-   Shows selected state with green background
-   Responsive grid layout

### JobDescriptionBox

-   **Single comprehensive textarea** for complete job descriptions
-   **Copy & paste friendly** - easily paste real job postings
-   **Includes all sections**: Job Title, Role Summary, Responsibilities, Requirements
-   **10,000 character limit** for detailed descriptions
-   **Monospace font** for better formatting preservation
-   **Character counter** with visual feedback

### UploadSection

-   Resume upload functionality (Pro feature)
-   Pro member badge
-   Upload icon and descriptive text

## Data Structure

Job descriptions are stored in `mock/jobDescriptions.ts` with comprehensive content:

```typescript
interface JobDescription {
    title: string;
    roleSummary: string; // Full job description including all sections
    responsibilities: string[]; // Legacy field, not used in new UI
}
```

## Available Jobs

Each job comes with a comprehensive template including:

-   **Custom Job Description** - Template for custom roles
-   **Business Analyst** - Complete BA job description with requirements
-   **Product Manager** - Full PM role description and qualifications
-   **Software Engineer** - Comprehensive SE job posting
-   **Marketing Specialist** - Detailed marketing role description
-   **Data Analyst** - Full DA job description with technical requirements
-   **Customer Service Representative** - Complete CSR role description
-   **Sales Representative** - Comprehensive sales role posting
-   **Human Resources Specialist** - Full HR role description
-   **UX/UI Designer** - Complete design role with requirements
-   **QA Engineer** - Comprehensive QA role description

## Usage

### Selecting a Job

1. Click on any job title button to select it
2. The comprehensive job description will appear in the textarea below
3. You can edit the description directly in the textarea

### Adding Your Own Job Description

1. Select "Custom Job Description" or any existing job
2. **Copy and paste** a real job posting from external sources
3. **Edit as needed** to match your specific requirements
4. The system will analyze the complete description to generate tailored questions

### Job Description Format

The textarea supports any format, but recommended structure includes:

```
Job Title: [Position Name]

Role Summary: [Brief overview of the role]

Responsibilities:
- [Key responsibility 1]
- [Key responsibility 2]
- [Key responsibility 3]

Requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]
```

## Customization

### Adding New Jobs

1. Add a new job description to `mock/jobDescriptions.ts`
2. Include a comprehensive description in the `roleSummary` field
3. The job will automatically appear in the selection grid

### Styling

-   Modify `tailwind.config.js` for theme customization
-   Update `app/globals.css` for custom CSS
-   Component-specific styles are in their respective component files

### Functionality

-   Modify `app/page.tsx` to add new features
-   Update the `handleGenerateQuestions` function to integrate with AI services
-   The system now captures the complete job description for better question generation

## Build and Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Start Production Server

```bash
npm start
# or
yarn start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
