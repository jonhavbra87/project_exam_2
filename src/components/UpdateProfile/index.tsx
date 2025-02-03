import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import useFetchVenueManager from "../../hooks/useFetchVenueManager";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const UpdateProfile = () => {
  const { profile } = useAuthStore(); // 🔹 Sørger for at profile er brukt
  const { venueManager, fetchVenueManager } = useFetchVenueManager();
  const { updateProfile, loading, error } = useUpdateProfile();
  const [isVenueManager, setIsVenueManager] = useState<boolean | null>(venueManager);

  useEffect(() => {
    fetchVenueManager();
  }, []);

  useEffect(() => {
    if (venueManager !== null) {
      setIsVenueManager(venueManager);
    }
  }, [venueManager]);

  // 📌 Fikset: `handleVenueManagerChange` er nå brukt i onChange
  const handleVenueManagerChange = async () => {
    if (isVenueManager === null) return;
    const newStatus = !isVenueManager;
    setIsVenueManager(newStatus);

    await updateProfile({ venueManager: newStatus });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Update Profile</h2>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <p className="text-gray-600 text-center mb-2">
          Update your Venue Manager status
        </p>

        {/* 📌 Fikset: `profile` blir nå brukt i JSX */}
        <p className="text-center text-gray-500">Logged in as: <strong>{profile?.name}</strong></p>

        <label className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            checked={isVenueManager ?? false}
            onChange={handleVenueManagerChange} // 📌 Fikset: Funksjonen brukes nå riktig
            disabled={loading}
            className="w-5 h-5"
          />
          <span>{isVenueManager ? "You are a Venue Manager" : "Become a Venue Manager"}</span>
        </label>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default UpdateProfile;
