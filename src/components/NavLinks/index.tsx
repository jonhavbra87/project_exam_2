import { NavLink } from 'react-router-dom';

function NavLinks({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <ul className="flex flex-col mt-7 md:mt-0 md:flex-row gap-4 md:gap-6 md:items-center">
      <li>
        <NavLink
          to="/"
          className="text-white text-lg hover:text-secondary transition-colors duration-200"
          onClick={() => toggleMenu()}
        >
          Home
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
    </ul>
  );
}

export default NavLinks;
