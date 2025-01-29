import { create } from "zustand";
import { persist } from "zustand/middleware";

type Profile = {
  name: string;
  email: string;
  avatar: { url: string; alt: string };
  banner: { url: string; alt: string };
  venueManager: boolean;
};

type AuthState = {
  profile: Profile | null;
  token: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  login: (profile: Profile, token: string, expiresAt: number) => void;
  registerUser: (profile: Profile, token: string, expiresAt: number) => void;
  logout: () => void;
  checkAuth: () => void; // ✅ Funksjon for å sjekke om brukeren er fortsatt innlogget
  updateVenueManager: (status: boolean) => void; 
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      profile: null,
      token: null,
      expiresAt: null,
      isAuthenticated: false,

      login: (profile, token, expiresAt) => {
        set({
          profile: { ...profile }, // Sikrer at venueManager blir lagret
          token,
          expiresAt,
          isAuthenticated: true,
        });
        console.log("🟢 Login: VenueManager status lagret:", profile.venueManager);
      },
      
      registerUser: (profile, token, expiresAt) => {
        set({
          profile: { ...profile }, // 🔹 Sikrer at venueManager blir lagret
          token,
          expiresAt,
          isAuthenticated: true,
        });
        console.log("🟢 Register: VenueManager status lagret:", profile.venueManager);
      },

      logout: () => {
        set({ profile: null, token: null, expiresAt: null, isAuthenticated: false });
        localStorage.removeItem("auth-store"); // Fjerner brukerdata, men vil gjenopprette venueManager senere
        console.log("🔴 User logged out. auth-store deleted.");
      },
      


      checkAuth: () => {
        const { token, expiresAt, logout, profile } = get();
        const now = Date.now();
      
        if (!token || !expiresAt || now > expiresAt) {
          console.warn("🔴 Token expired or missing, logging out...");
          logout();
        } else {
          console.log("🟢 Token is still valid.");
          if (profile) {
            set({ profile: { ...profile, venueManager: profile.venueManager } });
            console.log("🟢 checkAuth: VenueManager status gjenopprettet:", profile.venueManager);
          }
        }
      },      
      
      /** ✅ **Oppdaterer VenueManager-status for brukeren** */
      updateVenueManager: (status) => {
        const { profile } = get();
        if (profile) {
          set({ profile: { ...profile, venueManager: status } });
          console.log("🟢 VenueManager status oppdatert til:", status);
        }
      },
    }),
    {
      name: "auth-store",
    }
  )
);


// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type AuthState = {
//   profile: { name: string; email: string; venueManager: boolean } | null;
//   token: string | null;
//   expiresAt: number | null;
//   isAuthenticated: boolean;
//   login: (profile: { name: string; email: string; venueManager: boolean }, token: string, expiresAt: number) => void;
//   logout: () => void;
//   checkAuth: () => void; // ✅ Sjekk om token er utløpt
// };

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       profile: null,
//       token: null,
//       expiresAt: null,
//       isAuthenticated: false,

//       login: (profile, token, expiresAt) => {
//         set({ profile, token, expiresAt, isAuthenticated: true });
//       },

//       logout: () => {
//         set({ profile: null, token: null, expiresAt: null, isAuthenticated: false });
//       },

//       checkAuth: () => {
//         const { token, expiresAt, logout } = get();

//         if (!token || !expiresAt || Date.now() > expiresAt) {
//           console.warn("Token expired or missing, logging out...");
//           logout();
//         }
//       },
//     }),
//     {
//       name: "auth-store",
//     }
//   )
// );


// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type AuthState = {
//   profile: { name: string; email: string; venueManager: boolean } | null;
//   token: string | null;
//   expiresAt: number | null;
//   isAuthenticated: boolean; // ✅ Sjekker om brukeren er logget inn
//   login: (profile: { name: string; email: string; venueManager: boolean }, token: string, expiresAt: number) => void;
//   logout: () => void;
//   checkAuth: () => void; // ✅ Kjør denne ved oppstart for å sjekke om token er utløpt
// };

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       profile: null,
//       token: null,
//       expiresAt: null,
//       isAuthenticated: false,

//       login: (profile, token, expiresAt) => {
//         set({ profile, token, expiresAt, isAuthenticated: true });
//       },

//       logout: () => {
//         set({ profile: null, token: null, expiresAt: null, isAuthenticated: false });
//       },

//       checkAuth: () => {
//         const { token, expiresAt, logout } = get();

//         if (!token || !expiresAt || Date.now() > expiresAt) {
//           console.warn("Token expired or missing, logging out...");
//           logout();
//         }
//       },
//     }),
//     {
//       name: "auth-store", // Lokal lagring i localStorage
//     }
//   )
// );



// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type AuthState = {
//   profile: { name: string; email: string; venueManager: boolean } | null;
//   token: string | null;
//   expiresAt: number | null;
//   login: (profile: { name: string; email: string; venueManager: boolean }, token: string, expiresAt: number) => void;
//   logout: () => void;
// };

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       profile: null,
//       token: null,
//       expiresAt: null,
//       login: (profile, token, expiresAt) =>
//         set({ profile, token, expiresAt }),
//       logout: () => set({ profile: null, token: null, expiresAt: null }), // Fjerner ALLE brukerdata
//     }),
//     { name: "auth-store" }
//   )
// );
