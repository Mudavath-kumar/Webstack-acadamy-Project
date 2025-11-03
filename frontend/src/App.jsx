import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import AIChatAssistant from './components/AIChatAssistant';
import AITripPlanner from './components/AITripPlanner';
import Footer from './components/Footer';
import HostRoute from './components/HostRoute';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';
import Admin from './pages/Admin';
import AmenityPage from './pages/AmenityPage';
import BecomeHost from './pages/BecomeHost';
import CategoryPage from './pages/CategoryPage';
import Checkout from './pages/CheckoutEnhanced';
import DestinationPage from './pages/DestinationPage';
import Explore from './pages/Explore';
import Home from './pages/Home';
import ListingDetail from './pages/ListingDetailEnhanced';
import Login from './pages/Login';
import MapView from './pages/MapView';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';
import Profile from './pages/ProfileEnhanced';
import PropertyTypePage from './pages/PropertyTypePage';
import Signup from './pages/Signup';
import Trips from './pages/Trips';
import Wishlists from './pages/Wishlists';

// Host Dashboard Components
import DashboardOverview from './pages/host/DashboardOverview';
import Earnings from './pages/host/Earnings';
import HostBookings from './pages/host/HostBookings';
import HostDashboard from './pages/host/HostDashboard';
import MyProperties from './pages/host/MyProperties';
import PropertyForm from './pages/host/PropertyForm';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/guest/home" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/explore" element={<PageTransition><Explore /></PageTransition>} />
        <Route path="/listing/:id" element={<PageTransition><ListingDetail /></PageTransition>} />
        <Route path="/property/:id" element={<PageTransition><ListingDetail /></PageTransition>} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <PageTransition><Checkout /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <PageTransition><Trips /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/guest/bookings"
          element={
            <ProtectedRoute>
              <PageTransition><Trips /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <PageTransition><Messages /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlists"
          element={
            <ProtectedRoute>
              <PageTransition><Wishlists /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PageTransition><Profile /></PageTransition>
            </ProtectedRoute>
          }
        />
        {/* Host Dashboard Routes - Nested */}
        <Route
          path="/host"
          element={
            <HostRoute>
              <HostDashboard />
            </HostRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="properties" element={<MyProperties />} />
          <Route path="properties/new" element={<PropertyForm />} />
          <Route path="properties/edit/:id" element={<PropertyForm />} />
          <Route path="bookings" element={<HostBookings />} />
          <Route path="earnings" element={<Earnings />} />
        </Route>

        {/* Legacy routes - redirect to new structure */}
        <Route
          path="/host-dashboard"
          element={
            <HostRoute>
              <HostDashboard />
            </HostRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
        </Route>
        <Route
          path="/become-host"
          element={
            <ProtectedRoute>
              <PageTransition><BecomeHost /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
        <Route path="/category/:category" element={<PageTransition><CategoryPage /></PageTransition>} />
        <Route path="/destination/:destination" element={<PageTransition><DestinationPage /></PageTransition>} />
        <Route path="/property/:type" element={<PageTransition><PropertyTypePage /></PageTransition>} />
        <Route path="/amenity/:amenity" element={<PageTransition><AmenityPage /></PageTransition>} />
        <Route path="/map" element={<PageTransition><MapView /></PageTransition>} />
        <Route path="/trip-planner" element={<PageTransition><AITripPlanner /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

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
          <main style={{ flex: 1, position: 'relative' }}>
            <AppRoutes />
          </main>
          <AIChatAssistant />
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
