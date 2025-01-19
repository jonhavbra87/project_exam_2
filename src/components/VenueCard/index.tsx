import { Link } from "react-router-dom";
import { Venues } from "../../types/Venues";
import ProductImage from "../VenueImage";
import { VenuePrice } from "../VenuePrice";
import VenueRating from "../VenueRating";
import { FaUser } from "react-icons/fa";

export const VenueCard = ({ venue }: { venue: Venues }) => {
  return (
    <li className="bg-base rounded-lg shadow-md border border-neutral-950 hover:shadow-lg transition-shadow">
      {/* Content that wraps product image and text */}
      <Link to={`/venue/${venue.id}`} className="block">
        <ProductImage
          src={venue.media && venue.media.length > 0 ? venue.media[0].url : ""}
          alt={venue.media && venue.media.length > 0 ? venue.media[0].alt || "Venue image" : "No image"}
        />
        <div className="p-4">
          <div className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-bold mb-2 text-text-primary">{venue.name}</h2>
          <VenueRating rating={venue.rating} />
          </div>
            <p className="text-body-small-desktop text-text-secondary mb-2 line-clamp-1">{venue.location.continent}</p>
            <p className="text-body-medium-desktop text-text-primary mb-2 line-clamp-1">{venue.description} 
            </p>
        </div>
        <div className="px-4 flex flex-row items-center text-body-medium-desktop text-text-primary mb-2 gap-2">
          <p className=""><FaUser /> </p>
          <p>{venue.maxGuests}</p>
        </div>
        <div className="flex justify-between items-center m-4 gap-4 text-body-small-desktop">
          <VenuePrice product={venue} />

          <button className="text-button-primary-desktop font-bold border-r border-b border-text-primary w-16 h-8 rounded-md bg-button-secondary hover:bg-button-hoverSecondary ">View</button>
        </div>
      </Link>
    </li>
  );
};

export default VenueCard;
