/**
 * @fileoverview Authentication store for managing user session state
 * @module store/authStore
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile } from '../types/Profile';

/**
 * Type definition for the authentication state
 * 
 * @typedef {Object} AuthState
 * @property {Profile|null} profile - The user's profile information or null if not logged in
 * @property {string|null} accessToken - The authentication token or null if not logged in
 * @property {boolean} isAuthenticated - Whether the user is currently authenticated
 * @property {boolean} venueManager - Whether the user has venue manager privileges
 * @property {function(profile: Profile, accessToken: string, venueManager: boolean): void} login - Function to set authentication state
 * @property {function(): void} logout - Function to clear authentication state
 * @property {function(venueManager: boolean): void} setVenueManager - Function to update venue manager status
 */
type AuthState = {
  profile: Profile | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  venueManager: boolean;
  login: (profile: Profile, accessToken: string, venueManager: boolean) => void;
  logout: () => void;
  setVenueManager: (venueManager: boolean) => void;
};
/**
 * Zustand store for authentication state management with persistence
 * 
 * This store manages user authentication state and provides methods for
 * logging in, logging out, and updating venue manager status. State is
 * persisted across page refreshes using local storage.
 * 
 * @example
 * // Login a user
 * const { login } = useAuthStore();
 * login(userProfile, token, isVenueManager);
 * 
 * @example
 * // Access authentication state
 * const { isAuthenticated, profile, venueManager } = useAuthStore();
 * 
 * @example
 * // Logout a user
 * const { logout } = useAuthStore();
 * logout();
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      accessToken: null,
      isAuthenticated: false,
      venueManager: false,
      /**
       * Sets authentication state when a user logs in
       * 
       * @function login
       * @param {Profile} profile - The user's profile information
       * @param {string} accessToken - The authentication token
       * @param {boolean} venueManager - Whether the user has venue manager privileges
       */
      login: (profile: Profile, accessToken: string, venueManager: boolean) => {
        set({
          profile,
          accessToken,
          isAuthenticated: true,
          venueManager: !!venueManager,
        });
      },
      /**
       * Updates the user's venue manager status
       * 
       * @function setVenueManager
       * @param {boolean} venueManager - Whether the user has venue manager privileges
       */
      setVenueManager: (venueManager: boolean) => {
        set({ venueManager: !!venueManager });
      },
      /**
       * Clears authentication state when a user logs out
       * 
       * @function logout
       */
      logout: () => {
        set({ profile: null, accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-store', // Storage key for persisted state
    }
  )
);
