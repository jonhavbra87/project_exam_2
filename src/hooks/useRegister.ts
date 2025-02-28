/**
 * @fileoverview API hook for user registration functionality
 * @module hooks/useRegister
 */

import { useState } from "react";
import { API_AUTH, API_KEY, API_REGISTER, BASE_API_URL } from "../api/apiConfig";
import useLogin from "./useLogin";
import toast from "react-hot-toast";

/**
 * Custom hook for handling user registration
 * 
 * @returns {Object} Registration hook methods and state
 * @returns {function(name: string, email: string, password: string, venueManager: boolean, avatarUrl?: string, bannerUrl?: string): Promise<Profile|null>} .register - Function to register a new user
 * @returns {boolean} .loading - Indicates if registration operation is in progress
 * @returns {string|null} .error - Error message if registration failed, null otherwise
 * 
 * @example
 * const { register, loading, error } = useRegister();
 * 
 * // Handle registration form submission
 * const handleSubmit = async (e) => {
 *   e.preventDefault();
 *   const user = await register(name, email, password, isVenueManager);
 *   if (user) {
 *     // Registration and automatic login successful
 *     navigate('/dashboard');
 *   }
 * };
 */

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useLogin();

    /**
   * Registers a new user and automatically logs them in
   * 
   * @async
   * @param {string} name - The user's display name
   * @param {string} email - The user's email address
   * @param {string} password - The user's password
   * @param {boolean} venueManager - Whether the user should have venue manager privileges
   * @param {string} [avatarUrl=""] - Optional URL for the user's avatar image
   * @param {string} [bannerUrl=""] - Optional URL for the user's banner image
   * @returns {Promise<Profile|null>} The user profile if registration and login successful, null otherwise
   * @throws {Error} If the network request fails
   */
  
  const register = async (
    name: string,
    email: string,
    password: string,
    venueManager: boolean,
    avatarUrl: string = "",
    bannerUrl: string = ""
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_API_URL}${API_AUTH}${API_REGISTER}?_holidaze=true`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({
          name,
          email,
          password,
          venueManager,
          avatar: { url: avatarUrl, alt: `${name}'s avatar` },
          banner: { url: bannerUrl, alt: `${name}'s banner` },
        }),
      });

      const resault = await response.json();

      if (!response.ok || !resault.data) {
        setError(resault.message || "Unexpected response format");
        console.error("API error:", resault.message || "Unexpected response format");
        toast.error("Registration failed. Please try again.");
        return null; 
      }


      const loginResponse = await login(email, password);

      if (!loginResponse) {
        setError("Login after registration failed. Please try logging in manually.");
        console.error("Login after registration failed.");
        toast.error("Login after registration failed. Please try logging in manually.");
        return null;
      }

      return loginResponse;

    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      console.error("❌ Error registering:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

export default useRegister;