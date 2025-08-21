import OpenAI from 'openai';
import {
    GeneratedQuestion,
    GeneratedAnswer,
    JobDescriptionImprovement,
    FollowUpQuestion,
    AI_MODELS,
    AIModel,
} from '../types/openai';

// =====================================================
// OpenAI Client Configuration
// =====================================================

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
    if (openaiClient) {
        return openaiClient;
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        throw new Error(
            'Missing OPENAI_API_KEY environment variable. Please check your .env.local file.'
        );
    }

    openaiClient = new OpenAI({
        apiKey: apiKey,
    });

    return openaiClient;
}

// =====================================================
// Prompt Templates
// =====================================================

export const PROMPT_TEMPLATES = {
    GENERATE_QUESTIONS: `Generate 5-7 interview questions for this job:

Job Title: {jobTitle}
Job Description: {jobDescription}

Return ONLY a JSON array with this exact format:
[
  {
    "question": "Question text here",
    "question_type": "technical",
    "difficulty_level": "medium",
    "category": "Technical Skills",
    "explanation": "Brief explanation"
  }
]

Question types: technical, behavioral, situational, general
Difficulty levels: easy, medium, hard
Categories: Technical Skills, Problem Solving, Communication, Leadership, etc.`,

    GENERATE_ANSWERS: `You are an expert interview coach. Based on the following interview question and job context, provide a comprehensive sample answer.

Job Title: {jobTitle}
Question: {question}
Question Type: {questionType}
Difficulty Level: {difficultyLevel}

Provide a sample answer that:
1. Demonstrates relevant experience and skills
2. Uses the STAR method for behavioral questions
3. Shows problem-solving approach for technical questions
4. Includes specific examples and metrics when possible
5. Is appropriate for the difficulty level

Format the response as JSON:
{
  "answer_text": "Comprehensive answer here...",
  "answer_type": "model",
  "key_points": [
    "Key point 1",
    "Key point 2",
    "Key point 3"
  ],
  "tips": "Additional tips for answering this type of question"
}`,

    IMPROVE_JOB_DESCRIPTION: `You are an expert HR professional. Review and improve the following job description to make it more comprehensive and professional.

Current Job Description:
{jobDescription}

Please improve the description by:
1. Adding missing sections if needed (Requirements, Experience Level, etc.)
2. Making responsibilities more specific and actionable
3. Adding relevant requirements and qualifications
4. Improving clarity and professional tone
5. Ensuring it follows standard job posting format

Return the improved description in the same format, maintaining the existing structure but enhancing the content.`,

    GENERATE_FOLLOW_UP_QUESTIONS: `Based on the candidate's answer to the interview question, generate 2-3 follow-up questions to dig deeper.

Original Question: {originalQuestion}
Candidate's Answer: {candidateAnswer}
Job Context: {jobTitle}

Generate follow-up questions that:
1. Explore specific details mentioned in their answer
2. Challenge assumptions or test depth of knowledge
3. Move from general to specific examples
4. Assess critical thinking and problem-solving skills

Return as JSON array:
[
  {
    "question": "Follow-up question text",
    "reasoning": "Why this follow-up question is valuable",
    "difficulty_level": "easy|medium|hard"
  }
]`,
} as const;

// =====================================================
// Core AI Functions
// =====================================================

export async function generateInterviewQuestions(
    jobTitle: string,
    jobDescription: string,
    model: AIModel = AI_MODELS.GPT_4_TURBO
): Promise<GeneratedQuestion[]> {
    try {
        const prompt = PROMPT_TEMPLATES.GENERATE_QUESTIONS.replace(
            '{jobTitle}',
            jobTitle
        ).replace('{jobDescription}', jobDescription);

        const completion = await getOpenAIClient().chat.completions.create({
            model,
            messages: [
                {
                    role: 'system',
                    content:
                        'You are an expert HR professional and interview coach. Always respond with valid JSON.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 2000,
        });

        const response = completion.choices[0]?.message?.content;
        if (!response) {
            throw new Error('No response from OpenAI');
        }

        console.log('Raw OpenAI response:', response);
        console.log('Response type:', typeof response);
        console.log('Response length:', response.length);

        // Extract JSON content from markdown code blocks if present
        let jsonContent = response;
        if (response.includes('```json')) {
            const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
            if (jsonMatch) {
                jsonContent = jsonMatch[1].trim();
                console.log('Extracted JSON content:', jsonContent);
            }
        } else if (response.includes('```')) {
            // Handle case where there are code blocks but no language specified
            const jsonMatch = response.match(/```\s*([\s\S]*?)\s*```/);
            if (jsonMatch) {
                jsonContent = jsonMatch[1].trim();
                console.log('Extracted content from code block:', jsonContent);
            }
        }

        // Parse the JSON response
        let questions: GeneratedQuestion[];
        try {
            questions = JSON.parse(jsonContent) as GeneratedQuestion[];
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            console.error('Failed to parse response:', response);
            console.error('Attempted to parse:', jsonContent);
            throw new Error(
                `Invalid JSON response from OpenAI: ${
                    parseError instanceof Error
                        ? parseError.message
                        : 'Unknown parse error'
                }`
            );
        }

        // Validate the response structure
        if (!Array.isArray(questions)) {
            throw new Error('Invalid response format from OpenAI');
        }

        return questions;
    } catch (error) {
        console.error('Error generating interview questions:', error);
        throw new Error('Failed to generate interview questions');
    }
}

// =====================================================
// Answer Generation
// =====================================================

export async function generateSampleAnswer(
    jobTitle: string,
    question: string,
    questionType: string,
    difficultyLevel: string,
    model: AIModel = AI_MODELS.GPT_4_TURBO
): Promise<GeneratedAnswer> {
    try {
        const prompt = PROMPT_TEMPLATES.GENERATE_ANSWERS.replace(
            '{jobTitle}',
            jobTitle
        )
            .replace('{question}', question)
            .replace('{questionType}', questionType)
            .replace('{difficultyLevel}', difficultyLevel);

        const completion = await getOpenAIClient().chat.completions.create({
            model,
            messages: [
                {
                    role: 'system',
                    content:
                        'You are an expert interview coach. Always respond with valid JSON.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });

        const response = completion.choices[0]?.message?.content;
        if (!response) {
            throw new Error('No response from OpenAI');
        }

        const answer = JSON.parse(response) as GeneratedAnswer;

        // Validate required fields
        if (!answer.answer_text || !answer.key_points) {
            throw new Error('Invalid answer format from OpenAI');
        }

        return answer;
    } catch (error) {
        console.error('Error generating sample answer:', error);
        throw new Error('Failed to generate sample answer');
    }
}

// =====================================================
// Job Description Improvement
// =====================================================

export async function improveJobDescription(
    jobDescription: string,
    model: AIModel = AI_MODELS.GPT_4_TURBO
): Promise<string> {
    try {
        const prompt = PROMPT_TEMPLATES.IMPROVE_JOB_DESCRIPTION.replace(
            '{jobDescription}',
            jobDescription
        );

        const completion = await getOpenAIClient().chat.completions.create({
            model,
            messages: [
                {
                    role: 'system',
                    content:
                        'You are an expert HR professional. Improve the job description while maintaining the existing format.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.5,
            max_tokens: 2000,
        });

        const response = completion.choices[0]?.message?.content;
        if (!response) {
            throw new Error('No response from OpenAI');
        }

        return response;
    } catch (error) {
        console.error('Error improving job description:', error);
        throw new Error('Failed to improve job description');
    }
}

// =====================================================
// Follow-up Question Generation
// =====================================================

export async function generateFollowUpQuestions(
    originalQuestion: string,
    candidateAnswer: string,
    jobTitle: string,
    model: AIModel = AI_MODELS.GPT_4_TURBO
): Promise<FollowUpQuestion[]> {
    try {
        const prompt = PROMPT_TEMPLATES.GENERATE_FOLLOW_UP_QUESTIONS.replace(
            '{originalQuestion}',
            originalQuestion
        )
            .replace('{candidateAnswer}', candidateAnswer)
            .replace('{jobTitle}', jobTitle);

        const completion = await getOpenAIClient().chat.completions.create({
            model,
            messages: [
                {
                    role: 'system',
                    content:
                        'You are an expert interviewer. Always respond with valid JSON.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });

        const response = completion.choices[0]?.message?.content;
        if (!response) {
            throw new Error('No response from OpenAI');
        }

        const followUpQuestions = JSON.parse(response) as FollowUpQuestion[];

        if (!Array.isArray(followUpQuestions)) {
            throw new Error('Invalid response format from OpenAI');
        }

        return followUpQuestions;
    } catch (error) {
        console.error('Error generating follow-up questions:', error);
        throw new Error('Failed to generate follow-up questions');
    }
}

// =====================================================
// Utility Functions
// =====================================================

export function validateOpenAIResponse(response: any): boolean {
    try {
        // Basic validation - can be enhanced based on specific needs
        return response && typeof response === 'object';
    } catch {
        return false;
    }
}

export function sanitizePromptInput(input: string): string {
    // Remove potentially harmful characters and limit length
    return input.replace(/[<>]/g, '').substring(0, 10000); // Limit to 10k characters
}

export function estimateTokenCount(text: string): number {
    // Rough estimation: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
}

export function calculateCost(
    model: AIModel,
    inputTokens: number,
    outputTokens: number
): number {
    // OpenAI pricing (as of 2024 - update as needed)
    const pricing = {
        [AI_MODELS.GPT_4]: { input: 0.03, output: 0.06 },
        [AI_MODELS.GPT_4_TURBO]: { input: 0.01, output: 0.03 },
        [AI_MODELS.GPT_3_5_TURBO]: { input: 0.001, output: 0.002 },
    };

    const modelPricing = pricing[model];
    if (!modelPricing) {
        throw new Error(`Unknown model: ${model}`);
    }

    return (
        (inputTokens / 1000) * modelPricing.input +
        (outputTokens / 1000) * modelPricing.output
    );
}
