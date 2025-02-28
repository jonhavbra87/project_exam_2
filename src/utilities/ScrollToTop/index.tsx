/**
 * @fileoverview Component that scrolls the window to top on route changes
 * @module components/ScrollToTop
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * A utility component that scrolls the window to the top when the route changes
 * 
 * This component doesn't render anything visible but handles automatic scrolling
 * to the top of the page whenever the URL pathname changes. It should be placed
 * near the root of your application, typically just inside the Router component.
 * 
 * @returns {null} This component doesn't render anything
 * 
 * @example
 * // App.tsx router setup
 * import ScrollToTop from './components/ScrollToTop';
 * 
 * function App() {
 *   return (
 *     <Router>
 *       <ScrollToTop />
 *       <Routes>
 *         <Toaster position='top-right' reverseOrder={false} />
 *     <Routes>
 *       <Route path="/" element={<Layout />}>
 *         <Route index element={isAuthenticated ? <Venues /> : <LandingPage />} />
 *          <Route path="venues" element={<Venues />} />
 *          <Route path="venue/:id" element={<VenueDetails />} />
 *          <Route path="/signup" element={<SignUp />} />
 *          <Route path="/login" element={<Login />} />
 *          <Route path="/register" element={<Register />} />
 *          <Route path="Profile" element={<Profile />} />
 *          <Route path='/profile/messages' element={<Messages />} />
 *          <Route path="Profile/bookings" element={<Bookings />} />
 *          <Route path="profile/editprofile" element={<EditProfile />} />
 *          <Route path="profile/venues" element={<VenuesByUser />} />
 *          <Route path="profile/venues/create" element={<ProfileVenueCreate />} />
 *          <Route path="profile/venues/:id/update" element={<ProfileVenueUpdate />} />
 *          <Route path="profile/termsofservice" element={<TermsOfService />} />
 *          <Route path="profile/privacyguidelines" element={<PrivacyGuidelines />}/>
 *          <Route path="Contact" element={<Contact />} />
 *          <Route path="*" element={<NotFound />} />
 *        </Route>
 *       </Routes>
 *     </Router>
 *   );
 * }
 */

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
    };

export default ScrollToTop;