import { ChevronDown } from 'lucide-react';

/**
 * @module BouncingArrow
 * @description A component that displays an animated bouncing down arrow.
 * Uses the ChevronDown icon from lucide-react library and animation from Tailwind CSS.
 */

/**
 * BouncingArrow component displays an animated downward arrow
 * 
 * @component
 * @returns {JSX.Element} - Rendered BouncingArrow component
 * 
 * @example
 * // Basic usage
 * <BouncingArrow />
 * 
 * @example
 * // Usage in a container
 * <div className="my-8">
 *   <BouncingArrow />
 * </div>
 */
const BouncingArrow = () => {
  return (
    <div className="w-full flex justify-center animate-bounce">
      <ChevronDown
        size={48}
        className="text-primary cursor-pointer hover:opacity-60 transition-colors"
      />
    </div>
  );
};

export default BouncingArrow;
