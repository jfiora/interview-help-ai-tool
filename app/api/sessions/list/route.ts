import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../../types/database';

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const offset = (page - 1) * limit;

        // Get sessions using the view
        const { data: sessions, error } = await supabase
            .from('session_summaries')
            .select('*')
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error('Error fetching sessions:', error);
            return NextResponse.json(
                { error: 'Failed to fetch sessions' },
                { status: 500 }
            );
        }

        // Get total count
        const { count } = await supabase
            .from('qa_sessions')
            .select('*', { count: 'exact', head: true });

        return NextResponse.json({
            success: true,
            data: sessions || [],
            pagination: {
                page,
                limit,
                total: count || 0,
                totalPages: Math.ceil((count || 0) / limit)
            },
            message: 'Sessions retrieved successfully'
        });

    } catch (error) {
        console.error('Error in list sessions API:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}

export async function POST() {
    return NextResponse.json(
        { error: 'Method not allowed. Use GET to list sessions.' },
        { status: 405 }
    );
}
