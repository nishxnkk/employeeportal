const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Get all conversations for current user
// @route   GET /api/messages/conversations
// @access  Private
const getConversations = async (req, res) => {
    try {
        const userId = req.user._id;

        // Get all unique users the current user has chatted with
        const messages = await Message.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        })
            .populate('sender', 'name email department designation')
            .populate('receiver', 'name email department designation')
            .sort({ createdAt: -1 });

        // Group messages by conversation (other user)
        const conversationsMap = new Map();

        messages.forEach(msg => {
            const otherUser = msg.sender._id.toString() === userId.toString()
                ? msg.receiver
                : msg.sender;

            const otherUserId = otherUser._id.toString();

            if (!conversationsMap.has(otherUserId)) {
                conversationsMap.set(otherUserId, {
                    user: otherUser,
                    lastMessage: msg.message,
                    lastMessageTime: msg.createdAt,
                    unreadCount: 0
                });
            }

            // Count unread messages
            if (msg.receiver._id.toString() === userId.toString() && !msg.read) {
                conversationsMap.get(otherUserId).unreadCount++;
            }
        });

        const conversations = Array.from(conversationsMap.values());
        res.json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get messages between current user and another user
// @route   GET /api/messages/:userId
// @access  Private
const getMessages = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const otherUserId = req.params.userId;

        const messages = await Message.find({
            $or: [
                { sender: currentUserId, receiver: otherUserId },
                { sender: otherUserId, receiver: currentUserId }
            ]
        })
            .populate('sender', 'name email')
            .populate('receiver', 'name email')
            .sort({ createdAt: 1 });

        // Mark messages as read
        await Message.updateMany(
            {
                sender: otherUserId,
                receiver: currentUserId,
                read: false
            },
            { read: true }
        );

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
    try {
        const { receiver, message } = req.body;

        if (!receiver || !message) {
            return res.status(400).json({ message: 'Receiver and message are required' });
        }

        const newMessage = await Message.create({
            sender: req.user._id,
            receiver,
            message
        });

        const populatedMessage = await Message.findById(newMessage._id)
            .populate('sender', 'name email')
            .populate('receiver', 'name email');

        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all users to start a chat
// @route   GET /api/messages/users
// @access  Private
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } })
            .select('name email department designation')
            .sort({ name: 1 });

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getConversations,
    getMessages,
    sendMessage,
    getAllUsers
};
