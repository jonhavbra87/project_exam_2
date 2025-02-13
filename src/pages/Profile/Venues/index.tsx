import { useVenueAPI } from "../../../hooks/useVenueAPI";
import { useAuthStore } from "../../../store/authStore";
import { useEffect } from "react";
import { Venues } from "../../../types/Venues";
import { FaPeopleRoof } from "react-icons/fa6";


const VenuesByUser = () => {

  const { profile } = useAuthStore();
const { fetchVenuesByUser, isLoading, isError, venues } = useVenueAPI();
const profileName = profile?.name;
const venuesArray: Venues[] = Array.isArray(venues) ? venues : [];

useEffect(() => {
  if (profileName) {
    fetchVenuesByUser(profileName);
  }
}, [profileName, fetchVenuesByUser]);




console.log("Venues from API:", venues);

if (isLoading)
    return <p className="text-center text-gray-500">Laster bookinger...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">
        Kunne ikke hente bookinger. Prøv igjen senere.
      </p>
    );
  if (venues.length === 0)
    return <p className="text-center text-gray-500">Du har ingen bookinger.</p>;

  return (
    <div>
    <h1 className="text-3xl font-bold text-center mb-6">My Venues</h1>

    {/* 🔹 Map over venuesUser array */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venuesArray.map((venue) => (
          <div key={venue.id} className="p-4 border rounded-lg shadow-md bg-white">
            <img
             src={venue?.media?.[0]?.url || 'https://via.placeholder.com/400'}
             alt={venue?.media?.[0]?.alt || 'Venue image'}
             />
            <h2 className="text-h2-mobile md:text-h2-desktop font-semibold">
              {venue.name}
            </h2>
            <p className="text-text-secondary">{venue.description}</p>
            <p className="text-text-secondary font-semibold mt-2">${venue.price} per night</p>
            <p className="text-text-secondary font-semibold mt-2 flex gap-2"><FaPeopleRoof /> <span>{venue.maxGuests}</span></p>
          </div>
        ))}
        </div>

    </div>
  );
}

export default VenuesByUser;