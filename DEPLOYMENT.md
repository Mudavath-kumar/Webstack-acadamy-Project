# HomelyHub Deployment Guide

## 🚀 Full-Stack MERN Application Deployment

This guide covers deploying both the frontend (React) and backend (Node.js/Express) of HomelyHub.

---

## 📋 Prerequisites

Before deploying, ensure you have:

1. **MongoDB Database** (MongoDB Atlas recommended)
2. **Cloudinary Account** (for image uploads)
3. **Razorpay Account** (for payment processing)
4. **SMTP Email Service** (Gmail, SendGrid, etc.)
5. **GitHub Repository** (already set up ✅)

---

## 🔧 Backend Deployment

### Option 1: Railway (Recommended)

1. **Create Railway Account**: https://railway.app
2. **Create New Project** → Deploy from GitHub
3. **Add Environment Variables**:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_EMAIL=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   FROM_NAME=HomelyHub
   FROM_EMAIL=noreply@homelyhub.com
   
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```
4. **Set Root Directory**: `server`
5. **Deploy** → Railway will auto-detect Node.js and deploy

### Option 2: Render

1. Create account at https://render.com
2. New → Web Service → Connect GitHub
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add all environment variables (same as above)

### Option 3: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create homelyhub-backend

# Add MongoDB Atlas addon (or use your own)
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret
# ... (add all other env vars)

# Deploy
git subtree push --prefix server heroku main
```

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Create `.env.production`**:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api/v1
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Or via Vercel Dashboard**:
   - Import GitHub repository
   - Framework Preset: Vite
   - Root Directory: `.` (leave default)
   - Add environment variables
   - Deploy

### Option 2: Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables
5. Deploy

---

## 🗄️ MongoDB Atlas Setup

1. Create account at https://mongodb.com/atlas
2. Create a new cluster (FREE tier available)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/homelyhub?retryWrites=true&w=majority
   ```
6. Replace `<password>` and database name
7. Add to backend environment variables

---

## ☁️ Cloudinary Setup

1. Create account at https://cloudinary.com
2. Dashboard → Account Details
3. Copy:
   - Cloud Name
   - API Key
   - API Secret
4. Add to backend environment variables

---

## 💳 Razorpay Setup (India Payments)

1. Create account at https://razorpay.com
2. Generate API Keys (Test/Live mode)
3. Add to:
   - Backend: Both Key ID and Secret
   - Frontend: Only Key ID

---

## 📧 Email Configuration (Gmail Example)

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password:
   - Google Account → Security → App Passwords
   - Select "Mail" and "Other"
   - Copy generated password
3. Use in SMTP configuration:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_EMAIL=youremail@gmail.com
   SMTP_PASSWORD=generated_app_password
   ```

---

## ✅ Testing Checklist

### Backend API Testing

```bash
# Health check
curl https://your-backend-url.railway.app/api/v1/auth/me

# Test registration
curl -X POST https://your-backend-url.railway.app/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","phone":"+919876543210"}'
```

### Frontend Testing

1. Open deployed URL
2. Test authentication (sign up/login)
3. Browse properties
4. Test search and filters
5. Create a test booking (use Razorpay test mode)
6. Check email notifications

---

## 🔐 Security Checklist

- [ ] All API keys are in environment variables (not hardcoded)
- [ ] CORS is configured to only allow your frontend domain
- [ ] MongoDB user has minimal required permissions
- [ ] JWT secret is strong and random
- [ ] HTTPS is enabled on both frontend and backend
- [ ] Rate limiting is enabled (add express-rate-limit)
- [ ] Input validation is in place

---

## 📊 Monitoring & Logs

### Railway
- Dashboard → Your Service → Logs
- Built-in metrics for CPU, memory, network

### Vercel
- Dashboard → Your Project → Logs
- Analytics available

### MongoDB Atlas
- Dashboard → Metrics
- Monitor connections, operations, storage

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: 500 Internal Server Error
- Check logs for error details
- Verify environment variables are set
- Check MongoDB connection string

**Problem**: CORS errors
- Ensure `FRONTEND_URL` matches your deployed frontend
- Check CORS configuration in `server.js`

**Problem**: Image uploads failing
- Verify Cloudinary credentials
- Check file size limits

### Frontend Issues

**Problem**: API calls failing
- Check `VITE_API_URL` is correct
- Ensure backend is deployed and running
- Check browser console for errors

**Problem**: Razorpay not loading
- Verify `VITE_RAZORPAY_KEY_ID` is set
- Check Razorpay dashboard for key status

---

## 🔄 CI/CD Setup (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          # Railway auto-deploys on push

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 📱 Post-Deployment

1. Update README.md with live URLs
2. Test all features in production
3. Set up error tracking (Sentry recommended)
4. Configure backup strategy for MongoDB
5. Set up monitoring alerts
6. Create admin user for property management

---

## 🎯 Performance Optimization

1. **Frontend**:
   - Enable code splitting
   - Optimize images (already using Cloudinary)
   - Add service worker for PWA
   - Enable Vercel Analytics

2. **Backend**:
   - Add Redis caching for frequent queries
   - Enable database indexing (already done)
   - Implement rate limiting
   - Add CDN for static assets

---

## 📞 Support

For deployment issues:
- Backend: Check Railway/Render/Heroku logs
- Frontend: Check Vercel/Netlify logs
- Database: Check MongoDB Atlas metrics
- Email issues: Verify SMTP credentials

---

## 🎉 Success!

Your HomelyHub application should now be live at:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-api.railway.app
- **Database**: MongoDB Atlas (cloud)

Happy deploying! 🚀
