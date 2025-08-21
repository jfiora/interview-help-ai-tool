import { NextRequest, NextResponse } from 'next/server';
import {
    generateSampleAnswer,
    sanitizePromptInput,
} from '../../../../lib/openai';

export async function POST(request: NextRequest) {
    try {
        const { jobTitle, question, questionType, difficultyLevel, model } =
            await request.json();

        // Validate input
        if (!jobTitle || !question || !questionType || !difficultyLevel) {
            return NextResponse.json(
                {
                    error: 'Job title, question, question type, and difficulty level are required',
                },
                { status: 400 }
            );
        }

        // Sanitize inputs
        const sanitizedTitle = sanitizePromptInput(jobTitle);
        const sanitizedQuestion = sanitizePromptInput(question);

        // Generate answer using OpenAI
        const answer = await generateSampleAnswer(
            sanitizedTitle,
            sanitizedQuestion,
            questionType,
            difficultyLevel,
            model
        );

        return NextResponse.json({
            success: true,
            data: answer,
            message: 'Sample answer generated successfully',
        });
    } catch (error) {
        console.error('Error in generate-answer API:', error);

        if (error instanceof Error) {
            return NextResponse.json(
                {
                    error: 'Failed to generate answer',
                    details: error.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed. Use POST to generate answers.' },
        { status: 405 }
    );
}
