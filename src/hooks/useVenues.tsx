// import { useEffect, useState } from 'react';
// import { Venues } from '../types/Venues';
// import { BASE_API_URL } from '../api/apiConfig';

// /**
//  * Custom React Hook for fetching paginated venues.
//  */
// export function useVenues(limit = 12) {
//   const [venues, setVenues] = useState<Venues[]>([]);
//   const [page, setPage] = useState(1);
//   const [isFetching, setIsFetching] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   // Fetch venues with pagination
//   useEffect(() => {
//     const fetchVenues = async () => {
//       if (!hasMore || isFetching) return;
//       setIsFetching(true);

//       try {
//         const url = `${BASE_API_URL}/venues?limit=${limit}&page=${page}&sort=rating`;
//         const response = await fetch(url);
//         if (!response.ok)
//           throw new Error(`Error fetching venues: ${response.statusText}`);

//         const data = await response.json();
//         if (data.length === 0) {
//           setHasMore(false);
//         } else {
//           setVenues((prevVenues) => [...prevVenues, ...data]);
//           setPage((prevPage) => prevPage + 1);
//         }
//       } catch (error) {
//         console.error('Error fetching venues:', error);
//         setHasMore(false);
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     fetchVenues();
//   }, [page]);

//   return {
//     venues,
//     isFetching,
//     hasMore,
//     loadMore: () => setPage((prev) => prev + 1),
//   };
// }
