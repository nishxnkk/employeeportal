const mongoose = require('mongoose');

const recognitionSchema = mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    giver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    badge: {
        type: String,
        enum: ['Top Performer Badge', 'Team Player Badge', 'Innovation Badge', 'Leadership Badge', 'Excellence Badge', 'Customer Focus Badge'],
        required: true
    },
    badgeColor: {
        type: String,
        default: 'purple'
    }
}, {
    timestamps: true
});

const Recognition = mongoose.model('Recognition', recognitionSchema);

module.exports = Recognition;
