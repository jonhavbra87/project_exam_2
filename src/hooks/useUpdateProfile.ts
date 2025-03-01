/**
 * @fileoverview Custom hook for updating user profile data
 * @module hooks/useUpdateProfile
 */
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { API_KEY, BASE_API_URL } from '../api/apiConfig';

/**
 * Custom hook that provides functionality to update a user's profile
 *
 * @returns {Object} Profile update methods and state
 * @returns {function(user: {venueManager: boolean}): Promise<Object|undefined>} .updateProfile - Function to update the user profile
 * @returns {boolean} .loading - Indicates if update operation is in progress
 * @returns {string|null} .error - Error message if update failed, null otherwise
 *
 * @example
 * const { updateProfile, loading, error } = useUpdateProfile();
 *
 * // Update the user's venue manager status
 * const handleToggleVenueManager = async () => {
 *   const updatedProfile = await updateProfile({ venueManager: !currentStatus });
 *   if (updatedProfile) {
 *     // Update successful
 *   }
 * };
 */

const useUpdateProfile = () => {
  const { profile, accessToken, login, setVenueManager } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Updates the current user's profile
   *
   * @async
   * @param {Object} user - The user data to update
   * @param {boolean} user.venueManager - Whether the user should have venue manager privileges
   * @returns {Promise<Object|undefined>} The updated user data if successful, undefined otherwise
   * @throws {Error} If the network request fails
   */

  const updateProfile = async (user: { venueManager: boolean }) => {
    if (!user) {
      console.error('🔴 No user data provided.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_API_URL}/holidaze/profiles/${profile?.name}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'X-Noroff-API-Key': API_KEY,
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText || 'Failed to update profile');
      }
      const result = await response.json();

      const { name, email, bio, avatar, banner, venueManager } = result.data;

      setVenueManager(venueManager);

      login(
        {
          name,
          email,
          bio,
          avatar,
          banner,
        },
        accessToken as string,
        venueManager
      );

      return result.data;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      console.error('❌ Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error };
};

export default useUpdateProfile;
