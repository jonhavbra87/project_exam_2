import { create } from 'zustand';
import {
  API_BOOKINGS,
  BASE_API_URL,
  API_KEY,
  API_PROFILE,
  API_VENUES,
} from '../api/apiConfig';
import { useAuthStore } from '../store/authStore';
import { Booking } from '../types/Booking';

interface BookingState {
  bookings: Booking[];
  bookingDetails: Booking | null;
  isLoading: boolean;
  isError: boolean;
  fetchBookings: () => Promise<void>;
  fetchBookingDetails: (id: string) => Promise<void>;
  createBooking: (
    bookingData: Omit<Booking, 'id' | 'created' | 'updated'>
  ) => Promise<boolean>;
  updateBooking: (
    id: string,
    updatedData: Partial<Omit<Booking, 'id' | 'created' | 'updated'>>
  ) => Promise<boolean>;
  deleteBooking: (id: string) => Promise<boolean>;
  fetchBookingsByUser: (userEmail: string) => Promise<void>;
}

export const useBookingAPI = create<BookingState>((set, get) => ({
  bookings: [],
  bookingDetails: null,
  isLoading: false,
  isError: false,

  fetchBookings: async () => {
    const { accessToken } = useAuthStore.getState();
    set({ isLoading: true, isError: false });

    try {
      const response = await fetch(
        `${BASE_API_URL}${API_BOOKINGS}?_bookings=true`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-Noroff-API-Key': API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error('Could not fetch bookings');

      const data = await response.json();
      set({ bookings: data.data, isLoading: false });
    } catch (error) {
      console.error('Feil ved henting av bookinger:', error);
      set({ isError: true, isLoading: false });
    }
  },

  // 📌 Hent en enkelt booking basert på ID
  fetchBookingDetails: async (venueId: string) => {
    const { accessToken } = useAuthStore.getState();
    set({ isLoading: true, isError: false });

    try {
      const response = await fetch(
        `${BASE_API_URL}${API_VENUES}/${venueId}?_bookings=true`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-Noroff-API-Key': API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API response booking urldetails:', response);

      if (!response.ok) throw new Error('Could not fetch booking details');

      const data = await response.json();
      console.log('Full API response:', data);

      // Log bookings rett før set()
      console.log('Bookings received from API:', data.data.bookings);

      set({ bookings: data.data.bookings, isLoading: false });

    } catch (error) {
      console.error('Feil ved henting av bookingdetaljer:', error);
      set({ isError: true, isLoading: false });
    }
  },


  // 📌 Opprett en ny booking
  createBooking: async (
    bookingData: Omit<Booking, 'id' | 'created' | 'updated'>
  ) => {
    const { accessToken } = useAuthStore.getState();
    set({ isLoading: true, isError: false });

    try {
      const response = await fetch(`${BASE_API_URL}${API_BOOKINGS}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) throw new Error('Could not crate booking');

      await get().fetchBookings(); 
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error('Feil ved oppretting av booking:', error);
      set({ isError: true, isLoading: false });
      return false;
    }
  },

  // 📌 Oppdater en eksisterende booking
  updateBooking: async (id, updatedData) => {
    const { accessToken } = useAuthStore.getState();
    set({ isLoading: true, isError: false });

    try {
      const response = await fetch(`${BASE_API_URL}${API_BOOKINGS}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Kunne ikke oppdatere booking');

      await get().fetchBookings(); // 📌 Oppdater listen over bookinger etter oppdatering
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error('Feil ved oppdatering av booking:', error);
      set({ isError: true, isLoading: false });
      return false;
    }
  },

  // 📌 Slett en booking basert på ID
  deleteBooking: async (id) => {
    const { accessToken } = useAuthStore.getState();
    set({ isLoading: true, isError: false });

    try {
      const response = await fetch(`${BASE_API_URL}${API_BOOKINGS}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Kunne ikke slette booking');

      await get().fetchBookings(); // 📌 Oppdater listen over bookinger etter sletting
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error('Feil ved sletting av booking:', error);
      set({ isError: true, isLoading: false });
      return false;
    }
  },

  // 📌 Hent bookinger for den innloggede brukeren
  fetchBookingsByUser: async (name) => {
    const { accessToken } = useAuthStore.getState();
    set({ isLoading: true, isError: false });

    try {
      const response = await fetch(
        `${BASE_API_URL}${API_PROFILE}/${name}/bookings?_customer=true&_venue=true`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-Noroff-API-Key': API_KEY,
            'Content-Type': 'application/json',
          },
          
        }
      );
      console.log('API response booking by user:', response);

      if (!response.ok) throw new Error('Kunne ikke hente brukerens bookinger');

      const resault = await response.json();
      console.log('API response booking by user data:', resault);

      // 📌 Filtrer kun bookinger tilhørende den innloggede brukeren
      const userBookings = resault.data;

      set({ bookings: userBookings, isLoading: false });
    } catch (error) {
      console.error('Feil ved henting av brukerens bookinger:', error);
      set({ isError: true, isLoading: false });
    }
  },
  
}));
