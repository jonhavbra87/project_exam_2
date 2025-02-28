/**
 * @fileoverview API store for managing venue-related operations and state
 * @module store/venueStore
 */
import { create } from 'zustand';
import { Venues } from '../types/Venues';
import {
  API_KEY,
  API_PROFILE,
  API_VENUES,
  BASE_API_URL,
} from '../api/apiConfig';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

/**
 * Interface defining the venue state and operations
 * 
 * @typedef {Object} VenueState
 * @property {Venues[]} venues - List of venues
 * @property {Venues|null} venueDetails - Details of selected venue
 * @property {boolean} isLoading - Indicates if a venue operation is in progress
 * @property {boolean} isError - Indicates if an error occurred during a venue operation
 * @property {boolean} hasMore - Indicates if there are more venues to load for pagination
 * @property {function(url: string): Promise<void>} fetchVenues - Fetches venues from a specified URL
 * @property {function(url: string): Promise<void>} fetchVenueDetails - Fetches details for a specific venue
 * @property {function(): Promise<void>} fetchLimitVenues - Fetches initial set of venues with limit
 * @property {function(page: number): Promise<void>} fetchMoreVenues - Fetches additional venues for pagination
 * @property {function(venueData: Omit<Venues, 'id' | 'created' | 'updated'>): Promise<boolean>} createVenue - Creates a new venue
 * @property {function(id: string, updatedData: Partial<Omit<Venues, 'id' | 'created' | 'updated'>>): Promise<boolean>} updateVenue - Updates an existing venue
 * @property {function(id: string): Promise<boolean>} deleteVenue - Deletes a venue
 * @property {function(userEmail: string): Promise<void>} fetchVenuesByUser - Fetches venues for a specific user
 * @property {function(query: string): Promise<void>} fetchVenuesBySearch - Searches venues by query
 */

interface VenueState {
  venues: Venues[];
  venueDetails: Venues | null;
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchVenues: (url: string) => Promise<void>;
  fetchVenueDetails: (url: string) => Promise<void>;
  fetchLimitVenues: () => Promise<void>;
  fetchMoreVenues: (page: number) => Promise<void>;
  createVenue: (
    venueData: Omit<Venues, 'id' | 'created' | 'updated'>
  ) => Promise<boolean>;
  updateVenue: (
    id: string,
    updatedData: Partial<Omit<Venues, 'id' | 'created' | 'updated'>>
  ) => Promise<boolean>;
  deleteVenue: (id: string) => Promise<boolean>;
  fetchVenuesByUser: (userEmail: string) => Promise<void>;
  fetchVenuesBySearch: (query: string) => Promise<void>;
}

/**
 * Zustand store for venue management
 * 
 * This store manages all venue-related state and operations, including
 * fetching, creating, updating, and deleting venues. It also handles
 * pagination, search functionality, and filtering venues by user.
 * 
 * @example
 * // Fetch all venues
 * useVenueAPI.getState().fetchVenues(`${BASE_API_URL}${API_VENUES}`);
 * 
 * // Access venues data in a component
 * const { venues, isLoading } = useVenueAPI();
 * 
 * // Create a new venue
 * const createVenue = useVenueAPI(state => state.createVenue);
 * createVenue({
 *   name: "Beach Resort",
 *   description: "Luxury beach resort with ocean views",
 *   media: [{ url: "image-url.jpg", alt: "Resort view" }],
 *   price: 199,
 *   maxGuests: 4,
 *   rating: 4.8,
 *   meta: { wifi: true, parking: true, breakfast: true }
 * });
 */

export const useVenueAPI = create<VenueState>((set, get) => ({
  venues: [],
  venueDetails: null,
  isLoading: false,
  isError: false,
  hasMore: false,

  fetchVenues: async (url: string) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(
          `Could not fetch venues: ${response.status} ${response.statusText}`
        );
      }
      const json = await response.json();
      set(() => ({
        venues: json.data || [],
        hasMore: json.data.length > 0,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error fetching venues:', error);
      set({ isError: true, isLoading: false });
    }
  },
  fetchLimitVenues: async () => {
    set({ isLoading: true, isError: false });
    try {
      const url = `${BASE_API_URL}${API_VENUES}?limit=24&page=1&sort=rating`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(
          `Could not fetch venues: ${response.status} ${response.statusText}`
        );
      }
      const json = await response.json();
      const newVenues = json.data || [];
      set({
        venues: newVenues,
        hasMore: newVenues.length > 0,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching initial venues:', error);
      set({ isError: true, isLoading: false });
    }
  },
  fetchMoreVenues: async (page: number) => {
    set({ isLoading: true, isError: false });
    try {
      const url = `${BASE_API_URL}${API_VENUES}?limit=24&page=${page}&sort=rating`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(
          `Could not fetch more venues: ${response.status} ${response.statusText}`
        );
      }
      const json = await response.json();
      const newVenues = json.data || [];
      set((state) => ({
        venues: [...state.venues, ...newVenues], // Append new venues to existing list
        hasMore: newVenues.length > 0,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error fetching more venues:', error);
      set({ isError: true, isLoading: false });
    }
  },
  fetchVenueDetails: async (url: string) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(url, {
        headers: { 'X-Noroff-API-Key': API_KEY },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const json = await response.json();
      const venueData = json.data;
      set({ venueDetails: venueData, isLoading: false });
      return venueData;
    } catch (error) {
      console.error('Fetching error:', error);
      set({ isError: true, isLoading: false });
    }
  },
  createVenue: async (
    venueData: Omit<Venues, 'id' | 'created' | 'updated'>
  ) => {
    const { accessToken } = useAuthStore.getState();
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(`${BASE_API_URL}${API_VENUES}?_owner=true`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venueData),
      });
      if (!response.ok) throw new Error('Could not create venue');
      await get().fetchVenues(`${BASE_API_URL}${API_VENUES}`);
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error('Error creating venue:', error);
      set({ isError: true, isLoading: false });
      return false;
    }
  },
  updateVenue: async (
    id: string,
    updatedData: Partial<Omit<Venues, 'id' | 'created' | 'updated'>>
  ) => {
    if (!id) {
      console.error('Error: Venue ID is required for updating.');
      return false;
    }
    const { accessToken } = useAuthStore.getState();
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(`${BASE_API_URL}${API_VENUES}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Could not update venue');
      const updatedVenue = await response.json();
      set((state) => ({
        venues: state.venues.map((venue) =>
          venue.id === id ? updatedVenue.data : venue
        ),
        isLoading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error updating venue:', error);
      toast.error('Error updating venue.');
      set({ isError: true, isLoading: false });
      return false;
    }
  },
  deleteVenue: async (id: string) => {
    const { accessToken } = useAuthStore.getState();
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(`${BASE_API_URL}${API_VENUES}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': API_KEY,
        },
      });
      if (!response.ok) throw new Error('Could not delete venue');
      set((state) => ({
        venues: state.venues.filter((venue) => venue.id !== id),
        isLoading: false,
      }));
      toast.success('Venue deleted successfully.');
      return true;
    } catch (error) {
      console.error('Error deleting venue:', error);
      toast.error('Error deleting venue.');
      set({ isError: true, isLoading: false });
      return false;
    }
  },
  fetchVenuesByUser: async (name: string) => {
    if (!name) {
      console.error('fetchVenuesByUser: User name is required.');
      toast.error('User name is required.');
      return;
    }
    const { accessToken } = useAuthStore.getState();
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(
        `${BASE_API_URL}${API_PROFILE}/${name}/venues?_owner=true&_bookings=true`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-Noroff-API-Key': API_KEY,
          },
        }
      );
      if (!response.ok) throw new Error('Could not fetch user venues');
      const json = await response.json();
      set({
        venues: json.data,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching user venues:', error);
      toast.error('Error fetching user venues.');
      set({ isError: true, isLoading: false });
    }
  },
  fetchVenuesBySearch: async (query: string) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(
        `${BASE_API_URL}${API_VENUES}/search?q=${query}`,
        {
          headers: { 'X-Noroff-API-Key': API_KEY },
        }
      );
      if (!response.ok) throw new Error('Could not search venues');
      const json = await response.json();
      set({
        venues: json.data || [],
        isLoading: false,
      });
    } catch (error) {
      console.error('Error searching venues:', error);
      set({ isError: true, isLoading: false });
    }
  },
}));
