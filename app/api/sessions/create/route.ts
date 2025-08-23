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

        const {
            session_name,
            job_title,
            job_description,
            model_used,
            linkedin_profile,
        } = await request.json();

        // Validate input
        if (!session_name || !job_title || !job_description || !model_used) {
            return NextResponse.json(
                {
                    error: 'Session name, job title, job description, and model are required',
                },
                { status: 400 }
            );
        }

        // Create session using the database function with user ID
        console.log('Creating session with data:', {
            p_session_name: session_name,
            p_job_title: job_title,
            p_job_description: job_description,
            p_model_used: model_used,
            p_user_id: userId,
            p_linkedin_profile: linkedin_profile || null,
        });

        const { data: sessionId, error } = await (supabase as any).rpc(
            'create_qa_session',
            {
                p_session_name: session_name,
                p_job_title: job_title,
                p_job_description: job_description,
                p_model_used: model_used,
                p_user_id: userId,
                p_linkedin_profile: linkedin_profile || null,
            }
        );

        if (error) {
            console.error('Error creating session:', error);
            return NextResponse.json(
                { error: 'Failed to create session' },
                { status: 500 }
            );
        }

        // Get the created session
        const { data: session, error: fetchError } = await supabase
            .from('qa_sessions')
            .select('*')
            .eq('id', sessionId)
            .single();

        if (fetchError) {
            console.error('Error fetching created session:', fetchError);
            return NextResponse.json(
                { error: 'Session created but failed to retrieve' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: session,
            message: 'Q&A session created successfully',
        });
    } catch (error) {
        console.error('Error in create session API:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed. Use POST to create a session.' },
        { status: 405 }
    );
}
