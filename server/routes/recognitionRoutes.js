const express = require('express');
const router = express.Router();
const {
    getRecognitions,
    createRecognition,
    getRecognitionStats,
    getUserRecognitionStats
} = require('../controllers/recognitionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getRecognitions)
    .post(protect, createRecognition);

router.get('/stats', protect, getRecognitionStats);
router.get('/user/:userId', protect, getUserRecognitionStats);

module.exports = router;
