
// import { useAuthStore } from '../../../store/authStore';
// import { BASE_API_URL } from '../../apiConfig';

// export async function updateVenueManagerStatus(venueManager: boolean) {
//   const { profile, accessToken } = useAuthStore.getState();

//   if (!profile || !accessToken) {
//     console.error(
//       '❌ Error: No profile or token found when updating Venue Manager.'
//     );
//     throw new Error('No profile or token found.');
//   }

//   const url = `${BASE_API_URL}/holidaze/profiles/${profile.name}`;
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${accessToken}`,
//     'X-Noroff-API-Key': import.meta.env.VITE_API_KEY,
//   };

//   const body = JSON.stringify({ venueManager });

//   console.log('🟢 Updating Venue Manager status:', venueManager);
//   console.log('🔹 Token used for updating Venue Manager:', accessToken);

//   const response = await fetch(url, {
//     method: 'PUT',
//     headers,
//     body,
//   });

//   if (!response.ok) {
//     throw new Error(
//       `Failed to update venueManager status: ${response.statusText}`
//     );
//   }

//   console.log('✅ Venue Manager status successfully updated:', response);
//   return response;
// }

// import { useState } from "react";
// import { BASE_API_URL, API_KEY } from "../api/apiConfig";
// import { useAuthStore } from "../store/authStore";

// const useFetchVenueManager = () => {
//   const { profile, accessToken } = useAuthStore();
//   const [venueManager, setVenueManager] = useState<boolean | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchVenueManager = async () => {
//     if (!profile || !accessToken) {
//       setError("No profile or token found.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`${BASE_API_URL}/holidaze/profiles/${profile.name}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "X-Noroff-API-Key": API_KEY,
//         },
//       });

//       const result = await response.json();
//       console.log("🟢 VenueManager API Response:", result);

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to fetch venueManager");
//       }

//       setVenueManager(result.data.venueManager);
//     } catch (error) {
//       setError(error instanceof Error ? error.message : "Unknown error");
//       console.error("❌ Error fetching Venue Manager:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { venueManager, fetchVenueManager, loading, error };
// };

// export default useFetchVenueManager;

