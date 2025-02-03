import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore'; // ✅ Zustand Store
import useLogin from '../../hooks/useLogin';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login, loading, error } = useLogin(); // ✅ API login-hook
  const authLogin = useAuthStore((state) => state.login); // ✅ Zustand login-funksjon
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLocalError(null); // Nullstill feilmelding

    try {
      const profile = await login(email, password); // ✅ Kall API-login
      if (!profile) {
        setLocalError(error || 'Login failed. Please check your credentials.');
        return;
      }

      // ✅ Oppdater Zustand med brukerdata
      authLogin(profile, profile.accessToken, Date.now() + 1000 * 60 * 60); // Setter en time utløpstid

      console.log('🟢 User logged in:', profile);
      navigate('/profile'); // ✅ Naviger til profil-siden
    } catch (error) {
      setLocalError('Unexpected error occurred. Please try again.');
      console.error('❌ Error in login:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-md rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {/* Feilmelding */}
        {(localError || error) && (
          <p className="text-red-500 text-sm text-center mb-3">
            {localError || error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
