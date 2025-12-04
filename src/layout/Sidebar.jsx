import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useCustomHooks';
import {
    LayoutDashboard,
    Users,
    Star,
    Menu,
    MessageSquare,
    Calendar as CalendarIcon,
    User,
    Settings
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
    const { user } = useAuth();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard, roles: ['Admin', 'Employee'] },
        { name: 'Employees', path: '/employees', icon: Users, roles: ['Admin'] },
        { name: 'Recognition', path: '/recognition', icon: Star, roles: ['Admin', 'Employee'] },
        { name: 'Feed', path: '/feed', icon: Menu, roles: ['Admin', 'Employee'] },
        { name: 'Chat', path: '/chat', icon: MessageSquare, roles: ['Admin', 'Employee'] },
        { name: 'Events', path: '/events', icon: CalendarIcon, roles: ['Admin', 'Employee'] },
        { name: 'Profile', path: '/profile', icon: User, roles: ['Admin', 'Employee'] },
        { name: 'Settings', path: '/settings', icon: Settings, roles: ['Admin', 'Employee'] },
    ];

    const filteredNavItems = navItems.filter(item => item.roles.includes(user?.role));

    return (
        <div className="h-screen w-64 bg-blue-600 dark:bg-gray-800 text-white flex flex-col fixed left-0 top-0 font-sans transition-colors duration-200">
            {/* User Profile Header */}
            <div className="p-8 flex items-center space-x-4">
                <div className="bg-white rounded-full p-0.5">
                    <div className="h-12 w-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl overflow-hidden">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                            user?.name?.charAt(0) || 'U'
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-lg leading-tight">{user?.name || 'Userxyz'}</h2>
                    <p className="text-blue-200 dark:text-gray-400 text-xs">{user?.role || 'HR Manager'}</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {filteredNavItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors',
                                isActive
                                    ? 'bg-blue-700 dark:bg-gray-700 text-white font-medium' // Active state
                                    : 'text-blue-100 dark:text-gray-400 hover:bg-blue-500 dark:hover:bg-gray-700 hover:text-white dark:hover:text-white' // Inactive state
                            )
                        }
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="text-base">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
