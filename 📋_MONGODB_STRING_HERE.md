# 📋 MongoDB Connection Strings for HomelyHub

## 🔑 For MongoDB Compass - Copy & Paste These:

### Option 1: Local MongoDB (Development)
```
mongodb://localhost:27017/homelyhub
```

**Use this if:**
- MongoDB is installed on your computer
- You want to develop offline
- You're testing locally

---

### Option 2: MongoDB Atlas (Cloud - RECOMMENDED)
```
mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/homelyhub?retryWrites=true&w=majority
```

**Setup Steps:**

1. **Create Free Account:**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up (it's free!)

2. **Create Cluster:**
   - Click "Build a Cluster"
   - Choose **FREE** tier (M0 Sandbox)
   - Select region closest to you
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Create Database User:**
   - Click "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `homelyhub_admin`
   - Password: `YourSecurePassword123`
   - Set role: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address:**
   - Click "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Clusters" (Database)
   - Click "Connect" button
   - Choose "Connect your application"
   - Select "Node.js" driver
   - **COPY** the connection string

**Your connection string will look like:**
```
mongodb+srv://homelyhub_admin:YourSecurePassword123@cluster0.ab1cd.mongodb.net/homelyhub?retryWrites=true&w=majority
```

**Replace these:**
- `homelyhub_admin` → Your username
- `YourSecurePassword123` → Your password
- `cluster0.ab1cd` → Your actual cluster name
- Keep `/homelyhub` (this is the database name)

---

## 📊 Use in MongoDB Compass

### Step 1: Download MongoDB Compass
- Go to: https://www.mongodb.com/try/download/compass
- Download for your OS (Windows/Mac/Linux)
- Install the application

### Step 2: Connect to Database
1. Open MongoDB Compass
2. You'll see "New Connection" screen
3. **Paste** your connection string:
   ```
   mongodb+srv://homelyhub_admin:YourPassword@cluster0.xxxxx.mongodb.net/homelyhub?retryWrites=true&w=majority
   ```
4. Click "Connect"
5. Wait a few seconds...
6. **You're in!** 🎉

### Step 3: View Your Data
You'll see these collections (folders) in the `homelyhub` database:
- 📄 **properties** - All property listings
- 👥 **users** - User accounts and profiles
- ⭐ **reviews** - Property reviews with ratings
- 📅 **bookings** - Reservation data
- 💬 **messages** - User-to-user messages
- 💳 **payments** - Payment records

---

## 🔧 Use in Your Application

### Backend Configuration (server/.env)

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/homelyhub
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://homelyhub_admin:YourPassword@cluster0.xxxxx.mongodb.net/homelyhub?retryWrites=true&w=majority
```

### Complete server/.env File:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://homelyhub_admin:YourPassword@cluster0.xxxxx.mongodb.net/homelyhub?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

---

## ✅ Test Your Connection

### Method 1: Using Node.js
```javascript
// test-connection.js
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://homelyhub_admin:YourPassword@cluster0.xxxxx.mongodb.net/homelyhub';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Connection Failed:', err.message);
    process.exit(1);
  });
```

Run: `node test-connection.js`

### Method 2: Start Backend Server
```bash
cd server
npm start
```

Look for:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### Method 3: MongoDB Compass
- Open Compass
- Paste connection string
- Click "Connect"
- See green "Connected" status

---

## 🐛 Troubleshooting

### Error: "Authentication failed"
**Solution:**
- Double-check username and password
- Make sure password doesn't have special characters (or URL encode them)
- Create a new database user if needed

### Error: "Network timeout"
**Solution:**
- Check internet connection
- Go to MongoDB Atlas → Network Access
- Add your current IP address
- Or allow access from anywhere (0.0.0.0/0)

### Error: "Server selection timed out"
**Solution:**
- Verify connection string is correct
- Check if MongoDB Atlas cluster is running
- Ensure IP is whitelisted
- Try again after a few minutes

### Error: "MongooseError: Operation `users.findOne()` buffering timed out"
**Solution:**
- Connection string is wrong
- Network access not configured
- Check firewall settings

---

## 📝 Example Connection Strings

### Production-Ready Examples:

**Starter:**
```
mongodb+srv://homelyhub_user:Pass123@cluster0.mongodb.net/homelyhub?retryWrites=true&w=majority
```

**With Auth:**
```
mongodb+srv://admin:SecurePassword456@mycluster.ab1cd.mongodb.net/homelyhub?retryWrites=true&w=majority&authSource=admin
```

**With SSL:**
```
mongodb+srv://user:password@cluster.mongodb.net/homelyhub?retryWrites=true&w=majority&ssl=true
```

---

## 🎯 Quick Reference

| Environment | Connection String |
|-------------|-------------------|
| **Local** | `mongodb://localhost:27017/homelyhub` |
| **Atlas** | `mongodb+srv://user:pass@cluster.mongodb.net/homelyhub` |
| **Compass** | Same as above |
| **Backend** | Update `server/.env` → `MONGODB_URI=...` |

---

## 🔐 Security Tips

1. **Never commit** connection strings to Git
2. Use **environment variables** (`.env` file)
3. Use **strong passwords** (mix of letters, numbers, symbols)
4. For production: **Whitelist specific IPs** only
5. **Rotate passwords** regularly
6. Use **separate databases** for dev/staging/prod

---

## 📞 Need Help?

### MongoDB Atlas Support:
- Dashboard: https://cloud.mongodb.com
- Docs: https://docs.mongodb.com/
- Support: https://www.mongodb.com/support

### HomelyHub Setup:
- See: `COMPLETE_SETUP_GUIDE.md`
- See: `MONGODB_CONNECTION_GUIDE.md`
- See: `🚀_QUICK_START.md`

---

## ✨ You're All Set!

Your MongoDB database is ready to use with HomelyHub!

### Collections that will be created:
- ✅ properties
- ✅ users
- ✅ reviews
- ✅ bookings
- ✅ messages
- ✅ payments

### Next Steps:
1. ✅ Copy connection string
2. ✅ Update `server/.env`
3. ✅ Open MongoDB Compass
4. ✅ Connect using the same string
5. ✅ Start backend server
6. ✅ Start frontend
7. ✅ Create some test data
8. ✅ View it in Compass!

---

## 🎉 Congratulations!

Your database is connected and ready to store:
- 🏡 Property listings
- 👥 User profiles
- ❤️ Favorites
- ⭐ Ratings & reviews
- 📅 Bookings
- 💬 Messages

Happy coding! 🚀

---

**Last Updated:** $(date)
**Database:** homelyhub
**Collections:** 6 main collections
**Status:** ✅ Ready for development
