import { useEffect, useState } from 'react';
import { Venues } from '../../types/Venues';
import useApi from '../../hooks/useApi';
import { BASE_API_URL } from '../../api/apiConfig';
import VenueCard from '../../components/VenueCard';

function LandingPage() {
  const [showLoader, setShowLoader] = useState(true);
  const {
    data: venues,
    isLoading,
    isError,
  } = useApi<Venues[]>(`${BASE_API_URL}/venues`);

  const data = venues || [];

  // Control Loader display with a timeout
  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 1000); // Minimum 2 seconds

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [isLoading]);

  // Show loading message if `isLoading` is `true`
  if (isLoading || showLoader) {
    return <div>Loading...</div>;
  }

  if (isError || !venues) {
    return <div>Error loading data.</div>;
  }

  return (
    <div>
      <h1 className="text-h1-desktop">Venues</h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {data.map((venue) => (
          <div key={venue.id}>
            <VenueCard key={venue.id} venue={venue} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default LandingPage;
