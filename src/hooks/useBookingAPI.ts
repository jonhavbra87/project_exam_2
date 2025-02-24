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
      console.error('Error fetching bookings:', error);
      set({ isError: true, isLoading: false });
    }
  },

  // Fetch booking details
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

      if (!response.ok) throw new Error('Could not fetch booking details');

      const data = await response.json();

      set({ bookings: data.data.bookings, isLoading: false });

    } catch (error) {
      console.error('Error fetching user data', error);
      set({ isError: true, isLoading: false });
    }
  },


  // Create a booking
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
      console.error('Error creating a booking:', error);
      set({ isError: true, isLoading: false });
      return false;
    }
  },

  // Update a booking
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

      if (!response.ok) throw new Error('Could not update booking');

      await get().fetchBookings();
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error('Error updating a booking:', error);
      set({ isError: true, isLoading: false });
      return false;
    }
  },

  // Delete a booking
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

      if (!response.ok) throw new Error('Could not delete booking');

      await get().fetchBookings(); // 📌 Oppdater listen over bookinger etter sletting
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error('Error deleting booking:', error);
      set({ isError: true, isLoading: false });
      return false;
    }
  },

  // Fetch bookings by user
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
      if (!response.ok) throw new Error('Could not fetch user bookings');
      const result = await response.json();
      const userBookings = result.data;
      set({ bookings: userBookings, isLoading: false });
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      set({ isError: true, isLoading: false });
    }
  },
}));
