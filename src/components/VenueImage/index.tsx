import PlaceholderImg from '../../assets/signup_collage.webp';
/**
 * VenueImage component for displaying venue images with consistent styling
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alternative text for accessibility
 * @returns {JSX.Element} - Rendered VenueImage component
 *
 * @description
 * A reusable component for displaying venue images with consistent styling.
 * Maintains a fixed aspect ratio (4:3) for all images to ensure uniform appearance
 * across the application. Uses lazy loading for better performance.
 *
 * The component handles the styling and presentation of images while leaving
 * the source and alt text to be provided by the parent component.
 *
 * @example
 * // Basic usage with image source and alt text
 * <VenueImage
 *   src="https://example.com/venue-image.jpg"
 *   alt="Beautiful mountain cabin"
 * />
 *
 * @example
 * // Usage with conditional data
 * <VenueImage
 *   src={venue.media?.[0]?.url || defaultImageUrl}
 *   alt={venue.media?.[0]?.alt || venue.name || 'Venue image'}
 * />
 */

const VenueImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}): JSX.Element => {
  return (
    <div className="w-full aspect-[4/3] bg-gray-200 rounded-t-lg overflow-hidden">
      <img
        src={src || PlaceholderImg}
        alt={alt || 'Venue image'}
        loading="lazy"
        onError={(event) => {
          const imgElement = event.target as HTMLImageElement;
          imgElement.onerror = null;
          imgElement.src = PlaceholderImg;
        }}
        className="mb-4 w-full object-cover h-full "
      />
    </div>
  );
};

export default VenueImage;
