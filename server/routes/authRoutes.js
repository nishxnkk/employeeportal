const express = require('express');
const router = express.Router();
const { authUser, registerUser, getUserProfile, uploadAvatar } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.post('/login', authUser);
router.post('/register', protect, admin, registerUser);
router.get('/profile', protect, getUserProfile);
router.post('/upload-avatar', protect, upload.single('avatar'), uploadAvatar);

module.exports = router;
