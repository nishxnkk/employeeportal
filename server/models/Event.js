const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Conference', 'Workshop', 'Expo', 'Forum', 'Symposium'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    capacity: {
        type: Number,
        default: 100
    },
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    registrationDeadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'past', 'cancelled'],
        default: 'upcoming'
    },
    // Legacy fields for backward compatibility
    date: {
        type: String // YYYY-MM-DD
    },
    type: {
        type: String,
        enum: ['Holiday', 'Meeting', 'Event']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
