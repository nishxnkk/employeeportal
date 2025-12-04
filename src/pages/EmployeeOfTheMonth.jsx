import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Star } from 'lucide-react';

const EmployeeOfTheMonth = () => {
    const navigate = useNavigate();

    const teamMembers = [
        { name: 'Maxim Martian', role: 'Project Manager', avatar: 'https://ui-avatars.com/api/?name=Maxim+Martian&background=random' },
        { name: 'Marshell Laxmi', role: 'UI/UX Designer', avatar: 'https://ui-avatars.com/api/?name=Marshell+Laxmi&background=random' },
        { name: 'Mathew Marshall', role: 'Developer', avatar: 'https://ui-avatars.com/api/?name=Mathew+Marshall&background=random' },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex items-center space-x-2">
                <button onClick={() => navigate('/feed')} className="text-gray-500 hover:text-blue-600">
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Feed</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Stay Connected and Informed</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Spotlight Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-10 text-center transition-colors duration-200">
                        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-8">EMPLOYEE OF THE MONTH</h2>

                        <div className="flex justify-center mb-6">
                            <div className="h-40 w-40 rounded-3xl overflow-hidden shadow-lg">
                                <img
                                    src="https://ui-avatars.com/api/?name=Priyansh+Laxmi&background=random&size=256"
                                    alt="Priyansh Laxmi"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Priyansh Laxmi</h3>

                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                            Your leadership sets the tone for excellence. The way you navigate challenges, support your
                            team, and turn goals into achievements has truly elevated our entire workflow. Your ability to
                            keep everyone aligned and motivated is nothing short of inspiring.
                        </p>
                    </div>

                    {/* Team Section */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Team</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center text-center transition-colors duration-200">
                                    <div className="h-20 w-20 rounded-2xl overflow-hidden mb-4 shadow-md">
                                        <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                                    </div>
                                    <h4 className="font-bold text-gray-800 dark:text-white text-sm">{member.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Sidebar (Duplicated from Feed for consistency) */}
                <div className="space-y-6">
                    {/* New Point Alert */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                        <h3 className="text-blue-600 dark:text-blue-400 font-bold mb-4">New Point Alert!</h3>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">250</span>
                            <Star className="h-6 w-6 text-blue-600 dark:text-blue-400 fill-current" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Reward points with Manager</p>
                        <button
                            onClick={() => navigate('/feed/attempt')}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Attempt
                        </button>
                    </div>

                    {/* Training Session */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                        <h3 className="text-blue-600 dark:text-blue-400 font-bold mb-4">Don't Miss Out! Upcoming Training Session</h3>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                            <p><span className="font-bold text-gray-800 dark:text-white">Date:</span> 29 Oct</p>
                            <p><span className="font-bold text-gray-800 dark:text-white">Time:</span> 9:00 AM - 12:00 PM</p>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Register
                        </button>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                        <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                            <span className="mr-2">📅</span> Upcoming Events
                        </h3>
                        <div className="space-y-4">
                            {[
                                { title: 'Team Building Workshop', date: '13 Oct', time: '10:00 AM - 1:00 PM' },
                                { title: 'Employee of the Month Award', date: '20 Oct', time: '4:00 PM - 4:30 PM' },
                                { title: 'Diversity and Inclusion Seminar', date: '5 Nov', time: '9:30 AM - 12:30 PM' },
                                { title: 'Town Hall Meeting', date: '10 Nov', time: '2:00 PM - 3:30 PM' },
                            ].map((event, i) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 dark:text-white">{event.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{event.time}</p>
                                    </div>
                                    <span className="text-sm font-bold text-gray-800 dark:text-white">{event.date}</span>
                                </div>
                            ))}
                        </div>
                        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-4 hover:underline">
                            More...
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeOfTheMonth;
