import { useVenueAPI } from '../../hooks/useVenueAPI';
import { useCallback, useEffect, useRef, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import VenueCard from '../../components/VenueCard';
import GradientHeading from '../../styles/GradientHeading';
import BouncingArrow from '../../components/BouncingArrow';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';
/**
 * Venues Component
 * 
 * Displays a paginated and searchable list of venues
 * 
 * @component
 * @returns {React.ReactElement} A comprehensive venues page with infinite scrolling and search functionality
 * 
 * @description
 * Provides advanced venue browsing features including:
 * - Infinite scroll pagination
 * - Search functionality
 * - Loading and error states
 * - Responsive grid layout
 * - Engaging landing section with navigation arrow
 * 
 * @remarks
 * - Uses Intersection Observer for infinite scrolling
 * - Dynamically loads venues based on user interaction
 * - Handles different states (loading, error, empty)
 * 
 * @example
 * // Typical usage in routing configuration
 * <Route path="/venues" element={<Venues />} />
 */

function Venues(): JSX.Element {
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
    toast.error('An error occurred while fetching data. Please try again later.');
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-h2-mobile md:text-h2-desktop font-heading font-semibold text-secondary mb-4">
          Error Loading Venues
        </h2>
        <p className="text-body-large-mobile md:text-body-large-desktop font-body font-medium">
          An error occurred while fetching data. Please try again later.
        </p>
      </div>
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
