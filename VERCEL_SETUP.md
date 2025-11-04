# Vercel Deployment Configuration

## Issue
The monorepo structure (with `frontend/` and `backend/` directories) requires Vercel to be configured to use the `frontend` directory as the root.

## Solution: Configure Vercel Project Settings

### Option 1: Via Vercel Dashboard (RECOMMENDED)

1. **Go to Project Settings:**
   - Visit: https://vercel.com/dashboard
   - Select: `Webstack-acadamy-Project`
   - Click: **Settings** tab

2. **Set Root Directory:**
   - Navigate to: **General** → **Root Directory**
   - Click: **Edit**
   - Enter: `frontend`
   - Click: **Save**

3. **Configure Build Settings:**
   - Navigate to: **General** → **Build & Development Settings**
   - Set:
     ```
     Framework Preset: Vite
     Build Command: npm run build
     Output Directory: dist
     Install Command: npm install
     ```
   - Click: **Save**

4. **Add Environment Variables:**
   - Navigate to: **Environment Variables**
   - Add (if you have values):
     ```
     VITE_API_URL=/api/v1
     VITE_FIREBASE_API_KEY=your_key_here
     VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_GOOGLE_MAPS_API_KEY=your_key_here
     ```
   - Click: **Save**

5. **Redeploy:**
   - Go to: **Deployments** tab
   - Click: **⋯** on latest deployment
   - Select: **Redeploy**

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Navigate to project
cd "c:\Users\kumar\OneDrive\Desktop\WebStack Acadamy\Webstack-acadamy-Project"

# Link to existing project
vercel link

# Set root directory
vercel env add ROOT_DIRECTORY
# When prompted, enter: frontend

# Deploy
vercel --prod
```

### Option 3: Create vercel.json in frontend directory

If the above options don't work, you can also add a `vercel.json` directly in the `frontend/` directory:

```json
{
  "version": 2,
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*\\.(js|css|png|jpg|jpeg|gif|svg|ico|json|woff|woff2|ttf|eot))",
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## Verification

After configuration, verify the deployment:

1. Check build logs for errors
2. Visit deployed URL
3. Check browser console for API connection errors
4. Test key features:
   - Property listing
   - Property details
   - Booking functionality
   - User authentication

## Backend Deployment

Remember to deploy your backend separately:

- **Railway**: https://railway.app
- **Render**: https://render.com
- **Heroku**: https://heroku.com

Then update `VITE_API_URL` environment variable in Vercel to point to your deployed backend.

## Common Issues

### Issue: "Failed to load resource: net::ERR_CONNECTION_REFUSED"
**Solution:** Backend not deployed or `VITE_API_URL` not set correctly

### Issue: "Firebase not configured"
**Solution:** Add Firebase environment variables in Vercel settings

### Issue: "404 on all routes except home"
**Solution:** Ensure `vercel.json` has proper SPA routing configuration (already done)

## Files Modified

- `vercel.json` - Simplified routing config
- `.vercelignore` - Exclude backend and server directories
- `VERCEL_SETUP.md` - This documentation file

## Next Steps

1. ✅ Configure Vercel project settings
2. ✅ Redeploy from dashboard
3. ⏳ Deploy backend to Railway/Render
4. ⏳ Update `VITE_API_URL` in Vercel
5. ⏳ Test full application workflow
