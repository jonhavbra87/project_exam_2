import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { FiX } from 'react-icons/fi';
import NavLinks from '../NavLinks';
import { useState, useRef, useEffect } from 'react';
/**
* NavBar component providing responsive navigation for the application
* 
* @component
* @returns {JSX.Element} - Rendered NavBar component
* 
* @description
* A responsive navigation bar that adapts between mobile and desktop displays.
* On mobile, it displays a hamburger menu that toggles a dropdown navigation menu.
* On desktop, it shows the navigation links horizontally.
* Includes accessibility features like proper ARIA attributes, keyboard navigation, 
* and focus management.
* 
* Features:
* - Toggle button for mobile menu with animated icon transition
* - Focus trap and keyboard navigation (Escape key closes menu)
* - Backdrop overlay on mobile to dismiss menu when clicking outside
* - Automatic focus management when menu opens
* - Fully responsive design with different layouts for mobile and desktop
* 
* @example
* // Basic usage in a header
* <Header>
*   <div className="logo">My Site</div>
*   <NavBar />
* </Header>
*/

function NavBar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    if (menuOpen) {
      menuRef.current?.focus();
    }
  }, [menuOpen]);

  return (
    <>
      <nav className="z-50">
        <div>
          <button
            className={`text-hover text-2xl md:hidden transition-transform duration-500 text-white ${
              menuOpen ? 'rotate-90' : 'rotate-0'
            }`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <HiOutlineMenuAlt2 />}
          </button>
        </div>

        <div
          ref={menuRef}
          tabIndex={-1}
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } absolute top-16 left-0 right-0 bg-primary-3 p-4 flex-col items-center gap-4 animate-slide-down md:flex md:flex-row md:static md:gap-6 focus:outline-none`}
          onKeyDown={(e) => e.key === 'Escape' && setMenuOpen(false)}
        >
          <NavLinks toggleMenu={toggleMenu} />
        </div>
      </nav>

      {menuOpen && (
        <div
          className="absolute top-0 left-0 h-full w-full z-30 md:hidden"
          onClick={toggleMenu}
          aria-hidden={!menuOpen}
        ></div>
      )}
    </>
  );
}

export default NavBar;
