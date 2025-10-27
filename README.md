# 🏡 HomelyHub - Find Where You Belong

HomelyHub is a premium web platform similar to Airbnb, allowing users to discover and book unique places to stay around the world. Our platform connects travelers with hosts who offer personalized, comfortable accommodations ranging from cozy apartments to luxury villas.

![HomelyHub Banner](https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80)

## 🌟 What is HomelyHub?

HomelyHub is a web platform similar to Airbnb, allowing users to:

- **Find and book unique places to stay** - homes, villas, apartments, cabins, and more
- **Host properties** - Property owners can list their accommodations and earn money by renting them out
- **Personalized travel experiences** - Focuses on comfortable, authentic travel experiences tailored to your preferences

## 🧩 Technology Stack (Architecture)

Built using the **MERN Stack** with modern best practices:

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Database** | MongoDB | Stores user, booking, and property details |
| **Backend** | Express.js | Handles APIs, routes, and server logic |
| **Frontend** | React.js | Creates a dynamic and responsive UI |
| **Server Runtime** | Node.js | Executes backend code efficiently |
| **State Management** | Redux | Manages data flow across components |
| **API Design** | RESTful APIs | Enables scalable and secure client-server communication |

### Frontend Technologies
- **React 18** - Modern React with hooks and functional components
- **Vite** - Lightning-fast build tool and dev server
- **React Router DOM** - Client-side routing and navigation
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icon library
- **CSS Custom Properties** - Theme management and styling

**Design Principle:** Modular structure for scalability and maintainability.

## ⚙️ Core Features

### 🔐 User Authentication
- **Email/Password Auth** - Traditional authentication
- **Google OAuth** - One-click sign in with Google
- **Facebook OAuth** - Social login with Facebook  
- **GitHub OAuth** - Developer-friendly authentication
- **Firebase Integration** - Secure, scalable auth system
- **Profile Management** - Update personal information and password
- **Role-based Access** - Separate dashboards for guests and hosts
- **Session Persistence** - Stay logged in across sessions

### 🔍 Search & Filters
- **Advanced Search** - Find properties by location, dates, pricing, and amenities
- **Smart Filters** - Filter by property type, bedrooms, guests, and more
- **Category Browsing** - Explore properties by category (Beachfront, Mountain, City, etc.)
- **Destination Pages** - Discover popular destinations worldwide

### 🏠 View Listings
- **Detailed Property Pages** - High-quality photos, descriptions, and amenities
- **Interactive Image Galleries** - Browse through property images
- **Reviews & Ratings** - Read guest reviews and ratings
- **Interactive Maps** - See properties on interactive map with markers
- **Map/List Toggle** - Switch between map and list view
- **Dynamic Pricing** - Real-time price adjustments based on 7+ factors
- **Similar Properties** - AI-powered recommendations

### 🏗️ Property Management
- **Host Dashboard** - Comprehensive management interface for property owners
- **Add/Edit Listings** - Easily create and update property listings
- **Media Upload** - Include multiple images and descriptions
- **Pricing Control** - Set competitive pricing and availability
- **Booking Management** - Track reservations and earnings

### 📅 Booking System
- **Real-time Availability** - Check property availability instantly
- **Date Selection** - Choose check-in and check-out dates
- **Guest Count** - Specify number of guests
- **Instant Booking** - Get immediate confirmation
- **Dynamic Pricing** - Seasonal, demand-based, and location pricing
- **Price Breakdown** - Transparent pricing with cleaning fees and service charges
- **Length of Stay Discounts** - Up to 35% off for monthly stays

### 👤 User Profiles
- **Personal Dashboard** - Manage bookings, wishlists, and settings
- **Booking History** - View past and upcoming trips
- **Wishlists** - Save favorite properties
- **Messages** - Communicate with hosts
- **Settings** - Update preferences and account details

### 💳 Payment Integration
- **Secure Payments** - Protected payment gateway for transactions
- **Multiple Payment Methods** - Credit cards, debit cards, and digital wallets
- **Currency Support** - Prices displayed in Indian Rupees (₹)
- **Transaction History** - Track all payments and refunds

### 🤖 AI-Powered Features
- **AI Chat Assistant** - 24/7 chatbot for instant property queries
- **AI Trip Planner** - Smart itinerary generator with budget estimates
- **AI Search** - Natural language search with NLP
- **AI Recommendations** - Personalized property suggestions
- **AI Pricing** - Dynamic pricing suggestions for hosts
- **Smart Filters** - Intelligent search result filtering

### 🗺️ Map & Location
- **Interactive Property Map** - View all properties on map
- **Property Markers** - Click markers to see property details
- **Current Location** - Find properties near you
- **Zoom Controls** - Explore different areas
- **Location-Based Search** - Search by proximity
- **Distance Calculator** - Calculate distance from landmarks

## 🎨 Design Features

### Modern UI/UX
- **Dark/Light Mode** - Toggle between themes for comfortable viewing
- **Responsive Design** - Seamless experience across mobile, tablet, and desktop
- **Glass Morphism** - Modern glassmorphic design elements
- **Smooth Animations** - Framer Motion powered transitions
- **Gradient Accents** - Beautiful gradient overlays and effects

### Pages & Routes
- **Home** - Hero section, categories, trending destinations, featured listings
- **Explore** - Browse all properties with advanced filters
- **Listing Detail** - Comprehensive property information
- **Checkout** - Secure booking and payment process
- **Trips** - View upcoming and past bookings
- **Messages** - Host-guest communication
- **Wishlists** - Saved properties
- **Profile** - User settings and preferences
- **Host Dashboard** - Property management for hosts
- **Admin** - Platform administration (admin only)
- **Category Pages** - Dedicated pages for each category
- **Destination Pages** - City-specific property listings
- **Property Type Pages** - Filter by accommodation type
- **Amenity Pages** - Find properties with specific amenities

## 📊 Project Statistics

- **Total Pages:** 44+
- **Total Features:** 112+
- **Destinations:** 17+
- **Authentication Methods:** 4 (Email, Google, Facebook, GitHub)
- **AI Features:** 4 (Chat, Trip Planner, Search, Pricing)
- **Lines of Code:** 10,000+
- **Components:** 30+
- **API Endpoints:** 15+

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/homelyhub.git
cd homelyhub
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized production build will be created in the `dist` folder.

## 📁 Project Structure

```
homelyhub/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CategoryGrid.jsx
│   │   ├── ListingCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Explore.jsx
│   │   ├── ListingDetail.jsx
│   │   ├── Checkout.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── DestinationPage.jsx
│   │   ├── PropertyTypePage.jsx
│   │   ├── AmenityPage.jsx
│   │   └── ...
│   ├── context/            # React Context for state management
│   │   └── ThemeContext.jsx
│   ├── styles/             # Global styles
│   │   └── globals.css
│   ├── App.jsx             # Main app component with routing
│   └── index.jsx           # Entry point
├── public/                 # Static assets
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🎯 Key Highlights

### Category Pages
- **Beachfront** - Ocean-view properties
- **Cabins** - Cozy woodland retreats
- **Mountain** - Alpine getaways
- **Luxury** - High-end accommodations
- **Ski-in/out** - Slope-side properties
- **City** - Urban apartments and lofts
- **Countryside** - Rural escapes
- **Camping** - Outdoor experiences

### Destination Pages
- **Paris, France** - The City of Light
- **Tokyo, Japan** - Modern meets traditional
- **New York, USA** - The city that never sleeps
- **Bali, Indonesia** - Tropical paradise
- **London, UK** - Historic charm
- **Dubai, UAE** - Luxury and innovation

### Property Types
- **Houses** - Entire homes with privacy
- **Apartments** - Modern city living
- **Villas** - Luxurious properties with pools
- **Cabins** - Nature retreats
- **Condos** - Resort-style amenities
- **Boutique Hotels** - Unique experiences

### Amenity Filters
- **Pools** - Properties with swimming pools
- **Pet-Friendly** - Bring your furry friends
- **Waterfront** - Beach, lake, or riverside
- **Unique Stays** - One-of-a-kind accommodations
- **Amazing Views** - Scenic vistas
- **Accessible** - Wheelchair-accessible properties

## 💰 Currency

All prices are displayed in **Indian Rupees (₹)** throughout the platform.

## 🛠️ Development Tools

- **Vite** - Fast development server with HMR
- **ESLint** - Code quality and consistency
- **Git** - Version control

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🌈 Color Themes

### Light Mode
- Primary: #FF385C (Airbnb Red)
- Background: #FFFFFF
- Text: #222222

### Dark Mode
- Primary: #FF385C
- Background: #0F0F0F
- Text: #F5F5F5

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ by the HomelyHub development team.

## 📞 Contact & Support

For support, feedback, or inquiries, please reach out to our team.

---

**HomelyHub** - Your home away from home 🏡✨
