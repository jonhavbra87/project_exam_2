import { load } from "../../storage/load";
import { API_KEY } from "../apiConfig";

/**
 * Generates headers for API requests, including authentication if available.
 */
export async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = load<string>("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else {
    console.warn("No access token found. Proceeding without authentication.");
  }

  return headers;
}
