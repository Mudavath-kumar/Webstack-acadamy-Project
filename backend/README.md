# HomelyHub Backend API

RESTful API for HomelyHub - Premium home rental platform built with Node.js, Express, and MongoDB.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (Atlas Cloud)
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage
- **Razorpay** - Payment gateway
- **Nodemailer** - Email service

## Prerequisites

- Node.js 16+ and npm
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)
- Razorpay account (for payments - optional)
- Gmail account (for email service - optional)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and update the following required variables:

### Required Configuration

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB (REQUIRED)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT (REQUIRED)
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Frontend CORS (REQUIRED)
FRONTEND_URL=http://localhost:3000
```

### Optional Configuration

```env
# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay (for payments)
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret

# Email (NodeMailer with Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=noreply@homelyhub.com
FROM_NAME=HomelyHub
```

## Development

Start the development server with auto-reload:
```bash
npm run dev
```

Start the production server:
```bash
npm start
```

The API will run on `http://localhost:5000`

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/logout` | Logout user | Yes |
| GET | `/auth/me` | Get current user | Yes |
| PUT | `/auth/updatepassword` | Update password | Yes |
| POST | `/auth/forgotpassword` | Request password reset | No |
| PUT | `/auth/resetpassword/:token` | Reset password | No |

### Property Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/properties` | Get all properties | No |
| GET | `/properties/:id` | Get single property | No |
| POST | `/properties` | Create property | Yes (Host) |
| PUT | `/properties/:id` | Update property | Yes (Owner) |
| DELETE | `/properties/:id` | Delete property | Yes (Owner) |
| GET | `/properties/search` | Search properties | No |

### Booking Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/bookings` | Get user bookings | Yes |
| GET | `/bookings/:id` | Get single booking | Yes |
| POST | `/bookings` | Create booking | Yes |
| PUT | `/bookings/:id` | Update booking | Yes |
| DELETE | `/bookings/:id` | Cancel booking | Yes |

### Review Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/reviews` | Get all reviews | No |
| GET | `/reviews/:id` | Get single review | No |
| POST | `/reviews` | Create review | Yes |
| PUT | `/reviews/:id` | Update review | Yes (Owner) |
| DELETE | `/reviews/:id` | Delete review | Yes (Owner) |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/profile` | Get user profile | Yes |
| PUT | `/users/profile` | Update profile | Yes |
| GET | `/users/:id` | Get user by ID | Yes |

### Favorite Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/favorites` | Get user favorites | Yes |
| POST | `/favorites/:propertyId` | Add to favorites | Yes |
| DELETE | `/favorites/:propertyId` | Remove from favorites | Yes |

### Message Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/messages` | Get user messages | Yes |
| GET | `/messages/:conversationId` | Get conversation | Yes |
| POST | `/messages` | Send message | Yes |

### Payment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/payments/create-order` | Create Razorpay order | Yes |
| POST | `/payments/verify` | Verify payment | Yes |

### Upload Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/upload/image` | Upload image | Yes |
| POST | `/upload/multiple` | Upload multiple images | Yes |

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in requests:

### Header
```
Authorization: Bearer <your_jwt_token>
```

### Cookie
The token is also stored in an HTTP-only cookie named `token`.

## Error Handling

All errors return in this format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Success Response

All successful responses return in this format:
```json
{
  "success": true,
  "data": { ... }
}
```

## Deployment

### Deploy to Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set the following:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables from `.env.example`
5. Deploy!

### Deploy to Railway

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Set the following:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
4. Add environment variables from `.env.example`
5. Deploy!

### Deploy to Heroku

1. Install Heroku CLI
2. Login to Heroku:
```bash
heroku login
```

3. Create app:
```bash
heroku create your-app-name
```

4. Set environment variables:
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
# ... add all other env vars
```

5. Deploy:
```bash
git subtree push --prefix backend heroku main
```

### Deploy to AWS/DigitalOcean/VPS

1. SSH into your server
2. Install Node.js and npm
3. Clone your repository
4. Navigate to backend folder
5. Install dependencies:
```bash
npm install --production
```

6. Create `.env` file with production values
7. Install PM2 for process management:
```bash
npm install -g pm2
```

8. Start the app:
```bash
pm2 start server.js --name homelyhub-api
pm2 save
pm2 startup
```

9. Setup Nginx as reverse proxy (optional but recommended)

## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port | Yes | `5000` |
| `NODE_ENV` | Environment | Yes | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | Yes | `mongodb+srv://...` |
| `JWT_SECRET` | JWT secret key | Yes | `your_secret_key` |
| `JWT_EXPIRE` | JWT expiration time | Yes | `7d` |
| `JWT_COOKIE_EXPIRE` | Cookie expiration (days) | Yes | `7` |
| `FRONTEND_URL` | Frontend URL for CORS | Yes | `http://localhost:3000` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | No | `your_cloud` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | No | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | No | `your_secret` |
| `RAZORPAY_KEY_ID` | Razorpay key ID | No | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Razorpay secret | No | `your_secret` |
| `SMTP_HOST` | SMTP server host | No | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | No | `587` |
| `SMTP_EMAIL` | SMTP email address | No | `your@email.com` |
| `SMTP_PASSWORD` | SMTP password | No | `your_password` |
| `FROM_EMAIL` | Email "from" address | No | `noreply@...` |
| `FROM_NAME` | Email "from" name | No | `HomelyHub` |

## Project Structure

```
backend/
├── config/
│   ├── database.js       # MongoDB connection
│   └── cloudinary.js     # Cloudinary config
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── propertyController.js  # Property CRUD
│   ├── bookingController.js   # Booking management
│   ├── reviewController.js    # Review system
│   ├── userController.js      # User management
│   ├── favoriteController.js  # Favorites
│   ├── messageController.js   # Messaging
│   ├── paymentController.js   # Payment processing
│   └── uploadController.js    # File uploads
├── middleware/
│   ├── auth.js           # JWT authentication
│   ├── errorHandler.js   # Error handling
│   └── upload.js         # File upload config
├── models/
│   ├── User.js           # User schema
│   ├── Property.js       # Property schema
│   ├── Booking.js        # Booking schema
│   ├── Review.js         # Review schema
│   └── Message.js        # Message schema
├── routes/
│   ├── auth.js           # Auth routes
│   ├── properties.js     # Property routes
│   ├── bookings.js       # Booking routes
│   ├── reviews.js        # Review routes
│   ├── users.js          # User routes
│   ├── favorites.js      # Favorite routes
│   ├── messages.js       # Message routes
│   ├── payments.js       # Payment routes
│   └── upload.js         # Upload routes
├── utils/
│   ├── sendEmail.js      # Email utility
│   ├── emailTemplates.js # Email templates
│   └── cloudinary.js     # Cloudinary helpers
├── .env                  # Environment variables
├── .env.example          # Environment template
├── .gitignore            # Git ignore rules
├── server.js             # Entry point
├── package.json          # Dependencies
└── README.md             # This file
```

## Security Features

- ✅ JWT authentication
- ✅ Password hashing with bcryptjs
- ✅ HTTP-only cookies
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Express rate limiting (optional)
- ✅ Input validation and sanitization
- ✅ MongoDB injection protection

## Testing

Test the API health:
```bash
curl http://localhost:5000/api/v1/health
```

Expected response:
```json
{
  "success": true,
  "message": "HomelyHub API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Support

For issues and questions, please open an issue on GitHub.

## License

MIT
