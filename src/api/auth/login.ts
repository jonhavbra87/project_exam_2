import { save } from "../../storage/save";
import { API_AUTH, API_LOGIN, BASE_API_URL } from "../apiConfig";
import { authFetch } from "./authFetch";


type LoginResponse = {
  data: {
    accessToken: string;
    name: string;
  };
};

export async function login(email: string, password: string) {
  try {
    const url = `${BASE_API_URL}${API_AUTH}${API_LOGIN}`;
    const body = { email, password };

    const data = await authFetch<LoginResponse>(
      url,
      "POST",
      body
    );

    if (!data?.data?.accessToken) {
      throw new Error("No access token found in response");
    }

    save("token", data.data.accessToken);
    save("profile", data.data);

    return data.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}