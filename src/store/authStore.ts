import { create } from "zustand";
import { persist } from "zustand/middleware";

type Profile = {
  name: string;
  email: string;
  avatar?: { url: string; alt: string };
  banner?: { url: string; alt: string };
  venueManager: boolean;
};

type AuthState = {
  profile: Profile | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (profile: Profile, accessToken: string, expiresAt: number) => void;
  logout: () => void;

};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      accessToken: null,
      isAuthenticated: false,
      isVenueManager: false,


      login: (profile: Profile, accessToken: string) => {
        set({
          profile,
          accessToken,
          isAuthenticated: true,

        });
        console.log("📦 Data in localStorage after login:", localStorage.getItem("auth-store"));
      },

      logout: () => {
        console.log("🔴 User logged out. Fjerner data fra Zustand og localStorage.");
        set({ profile: null, accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-store"
    }
  )
);










// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type Profile = {
//   name: string;
//   email: string;
//   avatar?: { url: string; alt: string };
//   banner?: { url: string; alt: string };
//   venueManager: boolean;
// };

// type AuthState = {
//   profile: Profile | null;
//   accessToken: string | null;
//   expiresAt: number | null;
//   isAuthenticated: boolean;
//   login: (profile: Profile, accessToken: string, expiresAt: number) => void;
//   logout: () => void;
//   checkAuth: () => void;
//   updateVenueManager: (status: boolean) => void;
// };

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       profile: null,
//       accessToken: null,
//       expiresAt: null,
//       isAuthenticated: false,

      
//       /**
//        * ✅ **Lagrer brukerdata etter innlogging**
//        */
//       login: (profile, accessToken, expiresAt) => {
//         console.log("accessToken befor login authStore, ", accessToken)
//         if (!accessToken) {
//           console.error("❌ Error: accessToken is undefined in Zustand login!");
//           return;
//         }
//         console.log("🔹 Sets accessToken in Zustand:", accessToken);

//         set({
//           profile,
//           accessToken,
//           expiresAt,
//           isAuthenticated: true,
//         });

//         console.log("📦 Zustand state after login:", get());
//         console.log("📦 Data in localStorage after login:", localStorage.getItem("auth-store"));
//       },
      
//       /**
//        * ✅ **Oppdaterer VenueManager-status i Zustand**
//        */
//       updateVenueManager: (status) => {
//         const { profile } = get();
//         if (profile) {
//           set({ profile: { ...profile, venueManager: status } });
//           console.log("🟢 VenueManager updated in Zustand:", status);
//         } else {
//           console.warn("⚠️ Can not update VenueManager, no profile found.");
//         }
//       },

//       /**
//        * ✅ **Sjekker om brukeren fortsatt er innlogget ved startup**
//        */
//       checkAuth: () => {
//         const { accessToken, expiresAt, profile, logout } = get();
//         console.log("🔍 Checks auth-state at startup:", { accessToken, expiresAt, profile });

//         if (!accessToken || !expiresAt) {
//           console.warn("🔴 Ingen token funnet ved checkAuth, bruker må logge inn på nytt.");
//           return;
//         }

//         if (Date.now() > expiresAt) {
//           console.warn("🔴 Token er utløpt, logger ut...");
//           logout();
//         } else {
//           console.log("🟢 Token er fortsatt gyldig.");
//         }
//       },

//       /**
//        * ✅ **Logger ut brukeren og tømmer Zustand-state**
//        */
//       logout: () => {
//         console.log("🔴 User logged out. Fjerner data fra Zustand og localStorage.");
//         set({ profile: null, accessToken: null, expiresAt: null, isAuthenticated: false });
//         localStorage.removeItem("auth-store"); // ✅ Fjerner data manuelt for sikkerhets skyld
//       },
//     }),
//     {
//       name: "auth-store",
//       //storage: createJSONStorage(() => localStorage),

//       /**
//        * ✅ **Løser problemet med tidlig referanse til `useAuthStore`**
//        */
//       // onRehydrateStorage: () => (state, error) => {
//       //   if (error) {
//       //     console.error("❌ Error during Zustand rehydration:", error);
//       //     return;
//       //   }
      
//       //   console.log("🔄 Zustand rehydrated from localStorage:", state);
      
//       //   if (!state) {
//       //     console.warn("⚠️ No early Zustand-state forund in localStorage.");
//       //     return;
//       //   }
      
//       //   setTimeout(() => {
//       //     useAuthStore.setState({ rehydrated: true }); // ✅ Ensures Zustand is marked as hydrated
//       //     console.log("✅ Zustand is finished rehydrated!");
//       //   }, 500);
//       // },

//       /**
//        * ✅ **Lagrer kun nødvendige data i localStorage**
//        */
//       // partialize: (state) => ({
//       //   profile: state.profile,
//       //   accessToken: state.accessToken,
//       //   expiresAt: state.expiresAt,
//       //   isAuthenticated: state.isAuthenticated,
//       // }),
//     }
//   )
// );
