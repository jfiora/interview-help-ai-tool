import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                        Create Account
                    </h1>
                    <p className='text-gray-600'>
                        Join Interview AI and start creating amazing interview
                        questions
                    </p>
                </div>

                <SignUp
                    appearance={{
                        elements: {
                            rootBox: 'mx-auto',
                            card: 'shadow-xl border-0',
                            headerTitle: 'text-2xl font-bold text-gray-900',
                            headerSubtitle: 'text-gray-600',
                            socialButtonsBlockButton:
                                'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
                            formButtonPrimary:
                                'bg-blue-600 hover:bg-blue-700 text-white',
                            footerActionLink:
                                'text-blue-600 hover:text-blue-700',
                        },
                    }}
                    signInUrl='/sign-in'
                    redirectUrl='/dashboard'
                />
            </div>
        </div>
    );
}
