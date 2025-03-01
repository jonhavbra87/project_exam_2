import { Venues } from '../../types/Venues';

type VenueAddressProps = {
  location: Venues['location'];
};
/**
 * VenueAddress component for displaying formatted venue location information
 *
 * @component
 * @param {Object} props - Component props
 * @param {Venues['location']} props.location - Location object from venue data
 * @returns {JSX.Element} - Rendered VenueAddress component
 *
 * @description
 * Displays a venue's address information in a formatted, comma-separated string.
 * Takes a location object from the Venues type and combines address, city, country,
 * continent, and zip code into a single line.
 *
 * Features:
 * - Filters out empty or whitespace-only values
 * - Provides a fallback message when no address data is available
 * - Responsive text sizing for mobile and desktop
 *
 * @example
 * // Basic usage with venue location data
 * <VenueAddress location={venue.location} />
 *
 * @example
 * // Usage with conditional rendering for optional location
 * {venue.location && <VenueAddress location={venue.location} />}
 */

function VenueAddress({ location }: VenueAddressProps): JSX.Element {
  const { address, city, country, continent, zip } = location;

  const formattedAddress =
    [address, city, country, continent, zip]
      .filter((value) => value?.trim())
      .join(', ') || 'No address available';

  return (
    <p className="text-body-small-mobile md:text-body-medium-desktop text-text-primary">
      {formattedAddress}
    </p>
  );
}

export default VenueAddress;
