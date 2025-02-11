import { FaStar, FaRegStar, FaStarHalf } from 'react-icons/fa';

/**
 * Component to display a star rating.
 * It renders filled, half-filled, and empty stars based on the given rating.
 *
 * @component
 * @param {Object} props - The component's properties.
 * @param {number} props.rating - Rating value between 0 and 5.
 * @returns {JSX.Element} A visual representation of the rating with stars.
 */

function VenueRating({ rating }: { rating: number }) {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - filledStars - (halfStar ? 1 : 0);

  if (rating === 0) {
    return (
      <div className="flex items-center text-ingress-desktop">
        <FaRegStar className="text-accent" />
        <p className="text-white ml-2">{rating}</p>
        <span className="sr-only">Rated 0 out of {totalStars} stars</span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-ingress-desktop">
      {Array(filledStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={`filled-${index}`} className="text-accent" />
        ))}
      {halfStar && <FaStarHalf key="half" className="text-accent" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="text-accent" />
        ))}
      <p className="text-text-primary ml-2">{rating}</p>

      <span className="sr-only">
        Rated {rating} out of {totalStars} stars
      </span>
    </div>
  );
}

export default VenueRating;
