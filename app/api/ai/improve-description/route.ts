import { NextRequest, NextResponse } from 'next/server';
import {
    improveJobDescription,
    sanitizePromptInput,
} from '../../../../lib/openai';

export async function POST(request: NextRequest) {
    try {
        const { jobDescription, model } = await request.json();

        // Validate input
        if (!jobDescription) {
            return NextResponse.json(
                { error: 'Job description is required' },
                { status: 400 }
            );
        }

        // Sanitize input
        const sanitizedDescription = sanitizePromptInput(jobDescription);

        // Improve description using OpenAI
        const improvedDescription = await improveJobDescription(
            sanitizedDescription,
            model
        );

        return NextResponse.json({
            success: true,
            data: {
                improvedDescription,
                originalLength: jobDescription.length,
                improvedLength: improvedDescription.length,
            },
            message: 'Job description improved successfully',
        });
    } catch (error) {
        console.error('Error in improve-description API:', error);

        if (error instanceof Error) {
            return NextResponse.json(
                {
                    error: 'Failed to improve job description',
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
        { error: 'Method not allowed. Use POST to improve descriptions.' },
        { status: 405 }
    );
}
