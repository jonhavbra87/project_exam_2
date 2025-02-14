// import { useState, useCallback } from 'react';
// import { Venues } from '../types/Venues';

// const useApi = (url: string, limit = 12) => {
//   const [data, setData] = useState<Venues[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchData = useCallback(async () => {
//     if (!hasMore || isLoading) return;

//     setIsLoading(true);
//     setIsError(false);

//     try {
//       const response = await fetch(
//         `${url}?limit=${limit}&page=${page}&sort=rating`
//       );
//       if (!response.ok) throw new Error(`Network error: ${response.status}`);

//       const json = await response.json();
//       console.log('API Response:', json);

//       const newData = Array.isArray(json.data) ? json.data : [];

//       if (newData.length === 0) {
//         setHasMore(false);
//       } else {
//         setData((prevData) => {
//           const uniqueData = Array.from(
//             new Map([...prevData, ...newData].map((v) => [v.id, v])).values()
//           );
//           return uniqueData;
//         });
//         setPage((prevPage) => prevPage + 1);
//       }
//     } catch (error) {
//       console.error('Fetching error:', error);
//       setIsError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [url, page, hasMore, isLoading, limit]);

//   return { data, isLoading, isError, hasMore, loadMore: fetchData };
// };

// export default useApi;

// // import { useState, useEffect } from 'react';

// // function useApi<T>(url: string) {
// //   const [data, setData] = useState<T | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isError, setIsError] = useState(false);

// //   useEffect(() => {
// //     async function getData() {
// //       try {
// //         setIsLoading(true);
// //         setIsError(false);
// //         const response = await fetch(url);
// //         if (!response.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         const json = await response.json();
// //         setData(json.data);
// //       } catch (error) {
// //         console.error('Fetching error:', error);
// //         setIsError(true);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     }

// //     getData();
// //   }, [url]);
// //   console.log('apicall', data);
// //   console.log('apipage url', url);

// //   return { data, isLoading, isError };
// // }

// // export default useApi;
