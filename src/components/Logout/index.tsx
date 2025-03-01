import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
/**
 * Logout component that provides a button to log out the user
 *
 * @component
 * @returns {JSX.Element} - Rendered logout button
 *
 * @description
 * A simple button component that triggers the logout process when clicked.
 * It uses the useAuthStore hook to access the logout function and
 * navigates the user to the login page after logging out.
 *
 * @example
 * // Basic usage in a header or profile page
 * <Logout />
 *
 * @example
 * // Usage with custom wrapper
 * <div className="dropdown-menu">
 *   <Logout />
 * </div>
 */
function Logout(): JSX.Element {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  /**
   * Handles the logout action when button is clicked
   *
   * @function
   * @returns {void}
   */
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
