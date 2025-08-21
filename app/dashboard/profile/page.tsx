'use client';

import { useState } from 'react';
import { User, Mail, Calendar, Settings, Save, Edit3 } from 'lucide-react';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'HR Manager',
        company: 'Tech Corp',
        joinDate: '2024-01-15',
        preferences: {
            defaultModel: 'gpt-4o-mini',
            maxQuestions: 6,
            temperature: 0.7,
            notifications: true,
        },
    });

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically save to the database
        console.log('Profile saved:', profile);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to original values
        setProfile({
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'HR Manager',
            company: 'Tech Corp',
            joinDate: '2024-01-15',
            preferences: {
                defaultModel: 'gpt-4o-mini',
                maxQuestions: 6,
                temperature: 0.7,
                notifications: true,
            },
        });
    };

    return (
        <div className='space-y-8'>
            {/* Header */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <div className='flex items-center space-x-3 mb-4'>
                    <div className='p-2 bg-primary rounded-lg'>
                        <User className='h-6 w-6 text-white' />
                    </div>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900'>
                            Profile
                        </h1>
                        <p className='text-gray-600 text-lg'>
                            Manage your profile information and preferences
                        </p>
                    </div>
                </div>
            </div>

            {/* Profile Information */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-xl font-semibold text-gray-900'>
                        Personal Information
                    </h2>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className='bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center'
                        >
                            <Edit3 className='w-4 h-4 mr-2' />
                            Edit Profile
                        </button>
                    ) : (
                        <div className='flex space-x-2'>
                            <button
                                onClick={handleSave}
                                className='bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center'
                            >
                                <Save className='w-4 h-4 mr-2' />
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className='bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200'
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Full Name
                        </label>
                        {isEditing ? (
                            <input
                                type='text'
                                value={profile.name}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        name: e.target.value,
                                    })
                                }
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                            />
                        ) : (
                            <div className='flex items-center space-x-2 text-gray-900'>
                                <User className='w-4 h-4 text-gray-500' />
                                <span>{profile.name}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Email
                        </label>
                        {isEditing ? (
                            <input
                                type='email'
                                value={profile.email}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        email: e.target.value,
                                    })
                                }
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                            />
                        ) : (
                            <div className='flex items-center space-x-2 text-gray-900'>
                                <Mail className='w-4 h-4 text-gray-500' />
                                <span>{profile.email}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Job Role
                        </label>
                        {isEditing ? (
                            <input
                                type='text'
                                value={profile.role}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        role: e.target.value,
                                    })
                                }
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                            />
                        ) : (
                            <div className='flex items-center space-x-2 text-gray-900'>
                                <User className='w-4 h-4 text-gray-500' />
                                <span>{profile.role}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Company
                        </label>
                        {isEditing ? (
                            <input
                                type='text'
                                value={profile.company}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        company: e.target.value,
                                    })
                                }
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                            />
                        ) : (
                            <div className='flex items-center space-x-2 text-gray-900'>
                                <User className='w-4 h-4 text-gray-500' />
                                <span>{profile.company}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Member Since
                        </label>
                        <div className='flex items-center space-x-2 text-gray-900'>
                            <Calendar className='w-4 h-4 text-gray-500' />
                            <span>
                                {new Date(
                                    profile.joinDate
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Preferences */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <div className='flex items-center space-x-3 mb-6'>
                    <div className='p-2 bg-blue-100 rounded-lg'>
                        <Settings className='h-5 w-5 text-blue-600' />
                    </div>
                    <h2 className='text-xl font-semibold text-gray-900'>
                        AI Preferences
                    </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Default AI Model
                        </label>
                        {isEditing ? (
                            <select
                                value={profile.preferences.defaultModel}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        preferences: {
                                            ...profile.preferences,
                                            defaultModel: e.target.value,
                                        },
                                    })
                                }
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                            >
                                <option value='gpt-4o-mini'>GPT-4o Mini</option>
                                <option value='gpt-4-turbo'>GPT-4 Turbo</option>
                                <option value='gpt-3.5-turbo'>
                                    GPT-3.5 Turbo
                                </option>
                            </select>
                        ) : (
                            <div className='text-gray-900'>
                                {profile.preferences.defaultModel}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Max Questions
                        </label>
                        {isEditing ? (
                            <input
                                type='number'
                                min='1'
                                max='10'
                                value={profile.preferences.maxQuestions}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        preferences: {
                                            ...profile.preferences,
                                            maxQuestions: parseInt(
                                                e.target.value
                                            ),
                                        },
                                    })
                                }
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                            />
                        ) : (
                            <div className='text-gray-900'>
                                {profile.preferences.maxQuestions}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Temperature
                        </label>
                        {isEditing ? (
                            <input
                                type='number'
                                min='0'
                                max='2'
                                step='0.1'
                                value={profile.preferences.temperature}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        preferences: {
                                            ...profile.preferences,
                                            temperature: parseFloat(
                                                e.target.value
                                            ),
                                        },
                                    })
                                }
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                            />
                        ) : (
                            <div className='text-gray-900'>
                                {profile.preferences.temperature}
                            </div>
                        )}
                    </div>
                </div>

                <div className='mt-6'>
                    <label className='flex items-center'>
                        <input
                            type='checkbox'
                            checked={profile.preferences.notifications}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    preferences: {
                                        ...profile.preferences,
                                        notifications: e.target.checked,
                                    },
                                })
                            }
                            disabled={!isEditing}
                            className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                        />
                        <span className='ml-2 text-sm text-gray-700'>
                            Receive email notifications for new features and
                            updates
                        </span>
                    </label>
                </div>
            </div>

            {/* Usage Statistics */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-6'>
                    Usage Statistics
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='text-center p-4 bg-gray-50 rounded-lg'>
                        <div className='text-2xl font-bold text-primary'>
                            24
                        </div>
                        <div className='text-sm text-gray-600'>
                            Sessions Created
                        </div>
                    </div>
                    <div className='text-center p-4 bg-gray-50 rounded-lg'>
                        <div className='text-2xl font-bold text-primary'>
                            156
                        </div>
                        <div className='text-sm text-gray-600'>
                            Questions Generated
                        </div>
                    </div>
                    <div className='text-center p-4 bg-gray-50 rounded-lg'>
                        <div className='text-2xl font-bold text-primary'>
                            $0.42
                        </div>
                        <div className='text-sm text-gray-600'>Total Spent</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
