import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Venues } from '../../types/Venues';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import LoadingSpinner from '../LoadingSpinner';
import toast from 'react-hot-toast';

// **Custom Leaflet Marker**
const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
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
/**
 * VenueMap component for displaying venue location on an interactive map
 *
 * @component
 * @param {Object} props - Component props
 * @param {Venues} props.venue - Venue data object containing location information
 * @returns {JSX.Element} - Rendered VenueMap component
 *
 * @description
 * An interactive map component that displays the location of a venue using Leaflet.
 * Handles various edge cases for location data:
 * - Uses exact coordinates when available
 * - Falls back to Oslo coordinates when specific coordinates aren't available
 * - Displays address information in a popup
 * - Shows loading state while preparing map data
 *
 * Features:
 * - Custom map marker
 * - Popup with venue name, description, and address
 * - Address display in overlay
 * - Automatic map centering using MapUpdater subcomponent
 * - Error handling for missing coordinates
 *
 * @example
 * // Basic usage with venue data
 * <VenueMap venue={venueData} />
 *
 * @example
 * // Usage with conditional rendering
 * {venue.location && <VenueMap venue={venue} />}
 */

function VenueMap({ venue }: { venue: Venues }) {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [locationText, setLocationText] = useState<string>('');
  const [addressAvailable, setAddressAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (venue?.location) {
      const { lat, lng, address, city, country } = venue.location;

      if (
        typeof lat === 'number' &&
        typeof lng === 'number' &&
        !isNaN(lat) &&
        !isNaN(lng) &&
        lat !== 0 &&
        lng !== 0
      ) {
        setCoordinates([lat, lng]);
        setAddressAvailable(true);
        setLocationText(`${address || city || country || 'Unknown location'}`);
      } else if (address || city || country) {
        setLocationText(
          `${address ? `${address}, ` : ''}${city ? `${city}, ` : ''}${country || ''}`
        );
        setCoordinates([59.9139, 10.7522]); // Fallback to Oslo
        setAddressAvailable(true);
      } else {
        setLocationText('No address available');
        setCoordinates([59.9139, 10.7522]); // Fallback to Oslo
        setAddressAvailable(false);
      }
    }
    setIsLoading(false);
  }, [venue]);

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (!coordinates) {
    return toast.error('This venue has no coordinates available');
  }

  return (
    <div className="h-96 w-full rounded-lg shadow-md relative z-1">
      <p className="absolute top-2 left-2 bg-background px-2 py-1 rounded-lg shadow-md text-text-primary">
        {addressAvailable || 'No address available'}
      </p>

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
