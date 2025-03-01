/**
 * @fileoverview Venues interface for accommodation listings
 * @module types/Venues
 */

import { Booking } from './Booking';
import { Location } from './Location';
import { MetaData } from './metaData';
import { Owner } from './Owner';

/**
 * Interface representing a venue accommodation listing
 *
 * @interface Venues
 * @property {string} id - Unique identifier for the venue
 * @property {string} name - Name of the venue
 * @property {string} description - Detailed description of the venue
 * @property {Array<{url: string, alt: string}>} media - Array of images for the venue
 * @property {number} price - Price per night in the local currency
 * @property {number} maxGuests - Maximum number of guests allowed
 * @property {number} rating - Venue rating (typically 0-5)
 * @property {string} created - Creation timestamp in ISO format
 * @property {string} updated - Last update timestamp in ISO format
 * @property {MetaData} meta - Amenities and features of the venue
 * @property {Location} location - Geographical location information
 * @property {Owner} owner - Information about the venue owner
 * @property {Booking[]} [bookings] - Optional array of bookings for the venue
 *
 * @example
 * const sampleVenue: Venues = {
 *   id: "v-123456",
 *   name: "Ocean View Villa",
 *   description: "Luxurious villa with panoramic ocean views",
 *   media: [
 *     { url: "https://example.com/images/oceanvilla1.jpg", alt: "Villa exterior" },
 *     { url: "https://example.com/images/oceanvilla2.jpg", alt: "Master bedroom" }
 *   ],
 *   price: 250,
 *   maxGuests: 6,
 *   rating: 4.8,
 *   created: "2023-01-15T12:00:00Z",
 *   updated: "2023-06-20T15:30:00Z",
 *   meta: {
 *     wifi: true,
 *     parking: true,
 *     breakfast: false,
 *     pets: true
 *   },
 *   location: {
 *     address: "123 Coastal Road",
 *     city: "Beachtown",
 *     zip: "12345",
 *     country: "Coastland",
 *     continent: "Europe",
 *     lat: 36.7783,
 *     lng: -119.4179
 *   },
 *   owner: {
 *     name: "Emma Johnson",
 *     email: "emma@properties.com",
 *     bio: "Luxury property manager with 15 years experience",
 *     avatar: {
 *       url: "https://example.com/avatars/emma.jpg",
 *       alt: "Emma Johnson"
 *     },
 *     banner: {
 *       url: "https://example.com/banners/emma-properties.jpg",
 *       alt: "Emma Johnson Properties"
 *     }
 *   }
 * };
 */
export interface Venues {
  id: string;
  name: string;
  description: string;
  media: Array<{ url: string; alt: string }>;
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: MetaData; // Single meta data object
  location: Location; // Single location object
  owner: Owner; // Owner ID
  bookings?: Booking[]; // Array of bookings
}
