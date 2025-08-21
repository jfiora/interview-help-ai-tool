'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    User,
    MessageSquare,
    History,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const navigation = [
    {
        name: 'Home',
        href: '/dashboard',
        icon: Home,
        description: 'Dashboard overview and quick actions',
    },
    {
        name: 'Profile',
        href: '/dashboard/profile',
        icon: User,
        description: 'Manage your profile and preferences',
    },
    {
        name: 'Q&A Generator',
        href: '/dashboard/generator',
        icon: MessageSquare,
        description: 'Generate interview questions and answers',
    },
    {
        name: 'History',
        href: '/dashboard/history',
        icon: History,
        description: 'View your Q&A session history',
    },
    {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
        description: 'Configure your account settings',
    },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className='fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden'
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-lg transition-all duration-300 ease-in-out lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } ${sidebarCollapsed ? 'w-16' : 'w-64'} lg:translate-x-0`}
            >
                {/* Sidebar header */}
                <div className='flex h-16 items-center justify-between border-b border-gray-200 px-4'>
                    {!sidebarCollapsed && (
                        <h1 className='text-xl font-bold text-gray-900'>
                            Interview AI
                        </h1>
                    )}
                    <div className='flex items-center space-x-2'>
                        <button
                            onClick={toggleSidebar}
                            className='hidden rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:block'
                        >
                            {sidebarCollapsed ? (
                                <ChevronRight className='h-5 w-5' />
                            ) : (
                                <ChevronLeft className='h-5 w-5' />
                            )}
                        </button>
                        <button
                            onClick={closeSidebar}
                            className='rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden'
                        >
                            <X className='h-5 w-5' />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className='flex-1 space-y-1 px-2 py-4'>
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-primary text-white'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                                onClick={closeSidebar}
                            >
                                <item.icon
                                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                                        isActive
                                            ? 'text-white'
                                            : 'text-gray-400 group-hover:text-gray-500'
                                    }`}
                                />
                                {!sidebarCollapsed && (
                                    <span className='truncate'>
                                        {item.name}
                                    </span>
                                )}
                                {sidebarCollapsed && (
                                    <div className='absolute left-16 z-50 ml-2 hidden w-48 rounded-md bg-gray-900 px-2 py-1 text-sm text-white group-hover:block'>
                                        <div className='font-medium'>
                                            {item.name}
                                        </div>
                                        <div className='text-gray-300'>
                                            {item.description}
                                        </div>
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout section */}
                <div className='border-t border-gray-200 p-4'>
                    <button className='group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200'>
                        <LogOut className='mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500' />
                        {!sidebarCollapsed && <span>Log out</span>}
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div
                className={`transition-all duration-300 ease-in-out ${
                    sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
                }`}
            >
                {/* Top bar */}
                <div className='sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 lg:hidden'>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className='rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                    >
                        <Menu className='h-6 w-6' />
                    </button>
                </div>

                {/* Page content */}
                <main className='p-4 lg:p-8'>{children}</main>
            </div>
        </div>
    );
}
