'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in');
        }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
                <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-primary'></div>
            </div>
        );
    }

    if (!isSignedIn) {
        return null; // Will redirect to sign-in
    }

    return <>{children}</>;
}
