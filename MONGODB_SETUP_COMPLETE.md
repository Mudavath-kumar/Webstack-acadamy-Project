# 🍃 MongoDB Setup Complete!

## ✅ SUCCESS - MongoDB 5.0 Ready to Use!

Your MongoDB database has been automatically provisioned and configured! 🚀

---

## 📊 MongoDB Connection Details

### Connection Information:
```bash
Host: 127.0.0.1 (localhost)
Port: 27017
Username: admin
Password: iKDNFiqI
Database: admin
Version: MongoDB 5.0
```

### MongoDB Connection Strings:

#### Standard Connection String:
```bash
mongodb://admin:iKDNFiqI@127.0.0.1:27017/admin
```

#### Full Connection String (Recommended):
```bash
mongodb://admin:iKDNFiqI@127.0.0.1:27017/admin?authSource=admin&retryWrites=true&w=majority
```

#### For Your App (Use this one):
```bash
mongodb://admin:iKDNFiqI@127.0.0.1:27017/homelyhub?authSource=admin&retryWrites=true&w=majority
```

---

## 🚀 Quick Start - Using MongoDB in Your App

### Option 1: Using Mongoose (Recommended for Node.js)

#### Step 1: Install Mongoose
```bash
npm install mongoose
```

#### Step 2: Create MongoDB Connection File
Create `src/config/mongodb.js`:

```javascript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:iKDNFiqI@127.0.0.1:27017/homelyhub?authSource=admin&retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
```

#### Step 3: Use in Your App
In your backend entry file (e.g., `server.js` or `index.js`):

```javascript
import connectDB from './config/mongodb.js';

// Connect to MongoDB
connectDB();

// Your other server code...
```

---

### Option 2: Using Native MongoDB Driver

#### Step 1: Install MongoDB Driver
```bash
npm install mongodb
```

#### Step 2: Create Connection
```javascript
import { MongoClient } from 'mongodb';

const uri = 'mongodb://admin:iKDNFiqI@127.0.0.1:27017/homelyhub?authSource=admin';
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB!');
    
    const database = client.db('homelyhub');
    const collection = database.collection('properties');
    
    // Your database operations here
    
  } catch (error) {
    console.error('❌ Connection error:', error);
  } finally {
    await client.close();
  }
}

connectToDatabase();
```

---

## 📝 Create Your First Schema (Mongoose)

### Property Schema Example:
Create `src/models/Property.js`:

```javascript
import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    city: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  amenities: [String],
  images: [String],
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bedrooms: Number,
  bathrooms: Number,
  guests: Number,
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Property', PropertySchema);
```

### User Schema Example:
Create `src/models/User.js`:

```javascript
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: String,
  role: {
    type: String,
    enum: ['guest', 'host', 'admin'],
    default: 'guest'
  },
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true
  },
  phone: String,
  verified: {
    type: Boolean,
    default: false
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],
  bookings: [{
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property'
    },
    checkIn: Date,
    checkOut: Date,
    guests: Number,
    totalPrice: Number,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model('User', UserSchema);
```

---

## 🎯 Example CRUD Operations

### Create a Property:
```javascript
import Property from './models/Property.js';

// Create new property
const createProperty = async () => {
  try {
    const property = new Property({
      title: 'Beachfront Villa in Bali',
      description: 'Stunning ocean view villa with private pool',
      price: 5000,
      location: {
        city: 'Bali',
        country: 'Indonesia',
        coordinates: { lat: -8.4095, lng: 115.1889 }
      },
      amenities: ['WiFi', 'Pool', 'AC', 'Kitchen'],
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      host: '507f1f77bcf86cd799439011' // User ID
    });
    
    await property.save();
    console.log('✅ Property created!', property);
  } catch (error) {
    console.error('❌ Error:', error);
  }
};
```

### Read Properties:
```javascript
// Get all properties
const getAllProperties = async () => {
  try {
    const properties = await Property.find({ available: true })
      .populate('host', 'name email avatar')
      .sort({ createdAt: -1 })
      .limit(10);
    
    console.log('✅ Properties:', properties);
    return properties;
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

// Get one property by ID
const getPropertyById = async (id) => {
  try {
    const property = await Property.findById(id)
      .populate('host', 'name email avatar')
      .populate('reviews.user', 'name avatar');
    
    console.log('✅ Property:', property);
    return property;
  } catch (error) {
    console.error('❌ Error:', error);
  }
};
```

### Update Property:
```javascript
const updateProperty = async (id, updates) => {
  try {
    const property = await Property.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
    
    console.log('✅ Property updated!', property);
    return property;
  } catch (error) {
    console.error('❌ Error:', error);
  }
};
```

### Delete Property:
```javascript
const deleteProperty = async (id) => {
  try {
    await Property.findByIdAndDelete(id);
    console.log('✅ Property deleted!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
};
```

---

## 🔍 Advanced Queries

### Search Properties:
```javascript
const searchProperties = async (query) => {
  try {
    const properties = await Property.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'location.city': { $regex: query, $options: 'i' } }
      ],
      available: true
    });
    
    return properties;
  } catch (error) {
    console.error('❌ Error:', error);
  }
};
```

### Filter by Price Range:
```javascript
const getPropertiesByPriceRange = async (minPrice, maxPrice) => {
  try {
    const properties = await Property.find({
      price: { $gte: minPrice, $lte: maxPrice },
      available: true
    }).sort({ price: 1 });
    
    return properties;
  } catch (error) {
    console.error('❌ Error:', error);
  }
};
```

### Get Properties Near Location:
```javascript
const getNearbyProperties = async (lat, lng, maxDistance = 50) => {
  try {
    const properties = await Property.find({
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: maxDistance * 1000 // km to meters
        }
      }
    });
    
    return properties;
  } catch (error) {
    console.error('❌ Error:', error);
  }
};
```

---

## 🧪 Test MongoDB Connection

### Quick Test Script:
Create `test-mongodb.js`:

```javascript
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://admin:iKDNFiqI@127.0.0.1:27017/homelyhub?authSource=admin&retryWrites=true&w=majority';

async function testConnection() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test database operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📦 Collections:', collections.map(c => c.name));
    
    // Close connection
    await mongoose.connection.close();
    console.log('👋 Connection closed');
  } catch (error) {
    console.error('❌ Connection error:', error.message);
  }
}

testConnection();
```

Run it:
```bash
node test-mongodb.js
```

---

## 🛠️ MongoDB Tools

### Connect via MongoDB Shell:
```bash
mongosh mongodb://admin:iKDNFiqI@127.0.0.1:27017/admin
```

### Common MongoDB Shell Commands:
```javascript
// Show databases
show dbs

// Switch to your database
use homelyhub

// Show collections
show collections

// Insert a document
db.properties.insertOne({
  title: "Test Property",
  price: 1000
})

// Find all documents
db.properties.find()

// Find with filter
db.properties.find({ price: { $gt: 1000 } })

// Count documents
db.properties.countDocuments()

// Delete all documents
db.properties.deleteMany({})
```

---

## 📊 Environment Variables Summary

Your `.env` file now contains:

```bash
# MongoDB Connection
MONGO_HOST=127.0.0.1
MONGO_PORT=27017
MONGO_USER=admin
MONGO_PASSWORD=iKDNFiqI
MONGO_DB=admin

# Use this in your app:
MONGODB_URI=mongodb://admin:iKDNFiqI@127.0.0.1:27017/homelyhub?authSource=admin&retryWrites=true&w=majority
```

---

## 🔒 Security Best Practices

### 1. Never Commit .env File
Add to `.gitignore`:
```bash
.env
.env.local
.env.*.local
```

### 2. Use Environment Variables
Always use `process.env.MONGODB_URI` instead of hardcoding

### 3. For Production
- Change default password
- Use MongoDB Atlas for cloud hosting
- Enable SSL/TLS
- Restrict IP access
- Use strong passwords

---

## 🚀 Next Steps

### 1. Install Mongoose
```bash
npm install mongoose
```

### 2. Create Connection File
Create `src/config/mongodb.js` with the connection code above

### 3. Create Models
Create `src/models/` directory with your schemas

### 4. Import and Use
```javascript
import connectDB from './config/mongodb.js';
import Property from './models/Property.js';

// Connect to database
await connectDB();

// Use your models
const properties = await Property.find();
```

---

## 📚 Useful Resources

- **MongoDB Docs:** https://docs.mongodb.com/
- **Mongoose Docs:** https://mongoosejs.com/docs/
- **MongoDB University:** https://university.mongodb.com/ (Free courses)

---

## 🎉 Summary

✅ **MongoDB 5.0 provisioned**  
✅ **Connection string added to .env**  
✅ **Ready to use in your app**  
✅ **Example schemas provided**  
✅ **CRUD operations documented**

**Your MongoDB Connection String:**
```
mongodb://admin:iKDNFiqI@127.0.0.1:27017/homelyhub?authSource=admin&retryWrites=true&w=majority
```

**Next:** Install Mongoose and start building your database! 🚀
