import React from 'react';
import { Heart, MessageCircle, MoreVertical, Send } from 'lucide-react';

const PostCard = ({ avatar, name, time, content, points, tags, comments }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 transition-colors duration-200">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
                <img src={avatar} alt={name} className="h-10 w-10 rounded-full" />
                <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-white flex items-center">
                        {name}
                        <span className="text-gray-400 dark:text-gray-500 font-normal ml-2 text-xs">{time}</span>
                    </p>
                </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-4 w-4" />
            </button>
        </div>

        <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{content}</p>
            {tags && (
                <div className="flex space-x-2 mb-4">
                    {tags.map((tag, i) => (
                        <span key={i} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
            {points && (
                <div className="text-right">
                    <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">{points}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Points</p>
                </div>
            )}
        </div>

        <div className="flex items-center space-x-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button className="flex items-center space-x-2 text-red-500">
                <Heart className="h-5 w-5 fill-current" />
            </button>
            <button className="flex items-center space-x-2 text-gray-500">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">{comments}</span>
            </button>
        </div>
    </div>
);

const FeedAttempt = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Feed</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Posts */}
                <div className="lg:col-span-2">
                    <PostCard
                        avatar="https://ui-avatars.com/api/?name=Martin+Swanson&background=random"
                        name="Martin Swanson gave 130 points to Rosia Thorpe"
                        time="4h ago"
                        content="Thanks for leading one of the most productive design sprints ever, Rosia. Great win for the team and even greater outcome for the challenge."
                        tags={['BornLeader', 'GoodWorker']}
                        points="130"
                        comments="3"
                    />

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 flex items-center space-x-3 transition-colors duration-200">
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-800 dark:text-white placeholder-gray-400"
                        />
                    </div>

                    <PostCard
                        avatar="https://ui-avatars.com/api/?name=Clarence+Gale&background=random"
                        name="Clarence Gale"
                        time="2h ago"
                        content="Had an amazing experience working on the sprint and Rosia was a great manager. Learned a lot from her. Thanks for all the support and guidance."
                        comments="2 more comments"
                    />

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 transition-colors duration-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                                <img src="https://ui-avatars.com/api/?name=OM+Raut&background=random" alt="OM Raut" className="h-10 w-10 rounded-full" />
                                <p className="text-sm font-bold text-gray-800 dark:text-white">OM Raut</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="flex -space-x-2">
                                <div className="h-6 w-6 rounded-full bg-blue-400 border-2 border-white"></div>
                                <div className="h-6 w-6 rounded-full bg-green-400 border-2 border-white"></div>
                                <div className="h-6 w-6 rounded-full bg-purple-400 border-2 border-white"></div>
                                <div className="h-6 w-6 rounded-full bg-pink-400 border-2 border-white"></div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">+ 8 more wished Om a happy birthday. <span className="font-bold text-gray-800 dark:text-white">Wish him now!</span></p>
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700">
                            SEND
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                            <h3 className="font-bold text-gray-800 dark:text-white mb-1">Messages</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Message from Manager</p>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                                Reply
                            </button>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                            <h3 className="font-bold text-gray-800 dark:text-white mb-1">Complaints</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Message To Office</p>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                                Send
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Points & Calendar */}
                <div className="space-y-6">
                    {/* Points Card */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                        <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your Points</h3>
                        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">1500</div>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                SEND
                            </button>
                            <button className="bg-blue-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors">
                                REDEEM
                            </button>
                        </div>
                    </div>

                    {/* Calendar Widget (Visual Only) */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800 dark:text-white">March</h3>
                            <MoreVertical className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2 text-gray-500 dark:text-gray-400 font-medium">
                            <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-600 dark:text-gray-300">
                            {/* Mock Calendar Days */}
                            {[...Array(31)].map((_, i) => (
                                <div key={i} className={`h-8 w-8 flex items-center justify-center rounded-full ${i === 6 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Events List (Reused style) */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-gray-700 dark:text-gray-200">Birthday</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="h-3 w-3 rounded-full bg-purple-400"></div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-gray-700 dark:text-gray-200">Work anniversary</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex -space-x-1">
                                    <div className="h-3 w-3 rounded-full bg-orange-400"></div>
                                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                                    <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-gray-700 dark:text-gray-200">Weekly Review Meeting</p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">9:00 AM - 9:30 AM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Events List (Reused) */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                        <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                            <span className="mr-2">📅</span> Upcoming Events
                        </h3>
                        <div className="space-y-4">
                            {[
                                { title: 'Team Building Workshop', date: '13 Oct', time: '10:00 AM - 1:00 PM' },
                                { title: 'Employee of the Month Award', date: '20 Oct', time: '4:00 PM - 4:30 PM' },
                                { title: 'Diversity and Inclusion Seminar', date: '5 Nov', time: '9:30 AM - 12:30 PM' },
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

export default FeedAttempt;
