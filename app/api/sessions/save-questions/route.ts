import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';
import { Database } from '../../../../types/database';

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        // Get the authenticated user
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        const { session_id, questions } = await request.json();

        // Validate input
        if (!session_id || !questions || !Array.isArray(questions)) {
            return NextResponse.json(
                { error: 'Session ID and questions array are required' },
                { status: 400 }
            );
        }

        // Verify user owns the session
        const { data: session, error: sessionError } = await supabase
            .from('qa_sessions')
            .select('id')
            .eq('id', session_id)
            .eq('user_id', userId)
            .single();

        if (sessionError || !session) {
            return NextResponse.json(
                { error: 'Session not found or access denied' },
                { status: 403 }
            );
        }

        // Save questions using the database function
        const { data: questionsCount, error } = await supabase.rpc(
            'add_session_questions',
            {
                p_session_id: session_id,
                p_questions: questions,
            }
        );

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
            message: `${questionsCount} questions saved successfully`,
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
