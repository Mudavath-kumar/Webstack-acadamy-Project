# 🏠 HomelyHub - Premium Home Rental Platform

A full-stack MERN application for booking and managing property rentals, similar to Airbnb.

![Tech Stack](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## ✨ Features

### For Guests
- 🔍 Advanced property search with filters
- 📅 Real-time booking system
- ⭐ Review and rating system
- 💬 Direct messaging with hosts
- 💳 Secure payment integration
- 📱 Responsive design for all devices
- 🗺️ Interactive map view
- ❤️ Wishlist functionality
- 🤖 AI chat assistant

### For Hosts
- 🏠 Property listing management
- 📊 Dashboard with analytics
- 📅 Booking calendar
- 💰 Earnings tracking
- 📸 Image upload and management
- 📝 Property description editor
- 🔔 Real-time notifications

### Authentication
- 🔐 JWT-based authentication
- 📧 Email verification
- 🔑 Password reset functionality
- 👤 User profile management
- 🛡️ Role-based access control (Guest/Host/Admin)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd homelyhub
```

2. **Install dependencies for both frontend and backend**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Configure environment variables**

**Backend** (`backend/.env`):
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and update:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`frontend/.env`):
```bash
cd frontend
cp .env.example .env
```

For local development, the default values work:
```env
VITE_API_URL=/api/v1
```

4. **Run the application**

**Option 1: Run Both Together (Development)**

Terminal 1 - Backend:
```bash
cd backend
npm start
# Backend runs on http://localhost:5000
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

**Option 2: Run Separately**

Backend only:
```bash
cd backend
npm start
```

Frontend only:
```bash
cd frontend
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/v1

## 📁 Project Structure

```
homelyhub/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store
│   │   ├── services/     # API services
│   │   └── ...
│   ├── package.json
│   └── README.md
│
├── backend/               # Express backend API
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── server.js         # Entry point
│   ├── package.json
│   └── README.md
│
└── README.md             # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router v7** - Routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage
- **Razorpay** - Payment gateway
- **Nodemailer** - Email service

## 🌐 Deployment

### Deploy Backend

#### Option 1: Render (Recommended)
1. Create account on [Render](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables
6. Deploy!

#### Option 2: Railway
1. Create account on [Railway](https://railway.app)
2. New Project → Deploy from GitHub
3. Set root directory to `backend`
4. Add environment variables
5. Deploy!

#### Option 3: Heroku
```bash
heroku create your-backend-name
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret
# Add other env vars
git subtree push --prefix backend heroku main
```

### Deploy Frontend

#### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend: `cd frontend`
3. Run: `vercel`
4. Set environment variable:
   - `VITE_API_URL=https://your-backend.com/api/v1`
5. Deploy: `vercel --prod`

#### Option 2: Netlify
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

Set environment variable in Netlify dashboard:
- `VITE_API_URL=https://your-backend.com/api/v1`

#### Option 3: GitHub Pages
Not recommended for this app (requires backend proxy)

### Important Deployment Notes

1. **Update CORS**: In `backend/.env`, update `FRONTEND_URL` to your deployed frontend URL
2. **Update API URL**: In `frontend/.env`, update `VITE_API_URL` to your deployed backend URL
3. **Database**: Use MongoDB Atlas for production (never local MongoDB)
4. **Security**: 
   - Change `JWT_SECRET` to a strong random string
   - Never commit `.env` files
   - Use environment variables for all secrets

## 🔧 Configuration

### Backend Environment Variables

See `backend/.env.example` for all available options.

Required:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `FRONTEND_URL` - Frontend URL for CORS

Optional:
- `CLOUDINARY_*` - For image uploads
- `RAZORPAY_*` - For payment processing
- `SMTP_*` - For email functionality

### Frontend Environment Variables

See `frontend/.env.example` for all available options.

Required:
- `VITE_API_URL` - Backend API URL

Optional:
- `VITE_MAPBOX_TOKEN` - For map functionality
- `VITE_GOOGLE_MAPS_API_KEY` - For Google Maps

## 📚 API Documentation

See `backend/README.md` for complete API documentation.

### Quick Reference

- Base URL: `http://localhost:5000/api/v1`
- Authentication: JWT Bearer token in Authorization header
- All endpoints return JSON

Main endpoints:
- `/auth/*` - Authentication
- `/properties/*` - Property management
- `/bookings/*` - Booking management
- `/reviews/*` - Review system
- `/messages/*` - Messaging
- `/users/*` - User management

## 🧪 Testing

### Test Backend
```bash
cd backend
npm start

# In another terminal
curl http://localhost:5000/api/v1/health
```

### Test Frontend
```bash
cd frontend
npm run dev
# Open http://localhost:3000 in browser
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspired by Airbnb
- Icons from Lucide React
- Maps from Mapbox/Google Maps

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the documentation in `frontend/README.md` and `backend/README.md`

## 🗺️ Roadmap

- [ ] Real-time notifications with Socket.io
- [ ] Multi-language support
- [ ] Advanced search filters
- [ ] Calendar integration
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Analytics and reporting

---

**Made with ❤️ by HomelyHub Team**
