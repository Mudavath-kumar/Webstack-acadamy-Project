import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Property from './models/Property.js';
import User from './models/User.js';

dotenv.config({ override: true });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const seedProperties = async () => {
  try {
    await connectDB();

    // Find or create a host user
    let hostUser = await User.findOne({ role: 'host' });
    
    if (!hostUser) {
      console.log('Creating a sample host user...');
      hostUser = await User.create({
        name: 'Demo Host',
        email: 'host@demo.com',
        password: 'password123',
        role: 'host',
        phoneNumber: '+1234567890',
      });
      console.log('✅ Sample host created');
    }

    // Clear existing properties (optional - comment out if you want to keep existing)
    // await Property.deleteMany({});
    // console.log('Cleared existing properties');

    const sampleProperties = [
      {
        title: 'Luxury Beachfront Villa',
        description: 'Experience luxury coastal living in this stunning beachfront villa. Wake up to breathtaking ocean views, enjoy your morning coffee on the expansive deck, and spend your days lounging by the infinity pool or strolling along the private beach.',
        propertyType: 'villa',
        category: 'beachfront',
        location: {
          address: '123 Beach Road',
          city: 'Malibu',
          state: 'California',
          country: 'USA',
          zipCode: '90265',
        },
        pricing: {
          basePrice: 45000,
          currency: 'INR',
          cleaningFee: 7500,
          serviceFee: 9000,
        },
        capacity: {
          guests: 8,
          bedrooms: 4,
          beds: 5,
          bathrooms: 3,
        },
        amenities: ['wifi', 'pool', 'parking', 'kitchen', 'air-conditioning', 'beach-access'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
            caption: 'Beachfront view',
          },
          {
            url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
            caption: 'Living room',
          },
        ],
        owner: hostUser._id,
        status: 'active',
        featured: true,
      },
      {
        title: 'Modern Downtown Apartment',
        description: 'Stylish apartment in the heart of the city. Perfect for business travelers and urban explorers. Walking distance to restaurants, shops, and entertainment.',
        propertyType: 'apartment',
        category: 'city',
        location: {
          address: '456 Main Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          zipCode: '400001',
        },
        pricing: {
          basePrice: 12000,
          currency: 'INR',
          cleaningFee: 2000,
          serviceFee: 2400,
        },
        capacity: {
          guests: 4,
          bedrooms: 2,
          beds: 2,
          bathrooms: 2,
        },
        amenities: ['wifi', 'kitchen', 'air-conditioning', 'elevator', 'workspace'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
            caption: 'City view',
          },
        ],
        owner: hostUser._id,
        status: 'active',
      },
      {
        title: 'Mountain Cabin Retreat',
        description: 'Cozy cabin nestled in the mountains. Perfect for a peaceful getaway with stunning mountain views, hiking trails nearby, and a fireplace for cold evenings.',
        propertyType: 'cabin',
        category: 'mountain',
        location: {
          address: '789 Mountain Trail',
          city: 'Manali',
          state: 'Himachal Pradesh',
          country: 'India',
          zipCode: '175131',
        },
        pricing: {
          basePrice: 18000,
          currency: 'INR',
          cleaningFee: 3000,
          serviceFee: 3600,
        },
        capacity: {
          guests: 6,
          bedrooms: 3,
          beds: 4,
          bathrooms: 2,
        },
        amenities: ['wifi', 'kitchen', 'fireplace', 'parking', 'heating'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1200&q=80',
            caption: 'Mountain view',
          },
        ],
        owner: hostUser._id,
        status: 'active',
        featured: true,
      },
      {
        title: 'Tropical Beach House',
        description: 'Beautiful beach house with direct beach access. Enjoy stunning sunsets, water sports, and tropical paradise living at its finest.',
        propertyType: 'house',
        category: 'beachfront',
        location: {
          address: '321 Beach Lane',
          city: 'Goa',
          state: 'Goa',
          country: 'India',
          zipCode: '403001',
        },
        pricing: {
          basePrice: 28000,
          currency: 'INR',
          cleaningFee: 5000,
          serviceFee: 5600,
        },
        capacity: {
          guests: 6,
          bedrooms: 3,
          beds: 4,
          bathrooms: 3,
        },
        amenities: ['wifi', 'pool', 'kitchen', 'air-conditioning', 'beach-access', 'parking'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80',
            caption: 'Beach house',
          },
        ],
        owner: hostUser._id,
        status: 'active',
      },
      {
        title: 'Luxury City Penthouse',
        description: 'Stunning penthouse with panoramic city views. Modern amenities, rooftop terrace, and premium finishes throughout. Perfect for luxury seekers.',
        propertyType: 'apartment',
        category: 'luxury',
        location: {
          address: '555 Sky Tower',
          city: 'Bangalore',
          state: 'Karnataka',
          country: 'India',
          zipCode: '560001',
        },
        pricing: {
          basePrice: 35000,
          currency: 'INR',
          cleaningFee: 6000,
          serviceFee: 7000,
        },
        capacity: {
          guests: 5,
          bedrooms: 3,
          beds: 3,
          bathrooms: 3,
        },
        amenities: ['wifi', 'kitchen', 'air-conditioning', 'gym', 'pool', 'elevator', 'balcony'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
            caption: 'Penthouse view',
          },
        ],
        owner: hostUser._id,
        status: 'active',
        featured: true,
      },
    ];

    const createdProperties = await Property.insertMany(sampleProperties);
    console.log(`✅ Seeded ${createdProperties.length} properties successfully!`);
    
    console.log('\n📋 Created Properties:');
    createdProperties.forEach(prop => {
      console.log(`  - ${prop.title} (ID: ${prop._id})`);
    });

    console.log('\n🎉 Seeding completed! You can now browse real properties in the app.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding properties:', error);
    process.exit(1);
  }
};

seedProperties();
