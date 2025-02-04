import { useParams } from 'react-router-dom';
import { API_VENUES, BASE_API_URL } from '../../api/apiConfig';
import { VenuePrice } from '../../components/VenuePrice';
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

function VenueDetails() {
  const { id } = useParams();
  const { venueDetails, isLoading, isError, fetchVenueDetails } = useVenueAPI();

  useEffect(() => {
    if (id) {
      fetchVenueDetails(`${BASE_API_URL}${API_VENUES}/${id}?_owner=true`);
    }
  }, [id, fetchVenueDetails]);

  console.log('API response:', venueDetails);

  if (isLoading) {
    return (
      <div className="text-center text-gray-500">
        ⏳ Loading venue details...
      </div>
    );
  }

  if (isError || !venueDetails) {
    return (
      <div className="text-center text-red-500">
        ❌ Error loading venue data.
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex items-center mb-4">
        <button className="text-text-secondary  ">&lt; Back</button>
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
          <h2 className="text-h2-desktop font-bold flex flex-row">
            {venueDetails.name}
            <span>
              <SlHeart className="text-primary text-lg" />
            </span>
          </h2>
          <p className="text-ingress-desktop text-text-secondary mb-4">
            {venueDetails.location.country}
          </p>
          <VenueRating rating={venueDetails.rating} />

          <h3 className="text-ingress-desktop font-semibold mt-6">
            Description
          </h3>
          <p className="text-md text-text-primary mb-4">
            {venueDetails.description}
          </p>

          <h3 className="text-ingress-desktop font-semibold mt-6">
            Facilities
          </h3>
          <div className="mt-4 flex flex-wrap gap-4">
            <MetaDataVenue meta={venueDetails.meta} />
          </div>

          <h3 className="text-ingress-desktop font-semibold mt-6">
            Venue Manager
          </h3>
          <div className="mt-4 flex items-center gap-4">
            <img
              src={
                venueDetails.owner.avatar?.url ||
                'https://via.placeholder.com/150'
              }
              alt="Owner Avatar"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-body-large-desktop font-bold">
                {venueDetails.owner.name || 'No Owner name available'}
              </h3>
              <p className="text-body-medium-desktop text-text-secondary line-clamp-1">
                {venueDetails.owner.bio || 'No bio available'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-1/3 p-6 bg-gray-50 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Book your stay</h3>
          <VenueCalendar />

          <div className="mt-4 text-gray-600">
            <p>Price:</p>
            <VenuePrice product={venueDetails} />
          </div>
          <button className="mt-4 w-full bg-accent px-4 py-2 rounded-md hover:bg-button-hoverSecondary">
            Book
          </button>
        </div>
      </div>

      {/* Location */}
      <div className="mt-6">
        <h3 className="text-ingress-desktop font-semibold">Location</h3>
        <VenueAddress location={venueDetails.location} />
        <VenueMap venue={venueDetails} />
      </div>
    </div>
  );
}

export default VenueDetails;
