'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSessions } from '../../hooks/useSessions';
import {
    MessageSquare,
    History,
    TrendingUp,
    Clock,
    Plus,
    ArrowRight,
} from 'lucide-react';

export default function DashboardHome() {
    const { sessions, listSessions } = useSessions();
    const [recentSessions, setRecentSessions] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);

    useEffect(() => {
        listSessions(1, 5);
    }, [listSessions]);

    useEffect(() => {
        if (sessions.length > 0) {
            setRecentSessions(sessions.length);
            const total = sessions.reduce(
                (sum, session) => sum + session.total_questions,
                0
            );
            setTotalQuestions(total);
        }
    }, [sessions]);

    const stats = [
        {
            name: 'Total Sessions',
            value: recentSessions,
            icon: History,
            color: 'bg-blue-500',
            href: '/dashboard/history',
        },
        {
            name: 'Total Questions',
            value: totalQuestions,
            icon: MessageSquare,
            color: 'bg-green-500',
            href: '/dashboard/history',
        },
        {
            name: 'This Month',
            value: sessions.filter((s) => {
                const sessionDate = new Date(s.created_at);
                const now = new Date();
                return (
                    sessionDate.getMonth() === now.getMonth() &&
                    sessionDate.getFullYear() === now.getFullYear()
                );
            }).length,
            icon: TrendingUp,
            color: 'bg-purple-500',
            href: '/dashboard/history',
        },
    ];

    const quickActions = [
        {
            name: 'Generate Q&A',
            description: 'Create new interview questions and answers',
            icon: Plus,
            href: '/dashboard/generator',
            color: 'bg-primary hover:bg-primary/90',
        },
        {
            name: 'View History',
            description: 'Browse your previous Q&A sessions',
            icon: History,
            href: '/dashboard/history',
            color: 'bg-gray-600 hover:bg-gray-700',
        },
        {
            name: 'Settings',
            description: 'Configure your preferences and account',
            icon: Clock,
            href: '/dashboard/settings',
            color: 'bg-indigo-600 hover:bg-indigo-700',
        },
    ];

    return (
        <div className='space-y-8'>
            {/* Welcome Header */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                    Welcome back! 👋
                </h1>
                <p className='text-gray-600 text-lg'>
                    Ready to create some amazing interview questions? Let's get
                    started.
                </p>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {stats.map((stat) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className='bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200'
                    >
                        <div className='flex items-center'>
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon className='h-6 w-6 text-white' />
                            </div>
                            <div className='ml-4'>
                                <p className='text-sm font-medium text-gray-600'>
                                    {stat.name}
                                </p>
                                <p className='text-2xl font-bold text-gray-900'>
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                    Quick Actions
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {quickActions.map((action) => (
                        <Link
                            key={action.name}
                            href={action.href}
                            className={`${action.color} text-white rounded-lg p-6 hover:shadow-lg transition-all duration-200 group`}
                        >
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h3 className='text-lg font-semibold mb-2'>
                                        {action.name}
                                    </h3>
                                    <p className='text-sm opacity-90'>
                                        {action.description}
                                    </p>
                                </div>
                                <action.icon className='h-8 w-8 opacity-80 group-hover:opacity-100 transition-opacity duration-200' />
                            </div>
                            <div className='flex items-center mt-4 text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-200'>
                                Get started
                                <ArrowRight className='ml-2 h-4 w-4' />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            {sessions.length > 0 && (
                <div className='bg-white rounded-lg border border-gray-200 p-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-xl font-semibold text-gray-900'>
                            Recent Activity
                        </h2>
                        <Link
                            href='/dashboard/history'
                            className='text-primary hover:text-primary/80 text-sm font-medium'
                        >
                            View all
                        </Link>
                    </div>
                    <div className='space-y-3'>
                        {sessions.slice(0, 3).map((session) => (
                            <div
                                key={session.id}
                                className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                            >
                                <div className='flex items-center space-x-3'>
                                    <div className='w-2 h-2 bg-primary rounded-full'></div>
                                    <div>
                                        <p className='font-medium text-gray-900'>
                                            {session.session_name}
                                        </p>
                                        <p className='text-sm text-gray-500'>
                                            {session.job_title}
                                        </p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-sm text-gray-600'>
                                        {new Date(
                                            session.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                    <p className='text-xs text-gray-500'>
                                        {session.total_questions} questions
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
