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

async function getHost() {
  const host = await User.findOne({ email: 'host@homelyhub.test' });
  if (!host) {
    console.error('Host user not found!');
    process.exit(1);
  }
  return host;
}

const additionalProperties = [
  {
    title: 'Luxury Penthouse - Dubai Marina',
    city: 'Dubai',
    country: 'UAE',
    price: 85000,
    category: 'luxury',
    propertyType: 'apartment',
    img0: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1600&q=80',
  },
  {
    title: 'Cozy Cottage - Ooty',
    city: 'Ooty',
    country: 'India',
    price: 16000,
    category: 'countryside',
    propertyType: 'house',
    img0: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1600&q=80',
  },
  {
    title: 'Beach Villa - Maldives',
    city: 'Male',
    country: 'Maldives',
    price: 95000,
    category: 'beachfront',
    propertyType: 'villa',
    img0: 'https://images.unsplash.com/photo-1540202404-a2f2a7385f8b?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=80',
  },
  {
    title: 'Urban Apartment - Singapore',
    city: 'Singapore',
    country: 'Singapore',
    price: 62000,
    category: 'city',
    propertyType: 'condo',
    img0: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1600&q=80',
  },
  {
    title: 'Hilltop Retreat - Darjeeling',
    city: 'Darjeeling',
    country: 'India',
    price: 19000,
    category: 'mountain',
    propertyType: 'cabin',
    img0: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1600&q=80',
  },
  {
    title: 'Modern Loft - Pune',
    city: 'Pune',
    country: 'India',
    price: 27000,
    category: 'city',
    propertyType: 'apartment',
    img0: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1600&q=80',
  },
  {
    title: 'Heritage Palace - Mysore',
    city: 'Mysore',
    country: 'India',
    price: 42000,
    category: 'luxury',
    propertyType: 'house',
    img0: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
  },
  {
    title: 'Lakeside Villa - Nainital',
    city: 'Nainital',
    country: 'India',
    price: 24000,
    category: 'countryside',
    propertyType: 'villa',
    img0: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80',
  },
  {
    title: 'Beach Shack - Gokarna',
    city: 'Gokarna',
    country: 'India',
    price: 12000,
    category: 'beachfront',
    propertyType: 'house',
    img0: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80',
  },
  {
    title: 'City Center Suite - Hyderabad',
    city: 'Hyderabad',
    country: 'India',
    price: 29000,
    category: 'city',
    propertyType: 'apartment',
    img0: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80',
  },
  {
    title: 'Desert Camp - Jaisalmer',
    city: 'Jaisalmer',
    country: 'India',
    price: 15000,
    category: 'camping',
    propertyType: 'other',
    img0: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80',
  },
  {
    title: 'Royal Suite - Jodhpur',
    city: 'Jodhpur',
    country: 'India',
    price: 36000,
    category: 'luxury',
    propertyType: 'hotel',
    img0: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80',
  },
  {
    title: 'Treehouse - Wayanad',
    city: 'Wayanad',
    country: 'India',
    price: 18000,
    category: 'other',
    propertyType: 'house',
    img0: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80',
  },
  {
    title: 'Coastal Apartment - Chennai',
    city: 'Chennai',
    country: 'India',
    price: 26000,
    category: 'city',
    propertyType: 'apartment',
    img0: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80',
  },
  {
    title: 'Mountain Lodge - Leh',
    city: 'Leh',
    country: 'India',
    price: 21000,
    category: 'mountain',
    propertyType: 'cabin',
    img0: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80',
  },
  {
    title: 'Boutique Hotel - Kolkata',
    city: 'Kolkata',
    country: 'India',
    price: 23000,
    category: 'city',
    propertyType: 'hotel',
    img0: 'https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&q=80',
  },
];

function propDoc(data, ownerId) {
  return {
    title: data.title,
    description: `Beautiful ${data.propertyType} in ${data.city}. Professionally managed with all modern amenities. Perfect for both leisure and business travelers.`,
    propertyType: data.propertyType,
    category: data.category,
    owner: ownerId,
    location: {
      address: `${data.title} Street`,
      city: data.city,
      country: data.country,
    },
    pricing: {
      basePrice: data.price,
      currency: 'INR',
      cleaningFee: Math.round(data.price * 0.08),
      serviceFee: Math.round(data.price * 0.1),
    },
    capacity: { guests: 4, bedrooms: 2, beds: 3, bathrooms: 2 },
    amenities: ['wifi', 'kitchen', 'parking', 'air-conditioning'],
    images: [
      { url: data.img0 },
      { url: data.img1 },
    ],
    rules: { checkIn: '15:00', checkOut: '11:00', cancellationPolicy: 'flexible' },
    availability: { instantBook: true, minNights: 1, maxNights: 30 },
    rating: { average: 4.5 + Math.random() * 0.5, count: Math.floor(Math.random() * 50) + 10 },
    status: 'active',
    featured: Math.random() > 0.6,
  };
}

async function seed() {
  await ensureConnection();
  const host = await getHost();

  const props = additionalProperties.map((p) => propDoc(p, host._id));

  await Property.insertMany(props);
  console.log(`✅ Added ${props.length} more properties!`);

  const total = await Property.countDocuments({});
  console.log(`📊 Total properties in database: ${total}`);

  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
