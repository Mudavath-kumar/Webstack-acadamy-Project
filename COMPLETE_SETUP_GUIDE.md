# 🏠 HomelyHub - Complete Setup Guide

## ✨ New Features Added

### 1. **Become a Host** - Multi-Step Property Listing 🏡
- Comprehensive 7-step form for creating property listings
- Property information, location, capacity, amenities, photos, pricing, and house rules
- Beautiful UI with step progress indicator
- Form validation and error handling
- Route: `/become-host` (Protected route - requires login)

### 2. **Favorites/Wishlist System** ❤️
- Heart icon on every property card
- One-click add/remove from favorites
- Favorite count display
- Backend API integration
- User-specific wishlist storage
- Real-time updates

### 3. **Share Functionality** 🔗
- Share properties via:
  - Facebook
  - Twitter
  - WhatsApp
  - Email
  - Copy Link
- Share count tracking
- Social media integration
- Beautiful share menu with icons

### 4. **Advanced Rating System** ⭐
- Overall rating with star display
- Rating distribution (5-star breakdown)
- Category ratings:
  - Cleanliness
  - Accuracy
  - Check-in
  - Communication
  - Location
  - Value
- Visual progress bars
- Percentage calculations
- Comprehensive rating breakdown component

### 5. **Google Maps Integration** 🗺️
- Interactive Google Maps on property detail pages
- Property location markers
- Zoom and pan controls
- Map customization
- Responsive design

### 6. **Enhanced Property Model** 💾
- `favoritedBy` - Array of users who favorited the property
- `favoriteCount` - Total favorites count
- `shareCount` - Total shares count
- `rating.distribution` - Rating breakdown (1-5 stars)
- `rating.categories` - Category-wise ratings

### 7. **Enhanced User Model** 👤
- `favorites` - Array of favorited properties
- `wishlistName` - Custom wishlist name
- Better user profile management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Google Maps API Key (for maps feature)

### Step 1: Clone and Install Dependencies

```bash
# Frontend
npm install

# Backend
cd server
npm install
```

### Step 2: Environment Configuration

#### Frontend (.env)
Create `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

#### Backend (server/.env)
Create `server/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration (Choose one)
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/homelyhub

# OR MongoDB Atlas (Recommended)
# MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/homelyhub?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Cloudinary (Image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay (Payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password
FROM_EMAIL=noreply@homelyhub.com
FROM_NAME=HomelyHub

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Step 3: Get API Keys

#### Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Maps JavaScript API" and "Places API"
4. Create credentials (API Key)
5. Restrict key to your domain (optional)
6. Copy the API key to `.env`

**Update the API key in:** `src/pages/ListingDetailEnhanced.jsx`
```javascript
<LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
```

#### MongoDB Atlas Connection String
See `MONGODB_CONNECTION_GUIDE.md` for detailed instructions.

Quick steps:
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create free cluster (M0)
3. Setup database user
4. Whitelist IP address (0.0.0.0/0 for development)
5. Get connection string
6. Update `server/.env`

### Step 4: Run the Application

#### Development Mode

Terminal 1 - Frontend:
```bash
npm run dev
# Runs on http://localhost:3000
```

Terminal 2 - Backend:
```bash
cd server
npm start
# Runs on http://localhost:5000
```

#### Production Build

Frontend:
```bash
npm run build
npm run preview
```

Backend:
```bash
cd server
NODE_ENV=production npm start
```

## 🎯 New Features Usage Guide

### 1. Become a Host

**Access:** `/become-host` (requires login)

**Steps:**
1. Login to your account
2. Navigate to "Become a Host" (add link in navbar)
3. Follow the 7-step process:
   - **Step 1:** Property Info (title, description, type, category)
   - **Step 2:** Location (address, city, state, country, coordinates)
   - **Step 3:** Capacity (guests, bedrooms, beds, bathrooms)
   - **Step 4:** Amenities (WiFi, parking, pool, etc.)
   - **Step 5:** Photos (upload property images)
   - **Step 6:** Pricing (base price, fees, discounts)
   - **Step 7:** House Rules (check-in/out, policies)
4. Click "Publish Listing"

### 2. Favorites/Wishlist

**How to Use:**
- Click the heart icon on any property card
- Heart fills in red when favorited
- View all favorites in "Wishlists" page
- Remove by clicking heart again

**Backend API:**
- Add: `POST /api/v1/favorites/:propertyId`
- Remove: `DELETE /api/v1/favorites/:propertyId`
- Get all: `GET /api/v1/favorites`
- Check status: `GET /api/v1/favorites/check/:propertyId`

### 3. Share Properties

**How to Use:**
1. Go to property detail page
2. Click "Share" button
3. Choose platform:
   - Facebook
   - Twitter
   - WhatsApp
   - Email
   - Copy Link
4. Share automatically tracked

**Backend API:**
- Track share: `POST /api/v1/properties/:id/share`

### 4. Rating System

**Features:**
- Overall rating display (1-5 stars)
- Rating distribution chart
- Category ratings with progress bars
- Visual breakdown of all reviews

**Implementation:**
- Component: `src/components/RatingBreakdown.jsx`
- Used in: `ListingDetailEnhanced.jsx`
- Automatically calculated from reviews

### 5. Google Maps

**Features:**
- Interactive map on property details
- Property marker
- Zoom/pan controls
- Responsive design

**Setup:**
1. Get Google Maps API key
2. Update in `ListingDetailEnhanced.jsx`:
```javascript
<LoadScript googleMapsApiKey="YOUR_API_KEY">
```

## 🔧 API Endpoints

### New Endpoints

#### Favorites
```
POST   /api/v1/favorites/:propertyId    # Add to favorites
DELETE /api/v1/favorites/:propertyId    # Remove from favorites
GET    /api/v1/favorites                # Get user favorites
GET    /api/v1/favorites/check/:id      # Check if favorited
```

#### Share
```
POST   /api/v1/properties/:id/share     # Track property share
```

#### Properties (Enhanced)
```
POST   /api/v1/properties               # Create property (host only)
GET    /api/v1/properties/:id           # Get property with ratings
```

## 📱 Frontend Components

### New Components
- `src/pages/BecomeHost.jsx` - Multi-step listing creation
- `src/pages/ListingDetailEnhanced.jsx` - Enhanced property details
- `src/components/RatingBreakdown.jsx` - Rating visualization
- `src/components/ListingCard.jsx` (Enhanced) - With favorites

### Updated Routes
```javascript
/become-host       - Create property listing (protected)
/listing/:id       - View property details (enhanced)
/property/:id      - Alternative property route
```

## 🗄️ Database Collections

### Properties Collection (Enhanced)
```javascript
{
  // ... existing fields ...
  favoritedBy: [ObjectId],
  favoriteCount: Number,
  shareCount: Number,
  rating: {
    average: Number,
    count: Number,
    distribution: {
      5: Number,
      4: Number,
      3: Number,
      2: Number,
      1: Number
    },
    categories: {
      cleanliness: Number,
      accuracy: Number,
      checkin: Number,
      communication: Number,
      location: Number,
      value: Number
    }
  }
}
```

### Users Collection (Enhanced)
```javascript
{
  // ... existing fields ...
  favorites: [ObjectId],
  wishlistName: String
}
```

### Reviews Collection (Existing)
```javascript
{
  property: ObjectId,
  user: ObjectId,
  booking: ObjectId,
  ratings: {
    overall: Number,
    cleanliness: Number,
    accuracy: Number,
    checkIn: Number,
    communication: Number,
    location: Number,
    value: Number
  },
  comment: String,
  // ... other fields ...
}
```

## 🐛 Troubleshooting

### Issue: Google Maps not showing
**Solution:**
1. Verify API key is correct
2. Enable "Maps JavaScript API" in Google Console
3. Check browser console for errors
4. Ensure API key has no restrictions or domain is whitelisted

### Issue: Favorites not working
**Solution:**
1. Ensure user is logged in
2. Check authentication token in localStorage
3. Verify backend server is running
4. Check network tab for API errors

### Issue: MongoDB connection failed
**Solution:**
1. Check MongoDB service is running (local)
2. Verify connection string in `.env`
3. For Atlas: Check IP whitelist
4. See `MONGODB_CONNECTION_GUIDE.md`

### Issue: Images not uploading in Become Host
**Solution:**
1. This currently uses local preview (URL.createObjectURL)
2. For production: Integrate Cloudinary
3. Update backend upload endpoint
4. See `server/controllers/uploadController.js`

## 📊 MongoDB Compass Connection

### Connection String Examples

**Local:**
```
mongodb://localhost:27017/homelyhub
```

**Atlas:**
```
mongodb+srv://username:password@cluster0.mongodb.net/homelyhub?retryWrites=true&w=majority
```

### View Your Data
1. Open MongoDB Compass
2. Paste connection string
3. Connect
4. Browse collections:
   - properties
   - users
   - reviews
   - bookings
   - messages

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Railway/Render/Heroku)
```bash
# Set environment variables
# Deploy server/ folder
```

### Environment Variables for Production
- Update `FRONTEND_URL` to production domain
- Update `MONGODB_URI` to Atlas connection
- Use secure JWT_SECRET
- Configure CORS properly

## 📝 Next Steps

1. ✅ Test all features locally
2. ✅ Add Google Maps API key
3. ✅ Setup MongoDB (local or Atlas)
4. ✅ Test Become a Host flow
5. ✅ Test favorites functionality
6. ✅ Test share functionality
7. ✅ View ratings on property pages
8. ✅ Connect MongoDB Compass
9. 🔄 Deploy to production (optional)
10. 🔄 Add real payment integration (optional)

## 💡 Additional Features to Consider

- Image upload with Cloudinary for Become Host
- Property approval workflow (admin review)
- Email notifications for favorites/bookings
- Advanced search filters by rating
- Sort properties by favorites count
- Trending properties based on shares
- User review submission form
- Host dashboard analytics
- Booking calendar integration
- Real-time messaging

## 📧 Support

For issues or questions:
1. Check this guide first
2. Review `MONGODB_CONNECTION_GUIDE.md`
3. Check browser console for errors
4. Check server logs for backend errors
5. Verify all environment variables are set

---

## 🎉 Congratulations!

You now have a fully functional Airbnb clone with:
- ✅ User authentication
- ✅ Property listings
- ✅ Favorites/Wishlist
- ✅ Share functionality
- ✅ Advanced ratings
- ✅ Google Maps
- ✅ Become a Host
- ✅ Booking system
- ✅ Reviews and ratings
- ✅ Messages
- ✅ And much more!

Happy coding! 🚀
