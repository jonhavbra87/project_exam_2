import { useState } from "react";
import { API_AUTH, API_KEY, API_REGISTER, BASE_API_URL } from "../api/apiConfig";
import useLogin from "./useLogin";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useLogin();

  const register = async (
    name: string,
    email: string,
    password: string,
    venueManager: boolean,
    avatarUrl: string = "",
    bannerUrl: string = ""
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_API_URL}${API_AUTH}${API_REGISTER}?_holidaze=true`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({
          name,
          email,
          password,
          venueManager,
          avatar: { url: avatarUrl, alt: `${name}'s avatar` },
          banner: { url: bannerUrl, alt: `${name}'s banner` },
        }),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (!response.ok || !result.data) {
        setError(result.message || "Unexpected response format");
        console.error("❌ API error:", result.message || "Unexpected response format");
        return null; 
      }


      const loginResponse = await login(email, password);

      if (!loginResponse) {
        setError("Login after registration failed. Please try logging in manually.");
        console.error("❌ Login after registration failed.");
        return null;
      }

      return loginResponse;

    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      console.error("❌ Error registering:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

export default useRegister;