import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Venues } from '../../types/Venues';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// 📌 **Custom Leaflet Marker**
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapUpdater = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();

  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lng)) {
      map.setView([lat, lng], 12);
    }
  }, [lat, lng, map]);

  return null;
};

function VenueMap({ venue }: { venue: Venues }) {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [locationText, setLocationText] = useState<string>('');
  const [addressAvailable, setAddressAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (venue?.location) {
      const { lat, lng, address, city, country } = venue.location;

      if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
        setCoordinates([lat, lng]);
        setAddressAvailable(true);
        setLocationText(`${address || city || country || 'Ukjent lokasjon'}`);
      } else if (address || city || country) {
        setLocationText(`${address ? `${address}, ` : ''}${city ? `${city}, ` : ''}${country || ''}`);
        setCoordinates([59.9139, 10.7522]); // Fallback to Oslo
        setAddressAvailable(true);
      }
      else {
        setLocationText('Ingen spesifisert lokasjon');
        setCoordinates([59.9139, 10.7522]); // 🔹 Fallback to Oslo
        setAddressAvailable(false);
      }
    }
    setIsLoading(false);
  }, [venue]);

  if (isLoading) {
    return <p className="text-gray-500">⏳ Laster kart...</p>;
  }

  if (!coordinates) {
    return <p className="text-red-500">⚠️ {locationText || 'Lokasjon ikke tilgjengelig.'}</p>;
  }

  return (
    <div className="h-96 w-full rounded-lg shadow-md relative">
      {!addressAvailable && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md z-10">
          📍 Address is not available
        </div>
      )}

      <MapContainer center={coordinates} zoom={12} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapUpdater lat={coordinates[0]} lng={coordinates[1]} />
        <Marker position={coordinates} icon={customIcon}>
          <Popup>
            <div>
              <h3 className="font-bold text-lg">{venue.name}</h3>
              <p>{venue.description}</p>
              <p>
                <strong>Address:</strong> {locationText}
              </p>

            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default VenueMap;
