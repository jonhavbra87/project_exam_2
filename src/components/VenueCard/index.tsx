import { useNavigate } from 'react-router-dom';
import { Venues } from '../../types/Venues';
import { VenuePrice } from '../VenuePrice';
import VenueRating from '../VenueRating';
import { FaUser } from 'react-icons/fa';
import VenueImage from '../VenueImage';
import { CustomButton } from '../CustomButton';
import { TiHeartFullOutline } from 'react-icons/ti';
/**
 * VenueCard component for displaying venue preview information
 *
 * @component
 * @param {Object} props - Component props
 * @param {Venues} props.venue - Venue data object containing details to display
 * @returns {JSX.Element} - Rendered VenueCard component
 *
 * @description
 * A card component that displays key information about a venue in a compact, visually appealing format.
 * Used in venue listing pages to show multiple venues in a grid or list layout.
 *
 * Features:
 * - Primary venue image with hover effect
 * - Venue name and location
 * - Star rating display
 * - Guest capacity indicator
 * - Price information
 * - View button for navigation to detailed venue page
 * - Wishlist heart icon (currently decorative)
 *
 * The entire card is clickable and navigates to the venue detail page.
 * Includes proper accessibility attributes for navigation.
 *
 * @example
 * // Basic usage with venue data
 * <VenueCard venue={venueData} />
 *
 * @example
 * // Usage in a venue listing
 * <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 *   {venues.map(venue => (
 *     <VenueCard key={venue.id} venue={venue} />
 *   ))}
 * </div>
 */

const VenueCard = ({ venue }: { venue: Venues }) => {
  const navigate = useNavigate();

  const navigateToVenue = () => {
    navigate(`/venue/${venue.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-black hover:shadow-xl transition-shadow relative">
      <div
        className="cursor-pointer block relative group"
        onClick={navigateToVenue}
        aria-label={`Navigate to ${venue.name}`}
      >
        <VenueImage
          src={venue.media && venue.media.length > 0 ? venue.media[0].url : ''}
          alt={
            venue.media && venue.media.length > 0
              ? venue.media[0].alt || 'Venue image'
              : 'No image'
          }
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="p-4">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-ingress-desktop font-ingress font-bold mb-2 text-text-primary">
            {venue.name}
          </h2>
          <VenueRating rating={venue.rating} />
          <TiHeartFullOutline className="absolute top-4 right-4 text-black text-opacity-20 stroke-white stroke-2 text-2xl" />
        </div>
        <p className="text-body-small-desktop text-text-secondary mb-2 line-clamp-1">
          {venue.location.continent || 'Secret location'}
        </p>
      </div>
      <div className="px-4 flex flex-row items-center text-body-medium-desktop font-body text-text-primary mb-2 gap-2">
        <FaUser className="text-secondary" /> <p>{venue.maxGuests}</p>
      </div>
      <footer className="flex justify-between items-center m-4 gap-4 text-body-small-desktop">
        <VenuePrice product={venue} />
        <div className="w-1/3">
          <CustomButton
            text="View"
            variant="accent"
            onClick={navigateToVenue}
          />
        </div>
      </footer>
    </div>
  );
};

export default VenueCard;
