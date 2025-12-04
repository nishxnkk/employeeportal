const Attendance = require('../models/Attendance');

// @desc    Check in
// @route   POST /api/attendance/check-in
// @access  Private
const checkIn = async (req, res) => {
    const today = new Date().toISOString().split('T')[0];

    const existingAttendance = await Attendance.findOne({
        employeeId: req.user._id,
        date: today
    });

    if (existingAttendance) {
        res.status(400).json({ message: 'Already checked in today' });
        return;
    }

    const attendance = await Attendance.create({
        employeeId: req.user._id,
        date: today,
        checkIn: new Date(),
        status: 'Present'
    });

    res.status(201).json(attendance);
};

// @desc    Check out
// @route   POST /api/attendance/check-out
// @access  Private
const checkOut = async (req, res) => {
    const today = new Date().toISOString().split('T')[0];

    const attendance = await Attendance.findOne({
        employeeId: req.user._id,
        date: today
    });

    if (attendance) {
        attendance.checkOut = new Date();

        // Calculate total hours
        const diff = Math.abs(attendance.checkOut - attendance.checkIn);
        attendance.totalHours = diff / (1000 * 60 * 60); // hours

        await attendance.save();
        res.json(attendance);
    } else {
        res.status(404).json({ message: 'No check-in record found for today' });
    }
};

// @desc    Get my attendance history
// @route   GET /api/attendance/my-history
// @access  Private
const getMyAttendance = async (req, res) => {
    const attendance = await Attendance.find({ employeeId: req.user._id }).sort({ date: -1 });
    res.json(attendance);
};

// @desc    Get all attendance (Admin)
// @route   GET /api/attendance
// @access  Private/Admin
const getAllAttendance = async (req, res) => {
    const attendance = await Attendance.find({}).populate('employeeId', 'name email');
    res.json(attendance);
};

module.exports = { checkIn, checkOut, getMyAttendance, getAllAttendance };
