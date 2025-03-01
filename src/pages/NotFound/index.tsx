import { BiSolidErrorAlt } from 'react-icons/bi';

/**
 * NotFound Component
 *
 * Renders a detailed 404 error page for non-existent routes
 *
 * @component
 * @returns {React.ReactElement} A comprehensive 404 error page with error icon and helpful message
 *
 * @description
 * Provides user-friendly guidance when a requested page cannot be found,
 * including:
 * - A clear error heading
 * - An error icon
 * - Detailed explanatory text
 *
 * @example
 * // Typically used in router configuration as a catch-all route
 * <Route path="*" element={<NotFound />} />
 */

function NotFound() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-h1-mobile md:text-h1-desktop font-heading font-semibold text-red-300 mb-16">
          Oops! 404 Page Not Found
        </h2>
        <BiSolidErrorAlt className="text-6xl text-red-500 mb-8" />
        <p className="text-body-large-mobile md:text-body-large-desktop font-body font-medium mb-16">
          It looks like the page you're looking for doesn’t exist or has been
          moved. Check the URL for any typos, or head back to the homepage and
          try again. If you believe this is an error, feel free to contact us.
          Don't worry, let's get you back on track!
        </p>
      </div>
    </div>
  );
}

export default NotFound;
