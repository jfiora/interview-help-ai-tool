'use client';

import { useState } from 'react';
import {
    Settings,
    Bell,
    Shield,
    Palette,
    Database,
    Key,
    Save,
} from 'lucide-react';

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            push: false,
            weekly: true,
            updates: false,
        },
        privacy: {
            shareData: false,
            analytics: true,
            marketing: false,
        },
        appearance: {
            theme: 'light',
            compact: false,
            animations: true,
        },
        api: {
            model: 'gpt-4o-mini',
            maxTokens: 4000,
            temperature: 0.7,
        },
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
        console.log('Settings saved:', settings);
    };

    const updateSetting = (category: string, key: string, value: any) => {
        setSettings((prev) => ({
            ...prev,
            [category]: {
                ...prev[category as keyof typeof prev],
                [key]: value,
            },
        }));
    };

    return (
        <div className='space-y-8'>
            {/* Header */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <div className='flex items-center space-x-3 mb-4'>
                    <div className='p-2 bg-primary rounded-lg'>
                        <Settings className='h-6 w-6 text-white' />
                    </div>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900'>
                            Settings
                        </h1>
                        <p className='text-gray-600 text-lg'>
                            Configure your application preferences and account
                            settings
                        </p>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <div className='flex items-center space-x-3 mb-6'>
                    <div className='p-2 bg-blue-100 rounded-lg'>
                        <Bell className='h-5 w-5 text-blue-600' />
                    </div>
                    <h2 className='text-xl font-semibold text-gray-900'>
                        Notifications
                    </h2>
                </div>

                <div className='space-y-4'>
                    <label className='flex items-center justify-between'>
                        <div>
                            <span className='text-sm font-medium text-gray-700'>
                                Email Notifications
                            </span>
                            <p className='text-sm text-gray-500'>
                                Receive notifications via email
                            </p>
                        </div>
                        <input
                            type='checkbox'
                            checked={settings.notifications.email}
                            onChange={(e) =>
                                updateSetting(
                                    'notifications',
                                    'email',
                                    e.target.checked
                                )
                            }
                            className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                        />
                    </label>

                    <label className='flex items-center justify-between'>
                        <div>
                            <span className='text-sm font-medium text-gray-700'>
                                Push Notifications
                            </span>
                            <p className='text-sm text-gray-500'>
                                Receive browser push notifications
                            </p>
                        </div>
                        <input
                            type='checkbox'
                            checked={settings.notifications.push}
                            onChange={(e) =>
                                updateSetting(
                                    'notifications',
                                    'push',
                                    e.target.checked
                                )
                            }
                            className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                        />
                    </label>

                    <label className='flex items-center justify-between'>
                        <div>
                            <span className='text-sm font-medium text-gray-700'>
                                Weekly Summary
                            </span>
                            <p className='text-sm text-gray-500'>
                                Get a weekly summary of your activity
                            </p>
                        </div>
                        <input
                            type='checkbox'
                            checked={settings.notifications.weekly}
                            onChange={(e) =>
                                updateSetting(
                                    'notifications',
                                    'weekly',
                                    e.target.checked
                                )
                            }
                            className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                        />
                    </label>

                    <label className='flex items-center justify-between'>
                        <div>
                            <span className='text-sm font-medium text-gray-700'>
                                Feature Updates
                            </span>
                            <p className='text-sm text-gray-500'>
                                Get notified about new features
                            </p>
                        </div>
                        <input
                            type='checkbox'
                            checked={settings.notifications.updates}
                            onChange={(e) =>
                                updateSetting(
                                    'notifications',
                                    'updates',
                                    e.target.checked
                                )
                            }
                            className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                        />
                    </label>
                </div>
            </div>

            {/* Privacy & Security */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <div className='flex items-center space-x-3 mb-6'>
                    <div className='p-2 bg-green-100 rounded-lg'>
                        <Shield className='h-5 w-5 text-green-600' />
                    </div>
                    <h2 className='text-xl font-semibold text-gray-900'>
                        Privacy & Security
                    </h2>
                </div>

                <div className='space-y-4'>
                    <label className='flex items-center justify-between'>
                        <div>
                            <span className='text-sm font-medium text-gray-700'>
                                Share Usage Data
                            </span>
                            <p className='text-sm text-gray-500'>
                                Help improve the service by sharing anonymous
                                usage data
                            </p>
                        </div>
                        <input
                            type='checkbox'
                            checked={settings.privacy.shareData}
                            onChange={(e) =>
                                updateSetting(
                                    'privacy',
                                    'shareData',
                                    e.target.checked
                                )
                            }
                            className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                        />
                    </label>

                    <label className='flex items-center justify-between'>
                        <div>
                            <span className='text-sm font-medium text-gray-700'>
                                Analytics
                            </span>
                            <p className='text-sm text-gray-500'>
                                Allow analytics to improve your experience
                            </p>
                        </div>
                        <input
                            type='checkbox'
                            checked={settings.privacy.analytics}
                            onChange={(e) =>
                                updateSetting(
                                    'privacy',
                                    'analytics',
                                    e.target.checked
                                )
                            }
                            className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                        />
                    </label>

                    <label className='flex items-center justify-between'>
                        <div>
                            <span className='text-sm font-medium text-gray-700'>
                                Marketing Communications
                            </span>
                            <p className='text-sm text-gray-500'>
                                Receive marketing emails and promotions
                            </p>
                        </div>
                        <input
                            type='checkbox'
                            checked={settings.privacy.marketing}
                            onChange={(e) =>
                                updateSetting(
                                    'privacy',
                                    'marketing',
                                    e.target.checked
                                )
                            }
                            className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                        />
                    </label>
                </div>
            </div>

            {/* Appearance */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <div className='flex items-center space-x-3 mb-6'>
                    <div className='p-2 bg-purple-100 rounded-lg'>
                        <Palette className='h-5 w-5 text-purple-600' />
                    </div>
                    <h2 className='text-xl font-semibold text-gray-900'>
                        Appearance
                    </h2>
                </div>

                <div className='space-y-6'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Theme
                        </label>
                        <select
                            value={settings.appearance.theme}
                            onChange={(e) =>
                                updateSetting(
                                    'appearance',
                                    'theme',
                                    e.target.value
                                )
                            }
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                        >
                            <option value='light'>Light</option>
                            <option value='dark'>Dark</option>
                            <option value='auto'>Auto (System)</option>
                        </select>
                    </div>

                    <label className='flex items-center justify-between'>
                        <div>
                            <span className='text-sm font-medium text-gray-700'>
                                Compact Mode
                            </span>
                            <p className='text-sm text-gray-500'>
                                Use more compact spacing throughout the
                                interface
                            </p>
                        </div>
                        <input
                            type='checkbox'
                            checked={settings.appearance.compact}
                            onChange={(e) =>
                                updateSetting(
                                    'appearance',
                                    'compact',
                                    e.target.checked
                                )
                            }
                            className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                        />
                    </label>

                    <label className='flex items-center justify-between'>
                        <div>
                            <span className='text-sm font-medium text-gray-700'>
                                Animations
                            </span>
                            <p className='text-sm text-gray-500'>
                                Enable smooth animations and transitions
                            </p>
                        </div>
                        <input
                            type='checkbox'
                            checked={settings.appearance.animations}
                            onChange={(e) =>
                                updateSetting(
                                    'appearance',
                                    'animations',
                                    e.target.checked
                                )
                            }
                            className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                        />
                    </label>
                </div>
            </div>

            {/* Data Management */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <div className='flex items-center space-x-3 mb-6'>
                    <div className='p-2 bg-red-100 rounded-lg'>
                        <Database className='h-5 w-5 text-red-600' />
                    </div>
                    <h2 className='text-xl font-semibold text-gray-900'>
                        Data Management
                    </h2>
                </div>

                <div className='space-y-4'>
                    <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                        <div>
                            <span className='text-sm font-medium text-gray-700'>
                                Export Data
                            </span>
                            <p className='text-sm text-gray-500'>
                                Download all your data in JSON format
                            </p>
                        </div>
                        <button className='bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200'>
                            Export
                        </button>
                    </div>

                    <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                        <div>
                            <span className='text-sm font-medium text-gray-700'>
                                Delete Account
                            </span>
                            <p className='text-sm text-gray-500'>
                                Permanently delete your account and all data
                            </p>
                        </div>
                        <button className='bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200'>
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className='flex justify-end'>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className='bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center disabled:opacity-50'
                >
                    <Save className='w-5 h-5 mr-2' />
                    {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>
        </div>
    );
}
