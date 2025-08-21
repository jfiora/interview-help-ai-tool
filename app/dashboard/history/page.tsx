'use client';

import { useEffect, useState } from 'react';
import { useSessions } from '../../../hooks/useSessions';
import { SessionSummary } from '../../../types/database';
import {
    Trash2,
    Eye,
    Calendar,
    MessageSquare,
    DollarSign,
    Clock,
} from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
    const {
        sessions,
        pagination,
        isLoading,
        error,
        listSessions,
        deleteSession,
        clearError,
    } = useSessions();

    const [currentPage, setCurrentPage] = useState(1);
    const [deletingSession, setDeletingSession] = useState<string | null>(null);

    useEffect(() => {
        listSessions(currentPage, 10);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteSession = async (sessionId: string) => {
        if (
            confirm(
                'Are you sure you want to delete this session? This action cannot be undone.'
            )
        ) {
            setDeletingSession(sessionId);
            const success = await deleteSession(sessionId);
            if (success) {
                // Refresh the current page
                listSessions(currentPage, 10);
            }
            setDeletingSession(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (isLoading && sessions.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-16'>
                <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4'></div>
                <p className='text-gray-600 text-lg'>Loading sessions...</p>
            </div>
        );
    }

    return (
        <div className='space-y-8'>
            {/* Header */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900'>
                            Q&A Session History
                        </h1>
                        <p className='mt-2 text-gray-600'>
                            View and manage your previously generated interview
                            questions and answers
                        </p>
                    </div>
                    <Link
                        href='/dashboard/generator'
                        className='bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
                    >
                        Create New Session
                    </Link>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className='bg-red-50 border border-red-200 rounded-md p-4'>
                    <div className='flex'>
                        <div className='flex-shrink-0'>
                            <div className='w-5 h-5 bg-red-400 rounded-full flex items-center justify-center'>
                                <span className='text-white text-xs font-bold'>
                                    !
                                </span>
                            </div>
                        </div>
                        <div className='ml-3'>
                            <h3 className='text-sm font-medium text-red-800'>
                                Error loading sessions:
                            </h3>
                            <p className='mt-1 text-sm text-red-700'>{error}</p>
                        </div>
                        <div className='ml-auto pl-3'>
                            <button
                                onClick={clearError}
                                className='bg-red-50 px-2 py-1 rounded-md text-sm font-medium text-red-800 hover:bg-red-100'
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sessions List */}
            {sessions.length === 0 ? (
                <div className='bg-white rounded-lg border border-gray-200 p-12 text-center'>
                    <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <MessageSquare className='w-8 h-8 text-gray-400' />
                    </div>
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                        No sessions yet
                    </h3>
                    <p className='text-gray-500 mb-6'>
                        Get started by creating your first Q&A session.
                    </p>
                    <Link
                        href='/dashboard/generator'
                        className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90'
                    >
                        Create Session
                    </Link>
                </div>
            ) : (
                <div className='space-y-4'>
                    {sessions.map((session) => (
                        <div
                            key={session.id}
                            className='bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200'
                        >
                            <div className='flex items-start justify-between'>
                                <div className='flex-1'>
                                    <div className='flex items-center space-x-3 mb-3'>
                                        <h3 className='text-lg font-semibold text-gray-900'>
                                            {session.session_name}
                                        </h3>
                                    </div>

                                    <p className='text-gray-600 mb-4'>
                                        {session.job_title}
                                    </p>

                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                                        <div className='flex items-center text-gray-500'>
                                            <Calendar className='w-4 h-4 mr-2' />
                                            <span>
                                                {formatDate(session.created_at)}
                                            </span>
                                        </div>
                                        <div className='flex items-center text-gray-500'>
                                            <MessageSquare className='w-4 h-4 mr-2' />
                                            <span>
                                                {session.total_questions}{' '}
                                                questions
                                            </span>
                                        </div>
                                        <div className='flex items-center text-gray-500'>
                                            <Clock className='w-4 h-4 mr-2' />
                                            <span>
                                                {session.total_answers} answers
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-center space-x-2'>
                                    <Link
                                        href={`/dashboard/history/${session.id}`}
                                        className='bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center'
                                    >
                                        <Eye className='w-4 h-4 mr-2' />
                                        View
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleDeleteSession(session.id)
                                        }
                                        disabled={
                                            deletingSession === session.id
                                        }
                                        className='bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center'
                                    >
                                        <Trash2 className='w-4 h-4 mr-2' />
                                        {deletingSession === session.id
                                            ? 'Deleting...'
                                            : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className='bg-white rounded-lg border border-gray-200 p-6'>
                    <div className='flex items-center justify-between'>
                        <div className='text-sm text-gray-700'>
                            Showing page {pagination.page} of{' '}
                            {pagination.totalPages}({pagination.total} total
                            sessions)
                        </div>

                        <div className='flex space-x-2'>
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className='px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                Previous
                            </button>

                            {Array.from(
                                { length: pagination.totalPages },
                                (_, i) => i + 1
                            ).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-2 border rounded-md text-sm font-medium ${
                                        page === currentPage
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === pagination.totalPages}
                                className='px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
