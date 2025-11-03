import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Debug: log the exact URI being used (mask password)
    if (process.env.MONGODB_URI) {
      try {
        const uri = process.env.MONGODB_URI;
        const masked = uri.replace(/(mongodb\+srv:\/\/[^:]+:)([^@]+)(@.*)/i, (_, p1, _pwd, p3) => `${p1}***${p3}`);
        console.log(`🧪 Using MONGODB_URI: ${masked}`);
      } catch (_) {}
    } else {
      console.warn('⚠️ MONGODB_URI is not set');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 20,
      retryWrites: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    // Connection event listeners for robustness
    mongoose.connection.on('connected', () => {
      console.log('🔌 Mongoose connected');
    });
    mongoose.connection.on('reconnected', () => {
      console.log('🔁 Mongoose reconnected');
    });
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ Mongoose disconnected. Attempting to reconnect...');
    });
    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err.message);
    });
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
