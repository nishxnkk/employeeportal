const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Private
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({})
            .populate('attendees', 'name email')
            .populate('createdBy', 'name')
            .sort({ startDate: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get upcoming events
// @route   GET /api/events/upcoming
// @access  Private
const getUpcomingEvents = async (req, res) => {
    try {
        const now = new Date();
        const events = await Event.find({
            startDate: { $gte: now },
            status: 'upcoming'
        })
            .populate('attendees', 'name email')
            .populate('createdBy', 'name')
            .sort({ startDate: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get past events
// @route   GET /api/events/past
// @access  Private
const getPastEvents = async (req, res) => {
    try {
        const now = new Date();
        const events = await Event.find({
            endDate: { $lt: now }
        })
            .populate('attendees', 'name email')
            .populate('createdBy', 'name')
            .sort({ startDate: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            startDate,
            endDate,
            location,
            imageUrl,
            capacity,
            registrationDeadline
        } = req.body;

        const event = await Event.create({
            title,
            description,
            category,
            startDate,
            endDate,
            location,
            imageUrl,
            capacity,
            registrationDeadline,
            status: 'upcoming',
            createdBy: req.user._id
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await event.deleteOne();
        res.json({ message: 'Event removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register for an event
// @route   POST /api/events/:id/register
// @access  Private
const registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if event is at capacity
        if (event.attendees.length >= event.capacity) {
            return res.status(400).json({ message: 'Event is at full capacity' });
        }

        // Check if user is already registered
        if (event.attendees.includes(req.user._id)) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        event.attendees.push(req.user._id);
        await event.save();

        const updatedEvent = await Event.findById(req.params.id)
            .populate('attendees', 'name email')
            .populate('createdBy', 'name');

        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Unregister from an event
// @route   DELETE /api/events/:id/register
// @access  Private
const unregisterFromEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if user is registered
        if (!event.attendees.includes(req.user._id)) {
            return res.status(400).json({ message: 'Not registered for this event' });
        }

        event.attendees = event.attendees.filter(
            attendee => attendee.toString() !== req.user._id.toString()
        );
        await event.save();

        const updatedEvent = await Event.findById(req.params.id)
            .populate('attendees', 'name email')
            .populate('createdBy', 'name');

        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEvents,
    getUpcomingEvents,
    getPastEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    unregisterFromEvent
};
