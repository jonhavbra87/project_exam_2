import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { BASE_API_URL } from '../../api/apiConfig';
import { VenuePrice } from '../../components/VenuePrice';
import VenueRating from '../../components/VenueRating';
import { Venues } from '../../types/Venues';
import { FaCar, FaCoffee, FaPaw, FaWifi } from 'react-icons/fa';
import MetaDataVenue from '../../components/MetaDataVenue';

function ProductDetails() {
  // Get `id` from URL parameters
  const { id } = useParams();

  // Fetch product details using `useApi`
  const {
    data: venues,
    isLoading,
    isError,
  } = useApi<Venues>(`${BASE_API_URL}/venues/${id}`);




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
      <div className="">
        <h1 className="text-h1-desktop">{venues.name}</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-start items-start min-h-screen p-4 gap-8">
        {/* Product Image */}
        <div className="relative w-full h-64 md:h-96">
          <img
            src={venues.media[0].url || 'https://via.placeholder.com/300'}
            alt={venues.media[0].alt || 'Product Image'}
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* Calendar/Booking */}
        <div></div>
        {/* Product Details */}
        <div className="md:w-1/2 w-full flex flex-col">
          <p className="text-md text-primary mb-4">{venues.description}</p>
          <p className="text-md text-primary mb-4">{venues.location.address}</p>
          <p className="text-md text-primary mb-4">{venues.location.city}</p>
          <p className="text-md text-primary mb-4">{venues.location.country}</p>
          <p className="text-md text-primary mb-4">
            {venues.location.continent}
          </p>
          <p className="text-md text-primary mb-4">{venues.location.zip}</p>

          {/* Product Meta */}
          <div className="mb-4 text-lg">
            <h2>Meta</h2>
            <MetaDataVenue meta={venues.meta} />
          </div>
          <div className="mb-4 text-lg">
            <VenuePrice product={venues} />
          </div>

          <VenueRating rating={venues.rating} />

          {/* Add to Cart Button */}
          <div className="flex justify-end mb-6">
            <button>Book</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
