import { useVenueAPI } from '../../hooks/useVenueAPI';
import { useCallback, useEffect, useRef, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import VenueCard from '../../components/VenueCard';
import GradientHeading from '../../styles/GradientHeading';
import BouncingArrow from '../../components/BouncingArrow';
import StyledLoader from '../../styles/StyledLoader';

function Venues() {
  const { venues, isLoading, isError, hasMore, fetchLimitVenues, fetchMoreVenues, fetchVenuesBySearch } = useVenueAPI();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(2); 
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!searchTerm) {
      fetchLimitVenues();
    }
  }, [fetchLimitVenues, searchTerm]);
  // Control Loader display with a timeout
  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 1000); // Minimum 2 seconds

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [isLoading]);
  // 🔍 **Håndterer søk**
  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setPage(2);
    
    if (query.trim().length > 2) {
      fetchVenuesBySearch(query);
    } else {
      fetchLimitVenues();
    }
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const lastVenueRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading || !hasMore || searchTerm) return; 

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreVenues(page);
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, fetchMoreVenues, searchTerm, page]
  );


  if (isLoading && venues.length === 0 || showLoader) {
    return <StyledLoader />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        ❌ Feil ved lasting av data.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center text-text-primary text-h1-mobile md:text-h1-desktop font-heading h-screen">
        Let’s explore the world
        <span className="text-primary"> together</span>
        <div
          className="mt-20"
          onClick={() => window.scrollTo({ top: 950, behavior: 'smooth' })}
        >
          <BouncingArrow />
        </div>
      </div>

      <div className="w-full">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="mt-16">
        <GradientHeading>Venues</GradientHeading>
      </div>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid">
        {venues.map((venue, index) => {
          if (index === venues.length - 1) {
            return (
              <li key={venue.id} ref={lastVenueRef}>
                <VenueCard venue={venue} />
              </li>
            );
          } else {
            return (
              <li key={venue.id}>
                <VenueCard venue={venue} />
              </li>
            );
          }
        })}
      </ul>

      {isLoading && (
        <StyledLoader />
      )}
    </div>
  );
}

export default Venues;