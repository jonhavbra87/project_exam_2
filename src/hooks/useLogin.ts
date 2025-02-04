import { useState } from 'react';
import { API_AUTH, API_KEY, API_LOGIN, BASE_API_URL } from '../api/apiConfig';
import { Profile } from '../types/Profile';
import { useAuthStore } from '../store/authStore';

//API hook for login
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [data, setData] = useState<Profile | null>(null);
  const authLogin = useAuthStore((state) => state.login); 

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const emailValue = email; // Declare the 'email' variable before using it

    try {
      const response = await fetch(`${BASE_API_URL}${API_AUTH}${API_LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Noroff-API-Key': API_KEY,
        },
        body: JSON.stringify({ email: emailValue, password }),
      });
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        setError('Login failed');
      }

      // const { name, email, avatar, banner, accessToken, venueManager } =
      //   result.data;
      const profile: Profile = {
        ...result.data,
        venueManager: result.data.venueManager ?? false, // 📌 Sørger for at venueManager aldri er `undefined`
      };
      // const profile: Profile = {
      //   name,
      //   email,
      //   avatar,
      //   banner,
      //   accessToken,
      //   venueManager,
      // };
      authLogin(profile, profile.accessToken, Date.now() + 1000 * 60 * 60); // ✅ Oppdater Zustand

      // setData(profile); // ✅ Type-safe state update
      return profile;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      console.error('❌ Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading, error };
};

export default useLogin;
