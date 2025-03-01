import { FaWifi, FaPaw, FaCoffee, FaCar } from 'react-icons/fa';
/**
* MetaDataVenue component displays venue amenities through icons
* 
* @component
* @param {Object} props - Component props
* @param {Object} props.meta - Object containing venue amenity availability
* @param {boolean} props.meta.wifi - Whether WiFi is available
* @param {boolean} props.meta.parking - Whether parking is available
* @param {boolean} props.meta.breakfast - Whether breakfast is available
* @param {boolean} props.meta.pets - Whether pets are allowed
* @returns {JSX.Element} - Rendered MetaDataVenue component
* 
* @description
* Displays available venue amenities as icon buttons.
* Each available amenity is shown as an icon in a styled container.
* If no amenities are available, displays a "No meta data available" message.
* 
* @example
* // Basic usage with venue metadata
* <MetaDataVenue 
*   meta={{
*     wifi: true,
*     parking: false,
*     breakfast: true,
*     pets: false
*   }} 
* />
* 
* @example
* // Usage with all amenities unavailable
* <MetaDataVenue 
*   meta={{
*     wifi: false,
*     parking: false,
*     breakfast: false,
*     pets: false
*   }} 
* />
*/

function MetaDataVenue({
  meta,
}: {
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
}) {
  const metaData = [
    { key: 'wifi', icon: <FaWifi />, label: 'WiFi' },
    { key: 'parking', icon: <FaCar />, label: 'Parking' },
    { key: 'breakfast', icon: <FaCoffee />, label: 'Breakfast' },
    { key: 'pets', icon: <FaPaw />, label: 'Pets' },
  ];
  const availableMeta = metaData.filter(
    (item) => meta[item.key as keyof typeof meta]
  );

  return (
    <div className="mb-4 text-lg">
      {availableMeta.length === 0 ? (
        <p className="text-body-medium-mobile md:text-menu-desktop text-text-secondary font-normal">
          No meta data available
        </p>
      ) : (
        <ul className="flex gap-4">
          {availableMeta.map((item) => (
            <li
              key={item.key}
              className="bg-secondary text-white p-3 rounded-md text-body-medium-desktop"
            >
              {item.icon}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MetaDataVenue;
