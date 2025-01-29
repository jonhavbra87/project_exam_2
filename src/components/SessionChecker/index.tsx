// import { useEffect } from "react";
// import { useAuthStore } from "../../store/authStore";

// /**
//  * Automatiserer utlogging hvis token er utløpt.
//  */
// function SessionChecker() {
//   const { expiresAt, logout } = useAuthStore();

//   useEffect(() => {
//     if (expiresAt && Date.now() > expiresAt) {
//       console.warn("Session expired, logging out...");
//       logout();
//     }
//   }, [expiresAt, logout]);

//   return null;
// }

// export default SessionChecker;
