import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Test environment variable loading
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({
                error: 'No API key found',
                envVars: Object.keys(process.env).filter((key) =>
                    key.includes('OPENAI')
                ),
            });
        }

        // Test OpenAI client creation
        const { OpenAI } = await import('openai');
        const openai = new OpenAI({
            apiKey: apiKey,
        });

        // Test a simple API call
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: 'Say "Hello, OpenAI is working!"',
                },
            ],
            max_tokens: 10,
        });

        const response = completion.choices[0]?.message?.content;

        return NextResponse.json({
            success: true,
            message: 'OpenAI client is working',
            response: response,
            apiKeyLength: apiKey.length,
            apiKeyPrefix: apiKey.substring(0, 7),
        });
    } catch (error) {
        console.error('OpenAI test error:', error);

        return NextResponse.json(
            {
                error: 'OpenAI test failed',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined,
            },
            { status: 500 }
        );
    }
}
