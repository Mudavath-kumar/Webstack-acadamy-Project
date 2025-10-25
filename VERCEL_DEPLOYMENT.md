# 🚀 Vercel Deployment Guide

## Environment Variables Required

When deploying to Vercel, you MUST set this environment variable:

### In Vercel Dashboard:
Go to: **Project Settings → Environment Variables**

Add:
```
VITE_API_URL=https://your-backend-url.com/api/v1
```

**Important:** Replace `https://your-backend-url.com` with your actual backend API URL.

---

## How It Works

### Local Development (with Vite proxy):
- `VITE_API_URL` not set or empty
- API calls use relative path `/api/v1`
- Vite proxy forwards requests to `http://localhost:5000`
- ✅ Works locally

### Production (Vercel):
- `VITE_API_URL` set to full backend URL
- API calls use `https://your-backend-url.com/api/v1`
- Direct connection to backend
- ✅ Works on Vercel

---

## Quick Fix

If registration is failing on Vercel, it's because `VITE_API_URL` is not set!

### Steps:
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings → Environment Variables**
4. Add: `VITE_API_URL` = `https://your-backend-url.com/api/v1`
5. Redeploy your application

---

## Backend URL Examples

If your backend is deployed on:
- **Render**: `https://your-app.onrender.com/api/v1`
- **Railway**: `https://your-app.up.railway.app/api/v1`
- **Heroku**: `https://your-app.herokuapp.com/api/v1`
- **Custom domain**: `https://api.yourdomain.com/api/v1`

---

That's it! 🎉
