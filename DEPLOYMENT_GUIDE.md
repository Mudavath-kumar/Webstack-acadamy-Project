# 🚀 HomelyHub Deployment Guide

Complete guide to deploy HomelyHub frontend and backend separately to production.

## 📋 Pre-Deployment Checklist

### Backend Requirements
- [ ] MongoDB Atlas account and connection string
- [ ] Strong JWT secret key
- [ ] Cloudinary account (optional, for image uploads)
- [ ] Razorpay account (optional, for payments)
- [ ] Gmail account with app password (optional, for emails)

### Frontend Requirements
- [ ] Backend API URL (after backend deployment)

## 🔧 Backend Deployment

### Option 1: Deploy to Render (Recommended - Free Tier Available)

#### Step 1: Prepare Your Code
```bash
cd backend
# Make sure .env file is NOT committed
# Ensure .gitignore includes .env
```

#### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

#### Step 3: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure service:
   - **Name**: `homelyhub-api` (or your choice)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid)

#### Step 4: Add Environment Variables
In Render dashboard, go to Environment tab and add:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/homelyhub
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
FRONTEND_URL=https://your-frontend-domain.com
```

Optional variables:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=noreply@homelyhub.com
FROM_NAME=HomelyHub
```

#### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://homelyhub-api.onrender.com`

#### Step 6: Test Backend
```bash
curl https://your-backend-url.onrender.com/api/v1/health
```

Expected response:
```json
{
  "success": true,
  "message": "HomelyHub API is running"
}
```

---

### Option 2: Deploy to Railway

#### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

#### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository

#### Step 3: Configure
1. Set **Root Directory**: `backend`
2. Railway auto-detects Node.js
3. Add environment variables (same as Render above)

#### Step 4: Deploy
Railway will automatically deploy. Note your URL.

---

### Option 3: Deploy to Heroku

#### Step 1: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh

# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

#### Step 2: Login and Create App
```bash
heroku login
heroku create homelyhub-api
```

#### Step 3: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set JWT_EXPIRE=7d
heroku config:set JWT_COOKIE_EXPIRE=7
heroku config:set FRONTEND_URL=https://your-frontend-url.com
# Add other variables as needed
```

#### Step 4: Deploy
```bash
# From project root
git subtree push --prefix backend heroku main

# Or create separate repo for backend
cd backend
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a homelyhub-api
git push heroku main
```

---

### Option 4: Deploy to DigitalOcean/AWS/VPS

#### Step 1: Setup Server
```bash
# SSH into your server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx
apt install -y nginx
```

#### Step 2: Clone and Setup
```bash
# Clone repository
cd /var/www
git clone your-repo-url homelyhub
cd homelyhub/backend

# Install dependencies
npm install --production

# Create .env file
nano .env
# Paste your production environment variables
```

#### Step 3: Start with PM2
```bash
pm2 start server.js --name homelyhub-api
pm2 save
pm2 startup
```

#### Step 4: Configure Nginx
```bash
nano /etc/nginx/sites-available/homelyhub-api
```

Add:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/homelyhub-api /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### Step 5: Setup SSL with Let's Encrypt
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d api.yourdomain.com
```

---

## 🎨 Frontend Deployment

### Option 1: Deploy to Vercel (Recommended)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Navigate to Frontend
```bash
cd frontend
```

#### Step 3: Update .env for Production
Create `.env.production`:
```env
VITE_API_URL=https://your-backend-url.com/api/v1
```

#### Step 4: Deploy
```bash
# First deployment (configure)
vercel

# Production deployment
vercel --prod
```

#### Step 5: Add Environment Variables
In Vercel dashboard:
1. Go to your project
2. Settings → Environment Variables
3. Add: `VITE_API_URL` = `https://your-backend-url.com/api/v1`

#### Step 6: Redeploy
```bash
vercel --prod
```

---

### Option 2: Deploy to Netlify

#### Step 1: Build Frontend
```bash
cd frontend

# Update .env
echo "VITE_API_URL=https://your-backend-url.com/api/v1" > .env

# Build
npm run build
```

#### Step 2: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 3: Deploy
```bash
netlify login
netlify init
netlify deploy --prod --dir=dist
```

#### Step 4: Configure
In Netlify dashboard:
1. Site settings → Build & deploy
2. Environment variables
3. Add: `VITE_API_URL` = `https://your-backend-url.com/api/v1`

#### Step 5: Create `netlify.toml` (Optional)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: Deploy to GitHub Pages

Not recommended for this app because:
- GitHub Pages doesn't support server-side routing well
- Requires complex configuration for React Router
- Better to use Vercel or Netlify

---

## 🔄 Post-Deployment Configuration

### 1. Update Backend CORS

In `backend/.env`, update:
```env
FRONTEND_URL=https://your-actual-frontend-url.com
```

Redeploy backend.

### 2. Update Frontend API URL

In `frontend/.env` or Vercel/Netlify environment variables:
```env
VITE_API_URL=https://your-actual-backend-url.com/api/v1
```

Redeploy frontend.

### 3. Test the Integration

1. Open your frontend URL
2. Try to register/login
3. Check browser console for errors
4. Verify API calls are going to correct backend URL

---

## 🐛 Common Deployment Issues

### Issue 1: CORS Error
**Error**: "Access to fetch has been blocked by CORS policy"

**Solution**:
- Make sure `FRONTEND_URL` in backend `.env` matches your actual frontend URL
- Include protocol (https://) and no trailing slash
- Redeploy backend after changing

### Issue 2: 404 on Refresh
**Error**: Page not found when refreshing on a route

**Solution** (Vercel):
Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Solution** (Netlify):
Create `_redirects` file in `public/`:
```
/*    /index.html   200
```

### Issue 3: Environment Variables Not Working
**Error**: undefined environment variables

**Solution**:
- Vite variables must start with `VITE_`
- Rebuild after changing environment variables
- On Vercel/Netlify, set variables in dashboard and redeploy

### Issue 4: Backend Connection Timeout
**Error**: "Network Error" or timeout

**Solution**:
- Check backend is running: visit `https://your-backend-url.com/api/v1/health`
- Verify `VITE_API_URL` is correct (include `/api/v1`)
- Check backend logs for errors

### Issue 5: MongoDB Connection Failed
**Error**: "MongoError: Authentication failed"

**Solution**:
- Verify MongoDB Atlas connection string is correct
- Check if IP is whitelisted (use 0.0.0.0/0 for testing)
- Ensure username/password are correct
- Database name must exist

---

## 📊 Monitoring and Maintenance

### Backend Monitoring

**Render**:
- Check logs in Render dashboard
- Setup health check endpoint: `/api/v1/health`

**Railway**:
- View logs in Railway dashboard
- Monitor resource usage

**Heroku**:
```bash
heroku logs --tail -a homelyhub-api
```

**VPS with PM2**:
```bash
pm2 logs homelyhub-api
pm2 monit
```

### Frontend Monitoring

**Vercel**:
- Analytics tab in dashboard
- Error tracking

**Netlify**:
- Logs tab in dashboard
- Deploy notifications

---

## 🔐 Security Checklist

- [ ] `.env` files are in `.gitignore`
- [ ] `JWT_SECRET` is strong and unique (minimum 32 characters)
- [ ] MongoDB connection string uses strong password
- [ ] CORS is configured with actual frontend URL (not *)
- [ ] SSL certificates are installed (HTTPS)
- [ ] Sensitive data is never committed to Git
- [ ] Environment variables are set in hosting dashboard
- [ ] API rate limiting is enabled (optional)
- [ ] Input validation is working
- [ ] File upload size limits are set

---

## 📈 Scaling Considerations

### Backend Scaling
- **Horizontal**: Deploy multiple instances behind load balancer
- **Database**: MongoDB Atlas auto-scaling
- **Caching**: Add Redis for sessions/cache
- **CDN**: Use for static assets

### Frontend Scaling
- Vercel/Netlify automatically scale
- Use CDN (built-in with Vercel/Netlify)
- Optimize images (lazy loading, WebP)
- Code splitting (automatic with Vite)

---

## 🎉 Success!

Your HomelyHub application is now deployed and running in production!

### Quick Test Checklist
- [ ] Backend health check works
- [ ] Frontend loads without errors
- [ ] Can register new user
- [ ] Can login
- [ ] Can create property (if host)
- [ ] Can book property (if guest)
- [ ] Images upload correctly
- [ ] Reviews work
- [ ] Messages work

---

## 📞 Need Help?

- Check backend logs for API errors
- Check browser console for frontend errors
- Verify all environment variables are set correctly
- Test backend endpoints directly with curl/Postman
- Ensure MongoDB Atlas IP whitelist includes your hosting provider

---

**Deployment Guide Version 1.0**
Last Updated: 2024
