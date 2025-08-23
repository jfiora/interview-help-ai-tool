import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        const { jobTitle, jobDescription } = await request.json();

        if (!jobTitle || !jobDescription) {
            return NextResponse.json(
                { error: 'Job title and description are required' },
                { status: 400 }
            );
        }

        const prompt = `Generate 5 interview questions for a ${jobTitle} position. For each question, also provide a comprehensive sample answer.

Job Description:
${jobDescription}

Generate questions in the following JSON format:
[
  {
    "question": "The interview question",
    "question_type": "technical|behavioral|situational",
    "difficulty_level": "easy|medium|hard",
    "category": "relevant category",
    "explanation": "brief explanation of what this question tests",
    "answer": {
      "answer_text": "A comprehensive sample answer that demonstrates expertise",
      "key_points": ["key point 1", "key point 2", "key point 3"],
      "tips": "Additional tips for answering this question effectively"
    }
  }
]

Ensure the questions are relevant to the job role and the answers are professional and comprehensive.`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are an expert HR professional and technical interviewer. Generate relevant interview questions with comprehensive sample answers.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 4000,
        });

        const responseText = completion.choices[0]?.message?.content;
        if (!responseText) {
            throw new Error('No response from OpenAI');
        }

        // Try to extract JSON from the response
        let questions;
        try {
            // Find JSON array in the response
            const jsonMatch = responseText.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                questions = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No JSON array found in response');
            }
        } catch (parseError) {
            console.error('Failed to parse OpenAI response:', responseText);
            throw new Error('Failed to parse generated questions');
        }

        // Validate the structure
        if (!Array.isArray(questions)) {
            throw new Error('Generated content is not an array');
        }

        // Ensure each question has the required structure
        const validatedQuestions = questions.map((q, index) => ({
            question: q.question || `Question ${index + 1}`,
            question_type: q.question_type || 'behavioral',
            difficulty_level: q.difficulty_level || 'medium',
            category: q.category || 'General',
            explanation: q.explanation || 'Interview question',
            answer: q.answer || {
                answer_text: 'Sample answer not generated',
                key_points: ['Key point 1'],
                tips: 'Additional tips not available',
            },
        }));

        return NextResponse.json({
            success: true,
            data: validatedQuestions,
            message: 'Questions and answers generated successfully',
        });
    } catch (error) {
        console.error('Error generating questions:', error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to generate questions',
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed. Use POST to generate questions.' },
        { status: 405 }
    );
}
