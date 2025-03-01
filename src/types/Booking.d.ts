/**
 * @fileoverview Booking interfaces for the accommodation booking system
 * @module types/Booking
 */

import { Venues } from './Venues';

/**
 * Interface representing a booking in the system
 *
 * @interface Booking
 * @property {string} id - Unique identifier for the booking
 * @property {string} dateFrom - Start date of the booking in ISO format
 * @property {string} dateTo - End date of the booking in ISO format
 * @property {number} guests - Number of guests for the booking
 * @property {string} created - Creation timestamp in ISO format
 * @property {string} updated - Last update timestamp in ISO format
 * @property {Venues} [venue] - The venue being booked (optional for some API responses)
 * @property {Customer} [customer] - The customer who made the booking (optional for some API responses)
 */
export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue?: Venues;
  customer?: Customer;
}

/**
 * Interface for the request payload when creating a new booking
 *
 * @interface BookingCreateRequest
 * @property {string} dateFrom - Start date of the booking in ISO format
 * @property {string} dateTo - End date of the booking in ISO format
 * @property {number} guests - Number of guests for the booking
 * @property {string} venueId - The ID of the venue to book
 */
export interface BookingCreateRequest {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

/**
 * Interface representing a customer in the system
 *
 * @interface Customer
 * @property {string} name - The customer's username
 * @property {string} email - The customer's email address
 * @property {string} [bio] - Optional customer biography
 * @property {Object} avatar - The customer's profile image
 * @property {string} avatar.url - URL of the avatar image
 * @property {string} avatar.alt - Alt text for the avatar image
 * @property {Object} banner - The customer's profile banner image
 * @property {string} banner.url - URL of the banner image
 * @property {string} banner.alt - Alt text for the banner image
 */
export interface Customer {
  name: string;
  email: string;
  bio?: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
}
