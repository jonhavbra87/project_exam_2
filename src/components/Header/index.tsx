import { Link } from 'react-router-dom';
import Logo from '../../assets/holidaze_logo.svg';
import NavBar from '../NavBar';

function Header() {
  return (
    <header className="bg-primary-3 w-full flex items-center fixed h-20 z-50">
      <div className="w-11/12 lg:w-10/12  mx-auto flex justify-between items-center h-full">
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="eCom logo" className="h-14" />
          </Link>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <NavBar />
        </div>
      </div>
    </header>
  );
}

export default Header;
