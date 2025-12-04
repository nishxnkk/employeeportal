const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const Message = require('../models/Message');

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');

const demoUsers = [
    {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        password: 'password123',
        role: 'Employee',
        department: 'Marketing',
        designation: 'Marketing Manager',
        status: 'Active'
    },
    {
        name: 'Michael Chen',
        email: 'michael.chen@company.com',
        password: 'password123',
        role: 'Employee',
        department: 'Engineering',
        designation: 'Senior Developer',
        status: 'Active'
    },
    {
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@company.com',
        password: 'password123',
        role: 'Employee',
        department: 'HR',
        designation: 'HR Specialist',
        status: 'Active'
    },
    {
        name: 'David Kim',
        email: 'david.kim@company.com',
        password: 'password123',
        role: 'Employee',
        department: 'Sales',
        designation: 'Sales Executive',
        status: 'Active'
    },
    {
        name: 'Lisa Anderson',
        email: 'lisa.anderson@company.com',
        password: 'password123',
        role: 'Employee',
        department: 'Design',
        designation: 'UI/UX Designer',
        status: 'Active'
    }
];

const seedUsersAndChats = async () => {
    try {
        await connectDB();

        console.log('Clearing existing demo users and messages...');
        await User.deleteMany({ email: { $in: demoUsers.map(u => u.email) } });

        console.log('Creating demo users...');
        const createdUsers = [];

        for (const userData of demoUsers) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            const user = await User.create({
                ...userData,
                password: hashedPassword
            });

            createdUsers.push(user);
            console.log(`✓ Created user: ${user.name}`);
        }

        console.log('\nCreating chat messages...');

        // Clear existing messages between these users
        const userIds = createdUsers.map(u => u._id);
        await Message.deleteMany({
            $or: [
                { sender: { $in: userIds } },
                { receiver: { $in: userIds } }
            ]
        });

        const chatMessages = [
            // Sarah and Michael conversation
            {
                sender: createdUsers[0]._id, // Sarah
                receiver: createdUsers[1]._id, // Michael
                message: 'Hey Michael! Did you get a chance to review the new design mockups?',
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
            },
            {
                sender: createdUsers[1]._id, // Michael
                receiver: createdUsers[0]._id, // Sarah
                message: 'Yes! They look great. I especially like the color scheme you chose.',
                createdAt: new Date(Date.now() - 1.9 * 60 * 60 * 1000)
            },
            {
                sender: createdUsers[0]._id, // Sarah
                receiver: createdUsers[1]._id, // Michael
                message: 'Thanks! Can we schedule a quick meeting to discuss the implementation?',
                createdAt: new Date(Date.now() - 1.8 * 60 * 60 * 1000)
            },
            {
                sender: createdUsers[1]._id, // Michael
                receiver: createdUsers[0]._id, // Sarah
                message: 'Sure! How about tomorrow at 2 PM?',
                createdAt: new Date(Date.now() - 1.7 * 60 * 60 * 1000)
            },

            // Emily and David conversation
            {
                sender: createdUsers[2]._id, // Emily
                receiver: createdUsers[3]._id, // David
                message: 'Hi David, I need to discuss your leave request.',
                createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
            },
            {
                sender: createdUsers[3]._id, // David
                receiver: createdUsers[2]._id, // Emily
                message: 'Sure! Is there any issue with it?',
                createdAt: new Date(Date.now() - 4.9 * 60 * 60 * 1000)
            },
            {
                sender: createdUsers[2]._id, // Emily
                receiver: createdUsers[3]._id, // David
                message: 'No issues! Just wanted to confirm the dates. You requested Dec 15-20, correct?',
                createdAt: new Date(Date.now() - 4.8 * 60 * 60 * 1000)
            },
            {
                sender: createdUsers[3]._id, // David
                receiver: createdUsers[2]._id, // Emily
                message: 'Yes, that\'s correct. Thanks for checking!',
                createdAt: new Date(Date.now() - 4.7 * 60 * 60 * 1000)
            },

            // Lisa and Sarah conversation
            {
                sender: createdUsers[4]._id, // Lisa
                receiver: createdUsers[0]._id, // Sarah
                message: 'Sarah, I\'ve completed the new logo designs. Want to take a look?',
                createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
            },
            {
                sender: createdUsers[0]._id, // Sarah
                receiver: createdUsers[4]._id, // Lisa
                message: 'Absolutely! Can you send them over?',
                createdAt: new Date(Date.now() - 2.9 * 60 * 60 * 1000)
            },
            {
                sender: createdUsers[4]._id, // Lisa
                receiver: createdUsers[0]._id, // Sarah
                message: 'Just sent them to your email. Let me know what you think!',
                createdAt: new Date(Date.now() - 2.8 * 60 * 60 * 1000)
            },

            // Michael and David conversation
            {
                sender: createdUsers[1]._id, // Michael
                receiver: createdUsers[3]._id, // David
                message: 'David, the client demo went really well! Great job on the presentation.',
                createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
            },
            {
                sender: createdUsers[3]._id, // David
                receiver: createdUsers[1]._id, // Michael
                message: 'Thanks Michael! Couldn\'t have done it without your technical support.',
                createdAt: new Date(Date.now() - 0.9 * 60 * 60 * 1000)
            },

            // Emily and Lisa conversation
            {
                sender: createdUsers[2]._id, // Emily
                receiver: createdUsers[4]._id, // Lisa
                message: 'Hey Lisa! Reminder about the team building event this Friday.',
                createdAt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
            },
            {
                sender: createdUsers[4]._id, // Lisa
                receiver: createdUsers[2]._id, // Emily
                message: 'Thanks for the reminder! I\'ll be there. What time does it start?',
                createdAt: new Date(Date.now() - 25 * 60 * 1000)
            },
            {
                sender: createdUsers[2]._id, // Emily
                receiver: createdUsers[4]._id, // Lisa
                message: 'It starts at 5 PM at the rooftop lounge!',
                createdAt: new Date(Date.now() - 20 * 60 * 1000)
            }
        ];

        for (const msgData of chatMessages) {
            await Message.create(msgData);
        }

        console.log(`✓ Created ${chatMessages.length} chat messages`);

        console.log('\n✅ Demo users and chats seeded successfully!');
        console.log('\nDemo user credentials:');
        demoUsers.forEach(user => {
            console.log(`  - ${user.name} (${user.email}) - password: password123`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedUsersAndChats();
