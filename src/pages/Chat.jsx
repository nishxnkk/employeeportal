import React, { useState, useEffect, useRef } from 'react';
import { Send, Search, X } from 'lucide-react';
import api from '../utils/api';

const Chat = () => {
    const [conversations, setConversations] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserList, setShowUserList] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setCurrentUser(userInfo);
        fetchConversations();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            fetchMessages(selectedUser._id);
        }
    }, [selectedUser]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchConversations = async () => {
        try {
            const { data } = await api.get('/messages/conversations');
            setConversations(data);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    const fetchMessages = async (userId) => {
        try {
            const { data } = await api.get(`/messages/${userId}`);
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchAllUsers = async () => {
        try {
            const { data } = await api.get('/messages/users');
            setAllUsers(data);
            setShowUserList(true);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!newMessage.trim() || !selectedUser) return;

        try {
            const { data } = await api.post('/messages', {
                receiver: selectedUser._id,
                message: newMessage.trim()
            });

            setMessages([...messages, data]);
            setNewMessage('');
            fetchConversations(); // Refresh conversation list
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message');
        }
    };

    const selectUser = (user) => {
        setSelectedUser(user);
        setShowUserList(false);
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    const filteredConversations = conversations.filter(conv =>
        conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Sidebar - Conversations List */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                        <button
                            onClick={fetchAllUsers}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            New Chat
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {showUserList ? (
                        <div>
                            <div className="p-3 bg-gray-50 border-b flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Select a user</span>
                                <button onClick={() => setShowUserList(false)}>
                                    <X className="h-5 w-5 text-gray-400" />
                                </button>
                            </div>
                            {filteredUsers.map(user => (
                                <div
                                    key={user._id}
                                    onClick={() => selectUser(user)}
                                    className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 font-semibold">
                                                {user.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-medium text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.department}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        filteredConversations.map(conv => (
                            <div
                                key={conv.user._id}
                                onClick={() => selectUser(conv.user)}
                                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${selectedUser?._id === conv.user._id ? 'bg-blue-50' : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center flex-1 min-w-0">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-600 font-semibold">
                                                {conv.user.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="ml-3 flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">{conv.user.name}</p>
                                            <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                                        </div>
                                    </div>
                                    <div className="text-right ml-2 flex-shrink-0">
                                        <p className="text-xs text-gray-400">{formatDate(conv.lastMessageTime)}</p>
                                        {conv.unreadCount > 0 && (
                                            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                                                {conv.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-200 bg-white">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold">
                                        {selectedUser.name.charAt(0)}
                                    </span>
                                </div>
                                <div className="ml-3">
                                    <h3 className="font-semibold text-gray-900">{selectedUser.name}</h3>
                                    <p className="text-sm text-gray-500">{selectedUser.department}</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                            {messages.map((msg, index) => {
                                const isOwnMessage = msg.sender._id === currentUser?._id;

                                return (
                                    <div
                                        key={msg._id || index}
                                        className={`mb-4 flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[70%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                                            <div
                                                className={`px-4 py-2 rounded-lg ${isOwnMessage
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-gray-900 border border-gray-200'
                                                    }`}
                                            >
                                                <p className="text-sm">{msg.message}</p>
                                            </div>
                                            <p className={`text-xs text-gray-400 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                                                {formatTime(msg.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="p-4 bg-white border-t border-gray-200">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="h-5 w-5" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-center p-8">
                        <div>
                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Send className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start a Conversation</h3>
                            <p className="text-gray-500 mb-4">
                                Select a conversation from the left or start a new chat
                            </p>
                            <button
                                onClick={fetchAllUsers}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                New Chat
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
