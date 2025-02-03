import { useState } from "react";
import { BASE_API_URL, API_KEY } from "../api/apiConfig";
import { useAuthStore } from "../store/authStore";

const useFetchVenueManager = () => {
  const { profile, accessToken, updateVenueManager } = useAuthStore(); // ✅ Hent login-funksjonen for å oppdatere Zustand
  const [venueManager, setVenueManager] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVenueManager = async () => {
    if (!profile || !accessToken) {
      setError("No profile or token found.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_API_URL}/holidaze/profiles/${profile.name}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
      });

      const result = await response.json();
      console.log("🟢 VenueManager API Response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch venueManager");
      }

      setVenueManager(result.data.venueManager);
      updateVenueManager(result.data.venueManager); // ✅ Oppdaterer VenueManager-status i Zustand
   // 📌 **Oppdater Zustand `profile` med venueManager**
//    login(
//     { ...profile, venueManager: result.data.venueManager }, // ✅ Oppdatert profil
//     accessToken,
//     expiresAt ?? Date.now() + 1000 * 60 * 60 // ✅ Send utløpstid eller sett den til 1 time
//   );
// Save venueManager result to local storage
// localStorage.setItem("venueManager", JSON.stringify(result.data.venueManager));

      console.log("📦 Updated Zustand profile:", useAuthStore.getState().profile);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      console.error("❌ Error fetching Venue Manager:", error);
    } finally {
      setLoading(false);
    }
  };

  return { venueManager, fetchVenueManager, loading, error };
};

export default useFetchVenueManager;
