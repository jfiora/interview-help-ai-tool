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

        // Test with the exact same prompt and parameters as generateInterviewQuestions
        const prompt = `Generate 5-7 interview questions for this job:

Job Title: Data Analyst
Job Description: We are seeking a Data Analyst to join our team. This entry-to-mid-level position is a wonderful opportunity for those who are passionate about data-driven insights and are looking to broaden their experience in data analysis.

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
Categories: Technical Skills, Problem Solving, Communication, Leadership, etc.`;

        console.log('Sending prompt to OpenAI...');

        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
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
            return NextResponse.json({ error: 'No response from OpenAI' });
        }

        console.log('Raw OpenAI response:', response);
        console.log('Response type:', typeof response);
        console.log('Response length:', response.length);

        // Try to parse the response
        let questions;
        try {
            questions = JSON.parse(response);
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            return NextResponse.json({
                error: 'JSON parse failed',
                parseError:
                    parseError instanceof Error
                        ? parseError.message
                        : 'Unknown parse error',
                rawResponse: response,
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Minimal test successful',
            questionsCount: Array.isArray(questions)
                ? questions.length
                : 'Not an array',
            questions: questions,
            rawResponse: response,
        });
    } catch (error) {
        console.error('Minimal test error:', error);

        return NextResponse.json(
            {
                error: 'Minimal test failed',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined,
            },
            { status: 500 }
        );
    }
}
