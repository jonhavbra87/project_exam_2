import React, { useState } from "react";
import { InputProps } from "../../types/InputProps";

export const CustomInput: React.FC<InputProps> = ({ label, type = "text", Icon, value, onChange, required }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      {/* Input Container */}
      <div className="flex items-center border border-text-primary rounded-lg px-3 py-2 mb-6 border-r-2 border-b-2 bg-background border-b-black border-r-black focus-within:ring-2 focus-within:ring-accent relative">
        
        {/* Ikon til venstre */}
        {Icon && <Icon className="text-primary text-xl mr-2" />}

        {/* Input felt */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(value.length > 0)}
          className="w-full bg-transparent focus:outline-none text-text-primary pt-2 pb-1"
        />

        {/* Label (flytter seg opp ved fokus/skrift) */}
        <label
          className={`absolute left-10 transition-all text-text-secondary ${
            isFocused || value.length > 0 ? "top-1 text-xs" : "top-3 text-sm"
          }`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};
