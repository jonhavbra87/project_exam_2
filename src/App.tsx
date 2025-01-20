import './index.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import VenueDetails from './pages/VenueDetails';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="text-text-primary">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="venue/:id" element={<VenueDetails />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
