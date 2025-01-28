// import { useState, useEffect } from "react";
// import { getProfile, logoutUser } from "../utilities/auth";


// type UserProfile = {
//   name: string;
//   email: string;
// } | null;

// export function useAuth() {
//   const [profile, setProfile] = useState<UserProfile>(getProfile() as UserProfile);

//   useEffect(() => {
//       const userProfile = getProfile();
//       setProfile(userProfile as UserProfile);
//     }, []);

//   return {
//     profile,
//     isAuthenticated: !!profile,
//     logout: () => {
//       logoutUser();
//       setProfile(null); // UI oppdateres automatisk
//     },
//   };
// }
