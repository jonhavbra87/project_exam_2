import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
  expiresAt: number | null;
  isAuthenticated: boolean;
  rehydrated: boolean;
  login: (profile: Profile, accessToken: string, expiresAt: number) => void;
  logout: () => void;
  checkAuth: () => void;
  updateVenueManager: (status: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      profile: null,
      accessToken: null,
      expiresAt: null,
      isAuthenticated: false,
      rehydrated: false,

      /**
       * ✅ **Oppdaterer VenueManager-status i Zustand**
       */
      updateVenueManager: (status) => {
        const { profile } = get();
        if (profile) {
          set({ profile: { ...profile, venueManager: status } });
          console.log("🟢 VenueManager oppdatert i Zustand:", status);
        } else {
          console.warn("⚠️ Kan ikke oppdatere VenueManager, ingen profil funnet.");
        }
      },

      /**
       * ✅ **Lagrer brukerdata etter innlogging**
       */
      login: (profile, accessToken, expiresAt) => {
        if (!accessToken) {
          console.error("❌ Feil: accessToken er undefined i Zustand login!");
          return;
        }
        console.log("🔹 Setter accessToken i Zustand:", accessToken);

        set({
          profile,
          accessToken,
          expiresAt,
          isAuthenticated: true,
          rehydrated: true, // ✅ Sikrer at Zustand blir "ferdig lastet" ved login
        });

        console.log("📦 Zustand state etter login:", get());
        console.log("📦 Data i localStorage etter login:", localStorage.getItem("auth-store"));
      },

      /**
       * ✅ **Sjekker om brukeren fortsatt er innlogget ved startup**
       */
      checkAuth: () => {
        const { accessToken, expiresAt, profile, logout } = get();
        console.log("🔍 Sjekker auth-state ved startup:", { accessToken, expiresAt, profile });

        if (!accessToken || !expiresAt) {
          console.warn("🔴 Ingen token funnet ved checkAuth, bruker må logge inn på nytt.");
          return;
        }

        if (Date.now() > expiresAt) {
          console.warn("🔴 Token er utløpt, logger ut...");
          logout();
        } else {
          console.log("🟢 Token er fortsatt gyldig.");
        }
      },

      /**
       * ✅ **Logger ut brukeren og tømmer Zustand-state**
       */
      logout: () => {
        console.log("🔴 User logged out. Fjerner data fra Zustand og localStorage.");
        set({ profile: null, accessToken: null, expiresAt: null, isAuthenticated: false });
        localStorage.removeItem("auth-store"); // ✅ Fjerner data manuelt for sikkerhets skyld
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),

      /**
       * ✅ **Løser problemet med tidlig referanse til `useAuthStore`**
       */
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("❌ Error during Zustand rehydration:", error);
          return;
        }
      
        console.log("🔄 Zustand rehydrated fra localStorage:", state);
      
        if (!state) {
          console.warn("⚠️ Ingen tidligere Zustand-state funnet i localStorage.");
          return;
        }
      
        setTimeout(() => {
          useAuthStore.setState({ rehydrated: true }); // ✅ Ensures Zustand is marked as hydrated
          console.log("✅ Zustand er nå ferdig rehydrert!");
        }, 500);
      },

      /**
       * ✅ **Lagrer kun nødvendige data i localStorage**
       */
      partialize: (state) => ({
        profile: state.profile,
        accessToken: state.accessToken,
        expiresAt: state.expiresAt,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
