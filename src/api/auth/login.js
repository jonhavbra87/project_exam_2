import { useState } from 'react';
import { API_AUTH, API_KEY, API_LOGIN, BASE_API_URL } from '../apiConfig';

//API hook for login
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = (useState < string) | (null > null);
  const [data, setData] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_API_URL}${API_AUTH}${API_LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Noroff-API-Key': API_KEY,
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setData(data);
      } else {
        setError('Login failed');
      }

      const {
        name,
        email: emailAddress,
        avatar,
        banner,
        accessToken,
        venueManager,
      } = data.data;
      const profile = {
        name,
        emailAddress,
        avatar,
        banner,
        token: accessToken,
        venueManager,
      };
      setData(profile);
      return data;
    } catch (error) {
      setError(error);
      console.error('Error logging in', error);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading, error, data };
};

export default useLogin;
