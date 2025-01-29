import { useAuthStore } from "../../store/authStore";
import { API_KEY } from "../apiConfig";


export async function authFetch<T>(
  url: string,
  method: string = "GET",
  body: object | null = null
): Promise<T> {
  const { token, expiresAt, logout } = useAuthStore.getState();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
  };

  if (token) {
    if (expiresAt && Date.now() > expiresAt) {
      console.warn("Token expired, logging out...");
      logout();
      return Promise.reject(new Error("Session expired. Please log in again."));
    }
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options: RequestInit = { method, headers };

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    
    if (response.status === 401) {
      console.warn("Unauthorized request, logging out...");
      logout();
      return Promise.reject(new Error("Unauthorized. Please log in again."));
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`API Fetch Error: ${error}`);
    throw error;
  }
}



// import { getAuthHeaders } from "./getAuthHeaders";


// /**
//  * Performs an authenticated fetch request.
//  */
// export async function authFetch<T>(
//   url: string,
//   method: string = "GET",
//   body: object | null = null
// ): Promise<T> {
//   try {
//     const headers = await getAuthHeaders();
//     const options: RequestInit = { method, headers };

//     if (body && method !== "GET") {
//         options.body = JSON.stringify(body);
//       }
      

//     const response = await fetch(url, options);
//     if (!response.ok) {
//         const errorMessage = `API error: ${response.status} ${response.statusText}`;
//         console.error(errorMessage);
//         throw new Error(errorMessage);
//     }
//     if (response.status === 401) {
//         localStorage.removeItem("token");
//         throw new Error("Unauthorized: Logging out...");
//       }
      
//     return response.json();
//   } catch (error) {
//     console.error(`API Fetch Error: ${error}`);
//     throw error;
//   }
// }