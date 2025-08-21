import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../../types/database';

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const { session_id, answers } = await request.json();

        // Validate input
        if (!session_id || !answers || !Array.isArray(answers)) {
            return NextResponse.json(
                { error: 'Session ID and answers array are required' },
                { status: 400 }
            );
        }

        // Save answers using the database function
        const { data: answersCount, error } = await supabase.rpc('add_session_answers', {
            p_session_id: session_id,
            p_answers: answers
        });

        if (error) {
            console.error('Error saving answers:', error);
            return NextResponse.json(
                { error: 'Failed to save answers' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: { answers_count: answersCount },
            message: `${answersCount} answers saved successfully`
        });

    } catch (error) {
        console.error('Error in save answers API:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed. Use POST to save answers.' },
        { status: 405 }
    );
}
