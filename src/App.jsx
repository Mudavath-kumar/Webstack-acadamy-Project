import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: '500',
              boxShadow: 'var(--shadow-lg)',
            },
            success: {
              iconTheme: {
                primary: 'var(--primary)',
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: 'white',
              },
            },
          }}
        />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/wishlists" element={<ProtectedRoute><Wishlists /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/host-dashboard" element={<ProtectedRoute><HostDashboard /></ProtectedRoute>} />
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
