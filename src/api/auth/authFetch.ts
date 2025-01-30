import { useAuthStore } from "../../store/authStore";
import { API_KEY } from "../apiConfig";

export async function authFetch<T>(
  url: string,
  method: string = "GET",
  body: object | null = null
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let retryCount = 0;
    const MAX_RETRIES = 5;

    const fetchWithAuth = async () => {
      const { accessToken, expiresAt, isAuthenticated, rehydrated, logout } = useAuthStore.getState();
      
      console.log("🔍 Zustand state FØR authFetch kjører:", useAuthStore.getState());

      console.log("🔍 authFetch - Zustand state:", {
        rehydrated,
        hasToken: !!accessToken,
        isAuthenticated,
        tokenPrefix: accessToken ? accessToken.substring(0, 10) : "❌ MISSING",
      });

      if (!rehydrated) {
        if (retryCount >= MAX_RETRIES) {
          console.error("❌ Zustand ble aldri ferdig rehydrert. Avbryter.");
          return reject(new Error("State not rehydrated. Please wait."));
        }

        console.warn("⏳ Zustand er ikke ferdig rehydrert. Venter...");
        retryCount++;
        setTimeout(fetchWithAuth, 500);
        return;
      }

      if (!accessToken) {
        console.warn("⚠️ Ingen accessToken funnet for request!");
      } else if (expiresAt && Date.now() > expiresAt) {
        console.warn("🔴 Token er utløpt, logger ut...");
        logout();
        return reject(new Error("Session expired. Please log in again."));
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      };

      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const options: RequestInit = { method, headers };
      if (body && method !== "GET") {
        options.body = JSON.stringify(body);
      }

      try {
        const response = await fetch(url, options);

        if (response.status === 401) {
          console.warn("🔴 Unauthorized request - logger ut...");
          logout();
          return reject(new Error("Unauthorized. Please log in again."));
        }

        if (!response.ok) {
          return reject(new Error(`API error: ${response.status} ${response.statusText}`));
        }

        const responseData = await response.json();
        console.log("✅ API Response:", responseData);
        resolve(responseData);
      } catch (error) {
        console.error("❌ API Fetch Error:", error);
        reject(error);
      }
    };

    fetchWithAuth();
  });
}


// import { useAuthStore } from "../../store/authStore";
// import { API_KEY } from "../apiConfig";

// export async function authFetch<T>(
//   url: string,
//   method: string = "GET",
//   body: object | null = null
// ): Promise<T> {
  
//   const { accessToken, expiresAt, isAuthenticated, rehydrated, logout } = useAuthStore.getState();

//   console.log("authFetch - Current Zustand state:", {
//     rehydrated,
//     hasToken: !!accessToken,
//     isAuthenticated,
//     tokenPrefix: accessToken?.substring(0, 10),
//   });
  
//   // 🚨 Sjekk at Zustand er ferdig lastet
//   if (!rehydrated) {
//     console.warn("⏳ Zustand er ikke ferdig rehydrert. Avbryter authFetch.");
//     return Promise.reject(new Error("State not rehydrated. Please wait."));
//   }
  
//   // ✅ Sjekk om token er utløpt FØR vi setter headers
//   if (!accessToken) {
//     console.warn("⚠️ Ingen accessToken funnet for request.");
//   } else if (expiresAt && Date.now() > expiresAt) {
//     console.warn("🔴 Token er utløpt, logger ut...");
//     logout();
//     throw new Error("Session expired. Please log in again.");
//   }

//   // ✅ Bygg headers
//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//     "X-Noroff-API-Key": API_KEY,
//   };

//   if (accessToken) {
//     headers["Authorization"] = `Bearer ${accessToken}`;
//   }

//   // ✅ Bygg fetch-options
//   const options: RequestInit = { method, headers };
//   if (body && method !== "GET") {
//     options.body = JSON.stringify(body);
//   }

//   // ✅ Utfør API-kall
//   try {
//     const response = await fetch(url, options);

//     // 🔴 Håndter 401 Unauthorized
//     if (response.status === 401) {
//       console.warn("🔴 Unauthorized request - logger ut...");
//       logout();
//       throw new Error("Unauthorized. Please log in again.");
//     }

//     // 🔴 Håndter generelle feil
//     if (!response.ok) {
//       throw new Error(`API error: ${response.status} ${response.statusText}`);
//     }

//     return response.json();
//   } catch (error) {
//     console.error("❌ API Fetch Error:", error);
//     throw error;
//   }
// }


// import { useAuthStore } from "../../store/authStore";
// import { API_KEY } from "../apiConfig";


// export async function authFetch<T>(
//   url: string,
//   method: string = "GET",
//   body: object | null = null
// ): Promise<T> {
//   const { token, expiresAt, logout } = useAuthStore.getState();

//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//     "X-Noroff-API-Key": API_KEY,
//   };

//   if (token) {
//     if (expiresAt && Date.now() > expiresAt) {
//       console.warn("Token expired, logging out...");
//       logout();
//       return Promise.reject(new Error("Session expired. Please log in again."));
//     }
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   const options: RequestInit = { method, headers };

//   if (body && method !== "GET") {
//     options.body = JSON.stringify(body);
//   }

//   try {
//     const response = await fetch(url, options);
    
//     if (response.status === 401) {
//       console.warn("Unauthorized request, logging out...");
//       logout();
//       return Promise.reject(new Error("Unauthorized. Please log in again."));
//     }

//     if (!response.ok) {
//       throw new Error(`API error: ${response.status} ${response.statusText}`);
//     }

//     return response.json();
//   } catch (error) {
//     console.error(`API Fetch Error: ${error}`);
//     throw error;
//   }
// }



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