import useFetchVenueManager from "../../hooks/useFetchVenueManager";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import GradientHeading from "../../styles/GradientHeading";

function ProfilePage() {
  const { profile, logout } = useAuthStore();
  const { venueManager, isLoading, isError, isUpdating, updateVenueManagerStatus, updateError } =
    useFetchVenueManager();
  const navigate = useNavigate();

  if (!profile) {
    return <div className="text-center text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <GradientHeading className="text-h1-desktop font-bold text-center mb-6">
        Profile
      </GradientHeading>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <div className="flex flex-col items-center">
          <img
            src={profile.avatar?.url || "https://via.placeholder.com/150"}
            alt={profile.avatar?.alt || "User avatar"}
            className="w-24 h-24 rounded-full border"
          />
          <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>

        {/* 🔹 Viser Venue Manager-status */}
        {isLoading ? (
          <p className="text-gray-500">Checking venue status...</p>
        ) : isError ? (
          <p className="text-red-500">Error loading venue status</p>
        ) : (
          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={venueManager || false}
                onChange={() => updateVenueManagerStatus(!venueManager)}
                disabled={isUpdating}
                className="w-5 h-5"
              />
              <span>{venueManager ? "You are a Venue Manager" : "Become a Venue Manager"}</span>
            </label>

            {updateError && <p className="text-red-500 text-sm mt-2">{updateError}</p>}
          </div>
        )}

        {/* 🔹 Logout-knapp */}
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
