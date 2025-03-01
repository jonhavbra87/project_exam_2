import { FaInstagram, FaSnapchat, FaFacebookSquare } from 'react-icons/fa';
import Logo from '../../assets/holidaze_logo.svg';
import { BsTwitterX } from 'react-icons/bs';
import { CustomInput } from '../CustomInput';
import { IoIosMail } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
/**
 * @module Footer
 * @description Website footer component that displays company branding, newsletter subscription form,
 * navigation links, copyright information, and social media links.
 * The footer is responsive and adapts its layout based on screen size.
 * 
 * @component
 * @returns {JSX.Element} - Rendered Footer component
 * 
 * @example
 * // Basic usage at the bottom of a page or layout
 * <Footer />
 * 
 * @example
 * // Usage in a layout component
 * const MainLayout = () => {
 *   return (
 *     <div className="min-h-screen flex flex-col">
 *       <Header />
 *       <main className="flex-grow">
 *         {children}
 *       </main>
 *       <Footer />
 *     </div>
 *   );
 * }
 * 
 * @functionality
 * - Displays company logo and tagline
 * - Provides a newsletter subscription form
 * - Includes navigation links to Terms, Privacy, Account, and Contact pages
 * - Displays copyright information
 * - Includes social media links with appropriate accessibility attributes
 */

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-slate-900 py-10 px-6 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logo and "Navigation" */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="Holidayz Logo" className="h-10 w-auto" />
          </div>
          <div className="text-neutral-50 text-h2-desktop font-heading mt-6">
            Let´s explore the world
            <span className="text-accent"> together</span>
          </div>
        </div>
        {/* Newsletter */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-body-large-desktop font-semibold text-white font-body">
            Join Our Newsletter
          </h3>
          <p className="text-body-medium-desktop text-neutral-700 mb-6 font-body">
            Stay ahead of the travel trends! Subscribe to our newsletter and be
            the first to discover exclusive deals, hidden getaways, and expert
            travel tips. Let’s explore the world together!
          </p>
          <form className="flex items-center w-full max-w-lg ">
            <div className='flex-grow'>
            <CustomInput
              label="User e-mail"
              type="email"
              Icon={IoIosMail}
              required
              defaultValue="" 
              />
              </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-button-primary-2 border-2 border-button-primary text-white px-3 py-3 mb-6 rounded-md hover:bg-button-hover hover:border-button-hover transition-all duration-300 focus:outline-none"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Legal Info */}
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-8 gap-8 text-text-muted border-t-2 border-text-muted ">
        <ul className="flex flex-wrap justify-center md:justify-start items-center md:items-start gap-x-4 mt-4 text-body-medium-desktop font-body">
          <li>
            <a onClick={() => navigate("/profile/termsofservice")} className="hover:text-secondary cursor-pointer transition">
              Terms
            </a>
          </li>
          <li>
            <p onClick={() => navigate("/profile/privacyguidelines")} className="hover:text-secondary cursor-pointer transition">
              Privacy
            </p>
          </li>
          <p className="text-body-large-desktop">|</p>
          <li>
            <p onClick={() => navigate("/profile")} className="hover:text-secondary cursor-pointer transition">
              My Account
            </p>
          </li>
          <li>
            <p onClick={() => navigate("/contact")} className="hover:text-secondary cursor-pointer transition">
              Contact
            </p>
          </li>
        </ul>
        <div>
          <p className="flex justify-center md:justify-end items-center mt-4 text-body-medium-desktop font-body">
            &copy; 2025 HOLIDAZE Ltd. All Rights Reserved.
          </p>
        </div>
        <div className="flex gap-4 md:text-body-large-desktop my-4 text-white justify-center md:justify-end">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-opacity-60 transition"
            aria-label="Visit our Twitter page"
          >
            <BsTwitterX />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-opacity-60 transition"
            aria-label="Visit our LinkedIn page"
          >
            <FaFacebookSquare />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-opacity-60 transition"
            aria-label="Visit our Instagram page"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.snapchat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-opacity-60 transition"
            aria-label="Visit our Snapchat page"
          >
            <FaSnapchat />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
