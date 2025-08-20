export default function UploadSection() {
    return (
        <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6 bg-gray-50'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                    {/* Upload Icon */}
                    <div className='w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center'>
                        <svg
                            className='w-6 h-6 text-gray-600'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                            />
                        </svg>
                    </div>

                    {/* Text Content */}
                    <div>
                        <p className='text-gray-900 font-medium'>
                            Upload your resume for improved, tailored feedback!
                        </p>
                        <p className='text-primary text-sm'>
                            You must be a Pro member to access this feature
                        </p>
                    </div>
                </div>

                {/* Pro Badge */}
                <div className='bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full'>
                    Pro
                </div>
            </div>
        </div>
    );
}
