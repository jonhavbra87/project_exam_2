/**
 * @fileoverview VenueManager type definition for user permission flags
 * @module types/VenueManager
 */

/**
 * Type representing a venue manager permission flag
 *
 * @typedef {Object} VenueManager
 * @property {boolean} venueManager - Indicates whether the user has venue management privileges
 *
 * @example
 * // User with venue management privileges
 * const adminUser: VenueManager = {
 *   venueManager: true
 * };
 *
 * @example
 * // Regular user without venue management privileges
 * const regularUser: VenueManager = {
 *   venueManager: false
 * };
 */

export type VenueManager = {
  venueManager: boolean;
};
