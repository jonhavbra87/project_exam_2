import './index.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import SignUp from './pages/Landingpage';
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
import Landingpage from './pages/Landingpage';
import { useAuthStore } from './store/authStore';
// import Register from './components/Register';

function App() {
  const { isAuthenticated } = useAuthStore();
  return (
    <div className="text-text-primary">
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={isAuthenticated ? <Venues /> : <Landingpage />} />
          <Route path="venues" element={<Venues />} />
          <Route path="venue/:id" element={<VenueDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="Profile" element={<Profile />} />
          <Route path="Profile/bookings" element={<Bookings />} />
          <Route path="profile/editprofile" element={<EditProfile />} />
          <Route
            path="profile/venues"
            element={<VenuesByUser />}
          />
          <Route
            path="profile/venues/create"
            element={<ProfileVenueCreate />}
          />
          <Route path='profile/venues/:id/update' element={<ProfileVenueUpdate />} />
          <Route path='profile/termsofservice' element={<TermsOfService />} />
          <Route path="profile/privacyguidelines" element={<PrivacyGuidelines />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
