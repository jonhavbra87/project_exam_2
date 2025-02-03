import { useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useBookingAPI } from "../../../hooks/useBookingAPI";

function Bookings() {
  const { fetchBookingsByUser, bookings, isLoading, isError } = useBookingAPI();
  const { profile } = useAuthStore(); // 📌 Henter innlogget bruker

  useEffect(() => {
    if (profile?.email) {
      fetchBookingsByUser(profile.email); // 📌 Henter kun bookinger for denne brukeren
    }
    
}, [profile?.email, fetchBookingsByUser]);

  if (isLoading) return <p>Laster bookinger...</p>;
  if (isError) return <p>Kunne ikke hente bookinger. Prøv igjen senere.</p>;
  if (bookings.length === 0) return <p>Du har ingen bookinger.</p>;

  return (
    <div>
      <h1>Mine bookinger</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <strong>Fra:</strong> {new Date(booking.dateFrom).toLocaleDateString()} -  
            <strong> Til:</strong> {new Date(booking.dateTo).toLocaleDateString()}  
            <br />
            <strong>Gjester:</strong> {booking.guests}  
            <br />
            <strong>Sted:</strong> {booking.venue?.name || "Ukjent venue"}  
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bookings;
