// import { useEffect } from "react";
import { useAuthStore } from '../../store/authStore';
// import useFetchVenueManager from "../../hooks/useFetchVenueManager";
import useUpdateProfile from '../../hooks/useUpdateProfile';

const UpdateProfile = () => {
  const { venueManager } = useAuthStore();
  // const { fetchVenueManager } = useFetchVenueManager();
  const { updateProfile, loading, error } = useUpdateProfile();

  const handleChange = () => {
    updateProfile({ venueManager: !venueManager });
  };

  return (
    <div className="container flex items-center justify-between p-4">
      <div className="text-ingress-mobile md:text-ingress-desktop font-ingress font-medium">
        Venue Manager
      </div>
      <label className="space-x-2 mt-4 cursor-pointer">
        {/* Skjult standard checkbox for tilgjengelighet */}
        <input
          type="checkbox"
          checked={venueManager}
          onChange={handleChange}
          disabled={loading}
          className="sr-only peer"
        />

        {/* Stylized switch */}
        <div
          className={`relative flex items-center p-0.5 w-12 h-6 rounded-3xl transition-colors duration-300 ease-in-out
      peer-checked:bg-accent-2 peer-disabled:bg-gray-300 bg-gray-400`}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out
       ${venueManager ? 'translate-x-6' : 'translate-x-0'}`}
          />
        </div>

        {/* Label */}
      </label>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
};

export default UpdateProfile;
