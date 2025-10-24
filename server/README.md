# HomelyHub Backend API

Complete RESTful API for the HomelyHub platform - an Airbnb clone built with the MERN stack.

## 🚀 Features Implemented

- ✅ User Authentication (JWT-based)
- ✅ Property Management (CRUD)
- ✅ Booking System with availability check
- ✅ Payment Integration (Razorpay for India)
- ✅ Review & Rating System
- ✅ Messaging System (Host-Guest communication)
- ✅ Advanced Search & Filters
- ✅ User Profile Management
- ✅ File Upload Support (Cloudinary ready)
- ✅ Role-based Access Control (User, Host, Admin)

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Razorpay Account (for payments)
- Cloudinary Account (for image uploads)

## 🛠️ Installation

1. **Navigate to server directory**
```bash
cd server
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
Edit `.env` and add your credentials:
- MongoDB URI
- JWT Secret
- Razorpay Keys
- Cloudinary credentials
- SMTP settings

5. **Start development server**
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/auth/register` | Register new user | Public |
| POST | `/api/v1/auth/login` | Login user | Public |
| GET | `/api/v1/auth/me` | Get current user | Private |
| GET | `/api/v1/auth/logout` | Logout user | Private |
| PUT | `/api/v1/auth/updatepassword` | Update password | Private |
| POST | `/api/v1/auth/forgotpassword` | Forgot password | Public |
| PUT | `/api/v1/auth/resetpassword/:token` | Reset password | Public |

### Property Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/v1/properties` | Get all properties (with filters) | Public |
| GET | `/api/v1/properties/:id` | Get single property | Public |
| POST | `/api/v1/properties` | Create property | Host/Admin |
| PUT | `/api/v1/properties/:id` | Update property | Owner/Admin |
| DELETE | `/api/v1/properties/:id` | Delete property | Owner/Admin |
| GET | `/api/v1/properties/my-properties` | Get my properties | Host |

### Booking Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/bookings` | Create booking | Private |
| GET | `/api/v1/bookings` | Get user bookings | Private |
| GET | `/api/v1/bookings/:id` | Get single booking | Private |
| PUT | `/api/v1/bookings/:id/cancel` | Cancel booking | Private |
| GET | `/api/v1/bookings/host-bookings` | Get host bookings | Host |

### Payment Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/payments/create-order` | Create Razorpay order | Private |
| POST | `/api/v1/payments/verify` | Verify payment | Private |
| GET | `/api/v1/payments/:paymentId` | Get payment details | Private |
| POST | `/api/v1/payments/refund` | Process refund | Admin |

### Review Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/reviews` | Create review | Private |
| GET | `/api/v1/reviews/property/:propertyId` | Get property reviews | Public |
| PUT | `/api/v1/reviews/:id` | Update review | Owner |
| DELETE | `/api/v1/reviews/:id` | Delete review | Owner/Admin |

### User Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/v1/users` | Get all users | Admin |
| GET | `/api/v1/users/:id` | Get user profile | Public |
| PUT | `/api/v1/users/profile` | Update profile | Private |
| PUT | `/api/v1/users/avatar` | Update avatar | Private |
| DELETE | `/api/v1/users/account` | Delete account | Private |

### Message Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/messages/conversation` | Create conversation | Private |
| GET | `/api/v1/messages/conversations` | Get conversations | Private |
| POST | `/api/v1/messages` | Send message | Private |
| GET | `/api/v1/messages/conversation/:id` | Get messages | Private |
| PUT | `/api/v1/messages/:id/read` | Mark as read | Private |

## 🔍 Search & Filter Parameters

Properties can be filtered using query parameters:

```
GET /api/v1/properties?category=beachfront&minPrice=5000&maxPrice=50000&guests=4&amenities=wifi,pool&sort=price-low&page=1&limit=12
```

**Available Filters:**
- `category` - beachfront, cabins, mountain, luxury, etc.
- `propertyType` - house, apartment, villa, cabin, condo, hotel
- `city` - City name (case-insensitive)
- `minPrice` - Minimum price per night
- `maxPrice` - Maximum price per night
- `guests` - Minimum guest capacity
- `bedrooms` - Minimum bedrooms
- `amenities` - Comma-separated list
- `search` - Text search in title/description
- `sort` - price-low, price-high, rating
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 12)

## 🗄️ Database Models

### User Model
- Authentication & profile data
- Role-based access (user, host, admin)
- Password encryption with bcrypt
- JWT token generation

### Property Model
- Comprehensive property details
- Location with coordinates
- Pricing and discounts
- Amenities and rules
- Availability management
- Rating aggregation

### Booking Model
- Date range management
- Guest information
- Pricing breakdown
- Payment integration
- Cancellation handling

### Review Model
- Multi-criteria ratings
- Comments and images
- Host responses
- Auto-updates property ratings

### Message/Conversation Models
- Real-time messaging support
- Unread count tracking
- File attachments

## 🔐 Security Features

- JWT authentication
- Password hashing (bcrypt)
- HTTP-only cookies
- CORS configuration
- Helmet.js security headers
- Input validation
- Rate limiting ready
- XSS protection

## 📦 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Payment:** Razorpay
- **File Upload:** Multer + Cloudinary
- **Email:** Nodemailer
- **Security:** Helmet, CORS

## 🚀 Deployment

The API is ready for deployment on:
- Heroku
- Railway
- Render
- AWS EC2
- Digital Ocean
- Vercel (serverless)

## 📝 License

MIT License

## 👥 Support

For issues and questions, please open an issue on GitHub.

---

**HomelyHub Backend API** - Powering your property rental platform 🏡🔥
