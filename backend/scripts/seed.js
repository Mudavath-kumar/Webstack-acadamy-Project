import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import Property from '../models/Property.js';
import User from '../models/User.js';

dotenv.config({ override: true });

async function ensureConnection() {
  try {
    await connectDB();
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

async function createHostIfMissing() {
  let host = await User.findOne({ email: 'host@homelyhub.test' }).select('+password');
  if (!host) {
    const password = await bcrypt.hash('123456', 10);
    host = await User.create({
      name: 'Demo Host',
      email: 'host@homelyhub.test',
      password: '123456', // will be hashed by pre-save
      role: 'host',
      avatar: { url: 'https://i.pravatar.cc/150?img=3' },
      bio: 'Experienced host with multiple premium stays.',
    });
    console.log('Created demo host user:', host.email);
  } else {
    console.log('Using existing host user:', host.email);
  }
  return host;
}

function propDoc({ title, city, country, lat, lng, price, featured, img0, img1 }) {
  return {
    title,
    description: 'Professionally managed stay with modern amenities and great location.',
    propertyType: 'house',
    category: 'city',
    location: {
      address: `${title} address`,
      city,
      country,
      coordinates: { latitude: lat, longitude: lng },
    },
    pricing: { basePrice: price, currency: 'INR', cleaningFee: Math.round(price * 0.08), serviceFee: Math.round(price * 0.1) },
    capacity: { guests: 4, bedrooms: 2, beds: 3, bathrooms: 2 },
    amenities: ['wifi', 'kitchen', 'parking', 'air-conditioning'],
    images: [
      { url: img0 || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80' },
      { url: img1 || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80' },
    ],
    rules: { checkIn: '15:00', checkOut: '11:00', cancellationPolicy: 'flexible' },
    availability: { instantBook: true, minNights: 1, maxNights: 30 },
    rating: { average: 4.8, count: 24 },
    status: 'active',
    featured: !!featured,
  };
}

async function seed() {
  await ensureConnection();
  const host = await createHostIfMissing();

  // Basic set of properties
  const props = [
    propDoc({
      title: 'Modern Downtown Loft',
      city: 'Mumbai',
      country: 'India',
      lat: 19.076, lng: 72.8777,
      price: 35000,
      featured: true,
      img0: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80',
      img1: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80',
    }),
    propDoc({
      title: 'Cozy Mountain Cabin',
      city: 'Manali',
      country: 'India',
      lat: 32.2432, lng: 77.1892,
      price: 22000,
      featured: true,
      img0: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1600&q=80',
      img1: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1600&q=80',
    }),
    propDoc({
      title: 'Beachfront Paradise',
      city: 'Goa',
      country: 'India',
      lat: 15.2993, lng: 74.1240,
      price: 28000,
      featured: false,
      img0: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80',
      img1: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80',
    }),
  ];

  const existing = await Property.countDocuments({});
  if (existing === 0) {
    const toInsert = props.map((p) => ({ ...p, owner: host._id }));
    await Property.insertMany(toInsert);
    console.log(`Inserted ${toInsert.length} properties.`);
  } else {
    console.log(`Properties already exist (${existing}). Skipping insert.`);
  }

  console.log('Seeding completed.');
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
