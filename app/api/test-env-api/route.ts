import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({
                error: 'No API key found in API route',
                envVars: Object.keys(process.env).filter((key) =>
                    key.includes('OPENAI')
                ),
                allEnvVars: Object.keys(process.env).slice(0, 20), // First 20 env vars
            });
        }

        // Test OpenAI client creation in API route context
        const { OpenAI } = await import('openai');
        const openai = new OpenAI({
            apiKey: apiKey,
        });

        return NextResponse.json({
            success: true,
            message: 'Environment variable accessible in API route',
            apiKeyLength: apiKey.length,
            apiKeyPrefix: apiKey.substring(0, 7),
        });
    } catch (error) {
        console.error('API route env test error:', error);

        return NextResponse.json(
            {
                error: 'API route env test failed',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined,
            },
            { status: 500 }
        );
    }
}
