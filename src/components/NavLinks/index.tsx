import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

function NavLinks({ toggleMenu }: { toggleMenu: () => void }) {
  const { profile } = useAuthStore();
  return (
    <ul className="flex flex-col mt-7 md:mt-0 md:flex-row gap-4 md:gap-6 md:items-center">
      // If user is logged in, show profile, venue and logout links. if not show login and register links

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
