import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'No API key found' });
        }

        const { OpenAI } = await import('openai');
        const openai = new OpenAI({
            apiKey: apiKey,
        });

        // Test with a very simple prompt
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a helpful assistant. Respond with valid JSON only.',
                },
                {
                    role: 'user',
                    content:
                        'Generate 2 simple interview questions for a Data Analyst role. Return as JSON array with format: [{"question": "text", "type": "technical"}]',
                },
            ],
            temperature: 0.1,
            max_tokens: 200,
        });

        const response = completion.choices[0]?.message?.content;

        return NextResponse.json({
            success: true,
            rawResponse: response,
            parsedResponse: response ? JSON.parse(response) : null,
        });
    } catch (error) {
        console.error('Simple test error:', error);

        return NextResponse.json(
            {
                error: 'Simple test failed',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined,
            },
            { status: 500 }
        );
    }
}
