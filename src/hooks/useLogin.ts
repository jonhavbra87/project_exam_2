/**
 * @fileoverview API hook for handling user authentication
 * @module hooks/useLogin
 */

import { useState } from 'react';
import { API_AUTH, API_KEY, API_LOGIN, BASE_API_URL } from '../api/apiConfig';
import { Profile } from '../types/Profile';
import { useAuthStore } from '../store/authStore';

/**
 * Custom hook for handling user login functionality
 * 
 * @returns {Object} Login hook methods and state
 * @returns {function(email: string, password: string): Promise<Profile|null>} .login - Function to authenticate a user
 * @returns {boolean} .loading - Indicates if login operation is in progress
 * @returns {string|null} .error - Error message if login failed, null otherwise
 * 
 * @example
 * const { login, loading, error } = useLogin();
 * 
 * // Handle form submission
 * const handleSubmit = async (e) => {
 *   e.preventDefault();
 *   const profile = await login(email, password);
 *   if (profile) {
 *     // Login successful, redirect or update UI
 *   }
 * };
 */
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: loginAuth } = useAuthStore();

    /**
   * Authenticates a user with email and password
   * 
   * @async
   * @param {string} email - The user's email address
   * @param {string} password - The user's password
   * @returns {Promise<Profile|null>} The user profile if login successful, null otherwise
   * @throws {Error} If the network request fails
   */
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_API_URL}${API_AUTH}${API_LOGIN}?_holidaze=true`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Noroff-API-Key': API_KEY,
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.data) {
        console.error("❌ API error:", result.message || "Unexpected response format");
        return null;
      }

      const profile: Profile = {
        name: result.data.name,
        email: result.data.email,
        avatar: { url: result.data.avatar.url, alt: result.data.avatar.alt },
        banner: { url: result.data.banner.url, alt: result.data.banner.alt },
      };

      const accessToken = result.data.accessToken;

      const venueManager = Boolean(result.data.venueManager);

      loginAuth(profile, accessToken, venueManager);

      return profile;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      console.error('❌ Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading, error };
};

export default useLogin;
