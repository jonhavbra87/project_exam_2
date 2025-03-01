import { useState, forwardRef } from "react";
import { InputProps } from "../../types/InputProps";
/**
 * @module CustomInput
 * @description A reusable input component with floating label animation and icon support.
 * This component uses forwardRef to allow parent components to access the input element directly.
 * The label transitions between positions based on focus and input value state.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the input field
 * @param {string} [props.type="text"] - HTML input type attribute
 * @param {React.ComponentType} [props.Icon] - Optional icon component to display before input
 * @param {boolean} [props.required] - Whether the input is required
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref to access the input element
 * @param {Object} rest - Additional HTML input attributes passed via spread
 * @param {string} [rest.defaultValue] - Default value for the input (uncontrolled)
 * @param {string} [rest.value] - Value for the input (controlled)
 * @param {Function} [rest.onChange] - Event handler for input changes
 * @param {string} [rest.placeholder] - Input placeholder text
 * @param {string} [rest.name] - Input name attribute
 * @returns {JSX.Element} - Rendered CustomInput component
 * 
 * @example
 * // Basic text input with label
 * <CustomInput 
 *   label="Username" 
 *   name="username"
 *   required={true}
 * />
 * 
 * @example
 * // Password input with icon and ref
 * import { LockIcon } from 'your-icon-library';
 * 
 * const MyForm = () => {
 *   const passwordRef = useRef(null);
 *   
 *   return (
 *     <CustomInput 
 *       label="Password"
 *       type="password"
 *       Icon={LockIcon}
 *       ref={passwordRef}
 *       name="password"
 *     />
 *   );
 * }
 * 
 * @example
 * // Email input with default value
 * <CustomInput 
 *   label="Email" 
 *   type="email"
 *   defaultValue="user@example.com"
 *   name="email"
 * />
 */



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