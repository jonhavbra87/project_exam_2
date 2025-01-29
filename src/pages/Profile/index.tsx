import { useState } from "react";
import Logout from "../../components/Logout";
import { useAuthStore } from "../../store/authStore";

function Profile() {
  const { profile, updateVenueManager } = useAuthStore(); // ✅ Hent updateVenueManager fra Zustand
  const [venueManager, setVenueManager] = useState(profile?.venueManager || false);

  if (!profile) {
    return <p>⚠️ You must be logged in to view this page.</p>;
  }

  const handleVenueManagerToggle = () => {
    const newStatus = !venueManager;
    setVenueManager(newStatus);
    updateVenueManager(newStatus); // ✅ Oppdater Zustand
    console.log("🔹 Venue Manager status updated:", newStatus);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Welcome, {profile.name}!</h1>
      <p>Email: {profile.email}</p>

      {/* ✅ Venue Manager Toggle Switch */}
      <div className="flex items-center justify-between mt-4">
        <label htmlFor="venueManager" className="text-md text-gray-700">
          Become a Venue Manager?
        </label>
        <input
          id="venueManager"
          type="checkbox"
          className="w-5 h-5 ml-2 cursor-pointer"
          checked={venueManager}
          onChange={handleVenueManagerToggle}
        />
      </div>

      <div className="mt-6">
        <Logout /> {/* 🔹 Legg til logout-knappen her */}
      </div>
    </div>
  );
}

export default Profile;
