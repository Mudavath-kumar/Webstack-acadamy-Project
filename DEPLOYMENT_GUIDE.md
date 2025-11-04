# 🚀 Deployment Guide - HomelyHub

This guide will help you deploy both frontend (Vercel) and backend (Render) from this monorepo.

---

## 📋 Prerequisites

Before deploying, make sure you have:

1. **MongoDB Atlas** account with a cluster created
2. **Cloudinary** account for image uploads
3. **Gmail** or SMTP credentials for sending emails
4. **GitHub** repository pushed with latest code
5. **Vercel** account (free tier works)
6. **Render** account (free tier works)

---

## 🔧 Part 1: Deploy Backend to Render

### Step 1: Create Render Account
- Go to https://render.com and sign up with GitHub

### Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `Webstack-acadamy-Project`
3. Configure the service:
   - **Name**: `homelyhub-backend`
   - **Region**: Oregon (US West) or closest to you
   - **Branch**: `feature/property-navigation-and-booking-enhancements` or `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/homelyhub?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-change-this-123456789
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
FROM_NAME=HomelyHub
FROM_EMAIL=noreply@homelyhub.com
FRONTEND_URL=https://your-app.vercel.app
MAX_FILE_SIZE=5242880
```

**Important Notes:**
- Replace `MONGODB_URI` with your MongoDB Atlas connection string
- For Gmail SMTP, use an **App Password** (not your regular password):
  - Go to Google Account → Security → 2-Step Verification → App Passwords
  - Generate a new app password for "Mail"
- `JWT_SECRET` should be a long random string (at least 32 characters)
- `FRONTEND_URL` will be updated after Vercel deployment

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Copy your backend URL (e.g., `https://homelyhub-backend.onrender.com`)

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Configure Vercel Project

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Import your GitHub repository: `Webstack-acadamy-Project`
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` ⚠️ **IMPORTANT**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 2: Add Environment Variables

In Vercel project settings → **Environment Variables**, add:

```env
VITE_API_URL=https://homelyhub-backend.onrender.com
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key
```

**Important Notes:**
- Replace `VITE_API_URL` with your **Render backend URL** from Part 1
- Firebase variables are optional if you're using Firebase features
- Google Maps API key is optional (for map features)

### Step 3: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

### Step 4: Update Backend FRONTEND_URL
1. Go back to **Render** dashboard
2. Open your backend service
3. Go to **Environment** tab
4. Update `FRONTEND_URL` with your Vercel URL
5. Click **"Save Changes"** (this will redeploy the backend)

---

## ✅ Part 3: Verify Deployment

### Test Backend
1. Open: `https://your-backend.onrender.com/api/v1/health`
2. You should see a health check response

### Test Frontend
1. Open your Vercel URL
2. Check browser DevTools → Network tab
3. Verify API calls go to your Render backend URL
4. Test key features:
   - ✅ User signup/login
   - ✅ Browse properties
   - ✅ Create a property (with image upload)
   - ✅ Make a booking
   - ✅ Cancel a booking

---

## 🐛 Common Issues & Fixes

### Issue: CORS Error
**Solution**: Backend `FRONTEND_URL` must match your Vercel domain exactly (including https://)

### Issue: MongoDB Connection Failed
**Solutions**:
- Check MongoDB Atlas → Network Access → Add IP `0.0.0.0/0` (allow all)
- Verify connection string has correct username/password
- Ensure database name in connection string matches your DB

### Issue: Images Not Uploading
**Solutions**:
- Verify all three Cloudinary env vars are set in Render
- Check Cloudinary dashboard for upload quota
- Ensure MAX_FILE_SIZE is set (default: 5MB)

### Issue: Email Not Sending
**Solutions**:
- For Gmail: Use App Password, not regular password
- Enable "Less secure app access" if using regular Gmail
- Check SMTP credentials are correct

### Issue: Vercel Build Failed
**Solutions**:
- Ensure "Root Directory" is set to `frontend`
- Check that `frontend/package.json` has `"build": "vite build"` script
- Verify all VITE_ env vars have no spaces in values

### Issue: Backend Cold Start (Render Free Tier)
**Note**: Free tier services sleep after 15 minutes of inactivity. First request after sleep takes 30-60 seconds.
**Solution**: Upgrade to paid plan or use a service like UptimeRobot to ping your backend every 10 minutes

---

## 🔐 Security Checklist

- [ ] MongoDB connection string has strong password
- [ ] JWT_SECRET is a long random string (32+ characters)
- [ ] Never commit `.env` files to GitHub
- [ ] MongoDB Atlas has network access restricted or uses IP whitelist
- [ ] Cloudinary API secret is kept private
- [ ] Gmail SMTP uses App Password (not regular password)
- [ ] CORS is configured with exact frontend domain (not wildcard in production)

---

## 📊 Monitoring & Logs

### Backend Logs (Render)
- Go to Render dashboard → Your service → **Logs** tab
- Watch for errors during requests

### Frontend Logs (Vercel)
- Go to Vercel dashboard → Your project → **Deployments**
- Click on a deployment → **Functions** tab (if using serverless)
- For client errors, use browser DevTools → Console

### Database Monitoring
- MongoDB Atlas → Cluster → **Metrics** tab
- Check connections, operations, and storage usage

---

## 🚀 Next Steps

1. **Custom Domain** (Optional):
   - Vercel: Settings → Domains → Add your domain
   - Render: Settings → Custom Domain → Add your domain

2. **CI/CD** (Already set up!):
   - Push to GitHub = auto-deploy on both Vercel and Render
   - Use Pull Requests for staging deployments

3. **Performance**:
   - Enable Vercel Analytics
   - Add Redis caching on backend (upgrade plan)
   - Use Cloudinary transformations for optimized images

4. **Backups**:
   - MongoDB Atlas has automatic backups (check retention period)
   - Download important data periodically

---

## 📞 Support

If you encounter issues:
1. Check the logs (Render/Vercel dashboards)
2. Verify environment variables match exactly
3. Test backend API endpoints directly (use Postman/Thunder Client)
4. Check GitHub Issues for similar problems

---

**Deployment Status:**
- ✅ Backend: Render Web Service
- ✅ Frontend: Vercel Static Site
- ✅ Database: MongoDB Atlas
- ✅ Storage: Cloudinary
- ✅ Email: SMTP (Gmail)

**Happy Deploying! 🎉**
