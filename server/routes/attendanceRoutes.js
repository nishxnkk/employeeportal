const express = require('express');
const router = express.Router();
const { checkIn, checkOut, getMyAttendance, getAllAttendance } = require('../controllers/attendanceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/check-in', protect, checkIn);
router.post('/check-out', protect, checkOut);
router.get('/my-history', protect, getMyAttendance);
router.get('/', protect, admin, getAllAttendance);

module.exports = router;
