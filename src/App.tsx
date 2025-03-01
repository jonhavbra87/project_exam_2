/**
 * @fileoverview Main application component defining the routing structure
 * @module App
 */
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import SignUp from './pages/LandingPage';
import VenueDetails from './pages/VenueDetails';
import Venues from './pages/Venues';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Login from './components/Login';
import Bookings from './pages/Profile/Bookings';
import EditProfile from './pages/Profile/Edit';
import ProfileVenueCreate from './pages/Profile/Venues/Create';
import VenuesByUser from './pages/Profile/Venues';
import TermsOfService from './components/TermsOfService';
import PrivacyGuidelines from './components/PrivacyGuidelines';
import ProfileVenueUpdate from './pages/Profile/Venues/Update';
import { useAuthStore } from './store/authStore';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Register from './components/Register';
import Messages from './components/Messages';
/**
 * Main application component that handles routing and layout structure
 *
 * This component serves as the application's root, defining all routes and
 * their corresponding components. It renders different views based on the
 * user's authentication status and provides toast notifications for user feedback.
 *
 * The routing structure includes:
 * - Public routes for venue browsing, authentication, and general information
 * - Protected profile routes for bookings, venues, and account management
 * - Error handling with a 404 page
 *
 * @returns {JSX.Element} The rendered application with routing configuration
 */

function App() {
  const { isAuthenticated } = useAuthStore();
  return (
    <div className="text-text-primary">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={isAuthenticated ? <Venues /> : <LandingPage />}
          />
          <Route path="venues" element={<Venues />} />
          <Route path="venue/:id" element={<VenueDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="/profile/messages" element={<Messages />} />
          <Route path="Profile/bookings" element={<Bookings />} />
          <Route path="profile/editprofile" element={<EditProfile />} />
          <Route path="profile/venues" element={<VenuesByUser />} />
          <Route
            path="profile/venues/create"
            element={<ProfileVenueCreate />}
          />
          <Route
            path="profile/venues/:id/update"
            element={<ProfileVenueUpdate />}
          />
          <Route path="profile/termsofservice" element={<TermsOfService />} />
          <Route
            path="profile/privacyguidelines"
            element={<PrivacyGuidelines />}
          />
          <Route path="Contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
