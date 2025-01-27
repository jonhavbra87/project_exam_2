import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { BASE_API_URL } from '../../api/apiConfig';
import { VenuePrice } from '../../components/VenuePrice';
import VenueRating from '../../components/VenueRating';
import { Venues } from '../../types/Venues';
import MetaDataVenue from '../../components/MetaDataVenue';
import GradientHeading from '../../styles/GradientHeading';
import { SlHeart } from 'react-icons/sl';
import VenueMap from '../../components/VenueMap';
import MediaGallery from '../../components/MediaGallery';
import VenueAddress from '../../components/VenueAddress';

function ProductDetails() {
  // Get `id` from URL parameters
  const { id } = useParams();

  // Fetch product details using `useApi`
  const {
    data: venues,
    isLoading,
    isError,
  } = useApi<Venues>(`${BASE_API_URL}/venues/${id}?_owner=true`);

  console.log('API response:', venues);

  // Show loading message if `isLoading` is `true`
  if (isLoading) {
    return <div>Loading...</div>;
  }

  //Show error message if `isError` is `true`
  if (isError || !venues) {
    return <div>Error loading data.</div>;
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
        <MediaGallery images={venues.media} />
      </div>

      {/* Main Content Layout */}
      <div className="mt-6 flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="md:w-2/3">
          <h2 className="text-h2-desktop font-bold flex flex-row">
            {venues.name}
            <span>
              <SlHeart className="text-primary text-lg" />
            </span>
          </h2>
          <p className="text-ingress-desktop text-text-secondary mb-4">
            {venues.location.country}
          </p>
          <VenueRating rating={venues.rating} />

          <h3 className="text-ingress-desktop font-semibold mt-6">
            Description
          </h3>
          <p className="text-md text-text-primary mb-4">{venues.description}</p>

          <h3 className="text-ingress-desktop font-semibold mt-6">
            Facilities
          </h3>
          <div className="mt-4 flex flex-wrap gap-4">
            <MetaDataVenue meta={venues.meta} />
          </div>

          <h3 className="text-ingress-desktop font-semibold mt-6">
            Venue Manager
          </h3>
          <div className="mt-4 flex items-center gap-4">
            <img
              src={
                venues.owner.avatar?.url || 'https://via.placeholder.com/150'
              }
              alt="Owner Avatar"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-body-large-desktop font-bold">
                {venues.owner.name || 'No Owner name available'}
              </h3>
              <p className="text-body-medium-desktop text-text-secondary line-clamp-1">
                {venues.owner.bio || 'No bio available'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-1/3 p-6 bg-gray-50 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Book your stay</h3>
          <label className="block mb-2">Check-in</label>
          <input type="date" className="w-full p-2 border rounded" />

          <label className="block mt-4 mb-2">Check-out</label>
          <input type="date" className="w-full p-2 border rounded" />

          <label className="block mt-4 mb-2">Guests</label>
          <input
            type="number"
            min="1"
            max="10"
            className="w-full p-2 border rounded"
          />

          <div className="mt-4 text-gray-600">
            <p>Price:</p>
            <VenuePrice product={venues} />
          </div>
          <button className="mt-4 w-full bg-accent px-4 py-2 rounded-md hover:bg-button-hoverSecondary">
            Book
          </button>
        </div>
      </div>

      {/* Location */}
      <div className="mt-6">
        <h3 className="text-ingress-desktop font-semibold">Location</h3>
<VenueAddress location={venues.location} />
        <VenueMap venue={venues} />
      </div>
    </div>
  );
}

export default ProductDetails;
