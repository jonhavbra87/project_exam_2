import { BASE_API_URL } from './apiConfig.ts';

export const getVenueUrl = (id: string) => `${BASE_API_URL}/${id}`;
