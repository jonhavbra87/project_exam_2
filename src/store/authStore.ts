import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile } from '../types/Profile';

type AuthState = {
  profile: Profile | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  venueManager: boolean;
  login: (profile: Profile, accessToken: string, venueManager: boolean) => void;
  // register: (profile: Profile, accessToken: string, venueManager: boolean) => void;
  logout: () => void;
  setVenueManager: (venueManager: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      accessToken: null,
      isAuthenticated: false,
      venueManager: false,

      login: (profile: Profile, accessToken: string, venueManager: boolean) => {
        set({
          profile,
          accessToken,
          isAuthenticated: true,
          venueManager: !!venueManager,
        });
      },

      // register: (profile: Profile, accessToken: string, venueManager: boolean) => {
      //   console.log("🟢 Storing accessToken in Zustand (register):", accessToken);
      //   set({
      //     profile,
      //     accessToken,
      //     isAuthenticated: true,
      //     venueManager: !!venueManager,
      //   });
      // },

      setVenueManager: (venueManager: boolean) => {
        set({ venueManager: !!venueManager });
      },

      logout: () => {
        // console.log(
        //   '🔴 User logged out. Fjerner data fra Zustand og localStorage.'
        // );
        set({ profile: null, accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-store',
    }
  )
);
