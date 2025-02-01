import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white bg-red-500 px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}

export default Logout;
