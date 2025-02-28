import { useVenueAPI } from '../../../hooks/useVenueAPI';
import { useAuthStore } from '../../../store/authStore';
import { useEffect } from 'react';
import { Venues } from '../../../types/Venues';
import { FaPeopleRoof } from 'react-icons/fa6';
import { IoSettings } from 'react-icons/io5';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useToastNotification from '../../../hooks/useToastNotification';
import GradientHeading from '../../../styles/GradientHeading';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { BsHouseExclamationFill } from 'react-icons/bs';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';

const VenuesByUser = () => {
  const { profile } = useAuthStore();
  const { fetchVenuesByUser, deleteVenue, isLoading, isError, venues } =
    useVenueAPI();
  const profileName = profile?.name;
  const venuesArray: Venues[] = Array.isArray(venues) ? venues : [];
  const toast = useToastNotification();
  const navigate = useNavigate();
  const navigateToVenue = ({ venue }: { venue: Venues }) => {
    navigate(`/venue/${venue.id}`);
  };

  useEffect(() => {
    if (profileName) {
      fetchVenuesByUser(profileName);
    }
  }, [profileName, fetchVenuesByUser]);

  const handleDeleteVenue = async (venueId: string) => {
    if (!profileName) {
      toast.error('Error: Profile not found.');
      return;
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this venue?'
    );
    if (!confirmDelete) return;

    try {
      await deleteVenue(venueId);
      toast.success('Venue deleted successfully!');
      fetchVenuesByUser(profileName);
    } catch (error) {
      console.error('Failed to delete venue', error);
      toast.error('Error: Could not delete the venue. Please try again.');
    }
  };

  if (isLoading)
    return (<LoadingSpinner isLoading={isLoading} />);
  if (isError)
    return (
      toast.error('An error occurred while fetching data. Please try again later.')
    );
  if (venues.length === 0)
    return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-h1-mobile md:text-h1-desktop font-heading font-semibold text-secondary mb-16">No Venues</h2>
      <BsHouseExclamationFill className="text-6xl text-primary-3 mb-8" />
      <p className="text-body-large-mobile md:text-body-large-desktop font-body font-medium mb-16">It looks like you don't have any venues yet. Create one now to start exploring your listings!</p>
      </div>
    </div>
    );

  return (
    <div>
      <GradientHeading>My Venues</GradientHeading>

      {/* 🔹 Map over venuesUser array */}
      <div className="flex flex-col gap-4">
        {venuesArray.map((venue) => (
          <div
            key={venue.id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            {/* Responsive layout container - column on mobile, row on larger screens */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-stretch">
              {/* Image - Full width on mobile, right side on larger screens */}
              <div className="w-full md:hidden mb-3">
                <img
                  src={venue?.media?.[0]?.url || 'https://via.placeholder.com/400'}
                  alt={venue?.media?.[0]?.alt || 'Venue image'}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              
              {/* Content */}
              <div className="flex flex-col flex-grow md:pr-4">
                {/* Venue details */}
                <h2 className="text-h2-mobile md:text-h2-desktop font-heading font-semibold">
                  {venue.name}
                </h2>
                <p className="text-body-large-mobile md:text-body-medium-desktop font-body font-light text-text-secondary mt-1 line-clamp-2">
                  {venue.description}
                </p>
                <p className="text-body-large-mobile md:text-body-medium-desktop font-body font-semibold text-text-secondary mt-2 flex items-center gap-2">
                <HiOutlineCurrencyDollar /> <span>{venue.price} per night</span>
                </p>
                <p className="text-body-large-mobile md:text-body-medium-desktop font-body font-semibold text-text-secondary mt-2 flex items-center gap-2">
                  <FaPeopleRoof /> <span>{venue.maxGuests} guests</span>
                </p>
                
                {/* Action buttons in a row */}
                <div className="flex flex-row items-center gap-3 mt-auto pt-4">
                  <button
                    onClick={() => navigateToVenue({ venue })}
                    className="px-4 py-2 bg-button-primary text-body-large-mobile md:text-body-medium-desktop font-button font-medium text-white rounded-lg hover:bg-button-hover"
                  >
                    View
                  </button>
                  
                  <button
                    onClick={() => navigate(`/profile/venues/${venue.id}/update`)}
                    className="p-2 text-gray-700 rounded-lg hover:text-gray-500"
                    title="Edit venue"
                  >
                    <IoSettings />
                  </button>

                  <button
                    className="p-2 text-red-500 rounded-lg hover:text-red-300"
                    onClick={() => handleDeleteVenue(venue.id)}
                    title="Delete venue"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              {/* Image - Hidden on mobile, visible on larger screens */}
              <div className="hidden md:block md:flex-shrink-0 md:w-1/3 md:self-stretch">
                <img
                  src={venue?.media?.[0]?.url || 'https://via.placeholder.com/400'}
                  alt={venue?.media?.[0]?.alt || 'Venue image'}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenuesByUser;