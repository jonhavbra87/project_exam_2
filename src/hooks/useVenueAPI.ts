import { create } from 'zustand';
import { Venues } from '../types/Venues';
import {
  API_KEY,
  API_PROFILE,
  API_VENUES,
  BASE_API_URL,
} from '../api/apiConfig';
import { useAuthStore } from '../store/authStore';

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
      console.log('Venues successfully fetched:', json.data.length, 'items.');
    } catch (error) {
      console.error('Error fetching venues:', error);
      set({ isError: true, isLoading: false });
    }
  },
  fetchLimitVenues: async () => {
    set({ isLoading: true, isError: false });
    try {
      const url = `${BASE_API_URL}${API_VENUES}?limit=24&page=1&sort=name&sortOrder=asc`;
      console.log('Fetching initial venues from:', url);
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
      console.log('Fetched first 24 venues.');
    } catch (error) {
      console.error('Error fetching initial venues:', error);
      set({ isError: true, isLoading: false });
    }
  },

  fetchMoreVenues: async (page: number) => {
    set({ isLoading: true, isError: false });
    try {
      const url = `${BASE_API_URL}${API_VENUES}?limit=24&page=${page}&sort=name&sortOrder=asc`;
      console.log('Fetching more venues from:', url);
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
      console.log(`Fetched ${newVenues.length} more venues.`);
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
      set({ venueDetails: json.data, isLoading: false });
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
      console.log('response crateVenue', response);
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
      return true;
    } catch (error) {
      console.error('Error deleting venue:', error);
      set({ isError: true, isLoading: false });
      return false;
    }
  },

  fetchVenuesByUser: async (name: string) => {
    if (!name) {
      console.error('fetchVenuesByUser: User name is required.');
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
