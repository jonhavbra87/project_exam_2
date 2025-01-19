import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import './index.css';

import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import VenueDetails from './pages/VenueDetails';

function App() {
  return (
    <div className="text-text-primary">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="venue/:id" element={<VenueDetails />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
