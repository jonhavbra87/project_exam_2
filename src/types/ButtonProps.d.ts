/**
 * @fileoverview Button component props interface
 * @module components/Button
 */

/**
 * Interface for props used by the Button component
 *
 * @interface ButtonProps
 * @property {string} [icon] - Optional icon identifier to display in the button
 * @property {string} text - The text content of the button
 * @property {() => void} [onClick] - Optional click handler function
 * @property {'button' | 'submit' | 'reset'} [type='button'] - The HTML button type attribute
 * @property {boolean} [disabled=false] - Whether the button is disabled
 * @property {'primary' | 'secondary' | 'accent'} [variant='primary'] - The visual style variant of the button
 *
 * @example
 * // Primary button with text only
 * <Button text="Save Changes" onClick={handleSave} />
 *
 * @example
 * // Disabled submit button with icon
 * <Button
 *   text="Submit Form"
 *   icon="send"
 *   type="submit"
 *   disabled={!isValid}
 *   variant="accent"
 * />
 */
export interface ButtonProps {
  icon?: string;
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'accent';
}
