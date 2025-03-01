import { Link } from 'react-router-dom';
import Logo from '../../assets/holidaze_logo.svg';
import NavBar from '../NavBar';
/**
 * @module Header
 * @description Site header component that displays the company logo and navigation bar.
 * The header is fixed at the top of the page and spans the full width of the viewport.
 * It contains a logo that links to the homepage and the NavBar component for site navigation.
 *
 * @component
 * @returns {JSX.Element} - Rendered Header component
 *
 * @example
 * // Basic usage at the top of a page or layout
 * <Header />
 *
 * @example
 * // Usage in a layout component
 * const MainLayout = () => {
 *   return (
 *     <div className="min-h-screen flex flex-col">
 *       <Header />
 *       <main className="flex-grow pt-20">
 *         {children}
 *       </main>
 *       <Footer />
 *     </div>
 *   );
 * }
 */

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
