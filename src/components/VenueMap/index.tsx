import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Venues } from '../../types/Venues';
import { BASE_API_URL } from '../../api/apiConfig';
import useApi from '../../hooks/useApi';
import L from 'leaflet';

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function VenueMap() {
  const {
    data: venues,
    isLoading,
    isError,
  } = useApi<Venues[]>(`${BASE_API_URL}/venues`);

  if (isLoading) return <p>Loading map...</p>;
  if (isError || !venues) return <p>Error loading venues.</p>;

  return (
    <MapContainer
      center={[59.9139, 10.7522]}
      zoom={6}
      className="h-96 w-full rounded-lg shadow-md"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Løper gjennom API-data og viser markører */}
      {venues.map((venue: Venues) => {
        const lat = venue.location?.lat;
        const lng = venue.location?.lng;

        // Sjekk at lat og lng er gyldige tall
        if (
          typeof lat !== 'number' ||
          typeof lng !== 'number' ||
          isNaN(lat) ||
          isNaN(lng)
        ) {
          console.warn(
            `Venue ${venue.name} har ugyldig lokasjon:`,
            venue.location
          );
          return null;
        }

        return (
          <Marker key={venue.id} position={[lat, lng]} icon={customIcon}>
            <Popup>
              <div>
                <h3 className="font-bold text-lg">{venue.name}</h3>
                <p>{venue.description}</p>
                <p>
                  <strong>Address:</strong> {venue.location.address},{' '}
                  {venue.location.city}, {venue.location.country}
                </p>
                <p>
                  <strong>Price:</strong> ${venue.price}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default VenueMap;
