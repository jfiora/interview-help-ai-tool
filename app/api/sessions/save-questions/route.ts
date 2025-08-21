import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../../types/database';

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const { session_id, questions } = await request.json();

        // Validate input
        if (!session_id || !questions || !Array.isArray(questions)) {
            return NextResponse.json(
                { error: 'Session ID and questions array are required' },
                { status: 400 }
            );
        }

        // Save questions using the database function
        const { data: questionsCount, error } = await supabase.rpc('add_session_questions', {
            p_session_id: session_id,
            p_questions: questions
        });

        if (error) {
            console.error('Error saving questions:', error);
            return NextResponse.json(
                { error: 'Failed to save questions' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: { questions_count: questionsCount },
            message: `${questionsCount} questions saved successfully`
        });

    } catch (error) {
        console.error('Error in save questions API:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed. Use POST to save questions.' },
        { status: 405 }
    );
}
