import { useAuthStore } from '../../../store/authStore';
import { BASE_API_URL } from '../../apiConfig';

export async function updateVenueManagerStatus(venueManager: boolean) {
  const { profile, accessToken } = useAuthStore.getState();

  if (!profile || !accessToken) {
    console.error(
      '❌ Error: No profile or token found when updating Venue Manager.'
    );
    throw new Error('No profile or token found.');
  }

  const url = `${BASE_API_URL}/holidaze/profiles/${profile.name}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY,
  };

  const body = JSON.stringify({ venueManager });

  console.log('🟢 Updating Venue Manager status:', venueManager);
  console.log('🔹 Token used for updating Venue Manager:', accessToken);

  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to update venueManager status: ${response.statusText}`
    );
  }

  console.log('✅ Venue Manager status successfully updated:', response);
  return response;
}
