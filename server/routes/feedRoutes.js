const express = require('express');
const router = express.Router();
const { getFeedItems, createFeedItem, toggleLike, addComment, deleteFeedItem } = require('../controllers/feedController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getFeedItems)
    .post(protect, admin, createFeedItem);

router.put('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, addComment);
router.delete('/:id', protect, admin, deleteFeedItem);

module.exports = router;
