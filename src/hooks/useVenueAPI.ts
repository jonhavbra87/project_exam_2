import { create } from 'zustand';
import { Venues } from '../types/Venues';
import { API_KEY, API_VENUES, BASE_API_URL } from '../api/apiConfig';
import { useAuthStore } from '../store/authStore';

interface VenueState {
  venues: Venues[];
  venueDetails: Venues | null;
  isLoading: boolean;
  isError: boolean;
  fetchVenues: (url: string) => Promise<void>;
  fetchVenueDetails: (url: string) => Promise<void>;
  createVenue: (
    venueData: Omit<Venues, 'id' | 'created' | 'updated'>
  ) => Promise<boolean>;
  useUpdateVenue: (
    id: string,
    updatedData: Partial<Omit<Venues, 'id' | 'created' | 'updated'>>
  ) => Promise<boolean>;
  useDeleteVenue: (id: string) => Promise<boolean>;
  fetchVenuesByUser: (userEmail: string) => Promise<void>;
}

export const useVenueAPI = create<VenueState>((set, get) => ({
  venues: [],
  venueDetails: null,
  isLoading: false,
  isError: false,

  fetchVenues: async (url: string) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');

      const json = await response.json();
      set((state) => ({
        venues: [...state.venues, ...json.data],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Fetching error:', error);
      set({ isError: true, isLoading: false });
    }
  },

  fetchVenueDetails: async (url: string) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(url);
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

  useUpdateVenue: async (
    id: string,
    updatedData: Partial<Omit<Venues, 'id' | 'created' | 'updated'>>
  ) => {
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

  useDeleteVenue: async (id: string) => {
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

  fetchVenuesByUser: async (userEmail: string) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(
        `${BASE_API_URL}${API_VENUES}?_owner.email=${userEmail}`
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
}));
