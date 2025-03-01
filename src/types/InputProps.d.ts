/**
 * @fileoverview Input component props interface
 * @module components/Input
 */

import React from 'react';

/**
 * Interface for props used by the Input component
 *
 * @interface InputProps
 * @property {string} label - The label text for the input field
 * @property {string} [type='text'] - The HTML input type attribute
 * @property {React.ElementType} [Icon] - Optional icon component to display with the input
 * @property {boolean} [required=false] - Whether the input is required for form submission
 * @property {string} [defaultValue] - Optional default value for the input field
 *
 * @example
 * // Basic text input
 * <Input label="Username" required={true} />
 *
 * @example
 * // Password input with icon
 * import { LockIcon } from 'your-icon-library';
 *
 * <Input
 *   label="Password"
 *   type="password"
 *   Icon={LockIcon}
 *   required={true}
 * />
 *
 * @example
 * // Email input with default value
 * <Input
 *   label="Email address"
 *   type="email"
 *   defaultValue="user@example.com"
 * />
 */
export interface InputProps {
  label: string;
  type?: string;
  Icon?: React.ElementType;
  required?: boolean;
  defaultValue?: string;
}
