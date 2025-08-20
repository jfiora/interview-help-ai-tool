# Interview Help AI Tool

A Next.js application that allows users to select job descriptions and generate tailored interview questions. The interface includes a job selection grid, editable job description box, and resume upload functionality.

## Features

-   **Job Selection Grid**: Click on different job titles to select them
-   **Editable Job Descriptions**: Modify job descriptions with a character limit counter
-   **Responsive Design**: Works on desktop and mobile devices
-   **Pro Member Features**: Resume upload functionality (requires Pro membership)
-   **Modern UI**: Clean, professional interface with smooth interactions

## Technology Stack

-   **Frontend**: Next.js 14 with TypeScript
-   **Styling**: Tailwind CSS
-   **State Management**: React hooks (useState)
-   **Build Tool**: Next.js built-in bundler

## Getting Started

### Prerequisites

-   Node.js 18+
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
│   ├── JobDescriptionBox.tsx # Job description display/editor
│   └── UploadSection.tsx  # Resume upload section
├── mock/                   # Mock data
│   └── jobDescriptions.ts # Job descriptions data
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

-   Displays selected job description
-   Editable role summary with character counter
-   Shows responsibilities list
-   5000 character limit

### UploadSection

-   Resume upload functionality (Pro feature)
-   Pro member badge
-   Upload icon and descriptive text

## Data Structure

Job descriptions are stored in `mock/jobDescriptions.ts` with the following structure:

```typescript
interface JobDescription {
    title: string;
    roleSummary: string;
    responsibilities: string[];
}
```

## Available Jobs

-   Custom Job Description
-   Business Analyst
-   Product Manager
-   Software Engineer
-   Marketing Specialist
-   Data Analyst
-   Customer Service Representative
-   Sales Representative
-   Human Resources Specialist
-   UX/UI Designer
-   QA Engineer

## Customization

### Adding New Jobs

1. Add a new job description to `mock/jobDescriptions.ts`
2. The job will automatically appear in the selection grid

### Styling

-   Modify `tailwind.config.js` for theme customization
-   Update `app/globals.css` for custom CSS
-   Component-specific styles are in their respective component files

### Functionality

-   Modify `app/page.tsx` to add new features
-   Update the `handleGenerateQuestions` function to integrate with AI services

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
