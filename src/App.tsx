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
// import SessionChecker from './components/SessionChecker';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import Register from './components/Register';

function App() {
  const { checkAuth, rehydrated } = useAuthStore();

useEffect(() => {
  const checkStorage = () => {
    const stored = localStorage.getItem("auth-store");
    const state = useAuthStore.getState();
    console.log("App Debug:", {
      localStorage: stored ? JSON.parse(stored) : null,
      zustandState: {
        hasToken: !!state.accessToken,
        isAuthenticated: state.isAuthenticated
      }
    });
  };

  if (rehydrated) {
    checkStorage();
    checkAuth();
  }
}, [rehydrated, checkAuth]);

  if (!rehydrated) {
    return <p>Loading...</p>; // ⏳ Viser en loading-tekst mens Zustand laster
  }

  return (
    <div className="text-text-primary">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Venues />} />
          <Route path="venue/:id" element={<VenueDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
