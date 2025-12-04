const Meeting = require('../models/Meeting');

// @desc    Get all meetings
// @route   GET /api/meetings
// @access  Private
const getMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find({})
            .populate('createdBy', 'name email')
            .sort({ date: 1 });
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a meeting
// @route   POST /api/meetings
// @access  Private/Admin
const createMeeting = async (req, res) => {
    try {
        const { title, date, startTime, endTime, color } = req.body;

        const meeting = await Meeting.create({
            title,
            date,
            startTime,
            endTime,
            color: color || 'bg-blue-400',
            createdBy: req.user._id
        });

        const populatedMeeting = await Meeting.findById(meeting._id)
            .populate('createdBy', 'name email');

        res.status(201).json(populatedMeeting);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a meeting
// @route   DELETE /api/meetings/:id
// @access  Private/Admin
const deleteMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);

        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        await meeting.deleteOne();
        res.json({ message: 'Meeting removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMeetings,
    createMeeting,
    deleteMeeting
};
