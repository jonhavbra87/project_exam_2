import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import useFetchVenueManager from "../../hooks/useFetchVenueManager";
import GradientHeading from "../../styles/GradientHeading";
import UpdateProfile from "../../components/UpdateProfile";

function ProfilePage() {
  const { profile, logout } = useAuthStore();
  const { venueManager, fetchVenueManager, loading, error } = useFetchVenueManager();
  const navigate = useNavigate();

  if (!profile) {
return <div className="text-center text-gray-500">Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <GradientHeading className="text-h1-desktop font-bold text-center mb-6">
        Profile
      </GradientHeading>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <div className="flex flex-col items-center">
          <img
            src={profile?.avatar?.url || "https://via.placeholder.com/150"}
            alt={profile?.avatar?.alt || "User avatar"}
            className="w-24 h-24 rounded-full border"
          />
          <h2 className="text-2xl font-bold mt-4">{profile?.name}</h2>
          <p className="text-gray-600">{profile?.email}</p>
        </div>

        {/* 🔹 Viser Venue Manager-status */}
        {loading ? (
          <p className="text-gray-500">Checking venue status...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="mt-2 px-4 py-1 bg-blue-100 text-blue-700 rounded">
            {venueManager ? "You are a Venue Manager" : "Not a Venue Manager"}
          </p>
        )}

        {/* 🔹 Knapp for å oppdatere profil */}
        <div onClick={fetchVenueManager}>
          <UpdateProfile />
          </div>

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
