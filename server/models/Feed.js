const mongoose = require('mongoose');

const feedSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['Appreciation', 'Announcement', 'General'],
        default: 'General'
    },
    content: {
        title: { type: String },
        body: { type: String, required: true },
        tags: [{ type: String }]
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    points: {
        type: Number,
        default: 0
    },
    badge: {
        type: String
    }
}, {
    timestamps: true
});

const Feed = mongoose.model('Feed', feedSchema);

module.exports = Feed;
