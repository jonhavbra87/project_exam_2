import { FaStar, FaRegStar, FaStarHalf } from 'react-icons/fa'; 

function ProductRating({ rating }: { rating: number }) {
  const totalStars = 5; // Maximal rating
  const filledStars = Math.floor(rating); // Full stars
  const halfStar = rating % 1 !== 0; // If the rating is not a whole number
  const emptyStars = totalStars - filledStars - (halfStar ? 1 : 0); // Empty stars

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {Array(filledStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={`filled-${index}`} className="text-secondary" />
        ))}
      {/* Half star(valgfritt) */}
      {halfStar && <FaStarHalf key="half" className="text-secondary" />}
      {/* Empty starts */}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="fill-secondary" />
        ))}
    </div>
  );
}

export default ProductRating;
