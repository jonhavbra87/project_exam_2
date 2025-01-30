import { useAuthStore } from "../../store/authStore";
import { API_AUTH, API_KEY, API_LOGIN, BASE_API_URL } from "../apiConfig";
import { authFetch } from "./authFetch";

export async function login(email: string, password: string) {
  try {
    const url = `${BASE_API_URL}${API_AUTH}${API_LOGIN}`;
    const body = { email, password };

    // 📌 **1️⃣ Logg inn brukeren og få `accessToken`**
    const data = await authFetch<{
      data: {
        name: string;
        email: string;
        avatar?: { url: string; alt: string };
        banner?: { url: string; alt: string };
        venueManager?: boolean;
        accessToken: string; // ✅ Token kommer her!
      };
    }>(url, "POST", body);

    console.log("📌 API Response fra login:", data);

    if (!data?.data?.accessToken) {
      console.error("❌ Feil: accessToken er undefined! Sjekk API-responsen.", data);
      return;
    }

    const accessToken = data.data.accessToken; // ✅ Hent accessToken
    console.log("🔹 Token mottatt fra login:", accessToken); // ✅ Verifiserer at vi har token

    const expiresIn = 60 * 60 * 1000; // 1 time
    const expiryTime = Date.now() + expiresIn;

    const username = data.data.name;

    // 📌 **2️⃣ Hent full profil for å få `venueManager`-status**
    const profileUrl = `${BASE_API_URL}/holidaze/profiles/${username}`;
    const profileHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // ✅ Bruker `accessToken` til å hente profil
      "X-Noroff-API-Key": API_KEY,
    };

    const profileResponse = await fetch(profileUrl, { headers: profileHeaders });

    if (!profileResponse.ok) {
      console.error(`❌ Feil: Kunne ikke hente profil. Status: ${profileResponse.status}`);
      return;
    }

    const profileData = await profileResponse.json();

    console.log("📌 Full profil hentet fra API:", profileData);

    // const venueManager = profileData?.data?.venueManager ?? false; // Hvis mangler, default `false`
    
    console.log("📌 Sender til Zustand login:", {
      profile: {
        name: data.data.name,
        email: data.data.email,
        avatar: data.data.avatar,
        banner: data.data.banner,
        venueManager: profileData?.data?.venueManager ?? false,
      },
      accessToken: accessToken,
      expiresAt: expiryTime
    });

    // 📌 **3️⃣ Oppdater Zustand med riktig token fra login-responsen**
useAuthStore.getState().login(
  {
    name: data.data.name,
    email: data.data.email,
    avatar: data.data.avatar,
    banner: data.data.banner,
    venueManager: profileData?.data?.venueManager ?? false,
  },
  data.data.accessToken, // ✅ Bruker accessToken fra login-responsen
  expiryTime
);


    //console.log("✅ Zustand state etter login:", useAuthStore.getState());

    return profileData.data;
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

//     // 📌 **1️⃣ Logg inn brukeren**
//     const data = await authFetch<{
//       data: {
//         name: string;
//         email: string;
//         avatar?: { url: string; alt: string };
//         banner?: { url: string; alt: string };
//         accessToken: string; // ✅ Token kommer her!
//       };
//     }>(url, "POST", body);

//     console.log("📌 API Response fra login:", data);

//     if (!data?.data?.accessToken) {
//       console.error("❌ Feil: Token er undefined! Sjekk API-responsen.", data);
//       return;
//     }

//     const token = data.data.accessToken; // ✅ Bruker riktig token!

//     console.log("🔹 Token mottatt fra login:", token); // ✅ Verifiserer at vi har token

//     const expiresIn = 60 * 60 * 1000; // 1 time
//     const expiryTime = Date.now() + expiresIn;

//     const username = data.data.name;

//     // 📌 **2️⃣ Hent full profil for å få `venueManager`-status**
//     const profileUrl = `${BASE_API_URL}/holidaze/profiles/${username}`;
//     const profileHeaders = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`, // ✅ Bruker login-token til å hente profil
//       "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
//     };

//     const profileResponse = await fetch(profileUrl, { headers: profileHeaders });

//     if (!profileResponse.ok) {
//       console.error(`❌ Feil: Kunne ikke hente profil. Status: ${profileResponse.status}`);
//       return;
//     }

//     const profileData = await profileResponse.json();
//     console.log("📌 Full profil hentet fra API:", profileData);

//     const venueManager = profileData?.data?.venueManager ?? false; // Hvis mangler, default `false`
//     console.log("📌 Sender til Zustand login:", {
//       profile: {
//         name: profileData.data.name,
//         email: profileData.data.email,
//         avatar: profileData.data.avatar,
//         banner: profileData.data.banner,
//         venueManager: venueManager,
//       },
//       token: token,
//       expiresAt: expiryTime
//     });
    
//     // 📌 **3️⃣ Oppdater Zustand KORREKT med login-funksjonen**
//     useAuthStore.getState().login(
//       {
//         name: profileData.data.name,
//         email: profileData.data.email,
//         avatar: profileData.data.avatar,
//         banner: profileData.data.banner,
//         venueManager: venueManager, // ✅ Nå får vi riktig `venueManager`
//       },
//       token,  // ✅ Token fra login-responsen
//       expiryTime
//     );

//     console.log("✅ Zustand state etter login:", useAuthStore.getState());

//     return profileData.data;
//   } catch (error) {
//     console.error("❌ Login error:", error);
//     throw error;
//   }
// }
