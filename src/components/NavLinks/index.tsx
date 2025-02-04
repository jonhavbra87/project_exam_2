import { NavLink } from 'react-router-dom';

function NavLinks({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <ul className="flex flex-col mt-7 md:mt-0 md:flex-row gap-4 md:gap-6 md:items-center">
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
          to="/contact/"
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
    </ul>
  );
}

export default NavLinks;
