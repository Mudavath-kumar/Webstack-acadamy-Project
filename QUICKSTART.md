# 🎯 QUICK START - Complete Booking Platform

## ⚡ 3-Step Setup

### 1️⃣ Seed Database (One-time)
\`\`\`bash
cd backend
node seedProperties.js
\`\`\`
Creates 5 real properties + 1 host account

### 2️⃣ Start Backend
\`\`\`bash
cd backend
npm run dev
\`\`\`
Running on: http://localhost:5055

### 3️⃣ Start Frontend
\`\`\`bash
cd frontend
npm run dev
\`\`\`
Running on: http://localhost:3000

---

## ✨ What You Can Do Now

### 🏠 Browse Real Properties
- Go to **/explore**
- See 5 properties from your database
- Click any card to view full details

### 📅 Book Any Property
1. Select check-in & check-out dates
2. Choose number of guests
3. Click "Book Now"
4. Fill guest info
5. Complete checkout ✅

### 🎨 Experience Professional Design
- **Home Page**: Stats section (10M+ guests), testimonials, trending destinations
- **Property Details**: Real-time loading, image carousel, amenities
- **Checkout**: Smart validation, price breakdown, instant confirmation

---

## 🎯 Test the Complete Flow

**Full Booking Journey:**
\`\`\`
Home → Explore → Property Detail → Checkout → Confirmation
  ↓        ↓            ↓              ↓           ↓
Search  Browse 5+   See real      Fill form   View in
        listings    property      & pay       "My Trips"
\`\`\`

---

## 🚨 Troubleshooting

### "Property not found"
→ Run seed script: \`node backend/seedProperties.js\`

### "Could not load property"
→ Check backend is running on port 5055

### No properties on Explore page
→ Verify MongoDB connection in \`backend/.env\`

---

## 🎉 Success Checklist

- [ ] Backend running (check http://localhost:5055/api/v1/health)
- [ ] Frontend running (visit http://localhost:3000)
- [ ] Database seeded (5 properties created)
- [ ] Can browse properties on /explore
- [ ] Can view property details
- [ ] Can complete a booking
- [ ] Booking appears in /guest/bookings

---

## 📚 Full Documentation

See **BOOKING_SYSTEM_GUIDE.md** for:
- Detailed test cases
- Database structure
- API endpoints
- Troubleshooting guide
- Production deployment

---

**Ready to test? Start with the Home page!** 🚀
