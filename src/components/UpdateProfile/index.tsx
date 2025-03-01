import { useAuthStore } from '../../store/authStore';
import useUpdateProfile from '../../hooks/useUpdateProfile';
/**
* UpdateProfile component for toggling venue manager status
* 
* @component
* @returns {JSX.Element} - Rendered UpdateProfile component
* 
* @description
* A toggle switch component that allows users to update their venue manager status.
* Uses the useAuthStore to access the current venue manager status and the
* useUpdateProfile hook to handle the status update in the API.
* 
* Features:
* - Styled toggle switch with animation
* - Disabled state during loading
* - Error message display
* - Immediate visual feedback
* 
* The component shows the current venue manager status and allows users to 
* toggle between being a regular user and a venue manager with a single click.
* 
* @example
* // Basic usage in profile page
* <UpdateProfile />
* 
* @example
* // Usage in a settings section
* <ProfileSection title="Account Settings">
*   <UpdateProfile />
* </ProfileSection>
*/

const UpdateProfile = ():JSX.Element => {
  const { venueManager } = useAuthStore();

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
        <input
          type="checkbox"
          checked={venueManager}
          onChange={handleChange}
          disabled={loading}
          className="sr-only peer"
        />
        <div
          className={`relative flex items-center p-0.5 w-12 h-6 rounded-3xl transition-colors duration-300 ease-in-out
      peer-checked:bg-accent-2 peer-disabled:bg-gray-300 bg-gray-400`}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out
       ${venueManager ? 'translate-x-6' : 'translate-x-0'}`}
          />
        </div>
      </label>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
};

export default UpdateProfile;
