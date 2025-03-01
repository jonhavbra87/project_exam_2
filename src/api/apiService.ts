import { BASE_API_URL } from './apiConfig.ts';

/**
 * Constructs a URL for accessing a specific venue's API endpoint
 *
 * @param {string} id - The unique identifier of the venue
 * @returns {string} The complete API URL for the specified venue
 *
 * @example
 * // Returns "https://api.example.com/venues/123"
 * const url = getVenueUrl("123");
 */
export const getVenueUrl = (id: string) => `${BASE_API_URL}/${id}`;
