import Logo from '../../assets/holidaze_logo.svg';

function Header() {
  return (
    <header className="bg-primary-3 w-full flex items-center fixed h-20">
      <div className="container mx-auto flex justify-between items-center h-full">
        <img src={Logo} alt="eCom logo" className="h-14" />

        <nav className="hidden md:flex space-x-8">
          <a
            href="#"
            className="text-white text-menu-desktop hover:text-accent-link transition"
          >
            Home
          </a>
          <a
            href="#"
            className="text-white text-menu-desktop hover:text-accent-link transition"
          >
            Venues
          </a>
          <a
            href="#"
            className="text-white text-menu-desktop hover:text-accent-link transition"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-white text-menu-desktop hover:text-accent-link transition"
          >
            Profile
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
