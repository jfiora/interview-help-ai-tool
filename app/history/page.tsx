'use client';

import { useEffect, useState } from 'react';
import { useSessions } from '../../hooks/useSessions';
import { SessionSummary } from '../../types/database';
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
    }, [currentPage, listSessions]);

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

    const formatCost = (cost: number) => {
        return `$${cost.toFixed(4)}`;
    };

    if (isLoading && sessions.length === 0) {
        return (
            <main className='min-h-screen bg-gray-50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                    <div className='flex flex-col items-center justify-center py-16'>
                        <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4'></div>
                        <p className='text-gray-600 text-lg'>
                            Loading sessions...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className='min-h-screen bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Header */}
                <div className='mb-8'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-900'>
                                Q&A Session History
                            </h1>
                            <p className='mt-2 text-gray-600'>
                                View and manage your previously generated
                                interview questions and answers
                            </p>
                        </div>
                        <Link
                            href='/'
                            className='bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
                        >
                            Create New Session
                        </Link>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className='mb-6 bg-red-50 border border-red-200 rounded-md p-4'>
                        <div className='flex'>
                            <div className='flex-shrink-0'>
                                <svg
                                    className='h-5 w-5 text-red-400'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </div>
                            <div className='ml-3'>
                                <h3 className='text-sm font-medium text-red-800'>
                                    Error loading sessions:
                                </h3>
                                <p className='mt-1 text-sm text-red-700'>
                                    {error}
                                </p>
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
                    <div className='text-center py-16'>
                        <svg
                            className='mx-auto h-12 w-12 text-gray-400'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                            />
                        </svg>
                        <h3 className='mt-2 text-sm font-medium text-gray-900'>
                            No sessions yet
                        </h3>
                        <p className='mt-1 text-sm text-gray-500'>
                            Get started by creating your first Q&A session.
                        </p>
                        <div className='mt-6'>
                            <Link
                                href='/'
                                className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90'
                            >
                                Create Session
                            </Link>
                        </div>
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
                                        <div className='flex items-center space-x-3 mb-2'>
                                            <h3 className='text-lg font-semibold text-gray-900'>
                                                {session.session_name}
                                            </h3>
                                            <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                                                {session.model_used}
                                            </span>
                                        </div>

                                        <p className='text-gray-600 mb-3'>
                                            {session.job_title}
                                        </p>

                                        <div className='flex items-center space-x-6 text-sm text-gray-500'>
                                            <span>
                                                Created:{' '}
                                                {formatDate(session.created_at)}
                                            </span>
                                            <span>
                                                {session.total_questions}{' '}
                                                questions
                                            </span>
                                            <span>
                                                {session.total_answers} answers
                                            </span>
                                            <span>
                                                Cost:{' '}
                                                {formatCost(
                                                    session.estimated_cost
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex items-center space-x-2'>
                                        <Link
                                            href={`/history/${session.id}`}
                                            className='bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200'
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDeleteSession(session.id)
                                            }
                                            disabled={
                                                deletingSession === session.id
                                            }
                                            className='bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50'
                                        >
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
                    <div className='mt-8 flex items-center justify-between'>
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
                )}
            </div>
        </main>
    );
}
