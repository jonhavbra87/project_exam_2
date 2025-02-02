import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { BASE_API_URL } from "../api/apiConfig";

const useFetchVenueManager = () => {
  const { profile, accessToken } = useAuthStore();
  const [venueManager, setVenueManager] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // 📌 Hent Venue Manager status fra API
  useEffect(() => {
    if (!profile || !accessToken) {
      setIsLoading(false);
      return;
    }

    const fetchVenueManagerStatus = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}/holidaze/profiles/${profile.name}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch venueManager status.");
        const json = await response.json();
        setVenueManager(json.data.venueManager);
      } catch (error) {
        console.error("❌ Error fetching venueManager:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenueManagerStatus();
  }, [profile, accessToken]);

  // 📌 Oppdater Venue Manager status i API
  const updateVenueManagerStatus = async (newStatus: boolean) => {
    if (!profile || !accessToken) {
      console.error("❌ No profile or token found when updating Venue Manager.");
      setUpdateError("No profile or token found.");
      return;
    }

    setIsUpdating(true);
    setUpdateError(null);

    try {
      const response = await fetch(`${BASE_API_URL}/holidaze/profiles/${profile.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({ venueManager: newStatus }),
      });

      if (!response.ok) throw new Error(`Failed to update venueManager: ${response.statusText}`);

      console.log("✅ Venue Manager status updated:", newStatus);
      setVenueManager(newStatus);
    } catch (error) {
      console.error("❌ Error updating Venue Manager:", error);
      setUpdateError(error instanceof Error ? error.message : "Failed to update venueManager.");
    } finally {
      setIsUpdating(false);
    }
  };

  return { venueManager, isLoading, isError, isUpdating, updateVenueManagerStatus, updateError };
};

export default useFetchVenueManager;


// import { useState, useEffect } from "react";
// import { useAuthStore } from "../store/authStore";
// import { BASE_API_URL } from "../api/apiConfig";

// const useFetchVenueManager = () => {
//   const { profile, accessToken } = useAuthStore();
//   const [venueManager, setVenueManager] = useState<boolean | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     if (!profile || !accessToken) {
//       setIsLoading(false);
//       return;
//     }

//     const fetchVenueManagerStatus = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`${BASE_API_URL}/holidaze/profiles/${profile.name}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
//           },
//         });

//         if (!response.ok) throw new Error("Failed to fetch venueManager status.");
//         const json = await response.json();

//         setVenueManager(json.data.venueManager);
//       } catch (error) {
//         console.error("❌ Error fetching venueManager:", error);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchVenueManagerStatus();
//   }, [profile, accessToken]);

//   return { venueManager, isLoading, isError };
// };

// export default useFetchVenueManager;
