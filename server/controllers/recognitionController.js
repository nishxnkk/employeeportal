const Recognition = require('../models/Recognition');
const User = require('../models/User');

// @desc    Get all recognitions
// @route   GET /api/recognitions
// @access  Private
const getRecognitions = async (req, res) => {
    try {
        const recognitions = await Recognition.find({})
            .populate('recipient', 'name email department designation')
            .populate('giver', 'name email department designation')
            .sort({ createdAt: -1 });

        res.json(recognitions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a recognition
// @route   POST /api/recognitions
// @access  Private
const createRecognition = async (req, res) => {
    try {
        const { recipient, message, badge, badgeColor } = req.body;

        if (!recipient || !message || !badge) {
            return res.status(400).json({ message: 'Recipient, message, and badge are required' });
        }

        const recognition = await Recognition.create({
            recipient,
            giver: req.user._id,
            message,
            badge,
            badgeColor: badgeColor || 'purple'
        });

        const populatedRecognition = await Recognition.findById(recognition._id)
            .populate('recipient', 'name email department designation')
            .populate('giver', 'name email department designation');

        res.status(201).json(populatedRecognition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get recognition statistics
// @route   GET /api/recognitions/stats
// @access  Private
const getRecognitionStats = async (req, res) => {
    try {
        const totalCount = await Recognition.countDocuments();

        // Get top recipients (leaderboard)
        const topRecipients = await Recognition.aggregate([
            {
                $group: {
                    _id: '$recipient',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        // Populate user details
        const leaderboard = await User.populate(topRecipients, {
            path: '_id',
            select: 'name department designation'
        });

        // Get recent recognitions
        const recentRecognitions = await Recognition.find({})
            .populate('recipient', 'name department')
            .populate('giver', 'name department')
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            totalCount,
            leaderboard: leaderboard.map(item => ({
                user: item._id,
                count: item.count
            })),
            recentRecognitions
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's recognition stats
// @route   GET /api/recognitions/user/:userId
// @access  Private
const getUserRecognitionStats = async (req, res) => {
    try {
        const userId = req.params.userId;

        const received = await Recognition.countDocuments({ recipient: userId });
        const given = await Recognition.countDocuments({ giver: userId });

        const receivedRecognitions = await Recognition.find({ recipient: userId })
            .populate('giver', 'name department designation')
            .sort({ createdAt: -1 })
            .limit(10);

        res.json({
            received,
            given,
            receivedRecognitions
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getRecognitions,
    createRecognition,
    getRecognitionStats,
    getUserRecognitionStats
};
