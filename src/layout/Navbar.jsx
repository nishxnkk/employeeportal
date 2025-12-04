import React from 'react';
import { useAuth } from '../hooks/useCustomHooks';
import { Bell, User } from 'lucide-react';

const Navbar = () => {
    const { user } = useAuth();

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-10 transition-colors duration-200">
            <div className="text-gray-500 dark:text-gray-400 text-sm">
                Welcome back, <span className="font-semibold text-gray-800 dark:text-white">{user?.name}</span>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                            <User className="h-full w-full p-1 text-gray-400" />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
