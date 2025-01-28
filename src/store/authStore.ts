// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type AuthState = {
//   profile: { name: string; email: string } | null;
//   setProfile: (profile: { name: string; email: string } | null) => void;
//   logout: () => void;
// };

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       profile: null, // Checks if user is logged in
//       setProfile: (profile) => set({ profile }), // Sets user profile
//       logout: () => {
//         localStorage.removeItem("auth-storage"); // Removes user profile from localStorage
//         set({ profile: null }); // Sets user profile to null
//       },
//     }),
//     {
//       name: "auth-storage", 
//     }
//   )
// );
