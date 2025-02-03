import './index.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import VenueDetails from './pages/VenueDetails';
import Venues from './pages/Venues';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Login from './components/Login';
import Bookings from './pages/Profile/Bookings';
// import Register from './components/Register';

function App() {
  return (
    <div className="text-text-primary">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Venues />} />
          <Route path="venue/:id" element={<VenueDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="Profile" element={<Profile />} />
          <Route path="Profile/bookings" element={<Bookings />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
