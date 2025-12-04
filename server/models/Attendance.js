const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: String, // Storing as YYYY-MM-DD string for easier querying
        required: true
    },
    checkIn: {
        type: Date
    },
    checkOut: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Half-Day', 'Late'],
        default: 'Absent'
    },
    totalHours: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
