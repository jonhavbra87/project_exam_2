import { Venues } from '../../types/Venues';

type VenueAddressProps = {
  location: Venues['location'];
};

function VenueAddress({ location }: VenueAddressProps) {
  const { address, city, country, continent, zip } = location;

  const formattedAddress =
    [address, city, country, continent, zip]
      .filter((value) => value?.trim())
      .join(', ') || 'No address available';

  return <p className="text-md text-text-secondary">{formattedAddress}</p>;
}

export default VenueAddress;
