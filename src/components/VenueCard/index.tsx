import { useNavigate } from 'react-router-dom';
import { Venues } from '../../types/Venues';
import { VenuePrice } from '../VenuePrice';
import VenueRating from '../VenueRating';
import { FaUser } from 'react-icons/fa';
import { SlHeart } from 'react-icons/sl';
import VenueImage from '../VenueImage';
import { CustomButton } from '../CustomButton';

export const VenueCard = ({ venue }: { venue: Venues }) => {
  const navigate = useNavigate();

  const navigateToVenue = () => {
    navigate(`/venue/${venue.id}`);
  };

  return (
    <div className="bg-gradient-to-tr from-black via-primary-3 to-secondary rounded-lg shadow-lg border border-white hover:shadow-xl transition-shadow relative">
      {/* Content that wraps product image and text */}
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
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="p-4">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-ingress-desktop font-ingress font-bold mb-2 text-white">
            {venue.name}
          </h2>
          <VenueRating rating={venue.rating} />
          <div className="absolute top-4 right-4 text-2xl text-white">
            <SlHeart />
          </div>
        </div>
        <p className="text-body-small-desktop text-text-secondary mb-2 line-clamp-1">
          {venue.location.continent}
        </p>
        <p className="text-body-large-mobile md:text-body-large-desktop font-body text-white mb-2 line-clamp-1">
          {venue.description}
        </p>
      </div>
      <div className="px-4 flex flex-row items-center text-body-medium-desktop font-body text-white mb-2 gap-2">
        <p className="">
          <FaUser />{' '}
        </p>
        <p>{venue.maxGuests}</p>
      </div>
      <footer className="flex justify-between items-center m-4 gap-4 text-body-small-desktop">
        <VenuePrice product={venue} />
        <div className='w-1/3'>
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
