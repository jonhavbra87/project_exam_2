import { useEffect } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { useBookingAPI } from '../../../hooks/useBookingAPI';
import BookingCard from '../../../components/BookingCard';

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
    return <p className="text-center text-gray-500">Du har ingen bookinger.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Mine bookinger</h1>
      {activeBookings.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Active Bookings</h2>
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
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">
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
