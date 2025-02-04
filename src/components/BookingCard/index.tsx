import { Booking } from "../../types/Booking";
import MetaDataVenue from "../MetaDataVenue";

// 🔥 Booking-kort komponent
const BookingCard = ({ booking, isExpired }: { booking: Booking; isExpired: boolean }) => {
    const { venue, customer } = booking;
  
    return (
      <div className={`bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row border ${isExpired ? "border-gray-400" : "border-blue-500"}`}>
        {/* 📌 Venue-bilde */}
        <div className="md:w-1/3 relative">
          <img
            src={venue?.media?.[0]?.url || "https://via.placeholder.com/400"}
            alt={venue?.media?.[0]?.alt || "Venue image"}
            className="w-full h-full object-cover"
          />
          {/* 📌 Rating */}
          {venue?.rating && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
              ⭐ {venue.rating}
            </div>
          )}
        </div>
  
        {/* 📌 Venue-informasjon */}
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-h2-mobile md:text-h2-desktop">{venue?.name || "Unknown place"}</h2>
            <p className="text-ingress-mobile md:text-ingress-desktop font-semibold">{venue?.location?.country || "Unknown country"}</p>
            <p className="text-body-large-mobile md:text-body-large-desktop text-text-secondary font-medium mt-2">{venue?.description?.slice(0, 150)}...</p>
  
            {/* 📌 Venue fasiliteter */}
                <div className="mt-4">
            <MetaDataVenue meta={venue?.meta || { wifi: false, parking: false, breakfast: false, pets: false }} />
          </div>
          </div>
  
          {/* 📌 Booking-informasjon */}
          <div className="mt-4 flex justify-between items-center text-gray-700 text-body-large-mobile md:text-body-large-desktop">
            <span>📅 {new Date(booking.dateFrom).toLocaleDateString()} - {new Date(booking.dateTo).toLocaleDateString()}</span>
            <span>👥 Guests: {booking.guests}</span>
            <span className="text-green-600 font-semibold">✅ Betalt</span>
          </div>
  
          {/* 📌 Kunde-info */}
          <div className="mt-4 flex items-center gap-4 border-t pt-4">
            <img
              src={customer?.avatar?.url || "https://via.placeholder.com/50"}
              alt={customer?.avatar?.alt || "Customer avatar"}
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <p className="font-semibold">{customer?.name || "Ukjent kunde"}</p>
              <p className="text-sm text-gray-500">{customer?.email}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BookingCard;