# 🍃 MongoDB Connection Guide

## MongoDB Connection String for HomelyHub

### Option 1: Local MongoDB (Development)

If you're running MongoDB locally on your machine:

```
mongodb://localhost:27017/homelyhub
```

**Steps to use:**
1. Install MongoDB on your local machine
2. Start MongoDB service:
   - Windows: `net start MongoDB`
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`
3. Update your `server/.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/homelyhub
   ```

### Option 2: MongoDB Atlas (Cloud - Recommended)

For production and cloud deployment, use MongoDB Atlas (FREE tier available):

#### Step-by-Step Setup:

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with your email or Google/GitHub account

2. **Create a Cluster**
   - Click "Build a Cluster"
   - Choose FREE tier (M0 Sandbox)
   - Select a cloud provider and region closest to you
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Setup Database Access**
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (SAVE THESE!)
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. **Setup Network Access**
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add your specific IP address
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Clusters" (Database)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" and version "4.1 or later"
   - Copy the connection string

**Your connection string will look like:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/homelyhub?retryWrites=true&w=majority
```

**Important:**
- Replace `<username>` with your database username
- Replace `<password>` with your database password
- Replace `cluster0.xxxxx` with your actual cluster name
- Keep `/homelyhub` at the end (this is your database name)

#### Example Connection String:

```
mongodb+srv://homelyhub_user:MySecurePassword123@cluster0.ab1cd.mongodb.net/homelyhub?retryWrites=true&w=majority
```

### MongoDB Compass Connection

To visualize your database using MongoDB Compass:

1. **Download MongoDB Compass**
   - Visit: https://www.mongodb.com/try/download/compass
   - Download and install for your operating system

2. **Connect to Database**
   - Open MongoDB Compass
   - Paste your connection string in the "New Connection" field
   - Click "Connect"

#### For Local MongoDB:
```
mongodb://localhost:27017/homelyhub
```

#### For MongoDB Atlas:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/homelyhub
```

### Setup Instructions for This Project

1. **Update Backend .env File** (`server/.env`):
   ```env
   # For MongoDB Atlas (Cloud)
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/homelyhub?retryWrites=true&w=majority
   
   # OR for Local MongoDB
   # MONGODB_URI=mongodb://localhost:27017/homelyhub
   ```

2. **Test Connection**
   ```bash
   cd server
   npm start
   ```
   
   You should see:
   ```
   ✅ MongoDB connected successfully
   🚀 Server running on port 5000
   ```

### Common Issues & Solutions

#### Issue 1: "Authentication failed"
- **Solution:** Double-check your username and password
- Make sure there are no special characters that need URL encoding
- Use encodeURIComponent() for passwords with special characters

#### Issue 2: "Network timeout"
- **Solution:** Check if your IP address is whitelisted in MongoDB Atlas
- Go to Network Access and add your current IP

#### Issue 3: "Server selection timed out"
- **Solution:** Check your internet connection
- Verify the connection string is correct
- Ensure MongoDB Atlas cluster is running

#### Issue 4: "Database 'homelyhub' not found"
- **Solution:** This is normal! MongoDB will create the database automatically when you insert the first document

### Database Collections

Once connected, your database will have these collections:

- **users** - User accounts and profiles
- **properties** - Property listings
- **bookings** - Reservation data
- **reviews** - Property reviews and ratings
- **messages** - User-to-user messages
- **payments** - Payment transaction records

### Sample MongoDB Compass Connection Strings

**For Local Development:**
```
mongodb://localhost:27017/homelyhub
```

**For Cloud (MongoDB Atlas):**
```
mongodb+srv://homelyhub_admin:SecurePass123@cluster0.mongodb.net/homelyhub?retryWrites=true&w=majority
```

**With IP Whitelist:**
```
mongodb+srv://homelyhub_admin:SecurePass123@cluster0.mongodb.net/homelyhub?retryWrites=true&w=majority&authSource=admin
```

### Environment Variables Summary

Update your `server/.env` file with these values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/homelyhub?retryWrites=true&w=majority

# JWT Secret Keys
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Next Steps

1. ✅ Copy the connection string
2. ✅ Update `server/.env` file
3. ✅ Start the backend server
4. ✅ Open MongoDB Compass
5. ✅ Connect using your connection string
6. ✅ View your data in real-time!

### Support

If you encounter any issues:

1. Check MongoDB Atlas Dashboard for cluster status
2. Verify network access settings
3. Test connection using MongoDB Compass first
4. Check server logs for specific error messages

---

## 🎉 You're All Set!

Your MongoDB database is now ready to use with HomelyHub. All property listings, user data, bookings, and reviews will be stored securely in your MongoDB database.

### Quick Test

Run this in your terminal to test the connection:

```bash
cd server
npm start
```

Look for: `✅ MongoDB connected successfully`

If you see this message, you're good to go! 🚀
