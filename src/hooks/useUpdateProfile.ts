import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { API_KEY, BASE_API_URL } from '../api/apiConfig';

const useUpdateProfile = () => {
  const { profile, accessToken, login, setVenueManager } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
