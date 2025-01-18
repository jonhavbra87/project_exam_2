import * as React from 'react';
import { ButtonProps } from '../../types/ButtonProps';

export const SignUpButton: React.FC<ButtonProps> = ({
  icon,
  text,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex gap-8 px-12 py-4 mt-24 max-w-full text-button-primary-desktop font-bold text-white rounded-lg border-r border-b border-solid bg-primary-3 border-b-accent border-r-accent max-md:px-5 max-md:mt-10"
    >
      {icon && (
        <img
          loading="lazy"
          src={icon}
          alt="logo"
          className="object-contain shrink-0 rounded-none aspect-square w-[22px] rounded-sm"
        />
      )}
      <span className="grow shrink my-auto w-[179px]">{text}</span>
    </button>
  );
};
