import { getAuthHeaders } from "./getAuthHeaders";


/**
 * Performs an authenticated fetch request.
 */
export async function authFetch<T>(
  url: string,
  method: string = "GET",
  body: object | null = null
): Promise<T> {
  try {
    const headers = await getAuthHeaders();
    const options: RequestInit = { method, headers };

    if (body && method !== "GET") {
        options.body = JSON.stringify(body);
      }
      

    const response = await fetch(url, options);
    if (!response.ok) {
        const errorMessage = `API error: ${response.status} ${response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Unauthorized: Logging out...");
      }
      
    return response.json();
  } catch (error) {
    console.error(`API Fetch Error: ${error}`);
    throw error;
  }
}