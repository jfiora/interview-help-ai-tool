'use client';

import Link from 'next/link';
import {
    MessageSquare,
    History,
    User,
    Settings,
    ArrowRight,
    Sparkles,
} from 'lucide-react';
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';

export default function LandingPage() {
    return (
        <main className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
            {/* Header */}
            <header className='bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                            <div className='p-2 bg-primary rounded-lg'>
                                <MessageSquare className='h-6 w-6 text-white' />
                            </div>
                            <h1 className='text-xl font-bold text-gray-900'>
                                Interview AI
                            </h1>
                        </div>
                        <div className='flex items-center space-x-3'>
                            <SignedOut>
                                <SignInButton mode='modal'>
                                    <button className='text-gray-700 hover:text-gray-900 font-medium py-2 px-4 transition-colors duration-200'>
                                        Sign In
                                    </button>
                                </SignInButton>
                                <SignUpButton mode='modal'>
                                    <button className='bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200'>
                                        Get Started
                                    </button>
                                </SignUpButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                                <Link
                                    href='/dashboard'
                                    className='bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200'
                                >
                                    Dashboard
                                </Link>
                            </SignedIn>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className='py-20 px-4'>
                <div className='max-w-7xl mx-auto text-center'>
                    <div className='mb-8'>
                        <div className='inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6'>
                            <Sparkles className='w-4 h-4 mr-2' />
                            AI-Powered Interview Questions
                        </div>
                        <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
                            Generate Perfect Interview
                            <span className='text-primary'>
                                {' '}
                                Questions & Answers
                            </span>
                        </h1>
                        <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-8'>
                            Create comprehensive interview questions and sample
                            answers for any job role using advanced AI. Save
                            sessions, track costs, and build your interview
                            question library.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <SignedOut>
                                <SignUpButton mode='modal'>
                                    <button className='bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center'>
                                        Get Started
                                        <ArrowRight className='w-5 h-5 ml-2' />
                                    </button>
                                </SignUpButton>
                                <SignInButton mode='modal'>
                                    <button className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg'>
                                        Sign In
                                    </button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <Link
                                    href='/dashboard'
                                    className='bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center'
                                >
                                    Go to Dashboard
                                    <ArrowRight className='w-5 h-5 ml-2' />
                                </Link>
                                <Link
                                    href='/dashboard/history'
                                    className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg'
                                >
                                    View Examples
                                </Link>
                            </SignedIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className='py-20 px-4 bg-white'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl font-bold text-gray-900 mb-4'>
                            Everything you need for perfect interviews
                        </h2>
                        <p className='text-xl text-gray-600'>
                            Comprehensive tools to create, manage, and optimize
                            your interview process
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        <div className='text-center'>
                            <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <MessageSquare className='w-8 h-8 text-blue-600' />
                            </div>
                            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                                AI Q&A Generator
                            </h3>
                            <p className='text-gray-600'>
                                Generate relevant questions and sample answers
                                tailored to any job description
                            </p>
                        </div>

                        <div className='text-center'>
                            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <History className='w-8 h-8 text-green-600' />
                            </div>
                            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                                Session History
                            </h3>
                            <p className='text-gray-600'>
                                Save and organize all your Q&A sessions for
                                future reference
                            </p>
                        </div>

                        <div className='text-center'>
                            <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <User className='w-8 h-8 text-purple-600' />
                            </div>
                            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                                Profile Management
                            </h3>
                            <p className='text-gray-600'>
                                Customize your preferences and manage your
                                account settings
                            </p>
                        </div>

                        <div className='text-center'>
                            <div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <Settings className='w-8 h-8 text-orange-600' />
                            </div>
                            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                                Advanced Settings
                            </h3>
                            <p className='text-gray-600'>
                                Configure AI models, notifications, and privacy
                                preferences
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='py-20 px-4'>
                <div className='max-w-4xl mx-auto text-center'>
                    <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                        Ready to revolutionize your interview process?
                    </h2>
                    <p className='text-xl text-gray-600 mb-8'>
                        Join thousands of HR professionals who are already using
                        AI to create better interviews
                    </p>
                    <SignedOut>
                        <SignUpButton mode='modal'>
                            <button className='bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg inline-flex items-center'>
                                Start Creating Questions
                                <ArrowRight className='w-5 h-5 ml-2' />
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <Link
                            href='/dashboard'
                            className='bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg inline-flex items-center'
                        >
                            Start Creating Questions
                            <ArrowRight className='w-5 h-5 ml-2' />
                        </Link>
                    </SignedIn>
                </div>
            </section>

            {/* Footer */}
            <footer className='bg-gray-900 text-white py-12 px-4'>
                <div className='max-w-7xl mx-auto text-center'>
                    <div className='flex items-center justify-center space-x-3 mb-6'>
                        <div className='p-2 bg-primary rounded-lg'>
                            <MessageSquare className='h-6 w-6 text-white' />
                        </div>
                        <h3 className='text-xl font-bold'>Interview AI</h3>
                    </div>
                    <p className='text-gray-400 mb-6'>
                        Powered by OpenAI GPT-4o Mini • Built with Next.js and
                        Supabase
                    </p>
                    <div className='text-sm text-gray-500'>
                        © 2024 Interview AI. All rights reserved.
                    </div>
                </div>
            </footer>
        </main>
    );
}
