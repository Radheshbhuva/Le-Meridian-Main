require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Room = require('./models/Room');
const DiningItem = require('./models/DiningItem');
const Event = require('./models/Event');
const Offer = require('./models/Offer');
const SpaService = require('./models/SpaService');
const GalleryImage = require('./models/GalleryImage');
const bcrypt = require('bcryptjs');
const User = require('./models/User');


const seedRooms = async () => {
  try {
    await connectDB();
    
    // Clear existing rooms
    await Room.deleteMany({});
    
    // Sample rooms
    const sampleRooms = [
      { name: 'Deluxe Room', type: 'Deluxe Room', price: 8999 },
      { name: 'Executive Suite', type: 'Executive Suite', price: 15999 },
      { name: 'Presidential Suite', type: 'Presidential Suite', price: 35999 },
      { name: 'Club Room', type: 'Club Room', price: 12999 },
      { name: 'Family Suite', type: 'Family Suite', price: 19999 },
      { name: 'Heritage Room', type: 'Heritage Room', price: 10999 }
    ];
    
await Room.insertMany(sampleRooms);

// Seed dining items
await DiningItem.deleteMany({});
const sampleDining = [
  { name: 'Breakfast Buffet', description: 'Daily breakfast buffet', price: 25, category: 'Breakfast' },
  { name: 'A la Carte Dinner', description: 'Fine dining experience', price: 75, category: 'Dinner' }
];
await DiningItem.insertMany(sampleDining);

// Seed events
await Event.deleteMany({});
const sampleEvents = [
  { title: 'Live Music Night', description: 'Evening entertainment', date: new Date(), location: 'Ballroom', price: 20 }
];
await Event.insertMany(sampleEvents);

// Seed offers
await Offer.deleteMany({});
await Offer.insertMany([{ title: 'Stay 3 Get 1 Free', description: 'Special promotion', discount: 25, validFrom: new Date(), validTo: new Date(Date.now() + 30*24*60*60*1000) }]);

// Seed spa
await SpaService.deleteMany({});
await SpaService.insertMany([{ name: 'Massage', description: 'Relaxing massage', price: 100, duration: 60 }]);

// Seed gallery
await GalleryImage.deleteMany({});
await GalleryImage.insertMany([{ url: '/images/room1.jpg', category: 'Rooms' }]);
    // Seed admin user
    const adminExists = await User.findOne({ email: 'admin@lemeridian.com' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'Admin User',
        email: 'admin@lemeridian.com',
        phoneNumber: '0000000000',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    // Seed test user
    const testUserExists = await User.findOne({ email: 'test@lemeridian.com' });
    if (!testUserExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('test123', salt);
      await User.create({
        name: 'Test User',
        email: 'test@lemeridian.com',
        phoneNumber: '1111111111',
        password: hashedPassword,
        role: 'user'
      });
      console.log('Test user created');
    }

    console.log('Sample data and users seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedRooms();
