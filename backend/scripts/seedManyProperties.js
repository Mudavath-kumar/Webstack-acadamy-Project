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
    host = await User.create({
      name: 'Demo Host',
      email: 'host@homelyhub.test',
      password: '123456',
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

const properties = [
  // India Properties
  {
    title: 'Luxury Beachfront Villa - Goa',
    city: 'Goa',
    country: 'India',
    lat: 15.2993,
    lng: 74.1240,
    price: 45000,
    category: 'beachfront',
    propertyType: 'villa',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80',
  },
  {
    title: 'Modern Downtown Loft - Mumbai',
    city: 'Mumbai',
    country: 'India',
    lat: 19.076,
    lng: 72.8777,
    price: 35000,
    category: 'city',
    propertyType: 'apartment',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80',
  },
  {
    title: 'Cozy Mountain Cabin - Manali',
    city: 'Manali',
    country: 'India',
    lat: 32.2432,
    lng: 77.1892,
    price: 22000,
    category: 'mountain',
    propertyType: 'cabin',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1600&q=80',
  },
  {
    title: 'Heritage Haveli - Jaipur',
    city: 'Jaipur',
    country: 'India',
    lat: 26.9124,
    lng: 75.7873,
    price: 28000,
    category: 'luxury',
    propertyType: 'house',
    featured: false,
    img0: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
  },
  {
    title: 'Riverside Cottage - Rishikesh',
    city: 'Rishikesh',
    country: 'India',
    lat: 30.0869,
    lng: 78.2676,
    price: 18000,
    category: 'countryside',
    propertyType: 'house',
    featured: false,
    img0: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1600&q=80',
  },
  {
    title: 'Tech Hub Apartment - Bangalore',
    city: 'Bangalore',
    country: 'India',
    lat: 12.9716,
    lng: 77.5946,
    price: 32000,
    category: 'city',
    propertyType: 'apartment',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80',
  },
  {
    title: 'Lake View Resort - Udaipur',
    city: 'Udaipur',
    country: 'India',
    lat: 24.5854,
    lng: 73.7125,
    price: 38000,
    category: 'luxury',
    propertyType: 'villa',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80',
  },
  {
    title: 'Colonial Bungalow - Shimla',
    city: 'Shimla',
    country: 'India',
    lat: 31.1048,
    lng: 77.1734,
    price: 25000,
    category: 'mountain',
    propertyType: 'house',
    featured: false,
    img0: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1600&q=80',
  },
  {
    title: 'Urban Studio - Delhi',
    city: 'Delhi',
    country: 'India',
    lat: 28.7041,
    lng: 77.1025,
    price: 20000,
    category: 'city',
    propertyType: 'apartment',
    featured: false,
    img0: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1600&q=80',
  },
  {
    title: 'Backwater Houseboat - Kerala',
    city: 'Alleppey',
    country: 'India',
    lat: 9.4981,
    lng: 76.3388,
    price: 15000,
    category: 'other',
    propertyType: 'other',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80',
  },
  // International Properties
  {
    title: 'Manhattan Penthouse - New York',
    city: 'New York',
    country: 'United States',
    lat: 40.7589,
    lng: -73.9851,
    price: 75000,
    category: 'luxury',
    propertyType: 'apartment',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1600&q=80',
  },
  {
    title: 'Ski Chalet - Aspen',
    city: 'Aspen',
    country: 'United States',
    lat: 39.1911,
    lng: -106.8175,
    price: 55000,
    category: 'ski-in-out',
    propertyType: 'cabin',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
  },
  {
    title: 'Beach House - Malibu',
    city: 'Malibu',
    country: 'United States',
    lat: 34.0259,
    lng: -118.7798,
    price: 68000,
    category: 'beachfront',
    propertyType: 'house',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=80',
  },
  {
    title: 'Downtown Condo - Chicago',
    city: 'Chicago',
    country: 'United States',
    lat: 41.8781,
    lng: -87.6298,
    price: 42000,
    category: 'city',
    propertyType: 'condo',
    featured: false,
    img0: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80',
  },
  {
    title: 'Desert Oasis - Dubai',
    city: 'Dubai',
    country: 'UAE',
    lat: 25.2048,
    lng: 55.2708,
    price: 85000,
    category: 'luxury',
    propertyType: 'villa',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80',
  },
  {
    title: 'Traditional Riad - Marrakech',
    city: 'Marrakech',
    country: 'Morocco',
    lat: 31.6295,
    lng: -7.9811,
    price: 28000,
    category: 'other',
    propertyType: 'house',
    featured: false,
    img0: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
  },
  {
    title: 'Tropical Villa - Bali',
    city: 'Ubud',
    country: 'Indonesia',
    lat: -8.5069,
    lng: 115.2625,
    price: 32000,
    category: 'beachfront',
    propertyType: 'villa',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=80',
  },
  {
    title: 'Alpine Lodge - Swiss Alps',
    city: 'Zermatt',
    country: 'Switzerland',
    lat: 46.0207,
    lng: 7.7491,
    price: 72000,
    category: 'ski-in-out',
    propertyType: 'cabin',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80',
  },
  {
    title: 'Historic Apartment - Paris',
    city: 'Paris',
    country: 'France',
    lat: 48.8566,
    lng: 2.3522,
    price: 58000,
    category: 'city',
    propertyType: 'apartment',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&q=80',
  },
  {
    title: 'Countryside Villa - Tuscany',
    city: 'Florence',
    country: 'Italy',
    lat: 43.7696,
    lng: 11.2558,
    price: 48000,
    category: 'countryside',
    propertyType: 'villa',
    featured: false,
    img0: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&q=80',
  },
  {
    title: 'Waterfront Apartment - Sydney',
    city: 'Sydney',
    country: 'Australia',
    lat: -33.8688,
    lng: 151.2093,
    price: 52000,
    category: 'city',
    propertyType: 'apartment',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80',
  },
  {
    title: 'Island Resort - Maldives',
    city: 'Male',
    country: 'Maldives',
    lat: 4.1755,
    lng: 73.5093,
    price: 95000,
    category: 'beachfront',
    propertyType: 'villa',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1540202404-a2f2a7385f8b?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=80',
  },
  {
    title: 'Modern Loft - Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    price: 45000,
    category: 'city',
    propertyType: 'apartment',
    featured: false,
    img0: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=80',
  },
  {
    title: 'Safari Lodge - Cape Town',
    city: 'Cape Town',
    country: 'South Africa',
    lat: -33.9249,
    lng: 18.4241,
    price: 38000,
    category: 'other',
    propertyType: 'house',
    featured: false,
    img0: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80',
  },
  {
    title: 'Luxury Condo - Singapore',
    city: 'Singapore',
    country: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    price: 62000,
    category: 'luxury',
    propertyType: 'condo',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1600&q=80',
  },
  {
    title: 'Beachfront Bungalow - Thailand',
    city: 'Phuket',
    country: 'Thailand',
    lat: 7.8804,
    lng: 98.3923,
    price: 29000,
    category: 'beachfront',
    propertyType: 'house',
    featured: false,
    img0: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80',
  },
  {
    title: 'City Center Hotel - London',
    city: 'London',
    country: 'United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
    price: 55000,
    category: 'city',
    propertyType: 'hotel',
    featured: true,
    img0: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80',
    img1: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80',
  },
];

function propDoc(data, ownerId) {
  return {
    title: data.title,
    description: `Amazing ${data.propertyType} in ${data.city}. Professionally managed with modern amenities and excellent location. Perfect for travelers seeking comfort and style.`,
    propertyType: data.propertyType,
    category: data.category,
    owner: ownerId,
    location: {
      address: `${data.title} address`,
      city: data.city,
      country: data.country,
      coordinates: { latitude: data.lat, longitude: data.lng },
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
      { url: data.img0 || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80' },
      { url: data.img1 || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80' },
    ],
    rules: { checkIn: '15:00', checkOut: '11:00', cancellationPolicy: 'flexible' },
    availability: { instantBook: true, minNights: 1, maxNights: 30 },
    rating: { average: 4.5 + Math.random() * 0.5, count: Math.floor(Math.random() * 50) + 10 },
    status: 'active',
    featured: data.featured,
  };
}

async function seed() {
  await ensureConnection();
  const host = await createHostIfMissing();

  await Property.deleteMany({});
  console.log('Cleared existing properties');

  const props = properties.map((p) => propDoc(p, host._id));

  await Property.insertMany(props);
  console.log(`✅ Inserted ${props.length} properties successfully!`);

  console.log('Seeding completed.');
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
