import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';
import { Database, QASession } from '../../../../types/database';

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Get the authenticated user
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        const { id: sessionId } = await params;

        if (!sessionId) {
            return NextResponse.json(
                { error: 'Session ID is required' },
                { status: 400 }
            );
        }

        // Get complete session data using the view
        const { data: sessionData, error } = await supabase
            .from('complete_qa_sessions')
            .select('*')
            .eq('session_id', sessionId)
            .order('question_order', { ascending: true });

        if (error) {
            console.error('Error fetching session:', error);
            return NextResponse.json(
                { error: 'Failed to fetch session' },
                { status: 500 }
            );
        }

        if (!sessionData || sessionData.length === 0) {
            return NextResponse.json(
                { error: 'Session not found' },
                { status: 404 }
            );
        }

        // Get session metadata and verify user ownership
        const { data: sessionMeta, error: metaError } = await supabase
            .from('qa_sessions')
            .select('*')
            .eq('id', sessionId)
            .eq('user_id', userId)
            .single();

        if (metaError) {
            console.error('Error fetching session metadata:', metaError);
            return NextResponse.json(
                { error: 'Failed to fetch session metadata' },
                { status: 500 }
            );
        }

        // Structure the data for easier consumption
        const structuredData: {
            session: QASession;
            questions: Array<{
                question_text: string;
                question_type: string;
                difficulty_level: string;
                category: string;
                explanation: string | null;
                answer: {
                    answer_text: string;
                    key_points: string[];
                    tips: string | null;
                } | null;
            }>;
        } = {
            session: sessionMeta,
            questions: [],
        };

        // Group questions and answers
        const questionMap = new Map();
        sessionData.forEach((row) => {
            if (row.question_text) {
                if (!questionMap.has(row.question_order)) {
                    questionMap.set(row.question_order, {
                        question_text: row.question_text,
                        question_type: row.question_type,
                        difficulty_level: row.difficulty_level,
                        category: row.category,
                        explanation: row.explanation,
                        answer: null,
                    });
                }

                if (row.answer_text) {
                    questionMap.get(row.question_order).answer = {
                        answer_text: row.answer_text,
                        key_points: row.key_points,
                        tips: row.tips,
                    };
                }
            }
        });

        structuredData.questions = Array.from(questionMap.values());

        return NextResponse.json({
            success: true,
            data: structuredData,
            message: 'Session retrieved successfully',
        });
    } catch (error) {
        console.error('Error in get session API:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Get the authenticated user
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 500 }
            );
        }

        const { id: sessionId } = await params;

        if (!sessionId) {
            return NextResponse.json(
                { error: 'Session ID is required' },
                { status: 400 }
            );
        }

        // Delete the session (cascade will handle questions and answers) - only if user owns it
        const { error } = await supabase
            .from('qa_sessions')
            .delete()
            .eq('id', sessionId)
            .eq('user_id', userId);

        if (error) {
            console.error('Error deleting session:', error);
            return NextResponse.json(
                { error: 'Failed to delete session' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Session deleted successfully',
        });
    } catch (error) {
        console.error('Error in delete session API:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}

export async function POST() {
    return NextResponse.json(
        {
            error: 'Method not allowed. Use GET to retrieve or DELETE to remove a session.',
        },
        { status: 405 }
    );
}
