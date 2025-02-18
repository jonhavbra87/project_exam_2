import { FaInstagram, FaSnapchat, FaFacebookSquare } from 'react-icons/fa';
import Logo from '../../assets/holidaze_logo.svg';
import { CiMail } from 'react-icons/ci';
import { BsTwitterX } from 'react-icons/bs';

function Footer() {
  return (
    <footer className="bg-primary-3 py-10 px-6 w-full">
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
          <form className="flex items-center w-full max-w-lg bg-gray-50 rounded-md border-r border-b border-solid border-b-neutral-900 border-r-neutral-900">
            {/* Icon */}
            <CiMail className="ml-3 w-5 h-5 text-neutral-900" />

            {/* Email Input */}
            <label htmlFor="emailInput" className="sr-only">
              Enter your email
            </label>
            <input
              type="email"
              id="emailInput"
              placeholder="Enter your email"
              className="flex-grow bg-neutral-50 px-3 py-2 text-neutral-800 placeholder-neutral-800 focus:outline-none"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-button-primary text-white px-5 py-2 rounded-r-md hover:bg-button-hover focus:outline-none"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Legal Info */}
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-8 gap-8 text-neutral-700 border-t-2 border-neutral-700 ">
        <ul className="flex flex-wrap justify-center md:justify-start items-center md:items-start gap-x-4 mt-4 text-body-medium-desktop font-body">
          <li>
            <a href="#" className="hover:text-primary transition">
              Terms
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-primary transition">
              Privacy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-primary transition">
              Conditions
            </a>
          </li>
          <p className="text-body-large-desktop">|</p>
          <li>
            <a href="#" className="hover:text-primary transition">
              My Account
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-primary transition">
              Contact
            </a>
          </li>
        </ul>
        <div>
          <p className="flex justify-center md:justify-end items-center mt-4 text-body-medium-desktop font-body">
            &copy; 2025 HOLIDAZE Ltd. All Rights Reserved.
          </p>
        </div>
        <div className="flex gap-4 text-lg my-4 text-white justify-center md:justify-end">
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
