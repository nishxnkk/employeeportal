import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Eye, Star, Plus, Trash2, Send } from 'lucide-react';
import { useData, useAuth } from '../hooks/useCustomHooks';
import AddPostModal from '../components/AddPostModal';

const FeedCard = ({ _id, senderId, recipientId, createdAt, content, badge, likes = [], comments = [] }) => {
    const { toggleLike, addComment, deleteFeedItem } = useData();
    const { user } = useAuth();
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    // Handle case where sender/recipient might not be populated
    const sender = senderId || { name: 'Unknown', role: 'User', avatar: 'https://ui-avatars.com/api/?name=Unknown&background=random' };
    const recipient = recipientId || { name: 'Unknown', role: 'User', avatar: 'https://ui-avatars.com/api/?name=Unknown&background=random' };
    const isLiked = likes.includes(user?._id);
    const date = createdAt ? new Date(createdAt).toLocaleString() : '';

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        await addComment(_id, newComment);
        setNewComment('');
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 relative group transition-colors duration-200">
            {user?.role === 'Admin' && (
                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to delete this post?')) {
                            deleteFeedItem(_id);
                        }
                    }}
                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Post"
                >
                    <Trash2 className="h-5 w-5" />
                </button>
            )}

            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <img src={sender.avatar} alt={sender.name} className="h-10 w-10 rounded-full" />
                    <div>
                        <p className="text-sm font-bold text-gray-800 dark:text-white">{sender.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{sender.role}</p>
                    </div>
                    <span className="text-sm text-gray-400">to</span>
                    <img src={recipient.avatar} alt={recipient.name} className="h-10 w-10 rounded-full" />
                    <div>
                        <p className="text-sm font-bold text-gray-800 dark:text-white">{recipient.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{recipient.role}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4 mr-8">
                    {badge && (
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                            {badge}
                            <span className="ml-1">🎉</span>
                        </span>
                    )}
                    <img src={sender.avatar} alt="mini" className="h-6 w-6 rounded-full opacity-50" />
                </div>
            </div>

            <div className="text-right text-xs text-gray-400 mb-4">{date}</div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg mb-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">🎊</span>
                    <h3 className="font-bold text-gray-800 dark:text-white text-lg">{content.title}</h3>
                </div>
                {content.tags && (
                    <div className="flex space-x-2 mb-3">
                        {content.tags.map((tag, i) => (
                            <span key={i} className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 px-3 py-1 rounded-full text-xs font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {content.body}
                </p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-50 dark:border-gray-700 mt-4">
                <div className="flex items-center space-x-6">
                    <button
                        onClick={() => toggleLike(_id)}
                        className={`flex items-center space-x-2 font-medium text-sm transition-colors ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                    >
                        <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                        <span>{likes.length}</span>
                    </button>
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center space-x-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                    >
                        <MessageCircle className="h-5 w-5" />
                        <span>{comments.length}</span>
                    </button>
                </div>
                <div className="flex items-center space-x-4 text-gray-400">
                    <button
                        onClick={() => alert("❤️ Love sent!")}
                        className="flex items-center space-x-1 hover:text-gray-600 dark:hover:text-gray-300 text-sm"
                    >
                        <Share2 className="h-4 w-4" />
                        <span>Send Love</span>
                    </button>
                    <Eye className="h-4 w-4" />
                </div>
            </div>

            {showComments && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                        {comments.length === 0 ? (
                            <p className="text-center text-gray-400 text-sm py-2">No comments yet. Be the first!</p>
                        ) : (
                            comments.map((comment, index) => (
                                <div key={index} className="flex space-x-3">
                                    <img
                                        src={comment.userId?.avatar || 'https://ui-avatars.com/api/?name=User&background=random'}
                                        alt={comment.userId?.name || 'User'}
                                        className="h-8 w-8 rounded-full"
                                    />
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 flex-1">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="font-bold text-xs text-gray-800 dark:text-white">
                                                {comment.userId?.name || 'Unknown User'}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ''}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{comment.text}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
                        <img src={user?.avatar} alt={user?.name} className="h-8 w-8 rounded-full" />
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800 dark:text-white transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!newComment.trim()}
                                className="absolute right-1 top-1 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="h-3 w-3" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

const Feed = () => {
    const navigate = useNavigate();
    const { feedItems } = useData();
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('ALL'); // 'ALL', 'PROMOTIONS'

    const filteredItems = activeTab === 'PROMOTIONS'
        ? feedItems.filter(item => item.badge === 'PROMOTED')
        : feedItems;

    const handleRegister = () => {
        alert("✅ Successfully registered for the training session!");
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Feed</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Stay Connected and Informed: Your Hub for Updates and Interaction</p>
                </div>
                {user?.role === 'Admin' && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Add Post</span>
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Feed Column */}
                <div className="lg:col-span-2">
                    <div className="flex space-x-6 border-b border-gray-200 dark:border-gray-700 mb-6">
                        <button
                            onClick={() => navigate('/feed/employee-of-the-month')}
                            className="pb-3 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition-colors"
                        >
                            Employee of the Month
                        </button>
                        <button
                            onClick={() => setActiveTab('PROMOTIONS')}
                            className={`pb-3 border-b-2 font-medium text-sm transition-colors ${activeTab === 'PROMOTIONS' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                            Promotions
                        </button>
                        <button
                            onClick={() => setActiveTab('ALL')}
                            className={`pb-3 border-b-2 font-medium text-sm transition-colors ${activeTab === 'ALL' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                            All Posts
                        </button>
                    </div>

                    {filteredItems.length === 0 ? (
                        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                            No posts found for this category.
                        </div>
                    ) : (
                        filteredItems.map(item => (
                            <FeedCard key={item._id} {...item} />
                        ))
                    )}
                </div>

                {/* Right Sidebar */}
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
                        <button
                            onClick={handleRegister}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
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
                        <button
                            onClick={() => navigate('/calendar')}
                            className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-4 hover:underline"
                        >
                            More...
                        </button>
                    </div>
                </div>
            </div>

            <AddPostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Feed;
