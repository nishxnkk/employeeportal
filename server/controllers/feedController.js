const Feed = require('../models/Feed');

// @desc    Get all feed items
// @route   GET /api/feed
// @access  Private
const getFeedItems = async (req, res) => {
    const feedItems = await Feed.find({})
        .populate('senderId', 'name role avatar')
        .populate('recipientId', 'name role avatar')
        .populate('likes', 'name')
        .populate('comments.userId', 'name avatar')
        .sort({ createdAt: -1 });
    res.json(feedItems);
};

// @desc    Create a feed item
// @route   POST /api/feed
// @access  Private/Admin
const createFeedItem = async (req, res) => {
    const { recipientId, type, content, points, badge } = req.body;

    const feedItem = await Feed.create({
        senderId: req.user._id,
        recipientId,
        type,
        content,
        points,
        badge
    });

    const populatedItem = await Feed.findById(feedItem._id)
        .populate('senderId', 'name role avatar')
        .populate('recipientId', 'name role avatar');

    res.status(201).json(populatedItem);
};

// @desc    Toggle like
// @route   PUT /api/feed/:id/like
// @access  Private
const toggleLike = async (req, res) => {
    const feedItem = await Feed.findById(req.params.id);

    if (feedItem) {
        const alreadyLiked = feedItem.likes.includes(req.user._id);

        if (alreadyLiked) {
            feedItem.likes = feedItem.likes.filter(id => id.toString() !== req.user._id.toString());
        } else {
            feedItem.likes.push(req.user._id);
        }

        await feedItem.save();
        res.json(feedItem);
    } else {
        res.status(404).json({ message: 'Feed item not found' });
    }
};

// @desc    Add comment
// @route   POST /api/feed/:id/comment
// @access  Private
const addComment = async (req, res) => {
    const { text } = req.body;
    const feedItem = await Feed.findById(req.params.id);

    if (feedItem) {
        const comment = {
            userId: req.user._id,
            text,
            createdAt: new Date()
        };

        feedItem.comments.push(comment);
        await feedItem.save();

        const populatedItem = await Feed.findById(req.params.id)
            .populate('comments.userId', 'name avatar');

        res.json(populatedItem);
    } else {
        res.status(404).json({ message: 'Feed item not found' });
    }
};

// @desc    Delete feed item
// @route   DELETE /api/feed/:id
// @access  Private/Admin
const deleteFeedItem = async (req, res) => {
    const feedItem = await Feed.findById(req.params.id);

    if (feedItem) {
        await feedItem.deleteOne();
        res.json({ message: 'Feed item removed' });
    } else {
        res.status(404).json({ message: 'Feed item not found' });
    }
};

module.exports = { getFeedItems, createFeedItem, toggleLike, addComment, deleteFeedItem };
