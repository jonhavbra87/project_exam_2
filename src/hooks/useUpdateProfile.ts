import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Profile } from "../types/Profile";
import { API_KEY, BASE_API_URL } from "../api/apiConfig";


const useUpdateProfile = () => {
  const { profile, accessToken, login, expiresAt } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile || !accessToken) {
      setError("No profile or token found.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_API_URL}/holidaze/profiles/${profile.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(updates),
      });

      const result = await response.json();
      console.log("🟢 Profile Update API Response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to update profile");
      }

      // 📌 Oppdater Zustand med ny profilinfo
      login(
        { ...profile, venueManager: result.data.venueManager }, // ✅ Oppdatert profil
        accessToken,
        expiresAt ?? Date.now() + 1000 * 60 * 60 // ✅ Send utløpstid eller sett den til 1 time
      );

      console.log("📦 Updated Zustand profile:", useAuthStore.getState().profile);
      return result.data;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      console.error("❌ Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error };
};

export default useUpdateProfile;