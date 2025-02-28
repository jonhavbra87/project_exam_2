/**
 * @fileoverview Custom hook for displaying toast notifications
 * @module hooks/useToastNotification
 */
import { toast } from 'react-toastify';

/**
 * Custom hook that provides simplified access to toast notification functions
 * 
 * @returns {Object} Toast notification methods
 * @returns {function(message: string): void} .success - Displays a success toast notification
 * @returns {function(message: string): void} .error - Displays an error toast notification
 * @returns {function(message: string): void} .info - Displays an info toast notification
 * @returns {function(message: string): void} .warning - Displays a warning toast notification
 * 
 * @example
 * const notify = useToastNotification();
 * 
 * // Display a success notification
 * notify.success('Profile updated successfully!');
 * 
 * // Display an error notification
 * notify.error('Failed to save changes');
 * 
 * // Display an info notification
 * notify.info('Your session will expire in 5 minutes');
 * 
 * // Display a warning notification
 * notify.warning('This action cannot be undone');
 */

const useToastNotification = () => {
  return {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    info: (message: string) => toast.info(message),
    warning: (message: string) => toast.warning(message),
  };
};

export default useToastNotification;
