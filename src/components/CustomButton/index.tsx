import * as React from 'react';
import { ButtonProps } from '../../types/ButtonProps';

/**
 * @module CustomButton
 * @description A reusable button component with multiple style variants and icon support.
 * This component provides consistent button styling across the application while
 * allowing for different visual styles through the variant prop.
 */

/**
 * CustomButton component renders a styled button with optional icon
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.icon] - URL for the icon to display next to button text
 * @param {string} props.text - Text to display on the button
 * @param {Function} props.onClick - Event handler for button click
 * @param {('button'|'submit'|'reset')} [props.type='button'] - HTML button type attribute
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {('primary'|'secondary'|'accent')} [props.variant='primary'] - Visual style variant of the button
 * @returns {JSX.Element} - Rendered CustomButton component
 *
 * @example
 * // Primary button with text only
 * <CustomButton
 *   text="Click Me"
 *   onClick={() => console.log('Button clicked')}
 * />
 *
 * @example
 * // Secondary button with icon and custom type
 * <CustomButton
 *   text="Submit Form"
 *   icon="/icons/send.svg"
 *   type="submit"
 *   variant="secondary"
 *   onClick={handleSubmit}
 * />
 *
 * @example
 * // Disabled accent button
 * <CustomButton
 *   text="Loading..."
 *   variant="accent"
 *   disabled={true}
 *   onClick={() => {}}
 * />
 *
 * @function getButtonClasses
 * @description Returns the appropriate CSS classes based on the button variant
 * @returns {string} CSS class string for the button based on variant
 */

export const CustomButton: React.FC<ButtonProps> = ({
  icon,
  text,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
}) => {
  const getButtonClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-3 border-r-2 border-b-2 border-b-accent border-r-accent hover:bg-button-hover active:bg-accent';
      case 'secondary':
        return 'bg-secondary-3 border-r-2 border-b-2 border-b-accent border-r-accent hover:bg-button-hover active:bg-accent';
      case 'accent':
        return 'bg-accent border-r-2 border-b-2 border-b-black border-r-black hover:bg-button-hoverSecondary active:bg-accent-2';
      default:
        return 'bg-primary-3 border-r-2 border-b-2 border-b-accent border-r-accent hover:bg-button-hover active:bg-accent';
    }
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`flex w-full justify-center items-center gap-3 px-6 py-4 mt-4 text-white font-button rounded-lg transition-all duration-300 ease-in-out sm:px-8
        ${disabled ? 'bg-text-muted cursor-not-allowed' : getButtonClasses()}`}
    >
      {icon && (
        <img
          loading="lazy"
          src={icon}
          alt="icon"
          className="object-contain shrink-0 aspect-square w-6 h-6 rounded-sm"
        />
      )}
      <span className="grow shrink my-auto">{text}</span>
    </button>
  );
};
