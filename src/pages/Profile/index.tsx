import { useEffect, useState } from 'react';
import { updateVenueManagerStatus } from '../../api/profile/Update';
import Logout from '../../components/Logout';
import { useAuthStore } from '../../store/authStore';

function Profile() {
  const { profile, updateVenueManager } = useAuthStore();
  const [venueManager, setVenueManager] = useState(
    profile?.venueManager ?? false
  );

  // Add debugging useEffect
  useEffect(() => {
    const state = useAuthStore.getState();
    console.log('Profile Component - Current Auth State:', {
      hasProfile: !!state.profile,
      hasToken: !!state.accessToken,
      isAuthenticated: state.isAuthenticated,
      expiresAt: state.expiresAt,
    });
  }, []);

  useEffect(() => {
    if (profile?.venueManager !== undefined) {
      setVenueManager(profile.venueManager);
      console.log('Profile venueManager updated:', profile.venueManager);
    }
  }, [profile]);

  // Add logging to the toggle handler
  const handleVenueManagerToggle = async () => {
    const newStatus = !venueManager;
    console.log(
      'Starting venue manager toggle. Current token:',
      useAuthStore.getState().accessToken
    );

    setVenueManager(newStatus);

    try {
      await updateVenueManagerStatus(newStatus);
      updateVenueManager(newStatus);
      console.log('Venue manager toggle completed successfully');
    } catch (error) {
      console.error('Error in venue manager toggle:', error);
      setVenueManager(!newStatus); // Revert on error
    }
  };

  if (!profile) {
    console.log('No profile found in Profile component');
    return <p>⚠️ You must be logged in to view this page.</p>;
  }

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
          checked={venueManager} // ✅ Alltid true/false, aldri undefined
          onChange={handleVenueManagerToggle}
        />
      </div>
      <Logout />
    </div>
  );
}

export default Profile;

// import { useEffect, useState } from "react";
// import { useAuthStore } from "../../store/authStore";
// import Logout from "../../components/Logout";
// import { updateVenueManagerStatus } from "../../api/profile/Update";

// function Profile() {
//   const { profile, updateVenueManager } = useAuthStore();
//   const [venueManager, setVenueManager] = useState(profile?.venueManager ?? false);

//   // ✅ Oppdater `venueManager` når `profile` lastes inn
//   useEffect(() => {
//     if (profile?.venueManager !== undefined) {
//       setVenueManager(profile.venueManager);
//     }
//   }, [profile]);

//   if (!profile) {
//     return <p>⚠️ You must be logged in to view this page.</p>;
//   }

//   const handleVenueManagerToggle = async () => {
//     const newStatus = !venueManager;
//     setVenueManager(newStatus); // ✅ Oppdater lokal state umiddelbart
//     await updateVenueManagerStatus(newStatus); // ✅ Oppdater API-et
//     updateVenueManager(newStatus); // ✅ Oppdater Zustand
//   };
