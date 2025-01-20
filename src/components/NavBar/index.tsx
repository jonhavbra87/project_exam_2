import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { FiX } from 'react-icons/fi';
import NavLinks from '../NavLinks';
import { useState, useRef, useEffect } from 'react';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  // Fokusstyring og Escape-tast for å lukke menyen
  useEffect(() => {
    if (menuOpen) {
      menuRef.current?.focus();
    }
  }, [menuOpen]);

  return (
    <>
      <nav className="z-50">
        {/* Hamburger/lukk-knapp */}
        <div>
          <button
            className={`text-hover text-2xl md:hidden transition-transform duration-500 text-neutralSecondary ${
              menuOpen ? 'rotate-90' : 'rotate-0'
            }`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <HiOutlineMenuAlt2 />}
          </button>
        </div>

        {/* Menyen */}
        <div
          ref={menuRef}
          tabIndex={-1}
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } absolute top-16 left-0 right-0 bg-primary p-4 flex-col items-center gap-4 animate-slide-down md:flex md:flex-row md:static md:gap-6 focus:outline-none`}
          onKeyDown={(e) => e.key === 'Escape' && setMenuOpen(false)}
        >
          <NavLinks toggleMenu={toggleMenu} />
        </div>
      </nav>

      {/* Overlay */}
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
