import { useAuthStore } from "../../store/authStore";
import { API_AUTH, API_LOGIN, BASE_API_URL } from "../apiConfig";
import { authFetch } from "./authFetch";

export async function login(email: string, password: string) {
  try {
    const url = `${BASE_API_URL}${API_AUTH}${API_LOGIN}`;
    const body = { email, password };

    const data = await authFetch<{
      data: {
        name: string;
        email: string;
        avatar: { url: string; alt: string };
        banner: { url: string; alt: string };
        accessToken: string;
        venueManager: boolean;
      };
    }>(url, "POST", body);
    
    console.log("📌 API Response:", data); // 🔍 Se hele responsen

    if (!data?.data?.accessToken) {
      throw new Error("No access token found in response");
    }

    const expiresIn = 60 * 60 * 1000; // 1 hour
    const expiryTime = Date.now() + expiresIn;

    // ✅ Oppdater Zustand
    useAuthStore.getState().login(
      {
        name: data.data.name,
        email: data.data.email,
        avatar: data.data.avatar,
        banner: data.data.banner,
        venueManager: data.data.venueManager,
      },
      data.data.accessToken,
      expiryTime
    );

    console.log("✅ Login successful, Zustand state updated!");
    
    return data.data;
  } catch (error) {
    console.error("❌ Login error:", error);
    throw error;
  }
}


// import { useAuthStore } from "../../store/authStore";
// import { API_AUTH, API_LOGIN, BASE_API_URL } from "../apiConfig";
// import { authFetch } from "./authFetch";

// export async function login(email: string, password: string) {
//   try {
//     const url = `${BASE_API_URL}${API_AUTH}${API_LOGIN}`;
//     const body = { email, password };

//     const data = await authFetch<{ data: { accessToken: string; name: string; email: string; venueManager?: boolean } }>(
//       url,
//       "POST",
//       body
//     );

//     if (!data?.data?.accessToken) {
//       throw new Error("No access token found in response");
//     }

//     const expiresIn = 60 * 60 * 1000; // 1 hour
//     const expiryTime = Date.now() + expiresIn;

//     // ✅ Sikrer at `venueManager` alltid er en boolean
//     const profile = {
//       name: data.data.name,
//       email: data.data.email,
//       venueManager: data.data.venueManager ?? false, // Default til `false` hvis API ikke sender verdi
//     };

//     // ✅ Lagrer til Zustand state
//     useAuthStore.getState().login(profile, data.data.accessToken, expiryTime);

//     // ✅ Lagrer også token i `localStorage`
//     localStorage.setItem("token", JSON.stringify({ accessToken: data.data.accessToken, expiresAt: expiryTime }));

//     console.log("✅ Login successful, Zustand state & localStorage updated!");
    
//     return data.data;
//   } catch (error) {
//     console.error("❌ Login error:", error);

//     // ✅ Bedre feilhåndtering
//     throw new Error(error instanceof Error ? error.message : "Unexpected error occurred.");
//   }
// }


// import { useAuthStore } from "../../store/authStore";
// import { API_AUTH, API_LOGIN, BASE_API_URL } from "../apiConfig";
// import { authFetch } from "./authFetch";

// export async function login(email: string, password: string) {
//   try {
//     const url = `${BASE_API_URL}${API_AUTH}${API_LOGIN}`;
//     const body = { email, password };

//     const data = await authFetch<{ data: { accessToken: string; name: string; email: string; venueManager: boolean } }>(
//       url,
//       "POST",
//       body
//     );

//     if (!data?.data?.accessToken) {
//       throw new Error("No access token found in response");
//     }

//     const expiresIn = 60 * 60 * 1000; // 1 hour
//     const expiryTime = Date.now() + expiresIn;

//     // ✅ Lagrer i Zustand og ikke i `localStorage` manuelt
//     useAuthStore.getState().login(
//       { name: data.data.name, email: data.data.email, venueManager: data.data.venueManager },
//       data.data.accessToken,
//       expiryTime
//     );

//     console.log("✅ Login successful, Zustand state updated!");
    
//     return data.data;
//   } catch (error) {
//     console.error("❌ Login error:", error);
//     throw error;
//   }
// }



// import { save } from "../../storage/save";
// import { API_AUTH, API_LOGIN, BASE_API_URL } from "../apiConfig";
// import { authFetch } from "./authFetch";

// export type LoginResponse = {
//   data: {
//     accessToken: string;
//     name: string;
//     email: string;
//   };
// };

// export async function login(email: string, password: string) {
//   try {
//     const url = `${BASE_API_URL}${API_AUTH}${API_LOGIN}`;
//     const body = { email, password };

//     const data = await authFetch<LoginResponse>(url, "POST", body);

//     if (!data?.data?.accessToken) {
//       throw new Error("No access token found in response");
//     }

//     const expiresIn = 60 * 60 * 1000; // 1 hour
//     const expiryTime = Date.now() + expiresIn;

//     save("token", { accessToken: data.data.accessToken, expiresAt: expiryTime });
//     save("profile", { name: data.data.name, email: email, expiresAt: expiryTime });

//     console.log("Login successful, token and profile saved!");
    
//     return data.data;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// }
