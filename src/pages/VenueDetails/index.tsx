import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { BASE_API_URL } from '../../api/apiConfig';
import { VenuePrice } from '../../components/VenuePrice';
import VenueRating from '../../components/VenueRating';
import { Venues } from '../../types/Venues';
import MetaDataVenue from '../../components/MetaDataVenue';
import GradientHeading from '../../styles/GradientHeading';
import { SlHeart } from 'react-icons/sl';

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

  console.log('data from productdetail', venues);

  return (
    <div className="">
      <div className="flex items-center mb-4">
        <button className="text-text-secondary  ">&lt; Back</button>
        <GradientHeading className="text-h1-desktop font-bold mx-auto">
          Venue Details
        </GradientHeading>
      </div>

      {/* Product Image */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <img
          src={venues.media[0].url || 'https://via.placeholder.com/300'}
          alt={venues.media[0].alt || 'Product Image'}
          className="col-span-2 rounded-lg object-cover"
        />
        <div className="grid grid-cols-2 gap-1">
          <img
            src={venues.media[0].url || 'https://via.placeholder.com/300'}
            alt={venues.media[0].alt || 'Product Image'}
            className="rounded-lg"
          />
          <img
            src={venues.media[0].url || 'https://via.placeholder.com/300'}
            alt={venues.media[0].alt || 'Product Image'}
            className="rounded-lg"
          />
          <img
            src={venues.media[0].url || 'https://via.placeholder.com/300'}
            alt={venues.media[0].alt || 'Product Image'}
            className="rounded-lg"
          />
          <img
            src={venues.media[0].url || 'https://via.placeholder.com/300'}
            alt={venues.media[0].alt || 'Product Image'}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Venue Info */}
      <div>
        <h2 className="text-h2-desktop font-bold flex flex-row">
          {venues.name}
          <span>
            <SlHeart className="text-primary text-lg" />
          </span>
        </h2>
        <p className="text-md text-primary mb-4">{venues.location.country}</p>
        <VenueRating rating={venues.rating} />

        {/* Description */}
        <h3 className="text-ingress-desktop font-semibold">Description</h3>
        <p className="text-md text-text-primary mb-4">{venues.description}</p>
      </div>

      {/* Facilities */}
      <h3 className="text-ingress-desktop font-semibold">Facilities</h3>
      <div className="mt-6 flex flex-wrap gap-4 bg-dark">
        <MetaDataVenue meta={venues.meta} />

        {/* Information about who the Venue Manager is */}
        <div className="mt-6 flex items-center gap-4">
          <div>
            <h3 className="text-ingress-desktop font-semibold">
              Venue Manager
            </h3>
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

        <div className="mb-4 text-lg">
          <VenuePrice product={venues} />
        </div>

        {/* Calendar/Booking */}
        <div>
          {/* Add to Cart Button */}
          <button className="bg-accent px-2 py-1 rounded-md hover:bg-button-hoverSecondary">
            Book
          </button>
        </div>
      </div>
      {/* Location */}
      <div className="mb-4 text-lg">
        <p className="text-md text-text-primary mb-4">
          {venues.location.address}
        </p>
        <p className="text-md text-text-primary mb-4">{venues.location.city}</p>
        <p className="text-md text-text-primary mb-4">
          {venues.location.country}
        </p>
        <p className="text-md text-text-primary mb-4">
          {venues.location.continent}
        </p>
        <p className="text-md text-text-primary mb-4">{venues.location.zip}</p>
      </div>
    </div>
  );
}

export default ProductDetails;
