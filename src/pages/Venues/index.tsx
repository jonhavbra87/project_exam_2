import { useState, useRef, useCallback, useEffect } from 'react';
import useApi from '../../hooks/useApi';
import { API_VENUES, BASE_API_URL } from '../../api/apiConfig';
import VenueCard from '../../components/VenueCard';
import SearchBar from '../../components/SearchBar';
import GradientHeading from '../../styles/GradientHeading';
import BouncingArrow from '../../components/BouncingArrow';

function Venues() {
  const {
    data: venues,
    isLoading,
    isError,
    hasMore,
    loadMore,
  } = useApi(`${BASE_API_URL}${API_VENUES}`);
  const [searchTerm, setSearchTerm] = useState('');

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    loadMore();
  }, []);

  const lastVenueRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMore]
  );

  const filteredVenues = venues.filter(
    (venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading && venues.length === 0) {
    return <div className="text-center text-gray-500">⏳ Laster venues...</div>;
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
        <div className='mt-20'
        onClick={() => window.scrollTo({ top: 950, behavior: 'smooth' })}>
        <BouncingArrow />
        </div>
      </div>

      <div className="w-full">
        <SearchBar onSearch={(query) => setSearchTerm(query)} />
      </div>

      <div className="mt-16">
        <GradientHeading>Venues</GradientHeading>
      </div>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredVenues.map((venue, index) => {
          if (index === filteredVenues.length - 1) {
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
        <p className="text-center text-gray-500 mt-4">Laster flere venues...</p>
      )}
    </div>
  );
}

export default Venues;

// import { useEffect, useState, useRef, useCallback } from "react";
// import { Venues } from "../../types/Venues";
// import useApi from "../../hooks/useApi";
// import { BASE_API_URL } from "../../api/apiConfig";
// import VenueCard from "../../components/VenueCard";
// import SearchBar from "../../components/SearchBar";
// import GradientHeading from "../../styles/GradientHeading";

// function Venues() {
//   const [venues, setVenues] = useState<Venues[]>([]);
//   const [page, setPage] = useState(1);
//   const limit = 12; // 🔹 Laster inn 12 venues per gang
//   const [isFetching, setIsFetching] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef<IntersectionObserver | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   // 📌 **Hent venues med pagination**
//   const { data, isLoading, isError } = useApi<Venues[]>(
//     `${BASE_API_URL}/venues?limit=${limit}&page=${page}&sort=name&sortOrder=asc`
//   );

//   // 📌 **Legg til nye venues når data oppdateres**
//   useEffect(() => {
//     if (data && data.length > 0) {
//       setVenues((prevVenues) => [...prevVenues, ...data]); // 🔹 Legg til flere venues
//     } else {
//       setHasMore(false); // 🔹 Stopp paginering hvis ingen flere venues
//     }
//     setIsFetching(false);
//   }, [data]);

//   // 📌 **Observerer siste venue-kort for å hente mer data**
//   const lastVenueRef = useCallback(
//     (node: HTMLDivElement) => {
//       if (isFetching || !hasMore) return;
//       if (observer.current) observer.current.disconnect();

//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) {
//           setIsFetching(true);
//           setPage((prevPage) => prevPage + 1);
//         }
//       });

//       if (node) observer.current.observe(node);
//     },
//     [isFetching, hasMore]
//   );

//   if (isLoading && venues.length === 0) {
//     return <div className="text-center text-gray-500">⏳ Laster venues...</div>;
//   }

//   if (isError) {
//     return <div className="text-center text-red-500">❌ Feil ved lasting av data.</div>;
//   }

//   const filteredVenues = venues.filter(
//     (venue) =>
//       venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       venue.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const handleSearch = (query: string) => {
//     setSearchTerm(query);
//   };
//   return (
//     <div>
//       <div className="flex flex-col justify-center items-center text-text-primary text-h1-mobile md:text-h1-desktop font-heading h-screen">
//         Let’s explore the world
//         <span className="text-primary"> together</span>
//       </div>

//       <div className="w-full">
//         <SearchBar onSearch={handleSearch} />
//       </div>

//       <div className="mt-16">
//         <GradientHeading>Venues</GradientHeading>
//       </div>

//       {/* ✅ **Venues Grid** */}
//       <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {filteredVenues.map((venue, index) => {
//           if (index === venues.length - 1) {
//             return (
//               <div key={venue.id} ref={lastVenueRef}>
//                 <VenueCard venue={venue} />
//               </div>
//             );
//           } else {
//             return (
//               <div key={venue.id}>
//                 <VenueCard venue={venue} />
//               </div>
//             );
//           }
//         })}
//       </ul>

//       {/* ✅ **Loading-indikator mens nye venues lastes inn** */}
//       {isFetching && (
//         <div className="text-center text-gray-500 mt-4">Laster flere venues...</div>
//       )}
//     </div>
//   );
// }

// export default Venues;
