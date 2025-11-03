# 🏠 HomelyHub - Premium Home Rental Platform

A modern full-stack MERN application for property rentals with host dashboard and booking system.

![Tech Stack](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## ✨ Features

### For Guests
- 🔍 Advanced property search with filters (location, price, type, amenities)
- 📅 Real-time booking system with calendar
- ⭐ Review and rating system
- 💬 Direct messaging with hosts
- 💳 Secure payment integration
- 📱 Fully responsive design
- 🗺️ Interactive map view with property locations
- ❤️ Wishlist/Favorites functionality
- 🤖 AI chat assistant for help

### For Hosts (Complete Dashboard)
- 📊 **Dashboard Overview**: Stats cards, recent bookings, performance metrics
- 🏠 **My Properties**: Manage all listings with search and filters
- ➕ **Add Property**: Complete form with image upload and amenities
- 📅 **Bookings**: Manage requests with accept/reject actions
- 💰 **Earnings**: Track revenue and transaction history
- ⚙️ **Profile Settings**: Account management
- 🎨 **Vibrant Design**: Purple-pink gradient theme, high contrast
- � **Easy Navigation**: Switch between guest and host modes

### Authentication & Security
- 🔐 JWT-based authentication
- 📧 Email verification
- 🔑 Password reset functionality
- 👤 User profile management
- 🛡️ Role-based access control (Guest/Host/Admin)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Mudavath-kumar/Webstack-acadamy-Project.git
cd Webstack-acadamy-Project
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Configure Environment Variables**

**Backend** (`backend/.env`):
```env
NODE_ENV=development
PORT=5060

# MongoDB Atlas Connection
MONGODB_URI=your_mongodb_atlas_connection_string

# JWT Secret (generate a random secure key)
JWT_SECRET=your_super_secret_jwt_key

# Frontend URL
FRONTEND_URL=http://localhost:3001

# Cloudinary (for image uploads - optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

```env
VITE_API_URL=http://localhost:5060/api
VITE_FRONTEND_URL=http://localhost:3001
```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Access Points:**
- Frontend: http://localhost:3001
- Backend API: http://localhost:5060
- Health Check: http://localhost:5060/health

## 🏗️ Project Structure

```
Webstack-acadamy-Project/
├── frontend/                # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   │   ├── guest/      # Guest pages
│   │   │   └── host/       # Host Dashboard pages
│   │   ├── context/        # React Context (Auth)
│   │   ├── services/       # API services
│   │   ├── styles/         # CSS files
│   │   └── utils/          # Helper functions
│   ├── public/             # Static assets
│   ├── package.json
│   └── vite.config.js
│
├── backend/                # Express backend
│   ├── controllers/        # Business logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth, error handling
│   ├── config/            # Database, Cloudinary
│   ├── utils/             # Email, templates
│   └── server.js          # Entry point (Port 5060)
│
├── .gitignore
└── README.md
```

## 🛠️ Tech Stack

**Frontend:**
- React 18, Vite, React Router v6
- Axios, Framer Motion, React Hot Toast
- Leaflet (Maps), Lucide Icons, date-fns

**Backend:**
- Node.js, Express.js
- MongoDB with Mongoose
- JWT Authentication, Bcrypt
- Multer, Cloudinary, Nodemailer

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - **Root Directory**: `frontend`
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variables** (Vercel Dashboard):
```
VITE_API_URL=https://your-backend-url.com/api
VITE_FRONTEND_URL=https://your-app.vercel.app
```

### Backend Deployment (Railway/Render)

1. **Railway Deployment**
   - Visit [railway.app](https://railway.app)
   - Create new project from GitHub
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

2. **Environment Variables**:
```
NODE_ENV=production
PORT=5060
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=https://your-app.vercel.app
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### MongoDB Atlas Setup

1. Create cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user with read/write permissions
3. Network Access: Add IP (0.0.0.0/0 for all) or specific IPs
4. Get connection string: Replace `<password>` and `<dbname>`

## 🐛 Troubleshooting

### MongoDB Connection Error
✅ **Solution**: 
- Verify `MONGODB_URI` format: `mongodb+srv://username:password@cluster.mongodb.net/database`
- Whitelist all IPs (0.0.0.0/0) in MongoDB Atlas Network Access
- Check database user has correct permissions

### CORS Errors
✅ **Solution**:
- Update `FRONTEND_URL` in backend `.env` to match exact frontend domain
- Check `backend/server.js` CORS configuration includes your domain

### Failed to Load Transactions/Earnings
✅ **Status**: Mock endpoints return empty data (expected behavior)
- Backend endpoints return `{ earnings: 0, transactions: [] }`
- Implement actual logic when payment system is connected

### Image Upload Fails
✅ **Solution**:
- Add Cloudinary credentials to `.env`
- Check file size limits (default: 5MB)
- Verify Cloudinary API key is active

### Port Already in Use
✅ **Solution**:
```bash
# Windows
netstat -ano | findstr :5060
taskkill /PID <PID> /F

# Change port in backend/.env
PORT=5061
```

## 📚 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Create account
- `POST /login` - Sign in
- `POST /logout` - Sign out
- `GET /me` - Get current user
- `POST /forgot-password` - Request reset
- `POST /reset-password` - Reset password

### Properties (`/api/properties`)
- `GET /` - List all properties
- `GET /:id` - Get property details
- `POST /` - Create property (Host)
- `PUT /:id` - Update property (Host)
- `DELETE /:id` - Delete property (Host)
- `GET /host/my-properties` - Host's properties

### Bookings (`/api/bookings`)
- `GET /` - User's bookings
- `GET /host/my-bookings` - Host's bookings
- `POST /` - Create booking
- `PATCH /:id/status` - Update status (Host)

### Payments (`/api/payments`)
- `GET /host/earnings` - Host earnings stats
- `GET /host/transactions` - Transaction history

### Reviews (`/api/reviews`)
- `GET /property/:propertyId` - Property reviews
- `POST /` - Create review
- `PUT /:id` - Update review
- `DELETE /:id` - Delete review

## 🔑 Key Features

### Host Dashboard (Complete)
- **Location**: `frontend/src/pages/host/`
- **Pages**: DashboardOverview, MyProperties, PropertyForm, HostBookings, Earnings
- **Styling**: `frontend/src/styles/HostDashboard.css` (vibrant purple-pink gradient theme)
- **API Integration**: All pages connected with graceful error handling

### Authentication Flow
- JWT tokens stored in localStorage
- Auto-redirect on token expiry
- Role-based UI rendering (Guest/Host/Admin)
- Protected routes with middleware

### Image Uploads
- Cloudinary integration for storage
- Multiple image support per property
- Image optimization and CDN delivery
- Fallback to placeholder if upload fails

## 📊 Database Schema

**User**: name, email, password, role, avatar, phone, verified  
**Property**: title, description, host, price, location, amenities, images, availability  
**Booking**: property, guest, host, checkIn, checkOut, status, totalPrice  
**Review**: property, user, rating, comment, createdAt  
**Payment**: booking, amount, status, method, transactionId

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Submit pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

**Kumar Mudavath**  
GitHub: [@Mudavath-kumar](https://github.com/Mudavath-kumar)  
Repository: [Webstack-acadamy-Project](https://github.com/Mudavath-kumar/Webstack-acadamy-Project)

## 🙏 Acknowledgments

- React & Vite for excellent developer experience
- MongoDB Atlas for reliable database hosting
- Vercel for seamless frontend deployment
- Cloudinary for image management
- All open-source contributors

---

### 📞 Support

If you encounter issues or have questions:
1. Check the Troubleshooting section above
2. Review closed issues on GitHub
3. Open a new issue with detailed description

**⭐ Star this repo if you find it helpful!**
