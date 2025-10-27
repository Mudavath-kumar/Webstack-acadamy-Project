# 🔑 API Keys & Environment Setup Guide

## 📋 What You Need From Your Side

Good news! **The app works RIGHT NOW without any API keys!** 🎉

However, to unlock the **full features**, here's what you can optionally provide:

---

## ✅ Currently Working (No Keys Required)

These features work **immediately** without any setup:
- ✅ Full UI/UX with all pages
- ✅ Property browsing and search
- ✅ Category and destination pages
- ✅ User profile management (with Redux state)
- ✅ Host dashboard
- ✅ Booking flow (frontend)
- ✅ Dynamic pricing calculations
- ✅ AI Chat Assistant (basic responses)
- ✅ AI Trip Planner (algorithm-based)
- ✅ AI Search (NLP parsing)
- ✅ Dark/Light theme
- ✅ Responsive design

---

## 🔑 Optional API Keys (For Full Features)

### 1. 🔥 Firebase Authentication (OAuth Login)

**Current Status:** App works, but OAuth buttons show "not configured" message

**What You Get:**
- Google Sign-In ✨
- Facebook Sign-In ✨
- GitHub Sign-In ✨
- Email/Password Auth
- Session persistence
- User profile sync

**How to Set Up:**

#### Step 1: Create Firebase Project
```bash
1. Go to: https://console.firebase.google.com/
2. Click "Add Project" or "Create a project"
3. Enter project name: "HomelyHub" (or any name)
4. Disable Google Analytics (optional)
5. Click "Create Project"
```

#### Step 2: Enable Authentication
```bash
1. In Firebase Console, click "Authentication"
2. Click "Get Started"
3. Go to "Sign-in method" tab
4. Enable these providers:
   ✅ Email/Password
   ✅ Google
   ✅ Facebook (requires Facebook App ID)
   ✅ GitHub (requires GitHub OAuth App)
```

#### Step 3: Get Firebase Config
```bash
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click "</>" (Web) icon
4. Register app name: "HomelyHub Web"
5. Copy the firebaseConfig object
```

#### Step 4: Create .env File
```bash
# In your project root, create a file named: .env
# Copy from .env.firebase.example and fill in your values:

VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Step 5: Restart Dev Server
```bash
# Stop the server (Ctrl+C) and restart:
npm run dev
```

**Cost:** FREE (Firebase Spark Plan)
- 10,000 authentications/month free
- Perfect for development and small apps

---

### 2. 🗺️ Google Maps API (Interactive Maps)

**Current Status:** Map shows placeholder - works but no real map tiles

**What You Get:**
- Real interactive Google Maps
- Actual street views
- Satellite imagery
- Better performance
- More accurate markers

**How to Set Up:**

#### Step 1: Get Google Maps API Key
```bash
1. Go to: https://console.cloud.google.com/
2. Create new project or select existing
3. Go to "APIs & Services" > "Library"
4. Search "Maps JavaScript API"
5. Click "Enable"
6. Go to "Credentials"
7. Click "Create Credentials" > "API Key"
8. Copy your API key
```

#### Step 2: Add to .env File
```bash
# Add this line to your .env file:
VITE_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

#### Step 3: Restart Server
```bash
npm run dev
```

**Cost:** FREE with limits
- $200/month free credit
- ~28,000 map loads free per month

---

### 3. 🗺️ Mapbox API (Alternative to Google Maps)

**Current Status:** Map works with basic tiles

**What You Get:**
- Beautiful custom map styles
- 3D terrain
- Better performance
- More customization

**How to Set Up:**

#### Step 1: Get Mapbox Token
```bash
1. Go to: https://www.mapbox.com/
2. Sign up for free account
3. Go to: https://account.mapbox.com/
4. Copy your "Default public token"
```

#### Step 2: Add to .env File
```bash
# Add this line to your .env file:
VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1XXXXXXXXXXXXXXXXXXXXXXX
```

#### Step 3: Restart Server
```bash
npm run dev
```

**Cost:** FREE with generous limits
- 50,000 free map loads per month
- Better free tier than Google Maps

---

### 4. 🤖 OpenAI API (Enhanced AI Features)

**Current Status:** AI works with algorithms, but responses are template-based

**What You Get:**
- Real GPT-4 powered chat
- Better trip planning
- Smarter recommendations
- Natural conversations
- More accurate pricing suggestions

**How to Set Up:**

#### Step 1: Get OpenAI API Key
```bash
1. Go to: https://platform.openai.com/
2. Sign up or log in
3. Go to: https://platform.openai.com/api-keys
4. Click "Create new secret key"
5. Copy the key (starts with sk-...)
```

#### Step 2: Add to .env File
```bash
# Add this line to your .env file:
VITE_OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

#### Step 3: Update AI Components (I can do this for you)
Just let me know when you have the key!

**Cost:** Pay-as-you-go
- GPT-3.5-turbo: ~$0.002 per request
- GPT-4: ~$0.03 per request
- You get $5 free credit to start

---

### 5. 🤖 Claude API (Alternative to OpenAI)

**Current Status:** Not integrated yet

**What You Get:**
- Anthropic's Claude AI
- Often more accurate than GPT
- Better at following instructions
- Longer context window

**How to Set Up:**

#### Step 1: Get Claude API Key
```bash
1. Go to: https://console.anthropic.com/
2. Sign up for access
3. Get your API key
4. Add to .env file
```

#### Step 2: Add to .env File
```bash
VITE_ANTHROPIC_API_KEY=sk-ant-XXXXXXXXXXXXXXXXXXXX
```

**Cost:** Pay-as-you-go
- Similar pricing to OpenAI
- Free credits available

---

### 6. 💳 Stripe API (Payment Processing)

**Current Status:** Not integrated yet (ready for integration)

**What You Get:**
- Real payment processing
- Credit card payments
- Secure checkout
- Refund handling
- Payment history

**How to Set Up:**

#### Step 1: Get Stripe Keys
```bash
1. Go to: https://dashboard.stripe.com/
2. Sign up for free account
3. Go to Developers > API keys
4. Copy "Publishable key" and "Secret key"
```

#### Step 2: Add to .env File
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXX
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXX
```

**Cost:** FREE to start
- No monthly fees
- Only pay per transaction: 2.9% + $0.30

---

### 7. 💳 Razorpay API (Payment for India)

**Current Status:** Not integrated yet

**What You Get:**
- Payment gateway for India
- UPI, cards, wallets
- Better for Indian users
- Lower fees for INR

**How to Set Up:**

#### Step 1: Get Razorpay Keys
```bash
1. Go to: https://dashboard.razorpay.com/
2. Sign up with business details
3. Go to Settings > API Keys
4. Generate keys
```

#### Step 2: Add to .env File
```bash
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXX
```

**Cost:** FREE to start
- 2% transaction fee (lower than Stripe)

---

## 📝 Complete .env File Template

```bash
# Create this file in your project root as: .env

# ========================================
# FIREBASE (OAuth Login)
# ========================================
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# ========================================
# MAPS (Choose one or both)
# ========================================
VITE_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXX
VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1XXXXXXXXXXXXXXX

# ========================================
# AI (Choose one)
# ========================================
VITE_OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXX
# OR
VITE_ANTHROPIC_API_KEY=sk-ant-XXXXXXXXXXXXXXX

# ========================================
# PAYMENT (Choose one)
# ========================================
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXX
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXX
# OR
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXX

# ========================================
# OTHER (Optional)
# ========================================
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

---

## 🎯 Recommended Setup Priority

### For MVP (Minimum Viable Product):
**Priority 1 - Must Have:**
- ✅ Nothing! App works without any keys

**Priority 2 - Nice to Have:**
1. 🔥 **Firebase** (OAuth login) - FREE, easy setup
2. 🗺️ **Mapbox** (Better maps) - FREE tier is generous

**Priority 3 - For Production:**
3. 🤖 **OpenAI** (Better AI) - Paid but cheap
4. 💳 **Stripe/Razorpay** (Payments) - Only pay per transaction

---

## ⚡ Quick Start (Without Any Keys)

**You can use the app RIGHT NOW:**

```bash
# Just run:
npm run dev

# Open browser:
http://localhost:3000

# Everything works except:
# - OAuth login (shows message)
# - Real map tiles (shows basic map)
# - Advanced AI (uses algorithms)
```

---

## 🚀 Quick Start (With Firebase Only)

**Best option to start with:**

```bash
# 1. Create Firebase project (5 minutes)
https://console.firebase.google.com/

# 2. Copy config and create .env file

# 3. Restart server
npm run dev

# Now you have:
✅ Google/Facebook/GitHub login
✅ User authentication
✅ Session persistence
✅ All other features still work
```

---

## 💰 Cost Summary

| Service | Free Tier | Paid Plan | Recommended |
|---------|-----------|-----------|-------------|
| **Firebase Auth** | 10K users/month | $0.055/user after | ⭐⭐⭐⭐⭐ |
| **Mapbox** | 50K loads/month | $5 per 1K after | ⭐⭐⭐⭐⭐ |
| **Google Maps** | $200 credit/month | Pay per use | ⭐⭐⭐⭐ |
| **OpenAI** | $5 credit | ~$0.002/request | ⭐⭐⭐⭐ |
| **Claude** | Free trial | ~$0.002/request | ⭐⭐⭐ |
| **Stripe** | No fees | 2.9% + $0.30 | ⭐⭐⭐⭐⭐ |
| **Razorpay** | No fees | 2% per txn | ⭐⭐⭐⭐ (India) |

---

## 🎯 My Recommendations

### For Development/Testing:
```
1. Start with NO keys - app works fine!
2. Add Firebase when you want to test OAuth
3. That's it! You're good to go.
```

### For Production/Real Users:
```
1. Firebase (FREE) - For authentication
2. Mapbox (FREE tier) - For maps
3. OpenAI ($10-20/month) - For better AI
4. Stripe/Razorpay (Pay per txn) - For payments
```

**Total Monthly Cost for Small App:**
- **$0** for first 1000 users with basic features
- **~$20-30/month** for 1000 users with ALL premium features

---

## ❓ FAQ

**Q: Do I need ALL these keys?**
A: NO! The app works without ANY keys. Add them only when you need those specific features.

**Q: Which ones should I get first?**
A: Start with Firebase (free & easy). Then add Mapbox. AI and Payment can wait.

**Q: Are these services safe?**
A: YES! All are industry-standard, used by millions of apps worldwide.

**Q: How long does setup take?**
A: Firebase: 5-10 minutes. Maps: 5 minutes. AI: 2 minutes. Total: ~20 minutes max.

**Q: Can I use the app without any API keys?**
A: ABSOLUTELY! The app is fully functional right now. API keys just add extra features.

**Q: What if I make a mistake with the keys?**
A: No worries! The app won't crash. It'll just show "not configured" messages for those features.

---

## 🆘 Need Help?

**If you want to set up any of these, just tell me:**
- "Set up Firebase" - I'll guide you step-by-step
- "Add Mapbox integration" - I'll implement it
- "Connect OpenAI API" - I'll update the code
- "Help me with payment gateway" - I'll integrate it

**You can also:**
- Skip ALL of them and use the app as-is ✅
- Add them later when needed ✅
- Mix and match based on budget ✅

---

## ✅ Summary

**What you NEED:** Nothing! App works now.

**What's RECOMMENDED for best experience:**
1. Firebase (FREE) - 10 minutes setup
2. Mapbox (FREE) - 5 minutes setup

**What's OPTIONAL for premium features:**
3. OpenAI (Paid) - Better AI
4. Stripe/Razorpay (Paid per transaction) - Real payments

**Total Time to Setup Recommended:** ~15 minutes
**Total Cost for Recommended:** $0/month

---

**Ready to use HomelyHub? Just run `npm run dev` and go! 🚀**

**Want to add features? Let me know which API you want to set up first! 🔑**
