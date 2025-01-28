import { FaWifi, FaPaw, FaCoffee, FaCar } from 'react-icons/fa';

function MetaDataVenue({
  meta,
}: {
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
}) {
  // Liste over metadata med tilhørende ikoner
  const metaData = [
    { key: 'wifi', icon: <FaWifi />, label: 'WiFi' },
    { key: 'parking', icon: <FaCar />, label: 'Parking' },
    { key: 'breakfast', icon: <FaCoffee />, label: 'Breakfast' },
    { key: 'pets', icon: <FaPaw />, label: 'Pets' },
  ];

  return (
    <div className="mb-4 text-lg">
      <ul className="flex gap-4">
        {/* Filtrer og vis kun ikoner for de metadataene som er true */}
        {metaData
          .filter((item) => meta[item.key as keyof typeof meta]) // Sjekker om verdien er true
          .map((item) => (
            <li
              key={item.key}
              className="bg-secondary text-white p-3 rounded-md text-body-medium-desktop"
            >
              {item.icon}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MetaDataVenue;
