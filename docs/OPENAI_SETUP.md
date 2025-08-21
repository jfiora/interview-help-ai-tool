# 🤖 OpenAI API Integration Setup Guide

This guide will walk you through setting up OpenAI API integration for the Interview Help AI Tool.

## 📋 **Prerequisites**

-   Node.js 18+ installed
-   Next.js project set up
-   OpenAI account (free tier available)
-   Basic understanding of environment variables

## 🚀 **Quick Setup (5 minutes)**

### **1. Install Dependencies**

```bash
npm install openai
```

### **2. Set Environment Variables**

Copy `env.example` to `.env.local` and add your OpenAI API key:

```bash
cp env.example .env.local
```

Edit `.env.local`:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### **3. Test the Integration**

The application is now ready to use OpenAI! Try generating questions on the main page.

## 🔑 **Getting Your OpenAI API Key**

### **Step 1: Create OpenAI Account**

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Click "Sign Up" or "Log In"
3. Complete account verification

### **Step 2: Access API Keys**

1. Navigate to [API Keys](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Give it a descriptive name (e.g., "Interview Tool Dev")
4. Copy the generated key (starts with `sk-`)

### **Step 3: Set Usage Limits**

1. Go to [Usage Limits](https://platform.openai.com/account/billing/overview)
2. Set spending limits to control costs
3. Monitor usage in the dashboard

## ⚙️ **Configuration Options**

### **AI Models Available**

| Model                 | Use Case                    | Cost                        | Quality    |
| --------------------- | --------------------------- | --------------------------- | ---------- |
| `gpt-4-turbo-preview` | Best quality, complex tasks | $0.01/$0.03 per 1K tokens   | ⭐⭐⭐⭐⭐ |
| `gpt-4`               | High quality, general use   | $0.03/$0.06 per 1K tokens   | ⭐⭐⭐⭐⭐ |
| `gpt-3.5-turbo`       | Fast, cost-effective        | $0.001/$0.002 per 1K tokens | ⭐⭐⭐⭐   |

### **Environment Variables**

```env
# Required
OPENAI_API_KEY=your_api_key

# Optional
DEFAULT_AI_MODEL=gpt-4-turbo-preview
MAX_TOKENS_PER_REQUEST=4000
AI_TEMPERATURE=0.7
```

## 🏗️ **Architecture Overview**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Routes    │    │   OpenAI API    │
│   Components    │───▶│   (/api/ai/*)   │───▶│   (External)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Hooks   │    │   Validation    │    │   Response      │
│   (useAI)       │    │   & Sanitization│    │   Processing    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 **API Endpoints**

### **Generate Interview Questions**

```typescript
POST /api/ai/generate-questions
{
  "jobTitle": "Software Engineer",
  "jobDescription": "We are seeking...",
  "model": "gpt-4-turbo-preview"
}
```

### **Generate Sample Answers**

```typescript
POST /api/ai/generate-answer
{
  "jobTitle": "Software Engineer",
  "question": "What is your experience with React?",
  "questionType": "technical",
  "difficultyLevel": "medium",
  "model": "gpt-4-turbo-preview"
}
```

### **Improve Job Description**

```typescript
POST /api/ai/improve-description
{
  "jobDescription": "Current description...",
  "model": "gpt-4-turbo-preview"
}
```

### **Generate Follow-up Questions**

```typescript
POST /api/ai/generate-follow-up-questions
{
  "originalQuestion": "Tell me about a challenge...",
  "candidateAnswer": "I faced this situation...",
  "jobTitle": "Software Engineer",
  "model": "gpt-4-turbo-preview"
}
```

## 🎯 **Usage Examples**

### **Basic Question Generation**

```typescript
import { useQuestionGeneration } from '../hooks/useAI';

function MyComponent() {
    const { generateQuestions, isLoading, questions } = useQuestionGeneration();

    const handleGenerate = async () => {
        try {
            const questions = await generateQuestions(
                'Data Analyst',
                'We are seeking a data analyst...'
            );
            console.log('Generated questions:', questions);
        } catch (error) {
            console.error('Failed to generate questions:', error);
        }
    };

    return (
        <button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Questions'}
        </button>
    );
}
```

### **Advanced Usage with Custom Model**

```typescript
import { useAI, AI_MODELS } from '../hooks/useAI';

function AdvancedComponent() {
    const { generateQuestions, improveDescription } = useAI();

    const handleAdvancedGeneration = async () => {
        // Use GPT-4 for high-quality questions
        const questions = await generateQuestions(
            'Product Manager',
            'Job description...',
            AI_MODELS.GPT_4
        );

        // Improve the job description
        const improved = await improveDescription(
            'Current description...',
            AI_MODELS.GPT_4_TURBO
        );
    };
}
```

## 🛡️ **Security & Best Practices**

### **Input Validation**

-   All inputs are sanitized using `sanitizePromptInput()`
-   Maximum input length: 10,000 characters
-   HTML tags are stripped for security

### **Rate Limiting**

-   Consider implementing rate limiting for production
-   Monitor API usage and costs
-   Set spending limits in OpenAI dashboard

### **Error Handling**

-   Comprehensive error handling in all API routes
-   User-friendly error messages
-   Detailed logging for debugging

### **Cost Management**

-   Use appropriate models for different use cases
-   Monitor token usage
-   Implement caching for repeated requests

## 📊 **Cost Estimation**

### **Typical Usage Costs**

| Feature              | Input Tokens | Output Tokens | Cost (GPT-4 Turbo) |
| -------------------- | ------------ | ------------- | ------------------ |
| Generate 5 questions | ~500         | ~800          | ~$0.013            |
| Generate 1 answer    | ~300         | ~400          | ~$0.007            |
| Improve description  | ~800         | ~600          | ~$0.014            |

### **Monthly Cost Estimates**

| Usage Level | Questions/Month | Estimated Cost |
| ----------- | --------------- | -------------- |
| Light       | 100             | ~$2.60         |
| Medium      | 500             | ~$13.00        |
| Heavy       | 1000            | ~$26.00        |

## 🧪 **Testing & Development**

### **Local Development**

```bash
# Start development server
npm run dev

# Test AI endpoints
curl -X POST http://localhost:3000/api/ai/generate-questions \
  -H "Content-Type: application/json" \
  -d '{"jobTitle":"Test","jobDescription":"Test description"}'
```

### **Environment Testing**

```bash
# Test environment variables
node -e "console.log('OpenAI Key:', process.env.OPENAI_API_KEY ? 'Set' : 'Missing')"
```

### **Mock Data for Development**

```typescript
// Use mock data when OpenAI is not available
const MOCK_QUESTIONS = [
    {
        question: 'What is your experience with data analysis?',
        question_type: 'technical',
        difficulty_level: 'medium',
        category: 'Technical Skills',
        explanation: 'Assessing technical capabilities',
    },
];
```

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. "Missing OPENAI_API_KEY" Error**

```bash
# Solution: Check your .env.local file
cat .env.local | grep OPENAI_API_KEY
```

#### **2. API Rate Limits**

```bash
# Check OpenAI dashboard for rate limits
# Consider implementing exponential backoff
```

#### **3. Invalid Response Format**

```typescript
// OpenAI sometimes returns malformed JSON
// The library handles this with fallbacks
try {
  const questions = await generateQuestions(...);
} catch (error) {
  // Fallback to mock data or retry
}
```

### **Debug Mode**

```typescript
// Enable detailed logging
const DEBUG_MODE = process.env.NODE_ENV === 'development';

if (DEBUG_MODE) {
    console.log('OpenAI Request:', { jobTitle, jobDescription });
    console.log('OpenAI Response:', response);
}
```

## 📈 **Performance Optimization**

### **Caching Strategies**

```typescript
// Cache generated questions by job description hash
const questionCache = new Map();

const getCachedQuestions = (jobDescription: string) => {
    const hash = createHash(jobDescription);
    return questionCache.get(hash);
};
```

### **Batch Processing**

```typescript
// Generate multiple questions in parallel
const generateMultipleAnswers = async (questions: string[]) => {
  const promises = questions.map(q => generateAnswer(...));
  return Promise.all(promises);
};
```

### **Streaming Responses**

```typescript
// For long responses, consider streaming
const streamResponse = async (prompt: string) => {
    const stream = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        stream: true,
    });

    for await (const chunk of stream) {
        // Process chunks as they arrive
    }
};
```

## 🔮 **Future Enhancements**

### **Planned Features**

-   [ ] Conversation memory for follow-up questions
-   [ ] Multi-language support
-   [ ] Custom prompt templates
-   [ ] A/B testing for different prompts
-   [ ] Analytics dashboard for usage patterns

### **Advanced AI Features**

-   [ ] Voice-to-text for questions
-   [ ] Real-time interview simulation
-   [ ] Personalized learning paths
-   [ ] Industry-specific question banks

## 📚 **Additional Resources**

-   [OpenAI API Documentation](https://platform.openai.com/docs)
-   [OpenAI Pricing](https://openai.com/pricing)
-   [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
-   [React Hooks Best Practices](https://react.dev/learn/reusing-logic-with-custom-hooks)

## 🆘 **Support**

### **Getting Help**

1. Check the troubleshooting section above
2. Review OpenAI API documentation
3. Check application logs for errors
4. Verify environment variables are set correctly

### **Community**

-   GitHub Issues for bug reports
-   OpenAI Community Forum
-   Next.js Discord community

---

**Note**: This integration provides a powerful AI-powered interview question generation system. Monitor your OpenAI usage and costs, and implement appropriate rate limiting for production use.
