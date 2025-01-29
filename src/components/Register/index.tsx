import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth/register";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false); // ✅ Bruker kan velge Venue Manager
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await register(name, email, password, venueManager);
      navigate("/profile"); // ✅ Naviger til profil etter registrering
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        {/* ✅ Venue Manager Toggle */}
        <div className="flex items-center justify-between mt-4">
          <label htmlFor="venueManager" className="text-md text-gray-700">
            Register as Venue Manager?
          </label>
          <input
            id="venueManager"
            type="checkbox"
            className="w-5 h-5 ml-2 cursor-pointer"
            checked={venueManager}
            onChange={() => setVenueManager(!venueManager)}
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
