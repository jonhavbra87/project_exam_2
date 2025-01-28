import { save } from "../../storage/save";
import { API_AUTH, API_LOGIN, BASE_API_URL } from "../apiConfig";
import { authFetch } from "./authFetch";

export type LoginResponse = {
  data: {
    accessToken: string;
    name: string;
    email: string;
  };
};

export async function login(email: string, password: string) {
  try {
    const url = `${BASE_API_URL}${API_AUTH}${API_LOGIN}`;
    const body = { email, password };

    const data = await authFetch<LoginResponse>(url, "POST", body);

    if (!data?.data?.accessToken) {
      throw new Error("No access token found in response");
    }

    const expiresIn = 60 * 60 * 1000; // 1 hour
    const expiryTime = Date.now() + expiresIn;

    save("token", { accessToken: data.data.accessToken, expiresAt: expiryTime });
    save("profile", { name: data.data.name, email: email, expiresAt: expiryTime });

    console.log("Login successful, token and profile saved!");
    
    return data.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
