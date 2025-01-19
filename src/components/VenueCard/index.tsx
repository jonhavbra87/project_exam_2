import { Link, useNavigate } from "react-router-dom";
import { Venues } from "../../types/Venues";
import ProductImage from "../VenueImage";
import { VenuePrice } from "../VenuePrice";
import VenueRating from "../VenueRating";
import { FaUser } from "react-icons/fa";

export const VenueCard = ({ venue }: { venue: Venues }) => {
  const navigate = useNavigate();

  const navigateToVenue = () => {
   navigate(`/venue/${venue.id}`);
  };
    

  return (
    <li className="bg-base rounded-lg shadow-lg border border-neutral-950 hover:shadow-xl transition-shadow relative">

      {/* Content that wraps product image and text */}
     <div
      className="cursor-pointer block relative group"
     onClick={navigateToVenue}
     aria-label={`Navigate to ${venue.name
     }`}
     >

        <ProductImage
          src={venue.media && venue.media.length > 0 ? venue.media[0].url : ""}
          alt={venue.media && venue.media.length > 0 ? venue.media[0].alt || "Venue image" : "No image"}
        />
      {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity"></div>

     </div>

        <div className="p-4">
          <div className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-bold mb-2 text-text-primary">{venue.name}</h2>
          <div className="absolute top-4 right-4">
          <VenueRating rating={venue.rating} />
          </div>
          </div>
            <p className="text-body-small-desktop text-text-secondary mb-2 line-clamp-1">{venue.location.continent}</p>
            <p className="text-body-medium-desktop text-text-primary mb-2 line-clamp-1">{venue.description} 
            </p>
        </div>
        <div className="px-4 flex flex-row items-center text-body-medium-desktop text-text-primary mb-2 gap-2">
          <p className=""><FaUser /> </p>
          <p>{venue.maxGuests}</p>
        </div>
        <footer className="flex justify-between items-center m-4 gap-4 text-body-small-desktop">
          <VenuePrice product={venue} />
        <Link
          to={`/venue/${venue.id}`}
          className="text-button-primary-desktop font-bold border-r border-b border-text-primary w-16 h-8 rounded-md bg-button-secondary hover:bg-button-hoverSecondary flex items-center justify-center"
        >
          View
        </Link>

        </footer>
    </li>
  );
};

export default VenueCard;
