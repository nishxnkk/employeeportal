const express = require('express');
const router = express.Router();
const {
    getConversations,
    getMessages,
    sendMessage,
    getAllUsers
} = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.get('/conversations', protect, getConversations);
router.get('/users', protect, getAllUsers);
router.get('/:userId', protect, getMessages);
router.post('/', protect, sendMessage);

module.exports = router;
