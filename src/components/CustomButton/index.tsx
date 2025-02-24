import * as React from 'react';
import { ButtonProps } from '../../types/ButtonProps';

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
        return 'bg-accent border-r-2 border-b-2 border-b-white border-r-white hover:bg-button-hoverSecondary active:bg-accent-2';
      default:
        return 'bg-primary-3 border-r-2 border-b-2 border-b-accent border-r-accent hover:bg-button-hover active:bg-accent';
    }
  }

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
