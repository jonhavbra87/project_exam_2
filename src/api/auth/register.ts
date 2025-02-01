import { API_AUTH, API_REGISTER, BASE_API_URL } from '../apiConfig';
import { authFetch } from './authFetch';
import { login } from './login'; // 🔹 Importer login-funksjonen
import { useAuthStore } from '../../store/authStore';

export async function register(
  name: string,
  email: string,
  password: string,
  venueManager: boolean
) {
  try {
    const url = `${BASE_API_URL}${API_AUTH}${API_REGISTER}`;
    const body = { name, email, password, venueManager };

    // 🔹 **1️⃣ Send registreringsforespørsel**
    const data = await authFetch<{
      data: {
        name: string;
        email: string;
        bio?: string;
        venueManager: boolean;
        avatar?: { url: string; alt: string };
        banner?: { url: string; alt: string };
      };
    }>(url, 'POST', body);

    if (!data?.data) {
      throw new Error('No user data found in response');
    }

    console.log('✅ Registration successful, proceeding to login...');

    // 🔹 **2️⃣ Logg inn brukeren automatisk etter registrering**
    const user = await login(email, password);

    console.log('✅ Auto-login successful!', user);

    // 🔹 **3️⃣ Oppdater Zustand `useAuthStore` med riktig brukerdata**
    const expiresIn = 60 * 60 * 1000; // 1 time
    const expiryTime = Date.now() + expiresIn;

    useAuthStore.setState({
      profile: {
        name: user.name,
        email: user.email,
        avatar: user.avatar || { url: '', alt: 'No avatar' },
        banner: user.banner || { url: '', alt: 'No banner' },
        venueManager: user.venueManager,
      },
      accessToken: user.accessToken,
      expiresAt: expiryTime,
      isAuthenticated: true,
    });

    console.log('✅ Zustand state updated with user data!');

    return user;
  } catch (error) {
    console.error('❌ Registration error:', error);
    throw error;
  }
}
