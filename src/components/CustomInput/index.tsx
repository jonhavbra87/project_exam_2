import { useState, forwardRef } from "react";
import { InputProps } from "../../types/InputProps";

export const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", Icon, required, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
    return (
      <div className="relative w-full">
        <div className="flex items-center border border-text-primary rounded-lg px-3 py-2 mb-6 border-r-2 border-b-2 bg-background border-b-black border-r-black focus-within:ring-2 focus-within:ring-accent relative">
          {Icon && <Icon className="text-primary text-xl mr-2" />}

          <input
            id={inputId} //conects label to input
            type={type}
            required={required}
            {...rest} 
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => setIsFocused(!!e.target.value || !!rest.defaultValue)} //if there is a value or default value, keep the label on top
            className="w-full bg-transparent focus:outline-none text-text-primary pt-2 pb-1"
            aria-labelledby={inputId} 
          />

          <label
            htmlFor={inputId} 
            className={`absolute left-10 transition-all text-text-secondary ${
              isFocused || !!rest.defaultValue ? "top-1 text-xs" : "top-3 text-sm"
            }`}
          >
            {label}
          </label>
        </div>
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput"; //when using forwardRef, it is important to give the component a name