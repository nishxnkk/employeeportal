const mongoose = require('mongoose');
const Event = require('../models/Event');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const sampleEvents = [
    {
        title: 'HR Leadership Summit 2024',
        description: 'Join industry leaders for insights on modern HR practices and talent management.',
        category: 'Conference',
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-03-16'),
        location: 'San Francisco Conference Center',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        capacity: 250,
        registrationDeadline: new Date('2024-03-10'),
        status: 'upcoming',
        attendees: []
    },
    {
        title: 'Talent Acquisition Workshop',
        description: 'Master talent sourcing and recruitment marketing in the digital age.',
        category: 'Workshop',
        startDate: new Date('2024-04-05'),
        endDate: new Date('2024-04-05'),
        location: 'New York Business Hub',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
        capacity: 100,
        registrationDeadline: new Date('2024-04-01'),
        status: 'upcoming',
        attendees: []
    },
    {
        title: 'Employee Wellness Symposium',
        description: 'Explore innovative approaches to employee wellbeing and engagement.',
        category: 'Symposium',
        startDate: new Date('2024-02-20'),
        endDate: new Date('2024-02-20'),
        location: 'Chicago Lakeside Center',
        imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800',
        capacity: 180,
        registrationDeadline: new Date('2024-02-15'),
        status: 'upcoming',
        attendees: []
    },
    {
        title: 'HR Tech Innovation Expo',
        description: 'Discover cutting-edge HR tech solutions and AI tools.',
        category: 'Expo',
        startDate: new Date('2024-01-12'),
        endDate: new Date('2024-01-12'),
        location: 'Austin Convention Center',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
        capacity: 300,
        registrationDeadline: new Date('2024-01-08'),
        status: 'upcoming',
        attendees: []
    },
    {
        title: 'Diversity & Inclusion Forum',
        description: 'Building inclusive cultures for organizational success.',
        category: 'Forum',
        startDate: new Date('2024-05-08'),
        endDate: new Date('2024-05-08'),
        location: 'Seattle Tech Park',
        imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
        capacity: 150,
        registrationDeadline: new Date('2024-05-03'),
        status: 'upcoming',
        attendees: []
    },
    {
        title: 'Future of Work Conference',
        description: 'Exploring remote work and AI integration in workplaces.',
        category: 'Conference',
        startDate: new Date('2024-06-22'),
        endDate: new Date('2024-06-22'),
        location: 'Boston Innovation Center',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        capacity: 200,
        registrationDeadline: new Date('2024-06-18'),
        status: 'upcoming',
        attendees: []
    }
];

const seedEvents = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding events...');

        // Clear existing events
        await Event.deleteMany({});
        console.log('Existing events cleared');

        // Insert sample events
        const createdEvents = await Event.insertMany(sampleEvents);
        console.log(`${createdEvents.length} events created successfully`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding events:', error);
        process.exit(1);
    }
};

seedEvents();
