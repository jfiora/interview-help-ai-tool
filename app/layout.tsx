import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
    title: 'Interview Help AI Tool',
    description:
        'Select a job description and generate tailored interview questions',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body>{children}</body>
            </html>
        </ClerkProvider>
    );
}
