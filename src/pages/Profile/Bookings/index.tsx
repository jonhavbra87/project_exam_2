import { useEffect } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { useBookingAPI } from '../../../hooks/useBookingAPI';
import BookingCard from '../../../components/BookingCard';
import { MdBedroomParent } from 'react-icons/md';
import GradientHeading from '../../../styles/GradientHeading';
/**
 * Bookings Component
 *
 * Displays a user's booking history, categorized into active and expired bookings
 *
 * @component
 * @returns {React.ReactElement} A comprehensive view of user's bookings
 *
 * @description
 * Fetches and displays bookings for the logged-in user, with features:
 * - Automatic categorization of bookings (active vs. expired)
 * - Loading state handling
 * - Error state handling
 * - Empty state for users with no bookings
 * - Responsive design for mobile and desktop
 * - Refresh functionality for bookings
 *
 * @remarks
 * Requires authentication and uses custom hooks for API interaction
 *
 * @example
 * // Typical usage in a protected route
 * <Route path="/bookings" element={<Bookings />} />
 */

function Bookings(): JSX.Element {
  const { fetchBookingsByUser, bookings, isLoading, isError } = useBookingAPI();
  const { profile } = useAuthStore();

  const currentDate = new Date();
  const activeBookings = bookings.filter(
    (booking) => new Date(booking.dateTo) > currentDate
  );
  const expiredBookings = bookings.filter(
    (booking) => new Date(booking.dateTo) <= currentDate
  );

  const profileName = profile?.name;
  useEffect(() => {
    if (profileName) {
      fetchBookingsByUser(profileName);
    }
  }, [profileName, fetchBookingsByUser]);

  if (isLoading)
    return <p className="text-center text-gray-500">Laster bookinger...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">
        Kunne ikke hente bookinger. Prøv igjen senere.
      </p>
    );
  if (bookings.length === 0)
    return (
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h2 className="text-h1-mobile md:text-h1-desktop font-heading font-semibold text-secondary mb-16">
            No Bookings
          </h2>
          <MdBedroomParent className="text-6xl text-primary-3 mb-8" />
          <p className="text-body-large-mobile md:text-body-large-desktop font-body font-medium mb-16">
            It looks like you don’t have any bookings yet. Make a booking now to
            get started!
          </p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto">
      <GradientHeading>My Bookings</GradientHeading>

      {activeBookings.length > 0 && (
        <div>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading font-semibold text-text-primary mb-4">
            Active Bookings
          </h2>
          <div className="grid gap-6">
            {activeBookings.map((booking, index) => (
              <BookingCard
                key={`active-${booking.id}-${index}`}
                booking={booking}
                isExpired={false}
                onRefresh={() => {
                  if (profile?.name) {
                    fetchBookingsByUser(profile.name);
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}
      {expiredBookings.length > 0 && (
        <div className="mt-10">
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading font-semibold mb-4 text-text-secondary">
            Expired Bookings
          </h2>
          <div className="grid gap-6 opacity-80 grayscale">
            {expiredBookings.map((booking, index) => (
              <BookingCard
                key={`expired-${booking.id}-${index}`}
                booking={booking}
                isExpired={true}
                onRefresh={() => {
                  if (profile?.name) {
                    fetchBookingsByUser(profile.name);
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;
