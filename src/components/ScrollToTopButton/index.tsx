import { ArrowUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
/**
 *  @module ScrollToTopButton
 * @description A button component that scrolls the page to the top when clicked.
 * Uses the ArrowUpIcon from lucide-react library and Tailwind CSS for styling.
 *
 */

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Toggle visibility based on scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 2000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup listener
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-4 right-4 z-50 bg-primary text-white p-2 rounded-full transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={scrollToTop}
    >
      <ArrowUpIcon className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;
