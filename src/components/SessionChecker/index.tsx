import { useEffect } from "react";
import { remove } from "../../storage/remove";
import { load } from "../../storage/load";

/**
 * SessionChecker checks if the stored auth token and profile have expired.
 * If expired, it removes them from localStorage to ensure automatic logout.
 */
function SessionChecker() {
  useEffect(() => {
    const now = Date.now();

    const tokenData = load<{ expiresAt: number }>("token");
    const profileData = load<{ expiresAt: number }>("profile");

    if (tokenData && now > tokenData.expiresAt) {
      console.warn("Session expired, logging out...");
      remove("token");
      remove("profile");
    }

    if (profileData && now > profileData.expiresAt) {
      console.warn("Profile expired, removing...");
      remove("profile");
    }
  }, []); // 🔹 Runs once when the component mounts
  return null; // This component does not render anything
}

export default SessionChecker;
