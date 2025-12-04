const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'bg-blue-400'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
