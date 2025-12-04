const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Attendance = require('./models/Attendance');
const Leave = require('./models/Leave');
const Event = require('./models/Event');
const Feed = require('./models/Feed');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Attendance.deleteMany();
        await Leave.deleteMany();
        await Event.deleteMany();
        await Feed.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);
        const adminPassword = await bcrypt.hash('admin', salt);

        const users = [
            {
                _id: new mongoose.Types.ObjectId(),
                oldId: 'EMP001',
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: adminPassword,
                role: 'Admin',
                department: 'HR',
                designation: 'HR Manager',
                joiningDate: '2023-01-15',
                salary: 75000,
                status: 'Active',
                avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff'
            },
            {
                _id: new mongoose.Types.ObjectId(),
                oldId: 'EMP002',
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                password: hashedPassword,
                role: 'Employee',
                department: 'Engineering',
                designation: 'Senior Developer',
                joiningDate: '2023-03-10',
                salary: 95000,
                status: 'Active',
                avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random'
            },
            {
                _id: new mongoose.Types.ObjectId(),
                oldId: 'EMP003',
                name: 'Mike Johnson',
                email: 'mike.johnson@example.com',
                password: hashedPassword,
                role: 'Employee',
                department: 'Marketing',
                designation: 'Marketing Specialist',
                joiningDate: '2023-06-20',
                salary: 60000,
                status: 'Active',
                avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=random'
            },
            {
                _id: new mongoose.Types.ObjectId(),
                oldId: 'ADMIN001',
                name: 'Admin User',
                email: 'admin@hrms.com',
                password: adminPassword,
                role: 'Admin',
                avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
            }
        ];

        const createdUsers = await User.insertMany(users);
        const userMap = {};
        createdUsers.forEach(user => {
            // Find the original user object to get the oldId
            const originalUser = users.find(u => u.email === user.email);
            if (originalUser && originalUser.oldId) {
                userMap[originalUser.oldId] = user._id;
            }
        });

        // Add some extra mappings for names used in Feed
        const nameMap = {
            'Priyansh Jadhav': createdUsers[3]._id, // Map to Admin
            'Rakesh Sharma': createdUsers[1]._id, // Map to Jane
            'Alex Johnson': createdUsers[2]._id, // Map to Mike
            'Bob Smith': createdUsers[1]._id // Map to Jane
        };

        const attendance = [
            {
                employeeId: userMap['EMP002'],
                date: '2023-11-28',
                checkIn: new Date('2023-11-28T09:00:00'),
                checkOut: new Date('2023-11-28T17:00:00'),
                status: 'Present',
                totalHours: 8
            },
            {
                employeeId: userMap['EMP002'],
                date: '2023-11-29',
                checkIn: new Date('2023-11-29T09:15:00'),
                checkOut: new Date('2023-11-29T17:15:00'),
                status: 'Present',
                totalHours: 8
            },
            {
                employeeId: userMap['EMP003'],
                date: '2023-11-29',
                checkIn: new Date('2023-11-29T09:30:00'),
                checkOut: new Date('2023-11-29T18:00:00'),
                status: 'Present',
                totalHours: 8.5
            }
        ];

        await Attendance.insertMany(attendance);

        const leaves = [
            {
                employeeId: userMap['EMP002'],
                type: 'Sick',
                startDate: new Date('2023-12-01'),
                endDate: new Date('2023-12-02'),
                reason: 'Flu',
                status: 'Pending'
            },
            {
                employeeId: userMap['EMP003'],
                type: 'Casual',
                startDate: new Date('2023-12-05'),
                endDate: new Date('2023-12-05'),
                reason: 'Personal work',
                status: 'Approved',
                approvedBy: userMap['EMP001']
            }
        ];

        await Leave.insertMany(leaves);

        const events = [
            {
                title: 'Team Building',
                date: '2023-12-15',
                type: 'Event',
                createdBy: userMap['EMP001']
            },
            {
                title: 'Christmas Holiday',
                date: '2023-12-25',
                type: 'Holiday',
                createdBy: userMap['EMP001']
            }
        ];

        await Event.insertMany(events);

        const feedItems = [
            {
                senderId: nameMap['Priyansh Jadhav'],
                recipientId: nameMap['Rakesh Sharma'],
                type: 'Appreciation',
                badge: 'APPRECIATED',
                content: {
                    title: 'Congratulations to Rakesh Sharma',
                    body: "Rakesh's, your dedication and hard work have been instrumental in the successful launch of Version 2.0 of our app. Your outstanding performance in all that it is significantly appreciated. Keep up the great work!",
                    tags: ['Outstanding Performance']
                },
                likes: [],
                comments: [],
                points: 0
            },
            {
                senderId: nameMap['Alex Johnson'],
                recipientId: nameMap['Bob Smith'],
                type: 'Appreciation',
                badge: 'APPRECIATED',
                content: {
                    title: 'Stellar Teamwork',
                    body: "Kudos to Bob for outstanding teamwork on the recent project!",
                    tags: ['Team Collaboration']
                },
                likes: [],
                comments: [],
                points: 0
            }
        ];

        await Feed.insertMany(feedItems);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
