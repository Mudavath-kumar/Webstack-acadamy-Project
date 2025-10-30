# 🚀 HomelyHub - Quick Start Guide

## ⚡ Fast Setup (5 Minutes)

### Step 1: Install Dependencies (2 min)

```bash
# Frontend
npm install

# Backend  
cd server
npm install
cd ..
```

### Step 2: MongoDB Connection String (1 min)

**Option A: MongoDB Atlas (Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free cluster
3. Get connection string
4. Update `server/.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/homelyhub?retryWrites=true&w=majority
```

**Option B: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/homelyhub
```

**For MongoDB Compass:**
```
Just paste the same connection string above into Compass and click "Connect"
```

### Step 3: Environment Files (1 min)

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api/v1
```

**Backend (server/.env):**
```env
PORT=5000
MONGODB_URI=your_connection_string_here
JWT_SECRET=your_secret_key_change_in_production
FRONTEND_URL=http://localhost:3000
```

### Step 4: Run the App (1 min)

**Terminal 1 - Frontend:**
```bash
npm run dev
# Opens on http://localhost:3000
```

**Terminal 2 - Backend:**
```bash
cd server
npm start
# Runs on http://localhost:5000
```

## ✅ You're Done!

### Test New Features:

1. **Become a Host** 
   - Click "🏠 Become a Host" in navbar
   - Fill 7-step form
   
2. **Favorites**
   - Click ❤️ heart on any property
   - View in Wishlists
   
3. **Share**
   - Open property details
   - Click "Share" button
   
4. **Ratings**
   - View property details
   - See rating breakdown
   
5. **Maps**
   - Add Google Maps API key first
   - View location on property details

## 📊 MongoDB Compass

**Connection String:**
```
Local: mongodb://localhost:27017/homelyhub
Atlas: mongodb+srv://username:password@cluster.mongodb.net/homelyhub
```

**View Collections:**
- properties
- users  
- reviews
- bookings
- messages

## 🔑 Get API Keys

### Google Maps (Optional for maps feature):
1. https://console.cloud.google.com/
2. Create project
3. Enable "Maps JavaScript API"
4. Create API key
5. Update in `src/pages/ListingDetailEnhanced.jsx`

## 🐛 Quick Fixes

**MongoDB Connection Failed:**
```bash
# Check if MongoDB is running
# For Atlas: Check IP whitelist (add 0.0.0.0/0)
# Verify connection string is correct
```

**Port Already in Use:**
```bash
# Change PORT in server/.env
PORT=5001
```

**Frontend Not Loading:**
```bash
# Clear cache and restart
npm run dev --force
```

## 📚 Full Documentation

- **COMPLETE_SETUP_GUIDE.md** - Detailed setup
- **MONGODB_CONNECTION_GUIDE.md** - Database setup
- **✨_ALL_FEATURES_IMPLEMENTED.md** - All features

## 🎉 Features Working

✅ User Authentication
✅ Property Listings  
✅ **Become a Host** (NEW)
✅ **Favorites/Wishlist** (NEW)
✅ **Social Sharing** (NEW)
✅ **Advanced Ratings** (NEW)
✅ **Google Maps** (NEW)
✅ Booking System
✅ Reviews & Ratings
✅ Messages
✅ And more!

## 💡 Pro Tips

1. Use MongoDB Atlas (free tier) instead of local
2. Add `.env` to `.gitignore` (already done)
3. Get Google Maps API key for better experience
4. Test all features before deploying

## 🆘 Need Help?

1. Check console for errors (F12)
2. See documentation files
3. Check server logs
4. Verify environment variables

---

## 🏠 MongoDB Compass Connection Examples

### Copy & Paste These:

**Local:**
```
mongodb://localhost:27017/homelyhub
```

**Atlas Example:**
```
mongodb+srv://homelyhub_user:MyPassword123@cluster0.ab1cd.mongodb.net/homelyhub?retryWrites=true&w=majority
```

**After Atlas Setup:**
1. Replace `homelyhub_user` with your username
2. Replace `MyPassword123` with your password  
3. Replace `cluster0.ab1cd` with your cluster name
4. Keep `/homelyhub` at the end

### Open MongoDB Compass:
1. Paste connection string
2. Click "Connect"
3. Browse your data!

---

## ⚡ Super Quick Start (Copy-Paste)

```bash
# Install everything
npm install && cd server && npm install && cd ..

# Create backend .env
cat > server/.env << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/homelyhub
JWT_SECRET=super_secret_key_change_me
FRONTEND_URL=http://localhost:3000
EOL

# Create frontend .env
cat > .env << EOL
VITE_API_URL=http://localhost:5000/api/v1
EOL

# Run both (use 2 terminals)
# Terminal 1:
npm run dev

# Terminal 2:
cd server && npm start
```

## 🎯 Ready to Go!

Your app is now running with all features:
- 🏡 Become a Host
- ❤️ Favorites
- 🔗 Share
- ⭐ Advanced Ratings  
- 🗺️ Maps (needs API key)

**Access:** http://localhost:3000

Enjoy! 🚀✨
