import { useEffect, useState } from 'react';
import { Venues } from '../../types/Venues';
import useApi from '../../hooks/useApi';
import { BASE_API_URL } from '../../api/apiConfig';
import VenueCard from '../../components/VenueCard';
import SearchBar from '../../components/SearchBar';
import GradientHeading from '../../styles/GradientHeading';

function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const {
    data: venues,
    isLoading,
    isError,
  } = useApi<Venues[]>(`${BASE_API_URL}/venues`);

  //state for search input
  const [searchTerm, setSearchTerm] = useState<string>('');
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

  if (isLoading || showLoader) {
    return <div>Loading...</div>;
  }

  if (isError || !venues) {
    return <div>Error loading data.</div>;
  }

  //const filteredVenues = data.filter((venue) => venue.location.continent);
  //Filter products based on the search term
  const filteredVenues = data.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const filteredVenues = data.filter(
  //   (venue) =>
  //     venue.location?.lat !== null &&
  //     venue.location?.lng !== null &&
  //     venue.location?.lat !== undefined &&
  //     venue.location?.lng !== undefined &&
  //     venue.location?.lat !== 0 &&
  //     venue.location?.lng !== 0
  // );

  // // Filter venues based on the search term
  // const filteredProducts = filteredVenues.filter(
  //   (venue) =>
  //     venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     venue.description.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // Event handler for search input change
  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center text-text-primary text-h1-mobile md:text-h1-desktop font-heading h-screen">
        Let’s explore the world
        <span className="text-primary"> together</span>
        {/* SearchBar Component */}
      </div>
      <div className="w-full">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="mt-16">
        <GradientHeading>Venues</GradientHeading>
      </div>
      {/* <h1 className="text-h1-desktop border-b-2 border-text-primary mb-6">Venues</h1> */}
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {filteredVenues.map((venue) => (
          <div key={venue.id}>
            <VenueCard key={venue.id} venue={venue} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Home;
