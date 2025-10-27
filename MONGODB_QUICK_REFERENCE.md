# 🍃 MongoDB Quick Reference

## ✅ Your MongoDB Connection String

```bash
mongodb://admin:iKDNFiqI@127.0.0.1:27017/homelyhub?authSource=admin&retryWrites=true&w=majority
```

---

## 🚀 Quick Start (3 Steps)

### 1. Install Mongoose
```bash
npm install mongoose
```

### 2. Connect to MongoDB
```javascript
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://admin:iKDNFiqI@127.0.0.1:27017/homelyhub?authSource=admin';

await mongoose.connect(MONGODB_URI);
console.log('✅ MongoDB connected!');
```

### 3. Create a Model & Use It
```javascript
// Define schema
const PropertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String
});

const Property = mongoose.model('Property', PropertySchema);

// Create a property
const property = new Property({
  title: 'Beach Villa',
  price: 5000,
  location: 'Bali'
});

await property.save();
console.log('✅ Property saved!');
```

---

## 📊 Connection Details

| Field | Value |
|-------|-------|
| **Host** | 127.0.0.1 |
| **Port** | 27017 |
| **Username** | admin |
| **Password** | iKDNFiqI |
| **Database** | homelyhub |
| **Version** | MongoDB 5.0 |

---

## 🔧 Environment Variables (.env)

```bash
MONGO_HOST=127.0.0.1
MONGO_PORT=27017
MONGO_USER=admin
MONGO_PASSWORD=iKDNFiqI
MONGO_DB=admin
MONGODB_URI=mongodb://admin:iKDNFiqI@127.0.0.1:27017/homelyhub?authSource=admin&retryWrites=true&w=majority
```

---

## 📝 Common Operations

### Create:
```javascript
await Property.create({ title: 'Villa', price: 1000 });
```

### Read:
```javascript
const properties = await Property.find();
const one = await Property.findById(id);
```

### Update:
```javascript
await Property.findByIdAndUpdate(id, { price: 2000 });
```

### Delete:
```javascript
await Property.findByIdAndDelete(id);
```

---

## 🧪 Test Connection

```bash
# Connect via MongoDB shell:
mongosh mongodb://admin:iKDNFiqI@127.0.0.1:27017/admin

# Inside shell:
show dbs
use homelyhub
db.properties.find()
```

---

## 📚 Full Documentation

See `MONGODB_SETUP_COMPLETE.md` for:
- Complete setup guide
- Schema examples
- Advanced queries
- Best practices

---

## 🎯 Status

✅ MongoDB 5.0 provisioned  
✅ Connection string ready  
✅ Added to .env file  
✅ Ready to use!

**Just install Mongoose and start coding!** 🚀
