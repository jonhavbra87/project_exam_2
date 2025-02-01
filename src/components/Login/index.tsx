import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../api/auth/login";
import { useAuthStore } from "../../store/authStore";



function LoginComponent() {
  // const { profile, login: loginStore } = useAuthStore(); // 🔹 Hent login-funksjonen fra Zustand
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login] = useAuthStore((state) => [state.login]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();


    try {
      const {name, emailAddress, avatar, banner, token, venueManager} = await useLogin(email, password); // ✅ Logg inn
      login( {profile: {name, email: emailAddress, avatar, banner, venueManager}, token} ); // 🔹 Oppdater Zustand
      
      navigate("/profile"); // ✅ Naviger etter login
    } catch (error) {
      console.log("❌ Error in login:", error);
      
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

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

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;

