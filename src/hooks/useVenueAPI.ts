import { create } from 'zustand';
import { Venues } from '../types/Venues';

interface VenueState {
  venues: Venues[];
  venueDetails: Venues | null;
  isLoading: boolean;
  isError: boolean;
  fetchVenues: (url: string) => Promise<void>;
  fetchVenueDetails: (url: string) => Promise<void>;
}

export const useVenueAPI = create<VenueState>((set) => ({
  venues: [],
  venueDetails: null,
  isLoading: false,
  isError: false,

  // Hent alle venues med pagination
  fetchVenues: async (url: string) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');

      const json = await response.json();
      set((state) => ({
        venues: [...state.venues, ...json.data], // Legger til flere venues uten duplikater
        isLoading: false,
      }));
    } catch (error) {
      console.error('Fetching error:', error);
      set({ isError: true, isLoading: false });
    }
  },

  // Hent venue detaljer
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
}));
