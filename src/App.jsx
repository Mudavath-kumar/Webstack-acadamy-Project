import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ListingDetail from './pages/ListingDetail';
import Checkout from './pages/Checkout';
import Trips from './pages/Trips';
import Messages from './pages/Messages';
import Wishlists from './pages/Wishlists';
import Profile from './pages/Profile';
import HostDashboard from './pages/HostDashboard';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import CategoryPage from './pages/CategoryPage';
import DestinationPage from './pages/DestinationPage';
import PropertyTypePage from './pages/PropertyTypePage';
import AmenityPage from './pages/AmenityPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/wishlists" element={<Wishlists />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/host-dashboard" element={<HostDashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/destination/:destination" element={<DestinationPage />} />
              <Route path="/property/:type" element={<PropertyTypePage />} />
              <Route path="/amenity/:amenity" element={<AmenityPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
