const express = require('express');
const router = express.Router();
const { requestLeave, getMyLeaves, getAllLeaves, updateLeaveStatus } = require('../controllers/leaveController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, requestLeave)
    .get(protect, admin, getAllLeaves);

router.get('/my-leaves', protect, getMyLeaves);
router.put('/:id/status', protect, admin, updateLeaveStatus);

module.exports = router;
