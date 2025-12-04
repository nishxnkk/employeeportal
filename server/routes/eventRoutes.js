const express = require('express');
const router = express.Router();
const {
    getEvents,
    getUpcomingEvents,
    getPastEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    unregisterFromEvent
} = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all events or create new event
router.route('/')
    .get(protect, getEvents)
    .post(protect, admin, createEvent);

// Get upcoming events
router.get('/upcoming', protect, getUpcomingEvents);

// Get past events
router.get('/past', protect, getPastEvents);

// Register/unregister for an event
router.route('/:id/register')
    .post(protect, registerForEvent)
    .delete(protect, unregisterFromEvent);

// Update or delete specific event
router.route('/:id')
    .put(protect, admin, updateEvent)
    .delete(protect, admin, deleteEvent);

module.exports = router;
