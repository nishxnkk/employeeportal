import React, { useState } from 'react';
import { useAuth } from '../hooks/useCustomHooks';
import { Bell, Lock, Moon, Sun, Globe, LogOut } from 'lucide-react';
import PasswordModal from '../components/PasswordModal';
import TwoFactorModal from '../components/TwoFactorModal';
import { useTheme } from '../context/ThemeContext';

const SettingsSection = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6 transition-colors duration-200">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
        </div>
        <div className="p-6 space-y-4">
            {children}
        </div>
    </div>
);

const Toggle = ({ label, description, defaultChecked, onChange, checked }) => (
    <div className="flex items-center justify-between">
        <div>
            <p className="font-medium text-gray-800 dark:text-white">{label}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked={defaultChecked}
                onChange={onChange}
                checked={checked}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
    </div>
);

const Settings = () => {
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h1>

            <SettingsSection title="Notifications">
                <Toggle
                    label="Email Notifications"
                    description="Receive emails about your account activity."
                    defaultChecked={true}
                />
                <Toggle
                    label="Push Notifications"
                    description="Receive push notifications on your device."
                    defaultChecked={false}
                />
            </SettingsSection>

            <SettingsSection title="Appearance">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {theme === 'dark' ? <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" /> : <Sun className="h-5 w-5 text-gray-500" />}
                        <div>
                            <p className="font-medium text-gray-700 dark:text-gray-200">Dark Mode</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Adjust the appearance of the application</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            </SettingsSection>

            <SettingsSection title="Security">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-gray-800 dark:text-white">Change Password</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Update your password regularly to keep your account secure.</p>
                    </div>
                    <button
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-colors"
                    >
                        Update
                    </button>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div>
                        <p className="font-medium text-gray-800 dark:text-white">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account.</p>
                    </div>
                    <button
                        onClick={() => setIs2FAModalOpen(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                    >
                        Enable
                    </button>
                </div>
            </SettingsSection>

            <div className="mt-8">
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center space-x-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-3 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Log Out</span>
                </button>
            </div>

            <PasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
            <TwoFactorModal isOpen={is2FAModalOpen} onClose={() => setIs2FAModalOpen(false)} />
        </div>
    );
};

export default Settings;
