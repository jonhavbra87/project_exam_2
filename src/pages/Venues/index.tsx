import { useVenueAPI } from '../../hooks/useVenueAPI';
import { useCallback, useEffect, useRef, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import VenueCard from '../../components/VenueCard';
import GradientHeading from '../../styles/GradientHeading';
import BouncingArrow from '../../components/BouncingArrow';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

function Venues() {
  const {
    venues,
    isLoading,
    isError,
    hasMore,
    fetchLimitVenues,
    fetchMoreVenues,
    fetchVenuesBySearch,
  } = useVenueAPI();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      fetchLimitVenues();
    }
  }, [fetchLimitVenues, searchTerm]);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

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

  if (showLoader && venues.length === 0) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (isError) {
    return toast.error(
      'An error occurred while fetching data. Please try again later.'
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
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

      <ul className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 md:grid-cols-3">
        {venues.map((venue, index) => {
          const uniqueKey = `${venue.id}-${index}`;
          if (index === venues.length - 1) {
            return (
              <li key={uniqueKey} ref={lastVenueRef}>
                <VenueCard venue={venue} />
              </li>
            );
          } else {
            return (
              <li key={uniqueKey}>
                <VenueCard venue={venue} />
              </li>
            );
          }
        })}
      </ul>

      {showLoader && <LoadingSpinner isLoading={isLoading} />}
    </div>
  );
}

export default Venues;
