const Leave = require('../models/Leave');

// @desc    Request a leave
// @route   POST /api/leaves
// @access  Private
const requestLeave = async (req, res) => {
    const { type, startDate, endDate, reason } = req.body;

    const leave = await Leave.create({
        employeeId: req.user._id,
        type,
        startDate,
        endDate,
        reason
    });

    res.status(201).json(leave);
};

// @desc    Get my leaves
// @route   GET /api/leaves/my-leaves
// @access  Private
const getMyLeaves = async (req, res) => {
    const leaves = await Leave.find({ employeeId: req.user._id }).sort({ startDate: -1 });
    res.json(leaves);
};

// @desc    Get all leaves (Admin)
// @route   GET /api/leaves
// @access  Private/Admin
const getAllLeaves = async (req, res) => {
    const leaves = await Leave.find({}).populate('employeeId', 'name email').sort({ startDate: -1 });
    res.json(leaves);
};

// @desc    Update leave status
// @route   PUT /api/leaves/:id/status
// @access  Private/Admin
const updateLeaveStatus = async (req, res) => {
    const { status } = req.body;
    const leave = await Leave.findById(req.params.id);

    if (leave) {
        leave.status = status;
        leave.approvedBy = req.user._id;
        const updatedLeave = await leave.save();
        res.json(updatedLeave);
    } else {
        res.status(404).json({ message: 'Leave request not found' });
    }
};

module.exports = { requestLeave, getMyLeaves, getAllLeaves, updateLeaveStatus };
