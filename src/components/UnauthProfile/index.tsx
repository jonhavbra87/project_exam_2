import { useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { CustomButton } from "../CustomButton";
import NoroffLogo from '../../assets/noroff_logo.svg';
/**
* UnauthProfile component displays an access denied message for unauthenticated users
* 
* @component
* @returns {JSX.Element} - Rendered UnauthProfile component
* 
* @description
* A protective component that prevents unauthorized access to profile features.
* Displays a friendly but clear access denied message with a lock icon
* and a login button that redirects users to the login page.
* 
* Used as a fallback when unauthenticated users attempt to access protected routes.
* The component is responsive with different text sizes for mobile and desktop views.
* 
* @example
* // Usage in a protected route
* const ProfileRoute = () => {
*   const { isAuthenticated } = useAuthStore();
*   
*   return isAuthenticated ? <ProfilePage /> : <UnauthProfile />;
* };
* 
* @example
* // Usage with React Router and conditional rendering
* <Route 
*   path="/profile" 
*   element={isAuthenticated ? <ProfilePage /> : <UnauthProfile />} 
* />
*/

function UnauthProfile(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-h1-mobile md:text-h1-desktop font-heading font-semibold text-secondary mb-16">Access Denied</h2>
      <FiLock className="text-6xl text-primary-3 mb-8" />
      <p className="text-body-large-mobile md:text-body-large-desktop font-body font-medium mb-16">You must be logged in to view your profile.</p>
    <div className="w-1/3">
    <CustomButton
        text="Login with Noroff"
        icon={NoroffLogo}
        type="button"
        onClick={() => navigate('/login')}
        disabled={false}
        variant="primary"
        />
    </div>
    </div>
  );
}

export default UnauthProfile;
