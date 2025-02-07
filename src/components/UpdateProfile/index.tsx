// import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
// import useFetchVenueManager from "../../hooks/useFetchVenueManager";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const UpdateProfile = () => {
  const { venueManager } = useAuthStore();
  // const { fetchVenueManager } = useFetchVenueManager();
  const { updateProfile, loading, error } = useUpdateProfile();

  const handleChange = () => {
    updateProfile({ venueManager: !venueManager });
  }


  return (
    <div className="container mx-auto p-6">

      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">

        <label className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            checked={venueManager}
            onChange={() => handleChange()} 
            disabled={loading}
            className="w-5 h-5"
          />
          <span>{venueManager ? "You are a Venue Manager" : "Become a Venue Manager"}</span>
        </label>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default UpdateProfile;
