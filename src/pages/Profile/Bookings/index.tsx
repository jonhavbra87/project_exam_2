import { useEffect } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { useBookingAPI } from '../../../hooks/useBookingAPI';
import BookingCard from '../../../components/BookingCard';
import { MdBedroomParent } from 'react-icons/md';
import GradientHeading from '../../../styles/GradientHeading';

function Bookings() {
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
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading font-semibold  text-text-primary mb-4">
            Active Bookings
          </h2>
          <div className="grid gap-6">
            {activeBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isExpired={false}
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
          <div className="grid gap-6 opacity-70">
            {expiredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isExpired={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;
