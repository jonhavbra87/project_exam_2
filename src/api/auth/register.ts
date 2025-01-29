import { API_AUTH, API_REGISTER, BASE_API_URL } from "../apiConfig";
import { authFetch } from "./authFetch";
import { useAuthStore } from "../../store/authStore";

export async function register(
  name: string,
  email: string,
  password: string,
  venueManager: boolean
) {
  try {
    const url = `${BASE_API_URL}${API_AUTH}${API_REGISTER}`;
    const body = { name, email, password, venueManager };

    const data = await authFetch<{
      data: {
        name: string;
        email: string;
        venueManager: boolean;
        accessToken: string;
        avatar?: { url: string; alt: string };
        banner?: { url: string; alt: string };
      };
    }>(url, "POST", body);

    if (!data?.data?.accessToken) {
      throw new Error("No access token found in response");
    }

    const expiresIn = 60 * 60 * 1000; // 1 hour
    const expiryTime = Date.now() + expiresIn;

    // ✅ Sikrer at `avatar` og `banner` **alltid** har en verdi
    const avatar = data.data.avatar || { url: "", alt: "No avatar" };
    const banner = data.data.banner || { url: "", alt: "No banner" };

    // ✅ Bruk `registerUser()` fra Zustand-storen
    useAuthStore.getState().registerUser(
      {
        name: data.data.name,
        email: data.data.email,
        avatar,
        banner,
        venueManager: data.data.venueManager,
      },
      data.data.accessToken,
      expiryTime
    );

    console.log("✅ Registration successful, Zustand state updated!");
    console.log("🟢 VenueManager status lagret:", data.data.venueManager);
    
    return data.data;
  } 
  catch (error) {
    console.error("❌ Registration error:", error);
    throw error;
  }
}
