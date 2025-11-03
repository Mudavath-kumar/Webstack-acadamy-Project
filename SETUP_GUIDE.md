# HomelyHub - Complete Airbnb Clone

A full-stack MERN property rental platform with real-time bookings, payments, and user management.

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ and npm
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Mudavath-kumar/Webstack-acadamy-Project.git
cd Webstack-acadamy-Project

# Install dependencies for both frontend and backend
npm run install-all
```

### Configuration

1. **Backend Environment** (`backend/.env`)
```env
PORT=5055
NODE_ENV=development

# MongoDB - Replace with your connection string
MONGODB_URI=your_mongodb_connection_string_here

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# Optional: Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

2. **Frontend Environment** (`frontend/.env` - optional)
```env
VITE_API_URL=/api/v1
```

### Seed Sample Data

Before running the app, populate the database with sample properties:

```bash
cd backend
node seedProperties.js
```

This creates:
- A sample host user (email: host@demo.com, password: password123)
- 5 sample properties (villas, apartments, cabins, etc.)

### Run the Application

**Option 1: Run both servers separately (recommended for development)**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

**Option 2: Use npm workspaces from root**
```bash
# Start frontend
npm run dev:frontend

# Start backend (in another terminal)
npm run dev:backend
```

### Access the Application

- Frontend: http://localhost:3000 (or the port shown by Vite)
- Backend API: http://localhost:5055
- Health Check: http://localhost:5055/api/v1/health

## 📋 Features

### Guest Features
- Browse properties with filters (price, location, amenities, guests)
- View detailed property information with images and reviews
- Real-time availability checking
- Book properties with date selection
- Mock payment system (MongoDB-based)
- View booking history
- Manage favorites/wishlists
- User authentication (register/login)

### Host Features
- Create and manage property listings
- Upload property images
- Set pricing and availability
- View booking requests
- Manage multiple properties
- Dashboard with analytics

### Admin Features
- User management
- Property moderation
- Booking oversight

## 🏗️ Tech Stack

### Frontend
- **React 19** with Vite
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Framer Motion** for animations
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** authentication
- **Bcrypt** for password hashing
- **Helmet** for security
- **CORS** configuration
- **Morgan** for logging

## 📁 Project Structure

```
Webstack-acadamy-Project/
├── backend/                 # Express API server
│   ├── config/             # Database and service configs
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth and error handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── utils/              # Helper functions
│   ├── seedProperties.js   # Database seeding script
│   └── server.js           # Entry point
│
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── store/         # Redux store
│   │   ├── context/       # React contexts
│   │   └── App.jsx        # Root component
│   └── vite.config.js     # Vite configuration
│
├── package.json           # Root workspace config
└── vercel.json            # Deployment config
```

## 🔐 Authentication

### User Roles
1. **Guest** (default) - Can browse and book properties
2. **Host** - Can list properties and manage bookings
3. **Admin** - Full system access

### Demo Accounts

After seeding:
- Host: `host@demo.com` / `password123`

Create your own guest account via the signup page.

## 🧪 Testing the Booking Flow

1. **Login as a guest** (or create a new account)
2. **Go to Explore page** (`/explore`)
3. **Select a property** from the listings
4. **Click on a property card** to view details
5. **Choose dates and guests** in the booking form
6. **Click "Book Now"** - you'll be redirected to checkout
7. **Fill in guest information** (name, email, phone)
8. **Click "Pay"** to complete the mock checkout
9. **View your booking** at `/guest/bookings` or `/trips`

## 🔧 API Endpoints

### Authentication
- POST `/api/v1/auth/register` - Register new user
- POST `/api/v1/auth/login` - Login user
- GET `/api/v1/auth/me` - Get current user

### Properties
- GET `/api/v1/properties` - Get all properties (with filters)
- GET `/api/v1/properties/:id` - Get single property
- POST `/api/v1/properties` - Create property (host only)
- PUT `/api/v1/properties/:id` - Update property (host only)
- DELETE `/api/v1/properties/:id` - Delete property (host only)

### Bookings
- POST `/api/v1/bookings/mock-checkout` - Create booking with mock payment
- GET `/api/v1/bookings/user/all` - Get user's bookings
- GET `/api/v1/bookings/host/all` - Get host's bookings (host only)
- PUT `/api/v1/bookings/:id/cancel` - Cancel booking

## 🚨 Troubleshooting

### "Could not load property for checkout"
- Make sure you've run the seed script: `node backend/seedProperties.js`
- Verify MongoDB connection in `backend/.env`
- Check that backend is running on port 5055
- Try booking from the `/explore` page (not from hardcoded listing pages)

### Port Already in Use
- Backend default: 5055 (change in `backend/.env`)
- Frontend: Vite will auto-switch to next available port (e.g., 3001)

### MongoDB Connection Issues
- Verify your MONGODB_URI in `backend/.env`
- Check your MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for development)
- Ensure your database user has read/write permissions

### Proxy Issues
- Frontend proxies `/api` requests to `http://localhost:5055`
- If backend is on a different port, update `frontend/vite.config.js`:
  ```js
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:YOUR_PORT',
        changeOrigin: true,
      }
    }
  }
  ```

## 🌐 Deployment

### Backend (Railway/Render/Heroku)
1. Set environment variables in your hosting platform
2. Deploy from `backend/` directory
3. Ensure PORT is set dynamically: `process.env.PORT || 5055`

### Frontend (Vercel/Netlify)
1. Build command: `npm run build` (from root or frontend/)
2. Output directory: `frontend/dist`
3. Set environment variable: `VITE_API_URL=https://your-backend-url.com/api/v1`

## 📝 Future Enhancements

- [ ] Real payment integration (Stripe/Razorpay)
- [ ] Email notifications (booking confirmations, reminders)
- [ ] Real-time chat between guests and hosts
- [ ] Advanced search with map view
- [ ] Reviews and ratings system
- [ ] Property recommendations (AI-powered)
- [ ] Multi-language support
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Kumar** - [Mudavath-kumar](https://github.com/Mudavath-kumar)

## 🙏 Acknowledgments

- Inspired by Airbnb's user experience
- Built with modern MERN stack best practices
- UI/UX design influenced by contemporary rental platforms
