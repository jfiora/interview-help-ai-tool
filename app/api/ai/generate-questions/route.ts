import { NextRequest, NextResponse } from 'next/server';
import {
    generateInterviewQuestions,
    sanitizePromptInput,
} from '../../../../lib/openai';

export async function POST(request: NextRequest) {
    try {
        const { jobTitle, jobDescription, model } = await request.json();

        console.log('Received request:', {
            jobTitle,
            jobDescription: jobDescription?.substring(0, 100),
            model,
        });

        // Validate input
        if (!jobTitle || !jobDescription) {
            return NextResponse.json(
                { error: 'Job title and description are required' },
                { status: 400 }
            );
        }

        // Sanitize inputs
        const sanitizedTitle = sanitizePromptInput(jobTitle);
        const sanitizedDescription = sanitizePromptInput(jobDescription);

        console.log('Sanitized inputs:', {
            sanitizedTitle,
            sanitizedDescription: sanitizedDescription?.substring(0, 100),
        });

        // Generate questions using OpenAI
        console.log('Calling generateInterviewQuestions...');
        const questions = await generateInterviewQuestions(
            sanitizedTitle,
            sanitizedDescription,
            model || 'gpt-4-turbo-preview' // Provide default model
        );

        console.log(
            'Successfully generated questions:',
            questions?.length || 0
        );

        return NextResponse.json({
            success: true,
            data: questions,
            message: 'Interview questions generated successfully',
        });
    } catch (error) {
        console.error('Error in generate-questions API:', error);

        if (error instanceof Error) {
            return NextResponse.json(
                {
                    error: 'Failed to generate questions',
                    details: error.message,
                    stack: error.stack,
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
        { error: 'Method not allowed. Use POST to generate questions.' },
        { status: 405 }
    );
}
