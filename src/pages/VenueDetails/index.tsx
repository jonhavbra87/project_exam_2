import { useParams } from 'react-router-dom';
import { API_VENUES, BASE_API_URL } from '../../api/apiConfig';
import VenueRating from '../../components/VenueRating';
import MetaDataVenue from '../../components/MetaDataVenue';
import GradientHeading from '../../styles/GradientHeading';
import { SlHeart } from 'react-icons/sl';
import VenueMap from '../../components/VenueMap';
import MediaGallery from '../../components/MediaGallery';
import VenueAddress from '../../components/VenueAddress';
import { useEffect } from 'react';
import { useVenueAPI } from '../../hooks/useVenueAPI';
import VenueCalendar from '../../components/VenueCalendar';
import { FaUser } from 'react-icons/fa';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';


function VenueDetails() {
  const { id } = useParams();
  const { venueDetails, isLoading, isError, fetchVenueDetails } = useVenueAPI();

  useEffect(() => {
    if (id) {
      fetchVenueDetails(`${BASE_API_URL}${API_VENUES}/${id}?_owner=true`);
    }
  }, [id, fetchVenueDetails]);

  useEffect(() => {
    if (isError) {
      toast.error('An error occurred while fetching data. Please try again later.');
    }
  }, [isError]);

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (isError || !venueDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-h2-mobile md:text-h2-desktop font-heading font-semibold text-secondary mb-4">
          Error Loading Venue
        </h2>
        <p className="text-body-large-mobile md:text-body-large-desktop font-body font-medium">
          An error occurred while fetching data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex items-center mb-4">
        <GradientHeading className="text-h1-desktop font-bold mx-auto">
          Venue Details
        </GradientHeading>
      </div>

      {/* Image Gallery - needs fixing */}
      <div>
        <MediaGallery images={venueDetails.media} />
      </div>

      {/* Main Content Layout */}
      <div className="mt-6 flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="md:w-2/3">
          <h2 className="text-h2-mobile md:text-h2-desktop font-bold flex flex-row">
            {venueDetails.name}
            <span>
              <SlHeart className="text-primary text-lg" />
            </span>
          </h2>
          <p className="text-ingress-mobile md:text-ingress-desktop text-text-secondary mb-4">
            {venueDetails.location.country || "Secret location"}
          </p>
          <VenueRating rating={venueDetails.rating} />

          <h3 className="text-h3-mobile md:text-h3-desktop font-ingress font-semibold mt-6">
            Description
          </h3>
          <p className="text-body-large-mobile md:text-body-large-desktop font-body text-text-primary mb-4">
            {venueDetails.description}
          </p>

          <div className="flex flex-row  items-center text-body-large-desktop font-body text-text-primary mb-2 gap-2">
            <FaUser className='text-secondary'/>{' '}
            <p>{venueDetails.maxGuests}</p>
          </div>
          <p className='text-body-large-mobile md:text-body-large-desktop font-body font-medium'>{venueDetails.price} NOK per night</p>
          
          <h3 className="text-h3-mobile md:text-h3-desktop  font-ingress font-semibold mt-6">
            Facilities
          </h3>
          <div className="mt-4 flex flex-wrap gap-4">
            <MetaDataVenue meta={venueDetails.meta} />
          </div>

          <h3 className="text-h3-mobile md:text-h3-desktop font-ingress font-semibold mt-6">
            Venue Manager
          </h3>
          <div className="mt-4 flex items-center gap-4">
            <img
              src={
                venueDetails.owner?.avatar?.url ||
                'https://via.placeholder.com/150'
              }
              alt="Owner Avatar"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-ingress-mobile md:text-ingress-desktop font-ingress font-bold">
                {venueDetails.owner?.name || 'No Owner name available'}
              </h3>
              <p className="text-body-small-mobile md:text-body-medium-desktop font-body text-text-secondary line-clamp-1">
                {venueDetails.owner?.bio || 'No bio available'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-1/3">
          <h3 className="text-h3-mobile md:text-h3-desktop font-ingress font-bold mb-4">Book your stay</h3>
          <VenueCalendar venueId={id!} maxGuests={venueDetails.maxGuests} pricePerNight={venueDetails.price}/>
        </div>
      </div>

      {/* Location */}
      <div className="mt-6">
        <h3 className="text-h3-mobile md:text-h3-desktop font-ingress font-semibold">Location</h3>
        <VenueAddress location={venueDetails.location} />
        <VenueMap venue={venueDetails} />
      </div>
    </div>
  );
}

export default VenueDetails;