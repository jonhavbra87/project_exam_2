import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
/**
 * NavLinks component providing conditional navigation links
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.toggleMenu - Function to toggle the mobile menu state
 * @returns {JSX.Element} - Rendered NavLinks component
 *
 * @description
 * Renders a list of navigation links that change based on the user's authentication status.
 * Uses the useAuthStore hook to determine if a user is logged in.
 * When user is authenticated (profile exists), displays:
 *   - Venues link
 *   - Contact link
 *   - Profile link
 * When user is not authenticated, displays:
 *   - Login link
 *   - Register link
 *
 * Designed to work within a responsive navigation system, with different styling for
 * mobile (column layout) and desktop (row layout) views. Each link closes the mobile
 * menu when clicked through the toggleMenu callback.
 *
 * @example
 * // Usage within NavBar component
 * <NavLinks toggleMenu={() => setMenuOpen(false)} />
 */

function NavLinks({ toggleMenu }: { toggleMenu: () => void }): JSX.Element {
  const { profile } = useAuthStore();
  return (
    <ul className="flex flex-col mt-7 md:mt-0 md:flex-row gap-4 md:gap-6 md:items-center">
      {profile ? (
        <>
          <li>
            <NavLink
              to="/"
              className="text-white text-lg hover:text-secondary transition-colors duration-200"
              onClick={() => toggleMenu()}
            >
              Venues
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="text-white text-lg hover:text-secondary transition-colors duration-200"
              onClick={() => toggleMenu()}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/"
              className="text-white text-lg hover:text-secondary transition-colors duration-200"
              onClick={() => toggleMenu()}
            >
              Profile
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/login"
              className="text-white text-lg hover:text-secondary transition-colors duration-200"
              onClick={() => toggleMenu()}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className="text-white text-lg hover:text-secondary transition-colors duration-200"
              onClick={() => toggleMenu()}
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default NavLinks;
