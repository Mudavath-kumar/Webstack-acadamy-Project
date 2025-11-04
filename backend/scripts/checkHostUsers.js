import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const checkHostUsers = async () => {
  try {
    // Remove problematic query parameters
    const uri = process.env.MONGODB_URI.split('?')[0];
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    const hosts = await User.find({ role: 'host' }).select('name email role');
    
    if (hosts.length === 0) {
      console.log('\n⚠️  No host users found in database!');
      console.log('\nCreating a default host user...\n');
      
      const hostUser = await User.create({
        name: 'Host User',
        email: 'host@homelyhub.test',
        password: '123456',
        role: 'host',
        phone: '+91-9876543210'
      });
      
      console.log('✅ Host user created:');
      console.log('   Email: host@homelyhub.test');
      console.log('   Password: 123456');
      console.log('   Role: host');
    } else {
      console.log('\n✅ Found host users:');
      hosts.forEach((host, i) => {
        console.log(`\n${i + 1}. ${host.name}`);
        console.log(`   Email: ${host.email}`);
        console.log(`   Role: ${host.role}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkHostUsers();
