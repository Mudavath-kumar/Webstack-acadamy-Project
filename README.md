# 🏡 HomelyHub - Premium Home Rental Platform

A beautiful, feature-rich home rental web application built with React, inspired by Airbnb with modern aesthetics from Notion and Apple.

## ✨ Features

### 🎨 Design & UX
- **Modern UI/UX**: Clean, minimal design with vibrant gradients and smooth animations
- **Dark/Light Mode**: Seamless theme switching with smooth transitions
- **Responsive Design**: Fully responsive from mobile to desktop
- **Glass Morphism**: Elegant frosted glass panels and cards
- **Smooth Animations**: Powered by Framer Motion with parallax effects

### 🏠 Core Features
- **Hero Section**: Stunning landing page with animated background and search
- **Property Listings**: Browse properties with advanced filters
- **Listing Details**: Comprehensive property pages with image galleries
- **Booking System**: Complete checkout flow with payment forms
- **Trips Management**: View upcoming and past bookings
- **Messaging**: Real-time-style chat interface for hosts and guests
- **Wishlists**: Save favorite properties
- **User Profiles**: Manage account settings and preferences
- **Host Dashboard**: Property management and analytics
- **Admin Panel**: Platform statistics and management

### 🎯 Pages
- **Home** - Hero, categories, trending destinations, featured listings
- **Explore** - Advanced filtering, property grid
- **Listing Detail** - Gallery, booking panel, reviews, host info
- **Checkout** - Booking summary and secure payment form
- **Trips** - Upcoming and past bookings
- **Messages** - Chat interface
- **Wishlists** - Saved properties
- **Profile** - User settings and preferences
- **Host Dashboard** - Listings management and stats
- **Admin** - Platform analytics
- **404** - Animated error page

## 🛠️ Tech Stack

- **React** (JavaScript only)
- **React Router DOM** - Navigation
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Vite** - Build tool
- **Custom CSS** - Styling with gradients, shadows, and effects

## 🎨 Design System

### Colors
- **Primary**: `#FF385C` (Accent Pink)
- **Secondary**: `#4F46E5` (Indigo)
- **Gradients**: Sunset, Ocean, Paradise, Aurora, Warm

### Typography
- **Display Font**: Poppins
- **Body Font**: Inter

### Features
- Glass morphism effects
- Smooth transitions (300-500ms)
- Custom scrollbar
- Skeleton loaders
- Hover animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd homelyhub
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## 📁 Project Structure

\`\`\`
homelyhub-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CategoryGrid.jsx
│   │   ├── ListingCard.jsx
│   │   ├── ReviewCard.jsx
│   │   ├── HostCard.jsx
│   │   ├── CTASection.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── MotionWrapper.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Explore.jsx
│   │   ├── ListingDetail.jsx
│   │   ├── Checkout.jsx
│   │   ├── Trips.jsx
│   │   ├── Messages.jsx
│   │   ├── Wishlists.jsx
│   │   ├── Profile.jsx
│   │   ├── HostDashboard.jsx
│   │   ├── Admin.jsx
│   │   └── NotFound.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── index.jsx
├── package.json
├── vite.config.js
└── README.md
\`\`\`

## 🎭 Key Components

### Theme Context
Manages dark/light mode switching with localStorage persistence.

### Motion Wrapper
Reusable component for scroll-triggered animations.

### Listing Card
Beautiful property card with hover effects and wishlist functionality.

### Hero Section
Animated landing section with gradient backgrounds and floating elements.

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `src/styles/globals.css`:

\`\`\`css
:root {
  --primary: #FF385C;
  --secondary: #4F46E5;
  /* Add more custom colors */
}
\`\`\`

### Adding New Gradients
\`\`\`css
--gradient-custom: linear-gradient(135deg, #COLOR1 0%, #COLOR2 100%);
\`\`\`

## 🌟 Features Highlights

### Animations
- Fade-in on scroll
- Hover lift effects
- Smooth page transitions
- Parallax backgrounds
- Loading skeletons

### Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop layouts
- Flexible grid systems

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators

## 📝 Future Enhancements

- [ ] Backend integration
- [ ] Real-time messaging
- [ ] Payment gateway integration
- [ ] Map integration
- [ ] Review system
- [ ] Multi-language support
- [ ] PWA capabilities

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from Airbnb, Notion, and Apple
- Icons by Lucide
- Fonts by Google Fonts
- Images from Unsplash

---

Built with ❤️ using React and Framer Motion
