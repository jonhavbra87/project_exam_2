import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import './index.css';

import NotFound from './pages/NotFound';
import Landingpage from './pages/Landingpage';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="text-primary">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landingpage />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
