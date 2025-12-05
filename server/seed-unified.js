const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');
const Message = require('./models/Message');
const Attendance = require('./models/Attendance');
const Leave = require('./models/Leave');
const Event = require('./models/Event');
const Feed = require('./models/Feed');
const Meeting = require('./models/Meeting');

dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = require('./config/db');

// Demo users with consistent credentials
const demoUsers = [
    {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        password: 'password123',
        role: 'Admin',
        department: 'HR',
        designation: 'HR Manager',
        status: 'Active',
        joiningDate: '2023-01-15',
        salary: 85000
    },
    {
        name: 'Michael Chen',
        email: 'michael.chen@company.com',
        password: 'password123',
        role: 'Employee',
        department: 'Engineering',
        designation: 'Senior Developer',
        status: 'Active',
        joiningDate: '2023-03-10',
        salary: 95000
    },
    {
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@company.com',
        password: 'password123',
        role: 'Employee',
        department: 'HR',
        designation: 'HR Specialist',
        status: 'Active',
        joiningDate: '2023-06-20',
        salary: 65000
    },
    {
        name: 'David Kim',
        email: 'david.kim@company.com',
        password: 'password123',
        role: 'Employee',
        department: 'Sales',
        designation: 'Sales Executive',
        status: 'Active',
        joiningDate: '2023-08-01',
        salary: 70000
    },
    {
        name: 'Lisa Anderson',
        email: 'lisa.anderson@company.com',
        password: 'password123',
        role: 'Employee',
        department: 'Design',
        designation: 'UI/UX Designer',
        status: 'Active',
        joiningDate: '2023-09-15',
        salary: 75000
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Message.deleteMany({});
        await Attendance.deleteMany({});
        await Leave.deleteMany({});
        await Event.deleteMany({});
        await Feed.deleteMany({});
        await Meeting.deleteMany({});

        console.log('\n👥 Creating demo users...');
        const createdUsers = [];

        for (const userData of demoUsers) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            const user = await User.create({
                ...userData,
                password: hashedPassword,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`
            });

            createdUsers.push(user);
            console.log(`  ✓ ${user.name} (${user.email})`);
        }

        console.log('\n📅 Creating attendance records...');
        const attendanceRecords = [
            {
                employeeId: createdUsers[1]._id, // Michael
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                checkIn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000),
                checkOut: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 17 * 60 * 60 * 1000),
                status: 'Present',
                totalHours: 8
            },
            {
                employeeId: createdUsers[2]._id, // Emily
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                checkIn: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000),
                checkOut: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000),
                status: 'Present',
                totalHours: 9
            }
        ];

        await Attendance.insertMany(attendanceRecords);
        console.log(`  ✓ Created ${attendanceRecords.length} attendance records`);

        console.log('\n📝 Creating leave requests...');
        const leaveRequests = [
            {
                employeeId: createdUsers[3]._id, // David
                type: 'Casual',
                startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
                reason: 'Family vacation',
                status: 'Pending'
            },
            {
                employeeId: createdUsers[4]._id, // Lisa
                type: 'Sick',
                startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                reason: 'Medical appointment',
                status: 'Approved',
                approvedBy: createdUsers[0]._id // Sarah (Admin)
            }
        ];

        await Leave.insertMany(leaveRequests);
        console.log(`  ✓ Created ${leaveRequests.length} leave requests`);

        console.log('\n🎉 Creating events...');
        const events = [
            {
                title: 'Team Building Activity',
                date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                type: 'Event',
                description: 'Annual team building event at the beach resort',
                createdBy: createdUsers[0]._id // Sarah
            },
            {
                title: 'Christmas Holiday',
                date: new Date('2024-12-25'),
                type: 'Holiday',
                description: 'Christmas Day - Office Closed',
                createdBy: createdUsers[0]._id
            },
            {
                title: 'New Year Holiday',
                date: new Date('2025-01-01'),
                type: 'Holiday',
                description: 'New Year\'s Day - Office Closed',
                createdBy: createdUsers[0]._id
            }
        ];

        await Event.insertMany(events);
        console.log(`  ✓ Created ${events.length} events`);

        console.log('\n💬 Creating chat messages...');
        const chatMessages = [
            // Sarah and Michael conversation
            {
                sender: createdUsers[0]._id,
                receiver: createdUsers[1]._id,
                message: 'Hey Michael! Did you get a chance to review the new design mockups?',
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
            },
            {
                sender: createdUsers[1]._id,
                receiver: createdUsers[0]._id,
                message: 'Yes! They look great. I especially like the color scheme you chose.',
                createdAt: new Date(Date.now() - 1.9 * 60 * 60 * 1000)
            },
            {
                sender: createdUsers[0]._id,
                receiver: createdUsers[1]._id,
                message: 'Thanks! Can we schedule a quick meeting to discuss the implementation?',
                createdAt: new Date(Date.now() - 1.8 * 60 * 60 * 1000)
            },
            // Emily and David conversation
            {
                sender: createdUsers[2]._id,
                receiver: createdUsers[3]._id,
                message: 'Hi David, I need to discuss your leave request.',
                createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
            },
            {
                sender: createdUsers[3]._id,
                receiver: createdUsers[2]._id,
                message: 'Sure! Is there any issue with it?',
                createdAt: new Date(Date.now() - 4.9 * 60 * 60 * 1000)
            },
            // Lisa and Sarah conversation
            {
                sender: createdUsers[4]._id,
                receiver: createdUsers[0]._id,
                message: 'Sarah, I\'ve completed the new logo designs. Want to take a look?',
                createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
            }
        ];

        await Message.insertMany(chatMessages);
        console.log(`  ✓ Created ${chatMessages.length} chat messages`);

        console.log('\n🏆 Creating feed posts...');
        const feedPosts = [
            {
                senderId: createdUsers[0]._id, // Sarah
                recipientId: createdUsers[1]._id, // Michael
                type: 'Appreciation',
                badge: 'APPRECIATED',
                content: {
                    title: 'Congratulations to Michael Chen',
                    body: 'Michael\'s dedication and hard work have been instrumental in the successful launch of Version 2.0 of our app. Your outstanding performance is significantly appreciated. Keep up the great work!',
                    tags: ['Outstanding Performance', 'Team Player']
                },
                likes: [],
                comments: [],
                points: 0,
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                senderId: createdUsers[2]._id, // Emily
                recipientId: createdUsers[4]._id, // Lisa
                type: 'Appreciation',
                badge: 'APPRECIATED',
                content: {
                    title: 'Stellar Design Work',
                    body: 'Kudos to Lisa for outstanding creativity on the recent UI redesign project!',
                    tags: ['Creative Excellence']
                },
                likes: [],
                comments: [],
                points: 0,
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            }
        ];

        await Feed.insertMany(feedPosts);
        console.log(`  ✓ Created ${feedPosts.length} feed posts`);

        console.log('\n✅ Database seeded successfully!\n');
        console.log('═══════════════════════════════════════════════════');
        console.log('📋 DEMO USER CREDENTIALS');
        console.log('═══════════════════════════════════════════════════\n');

        demoUsers.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name}`);
            console.log(`   Email:    ${user.email}`);
            console.log(`   Password: ${user.password}`);
            console.log(`   Role:     ${user.role}`);
            console.log('');
        });

        console.log('═══════════════════════════════════════════════════');
        console.log('💡 TIP: Use Sarah Johnson\'s credentials to login as Admin');
        console.log('═══════════════════════════════════════════════════\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
