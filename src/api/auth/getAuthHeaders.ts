import { API_KEY } from "../apiConfig";
import { useAuthStore } from "../../store/authStore";

export async function getAuthHeaders(): Promise<Record<string, string>> {
  const { accessToken, expiresAt, logout } = useAuthStore.getState();
  const now = Date.now();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
  };

  // Sjekk om accessToken har utløpt
  if (!accessToken || !expiresAt || now > expiresAt) {
    console.warn("accessToken expired or missing, logging out...");
    logout();
    return headers;
  }

  headers["Authorization"] = `Bearer ${accessToken}`;
  return headers;
}


// import { load } from "../../storage/load";
// import { remove } from "../../storage/remove";
// import { API_KEY } from "../apiConfig";

// /**
//  * Generates headers for API requests, including authentication if available.
//  */
// export async function getAuthHeaders(): Promise<Record<string, string>> {
//   const tokenData = load<{ accessToken: string; expiresAt: number }>("token");
//   const profileData = load<{ name: string; email: string; expiresAt: number }>("profile");

//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//     "X-Noroff-API-Key": API_KEY,
//   };

//   const now = Date.now();

//   // Delete token if it has expired
//   if (!tokenData || !tokenData.accessToken || now > tokenData.expiresAt) {
//     console.warn("Token expired or missing, logging out...");
//     remove("token");
//     remove("profile"); 
//     return headers;
//   }

//   // Delete profile if it has expired
//   if (!profileData || now > profileData.expiresAt) {
//     console.warn("Profile expired, removing profile & token...");
//     remove("profile");
//     remove("token");
//     return headers;
//   }

//   // Legg til gyldig access token i headers
//   headers["Authorization"] = `Bearer ${tokenData.accessToken}`;

//   return headers;
// }