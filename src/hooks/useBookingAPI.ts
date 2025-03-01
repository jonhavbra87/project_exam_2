/**
 * @fileoverview Booking API store for managing booking-related operations and state
 * @module store/bookingStore
 */
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

/**
 * Interface defining the booking state and operations
 *
 * @typedef {Object} BookingState
 * @property {Booking[]} bookings - List of bookings
 * @property {Booking|null} bookingDetails - Details of selected booking
 * @property {boolean} isLoading - Indicates if a booking operation is in progress
 * @property {boolean} isError - Indicates if an error occurred during a booking operation
 * @property {function(): Promise<void>} fetchBookings - Fetches all bookings
 * @property {function(id: string): Promise<void>} fetchBookingDetails - Fetches details for a specific booking
 * @property {function(bookingData: Omit<Booking, 'id' | 'created' | 'updated'>): Promise<boolean>} createBooking - Creates a new booking
 * @property {function(id: string, updatedData: Partial<Omit<Booking, 'id' | 'created' | 'updated'>>): Promise<boolean>} updateBooking - Updates an existing booking
 * @property {function(id: string): Promise<boolean>} deleteBooking - Deletes a booking
 * @property {function(userEmail: string): Promise<void>} fetchBookingsByUser - Fetches bookings for a specific user
 */

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

/**
 * Zustand store for booking management
 *
 * This store manages all booking-related state and operations, including
 * fetching, creating, updating, and deleting bookings. It handles API
 * interactions and maintains the loading/error states.
 *
 * @example
 * // Fetch all bookings
 * useBookingAPI.getState().fetchBookings();
 *
 * // Access booking data in a component
 * const { bookings, isLoading } = useBookingAPI();
 *
 * // Create a new booking
 * const createBooking = useBookingAPI(state => state.createBooking);
 * createBooking({
 *   dateFrom: "2023-09-01T14:00:00.000Z",
 *   dateTo: "2023-09-05T12:00:00.000Z",
 *   guests: 2,
 *   venueId: "venue-123"
 * });
 */

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

  /**
   * Fetches booking details for a specific venue
   *
   * @async
   * @function fetchBookingDetails
   * @param {string} venueId - The ID of the venue to fetch bookings for
   * @returns {Promise<void>} A promise that resolves when the fetch operation completes
   * @throws {Error} If the API request fails
   *
   * @example
   * await useBookingAPI.getState().fetchBookingDetails('venue-123');
   */

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

  /**
   * Creates a new booking
   *
   * @async
   * @function createBooking
   * @param {Omit<Booking, 'id' | 'created' | 'updated'>} bookingData - The booking data to create
   * @returns {Promise<boolean>} A promise that resolves to true if successful, false otherwise
   * @throws {Error} If the API request fails
   *
   * @example
   * const success = await useBookingAPI.getState().createBooking({
   *   dateFrom: "2023-09-01T14:00:00.000Z",
   *   dateTo: "2023-09-05T12:00:00.000Z",
   *   guests: 2,
   *   venueId: "venue-123"
   * });
   */

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

  /**
   * Updates an existing booking
   *
   * @async
   * @function updateBooking
   * @param {string} id - The ID of the booking to update
   * @param {Partial<Omit<Booking, 'id' | 'created' | 'updated'>>} updatedData - The updated booking data
   * @returns {Promise<boolean>} A promise that resolves to true if successful, false otherwise
   * @throws {Error} If the API request fails
   *
   * @example
   * const success = await useBookingAPI.getState().updateBooking('booking-123', {
   *   guests: 3
   * });
   */
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

  /**
   * Deletes a booking
   *
   * @async
   * @function deleteBooking
   * @param {string} id - The ID of the booking to delete
   * @returns {Promise<boolean>} A promise that resolves to true if successful, false otherwise
   * @throws {Error} If the API request fails
   *
   * @example
   * const success = await useBookingAPI.getState().deleteBooking('booking-123');
   */
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

      await get().fetchBookings();
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error('Error deleting booking:', error);
      set({ isError: true, isLoading: false });
      return false;
    }
  },

  /**
   * Fetches bookings for a specific user
   *
   * @async
   * @function fetchBookingsByUser
   * @param {string} name - The username to fetch bookings for
   * @returns {Promise<void>} A promise that resolves when the fetch operation completes
   * @throws {Error} If the API request fails
   *
   * @example
   * await useBookingAPI.getState().fetchBookingsByUser('johndoe');
   */
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
