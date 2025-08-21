import { NextRequest, NextResponse } from 'next/server';
import {
    generateFollowUpQuestions,
    sanitizePromptInput,
} from '../../../../lib/openai';

export async function POST(request: NextRequest) {
    try {
        const { originalQuestion, candidateAnswer, jobTitle, model } =
            await request.json();

        // Validate input
        if (!originalQuestion || !candidateAnswer || !jobTitle) {
            return NextResponse.json(
                {
                    error: 'Original question, candidate answer, and job title are required',
                },
                { status: 400 }
            );
        }

        // Sanitize inputs
        const sanitizedQuestion = sanitizePromptInput(originalQuestion);
        const sanitizedAnswer = sanitizePromptInput(candidateAnswer);
        const sanitizedTitle = sanitizePromptInput(jobTitle);

        // Generate follow-up questions using OpenAI
        const followUpQuestions = await generateFollowUpQuestions(
            sanitizedQuestion,
            sanitizedAnswer,
            sanitizedTitle,
            model
        );

        return NextResponse.json({
            success: true,
            data: followUpQuestions,
            message: 'Follow-up questions generated successfully',
        });
    } catch (error) {
        console.error('Error in generate-follow-up-questions API:', error);

        if (error instanceof Error) {
            return NextResponse.json(
                {
                    error: 'Failed to generate follow-up questions',
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
        {
            error: 'Method not allowed. Use POST to generate follow-up questions.',
        },
        { status: 405 }
    );
}
