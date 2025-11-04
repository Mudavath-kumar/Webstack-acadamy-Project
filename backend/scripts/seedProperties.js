import mongoose from 'mongoose';import mongoose from 'mongoose';import dotenv from 'dotenv';

import Property from '../models/Property.js';

import User from '../models/User.js';import Property from '../models/Property.js';import mongoose from 'mongoose';



const MONGODB_URI = 'mongodb+srv://bycoderun:codebyrun143@cluster0.zsov2sv.mongodb.net/test?retryWrites=true&w=majority';import User from '../models/User.js';import Property from '../models/Property.js';



const createHostUser = async () => {import User from '../models/User.js';

  let host = await User.findOne({ role: 'host' });

  const MONGODB_URI = 'mongodb+srv://bycoderun:codebyrun143@cluster0.zsov2sv.mongodb.net/test?retryWrites=true&w=majority';

  if (!host) {

    host = await User.create({// Load environment variables

      firstName: 'Demo',

      lastName: 'Host',// First, we need to create or find a host userdotenv.config();

      email: 'demohost@airbnb.com',

      password: '$2a$10$demoHashedPasswordForSeedingOnly',const createHostUser = async () => {

      role: 'host',

      phone: '+1234567890',  let host = await User.findOne({ role: 'host' });// Sample properties data

      isEmailVerified: true,

      isPhoneVerified: true,  const sampleProperties = [

    });

    console.log('Created demo host user');  if (!host) {  {

  }

      host = await User.create({    title: 'Luxury Beachfront Villa',

  return host._id;

};      firstName: 'Demo',    description: 'Stunning beachfront villa with panoramic ocean views. Features include private beach access, infinity pool, modern kitchen, and spacious living areas. Perfect for families or groups seeking ultimate relaxation.',



const getSampleProperties = (ownerId) => [      lastName: 'Host',    propertyType: 'villa',

  {

    title: 'Luxury Beachfront Villa',      email: 'demohost@airbnb.com',    location: {

    description: 'Experience ultimate luxury in this stunning beachfront villa with panoramic ocean views.',

    propertyType: 'villa',      password: '$2a$10$demoHashedPasswordForSeedingOnly',      address: '123 Beach Road',

    category: 'beachfront',

    owner: ownerId,      role: 'host',      city: 'Malibu',

    location: {

      address: '123 Ocean Drive',      phone: '+1234567890',      state: 'California',

      city: 'Malibu',

      state: 'California',      isEmailVerified: true,      country: 'United States',

      country: 'United States',

      zipCode: '90265'      isPhoneVerified: true,      zipCode: '90265',

    },

    pricing: {    });      coordinates: { lat: 34.0259, lng: -118.7798 }

      basePrice: 850,

      currency: 'USD',    console.log('Created demo host user');    },

      cleaningFee: 150

    },  }    pricing: {

    capacity: {

      guests: 8,        basePrice: 45000,

      bedrooms: 4,

      beds: 5,  return host._id;      cleaningFee: 5000,

      bathrooms: 3

    },};      currency: 'INR'

    amenities: ['wifi', 'pool', 'beach-access', 'parking', 'air-conditioning', 'kitchen', 'tv', 'hot-tub'],

    images: [    },

      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', public_id: 'villa1' },

      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', public_id: 'villa2' }const getSampleProperties = (ownerId) => [    capacity: {

    ],

    status: 'active',  {      guests: 8,

    featured: true

  },    title: 'Luxury Beachfront Villa',      bedrooms: 4,

  {

    title: 'Modern Downtown Loft',    description: 'Experience ultimate luxury in this stunning beachfront villa with panoramic ocean views. Perfect for families or groups seeking a premium coastal getaway.',      beds: 5,

    description: 'Stylish loft in the heart of the city. Walking distance to restaurants and entertainment.',

    propertyType: 'apartment',    propertyType: 'villa',      bathrooms: 3

    category: 'city',

    owner: ownerId,    category: 'beachfront',    },

    location: {

      address: '456 Broadway',    owner: ownerId,    amenities: ['wifi', 'kitchen', 'pool', 'parking', 'air-conditioning', 'beachfront', 'hot-tub'],

      city: 'New York',

      state: 'New York',    location: {    images: [

      country: 'United States',

      zipCode: '10001'      address: '123 Ocean Drive',      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', public_id: 'villa1' },

    },

    pricing: {      city: 'Malibu',      { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', public_id: 'villa2' }

      basePrice: 300,

      cleaningFee: 50,      state: 'California',    ],

      currency: 'USD'

    },      country: 'United States',    status: 'active',

    capacity: {

      guests: 4,      zipCode: '90265',    featured: true,

      bedrooms: 2,

      beds: 2,    },    rating: { average: 4.9, count: 45 }

      bathrooms: 2

    },    pricing: {  },

    amenities: ['wifi', 'kitchen', 'parking', 'air-conditioning', 'gym', 'elevator'],

    images: [      basePrice: 850,  {

      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', public_id: 'loft1' },

      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', public_id: 'loft2' }      currency: 'USD',    title: 'Modern Downtown Loft',

    ],

    status: 'active',      cleaningFee: 150,    description: 'Stylish loft in the heart of downtown. Walking distance to restaurants, shops, and entertainment. Features exposed brick, high ceilings, and contemporary furnishings.',

    featured: true

  },      weeklyDiscount: 10,    propertyType: 'apartment',

  {

    title: 'Mountain Retreat Cabin',      monthlyDiscount: 20,    location: {

    description: 'Cozy cabin nestled in the mountains. Perfect for nature lovers and outdoor enthusiasts.',

    propertyType: 'cabin',    },      address: '456 Urban Street',

    category: 'mountain',

    owner: ownerId,    capacity: {      city: 'New York',

    location: {

      address: '789 Mountain Trail',      guests: 8,      state: 'New York',

      city: 'Aspen',

      state: 'Colorado',      bedrooms: 4,      country: 'United States',

      country: 'United States',

      zipCode: '81611'      beds: 5,      zipCode: '10001',

    },

    pricing: {      bathrooms: 3,      coordinates: { lat: 40.7589, lng: -73.9851 }

      basePrice: 250,

      cleaningFee: 75,    },    },

      currency: 'USD'

    },    amenities: ['wifi', 'pool', 'beach-access', 'parking', 'air-conditioning', 'kitchen', 'tv', 'hot-tub'],    pricing: {

    capacity: {

      guests: 6,    images: [      basePrice: 15000,

      bedrooms: 3,

      beds: 4,      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', public_id: 'villa1' },      cleaningFee: 2000,

      bathrooms: 2

    },      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', public_id: 'villa2' }      currency: 'INR'

    amenities: ['wifi', 'kitchen', 'parking', 'fireplace', 'heating'],

    images: [    ],    },

      { url: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80', public_id: 'cabin1' },

      { url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80', public_id: 'cabin2' }    status: 'active',    capacity: {

    ],

    status: 'active',    featured: true,      guests: 4,

    featured: false

  },    rating: { average: 4.9, count: 45 }      bedrooms: 2,

  {

    title: 'Tropical Paradise Bungalow',  },      beds: 2,

    description: 'Charming bungalow surrounded by lush tropical gardens. Private pool and open-air living spaces.',

    propertyType: 'house',  {      bathrooms: 2

    category: 'beachfront',

    owner: ownerId,    title: 'Modern Downtown Loft',    },

    location: {

      address: '321 Palm Avenue',    description: 'Stylish loft in the heart of the city. Walking distance to restaurants, shops, and entertainment. High ceilings, exposed brick, and modern amenities.',    amenities: ['wifi', 'kitchen', 'parking', 'air-conditioning', 'gym', 'elevator'],

      city: 'Bali',

      state: 'Bali',    propertyType: 'apartment',    images: [

      country: 'Indonesia',

      zipCode: '80361'    category: 'city',      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', public_id: 'loft1' },

    },

    pricing: {    owner: ownerId,      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', public_id: 'loft2' }

      basePrice: 180,

      cleaningFee: 40,    location: {    ],

      currency: 'USD'

    },      address: '456 Broadway',    status: 'active',

    capacity: {

      guests: 4,      city: 'New York',    featured: true,

      bedrooms: 2,

      beds: 2,      state: 'New York',    rating: { average: 4.7, count: 32 }

      bathrooms: 2

    },      country: 'United States',  },

    amenities: ['wifi', 'kitchen', 'pool', 'parking', 'air-conditioning', 'garden'],

    images: [      zipCode: '10001',  {

      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', public_id: 'bungalow1' },

      { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', public_id: 'bungalow2' }    },    title: 'Mountain Retreat Cabin',

    ],

    status: 'active',    pricing: {    description: 'Cozy cabin nestled in the mountains. Perfect for nature lovers and outdoor enthusiasts. Features fireplace, deck with mountain views, and hiking trails nearby.',

    featured: false

  },      basePrice: 300,    propertyType: 'cabin',

  {

    title: 'Seaside Cottage',      cleaningFee: 50,    location: {

    description: 'Quaint cottage steps from the beach. Enjoy morning coffee on the porch with ocean breezes.',

    propertyType: 'house',      currency: 'USD'      address: '789 Mountain Trail',

    category: 'beachfront',

    owner: ownerId,    },      city: 'Aspen',

    location: {

      address: '555 Coastal Drive',    capacity: {      state: 'Colorado',

      city: 'Cape Cod',

      state: 'Massachusetts',      guests: 4,      country: 'United States',

      country: 'United States',

      zipCode: '02540'      bedrooms: 2,      zipCode: '81611',

    },

    pricing: {      beds: 2,      coordinates: { lat: 39.1911, lng: -106.8175 }

      basePrice: 350,

      cleaningFee: 80,      bathrooms: 2    },

      currency: 'USD'

    },    },    pricing: {

    capacity: {

      guests: 5,    amenities: ['wifi', 'kitchen', 'parking', 'air-conditioning', 'gym', 'elevator'],      basePrice: 12000,

      bedrooms: 2,

      beds: 3,    images: [      cleaningFee: 1500,

      bathrooms: 1

    },      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', public_id: 'loft1' },      currency: 'INR'

    amenities: ['wifi', 'kitchen', 'parking', 'beach-access', 'fireplace'],

    images: [      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', public_id: 'loft2' }    },

      { url: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800&q=80', public_id: 'cottage1' },

      { url: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&q=80', public_id: 'cottage2' }    ],    capacity: {

    ],

    status: 'active',    status: 'active',      guests: 6,

    featured: false

  },    featured: true,      bedrooms: 3,

  {

    title: 'Penthouse City View',    rating: { average: 4.7, count: 32 }      beds: 4,

    description: 'Luxurious penthouse with breathtaking city skyline views. Floor-to-ceiling windows and rooftop terrace.',

    propertyType: 'apartment',  },      bathrooms: 2

    category: 'luxury',

    owner: ownerId,  {    },

    location: {

      address: '888 Skyline Boulevard',    title: 'Mountain Retreat Cabin',    amenities: ['wifi', 'kitchen', 'parking', 'fireplace', 'mountain-view', 'hiking'],

      city: 'Dubai',

      state: 'Dubai',    description: 'Cozy cabin nestled in the mountains. Perfect for nature lovers and outdoor enthusiasts. Features fireplace, deck with mountain views, and hiking trails nearby.',    images: [

      country: 'UAE',

      zipCode: '00000'    propertyType: 'cabin',      { url: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80', public_id: 'cabin1' },

    },

    pricing: {    category: 'mountain',      { url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80', public_id: 'cabin2' }

      basePrice: 600,

      cleaningFee: 100,    owner: ownerId,    ],

      currency: 'USD'

    },    location: {    status: 'active',

    capacity: {

      guests: 6,      address: '789 Mountain Trail',    featured: false,

      bedrooms: 3,

      beds: 3,      city: 'Aspen',    rating: { average: 4.8, count: 28 }

      bathrooms: 3

    },      state: 'Colorado',  },

    amenities: ['wifi', 'kitchen', 'pool', 'parking', 'air-conditioning', 'gym', 'elevator'],

    images: [      country: 'United States',  {

      { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80', public_id: 'penthouse1' },

      { url: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80', public_id: 'penthouse2' }      zipCode: '81611',    title: 'Tropical Paradise Bungalow',

    ],

    status: 'active',    },    description: 'Charming bungalow surrounded by lush tropical gardens. Private pool, outdoor shower, and open-air living spaces. Experience island living at its finest.',

    featured: true

  }    pricing: {    propertyType: 'house',

];

      basePrice: 250,    location: {

const seedDatabase = async () => {

  try {      cleaningFee: 75,      address: '321 Palm Avenue',

    await mongoose.connect(MONGODB_URI);

    console.log('Connected to MongoDB');      currency: 'USD'      city: 'Bali',



    await Property.deleteMany({});    },      state: 'Bali',

    console.log('Cleared existing properties');

    capacity: {      country: 'Indonesia',

    const ownerId = await createHostUser();

    console.log(`Using host user ID: ${ownerId}`);      guests: 6,      zipCode: '80361',



    const properties = getSampleProperties(ownerId);      bedrooms: 3,      coordinates: { lat: -8.4095, lng: 115.1889 }



    const result = await Property.insertMany(properties);      beds: 4,    },

    console.log(`Successfully seeded ${result.length} properties!`);

      bathrooms: 2    pricing: {

    result.forEach((property, index) => {

      console.log(`${index + 1}. ${property.title} - ${property.location.city}, ${property.location.country}`);    },      basePrice: 8500,

    });

    amenities: ['wifi', 'kitchen', 'parking', 'fireplace', 'heating'],      cleaningFee: 1000,

    process.exit(0);

  } catch (error) {    images: [      currency: 'INR'

    console.error('Error seeding database:', error);

    process.exit(1);      { url: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80', public_id: 'cabin1' },    },

  }

};      { url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80', public_id: 'cabin2' }    capacity: {



seedDatabase();    ],      guests: 4,


    status: 'active',      bedrooms: 2,

    featured: false,      beds: 2,

    rating: { average: 4.8, count: 28 }      bathrooms: 2

  },    },

  {    amenities: ['wifi', 'kitchen', 'pool', 'parking', 'air-conditioning', 'tropical-garden'],

    title: 'Tropical Paradise Bungalow',    images: [

    description: 'Charming bungalow surrounded by lush tropical gardens. Private pool, outdoor shower, and open-air living spaces. Experience island living at its finest.',      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', public_id: 'bungalow1' },

    propertyType: 'house',      { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', public_id: 'bungalow2' }

    category: 'beachfront',    ],

    owner: ownerId,    status: 'active',

    location: {    featured: false,

      address: '321 Palm Avenue',    rating: { average: 4.6, count: 19 }

      city: 'Bali',  },

      state: 'Bali',  {

      country: 'Indonesia',    title: 'Seaside Cottage',

      zipCode: '80361',    description: 'Quaint cottage steps from the beach. Enjoy morning coffee on the porch with ocean breezes. Fully equipped kitchen and cozy living space.',

    },    propertyType: 'house',

    pricing: {    location: {

      basePrice: 180,      address: '555 Coastal Drive',

      cleaningFee: 40,      city: 'Cape Cod',

      currency: 'USD'      state: 'Massachusetts',

    },      country: 'United States',

    capacity: {      zipCode: '02540',

      guests: 4,      coordinates: { lat: 41.6688, lng: -70.2962 }

      bedrooms: 2,    },

      beds: 2,    pricing: {

      bathrooms: 2      basePrice: 18000,

    },      cleaningFee: 2500,

    amenities: ['wifi', 'kitchen', 'pool', 'parking', 'air-conditioning', 'garden'],      currency: 'INR'

    images: [    },

      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', public_id: 'bungalow1' },    capacity: {

      { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', public_id: 'bungalow2' }      guests: 5,

    ],      bedrooms: 2,

    status: 'active',      beds: 3,

    featured: false,      bathrooms: 1

    rating: { average: 4.6, count: 19 }    },

  },    amenities: ['wifi', 'kitchen', 'parking', 'beachfront', 'fireplace'],

  {    images: [

    title: 'Seaside Cottage',      { url: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800&q=80', public_id: 'cottage1' },

    description: 'Quaint cottage steps from the beach. Enjoy morning coffee on the porch with ocean breezes. Fully equipped kitchen and cozy living space.',      { url: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&q=80', public_id: 'cottage2' }

    propertyType: 'house',    ],

    category: 'beachfront',    status: 'active',

    owner: ownerId,    featured: false,

    location: {    rating: { average: 4.5, count: 22 }

      address: '555 Coastal Drive',  },

      city: 'Cape Cod',  {

      state: 'Massachusetts',    title: 'Penthouse City View',

      country: 'United States',    description: 'Luxurious penthouse with breathtaking city skyline views. Floor-to-ceiling windows, rooftop terrace, and premium amenities. Perfect for sophisticated travelers.',

      zipCode: '02540',    propertyType: 'apartment',

    },    location: {

    pricing: {      address: '888 Skyline Boulevard',

      basePrice: 350,      city: 'Dubai',

      cleaningFee: 80,      state: 'Dubai',

      currency: 'USD'      country: 'UAE',

    },      zipCode: '00000',

    capacity: {      coordinates: { lat: 25.2048, lng: 55.2708 }

      guests: 5,    },

      bedrooms: 2,    pricing: {

      beds: 3,      basePrice: 35000,

      bathrooms: 1      cleaningFee: 4000,

    },      currency: 'INR'

    amenities: ['wifi', 'kitchen', 'parking', 'beach-access', 'fireplace'],    },

    images: [    capacity: {

      { url: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800&q=80', public_id: 'cottage1' },      guests: 6,

      { url: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&q=80', public_id: 'cottage2' }      bedrooms: 3,

    ],      beds: 3,

    status: 'active',      bathrooms: 3

    featured: false,    },

    rating: { average: 4.5, count: 22 }    amenities: ['wifi', 'kitchen', 'pool', 'parking', 'air-conditioning', 'gym', 'city-view', 'elevator'],

  },    images: [

  {      { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80', public_id: 'penthouse1' },

    title: 'Penthouse City View',      { url: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80', public_id: 'penthouse2' }

    description: 'Luxurious penthouse with breathtaking city skyline views. Floor-to-ceiling windows, rooftop terrace, and premium amenities. Perfect for sophisticated travelers.',    ],

    propertyType: 'apartment',    status: 'active',

    category: 'luxury',    featured: true,

    owner: ownerId,    rating: { average: 4.9, count: 67 }

    location: {  }

      address: '888 Skyline Boulevard',];

      city: 'Dubai',

      state: 'Dubai',async function seedDatabase() {

      country: 'UAE',  try {

      zipCode: '00000',    // Connect to MongoDB with corrected URI

    },    import mongoose from 'mongoose';

    pricing: {import Property from '../models/Property.js';

      basePrice: 600,import User from '../models/User.js';

      cleaningFee: 100,

      currency: 'USD'const MONGODB_URI = 'mongodb+srv://bycoderun:codebyrun143@cluster0.zsov2sv.mongodb.net/test?retryWrites=true&w=majority';

    },

    capacity: {// First, we need to create or find a host user

      guests: 6,const createHostUser = async () => {

      bedrooms: 3,  let host = await User.findOne({ role: 'host' });

      beds: 3,  

      bathrooms: 3  if (!host) {

    },    host = await User.create({

    amenities: ['wifi', 'kitchen', 'pool', 'parking', 'air-conditioning', 'gym', 'elevator'],      firstName: 'Demo',

    images: [      lastName: 'Host',

      { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80', public_id: 'penthouse1' },      email: 'demohost@airbnb.com',

      { url: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80', public_id: 'penthouse2' }      password: 'hashedPassword123', // In production, this should be properly hashed

    ],      role: 'host',

    status: 'active',      phone: '+1234567890',

    featured: true,      isEmailVerified: true,

    rating: { average: 4.9, count: 38 }      isPhoneVerified: true,

  }    });

];    console.log('Created demo host user');

  }

const seedDatabase = async () => {  

  try {  return host._id;

    // Connect to MongoDB};

    await mongoose.connect(MONGODB_URI);

    console.log('Connected to MongoDB');const getSampleProperties = (ownerId) => [

  {

    // Clear existing properties    title: 'Luxury Beachfront Villa',

    await Property.deleteMany({});    description:

    console.log('Cleared existing properties');      'Experience ultimate luxury in this stunning beachfront villa with panoramic ocean views. Perfect for families or groups seeking a premium coastal getaway.',

    propertyType: 'villa',

    // Create or find host user    category: 'beachfront',

    const ownerId = await createHostUser();    owner: ownerId,

    console.log(`Using host user ID: ${ownerId}`);    location: {

      address: '123 Ocean Drive',

    // Get properties with owner ID      city: 'Malibu',

    const properties = getSampleProperties(ownerId);      state: 'California',

      country: 'United States',

    // Insert new properties      zipCode: '90265',

    const result = await Property.insertMany(properties);    },

    console.log(`Successfully seeded ${result.length} properties!`);    await mongoose.connect(MONGODB_URI);

    console.log('✅ Connected to MongoDB');

    // Log property details

    result.forEach((property, index) => {    // Find a host user (or create a demo host)

      console.log(`${index + 1}. ${property.title} - ${property.location.city}, ${property.location.country}`);    let hostUser = await User.findOne({ role: 'host' });

    });    

    if (!hostUser) {

    process.exit(0);      console.log('No host user found. Creating demo host...');

  } catch (error) {      const bcrypt = await import('bcryptjs');

    console.error('Error seeding database:', error);      const salt = await bcrypt.default.genSalt(10);

    process.exit(1);      const hashedPassword = await bcrypt.default.hash('host123', salt);

  }      

};      hostUser = await User.create({

        name: 'Demo Host',

seedDatabase();        email: 'host@homelyhub.com',

        password: hashedPassword,
        role: 'host',
        verified: true,
        phone: '+1234567890'
      });
      console.log('✅ Demo host created');
    }

    // Clear existing properties
    await Property.deleteMany({});
    console.log('🗑️  Cleared existing properties');

    // Add host ID to each property and insert
    const propertiesWithHost = sampleProperties.map(prop => ({
      ...prop,
      host: hostUser._id
    }));

    const insertedProperties = await Property.insertMany(propertiesWithHost);
    console.log(`✅ Successfully seeded ${insertedProperties.length} properties!`);

    // Display inserted properties
    insertedProperties.forEach((prop, index) => {
      console.log(`${index + 1}. ${prop.title} - ₹${prop.pricing.basePrice}/night`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 You can now:');
    console.log('   - Browse properties at http://localhost:3001/explore');
    console.log('   - View individual listings');
    console.log('   - Make bookings');
    console.log(`   - Login as host: host@homelyhub.com / host123`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit();
  }
}

// Run the seed function
seedDatabase();
