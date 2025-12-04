const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const Recognition = require('../models/Recognition');

dotenv.config({ path: path.join(__dirname, '../.env') });
const connectDB = require('../config/db');

const seedRecognitions = async () => {
    try {
        await connectDB();

        console.log('Fetching users...');
        const users = await User.find({}).limit(10);

        if (users.length < 2) {
            console.log('Not enough users to create recognitions. Please seed users first.');
            process.exit(1);
        }

        console.log('Clearing existing recognitions...');
        await Recognition.deleteMany({});

        const badges = [
            { name: 'Top Performer Badge', color: 'purple' },
            { name: 'Team Player Badge', color: 'blue' },
            { name: 'Innovation Badge', color: 'green' },
            { name: 'Leadership Badge', color: 'orange' },
            { name: 'Excellence Badge', color: 'red' },
            { name: 'Customer Focus Badge', color: 'teal' }
        ];

        const messages = [
            "Great work on completing the Q4 deliverables! Your dedication is truly admirable.",
            "Thank you for always being willing to help the team. You're an invaluable asset!",
            "Your innovative approach to solving problems has made a huge impact on our project.",
            "Outstanding leadership during the recent crisis. You kept the team motivated!",
            "Excellent work on the client presentation. You exceeded all expectations!",
            "Your attention to detail and commitment to quality is inspiring.",
            "Thank you for going above and beyond to ensure customer satisfaction.",
            "Great collaboration skills! You make teamwork look effortless.",
            "Your positive attitude makes the workplace better for everyone.",
            "Impressive problem-solving skills on the latest challenge. Well done!"
        ];

        console.log('Creating recognitions...');
        const recognitions = [];

        // Create 15 random recognitions
        for (let i = 0; i < 15; i++) {
            const giver = users[Math.floor(Math.random() * users.length)];
            let recipient = users[Math.floor(Math.random() * users.length)];

            // Ensure giver and recipient are different
            while (recipient._id.toString() === giver._id.toString()) {
                recipient = users[Math.floor(Math.random() * users.length)];
            }

            const badge = badges[Math.floor(Math.random() * badges.length)];
            const message = messages[Math.floor(Math.random() * messages.length)];

            // Create recognition with timestamps in the past
            const daysAgo = Math.floor(Math.random() * 30); // 0-30 days ago
            const createdAt = new Date();
            createdAt.setDate(createdAt.getDate() - daysAgo);

            recognitions.push({
                recipient: recipient._id,
                giver: giver._id,
                message,
                badge: badge.name,
                badgeColor: badge.color,
                createdAt
            });
        }

        await Recognition.insertMany(recognitions);
        console.log(`✓ Created ${recognitions.length} recognitions`);

        // Show summary
        const stats = await Recognition.aggregate([
            {
                $group: {
                    _id: '$recipient',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        const topRecipients = await User.populate(stats, {
            path: '_id',
            select: 'name'
        });

        console.log('\n✅ Recognition data seeded successfully!');
        console.log('\nTop Recipients:');
        topRecipients.forEach((item, index) => {
            console.log(`  ${index + 1}. ${item._id.name} - ${item.count} recognitions`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding recognitions:', error);
        process.exit(1);
    }
};

seedRecognitions();
