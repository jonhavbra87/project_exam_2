/**
 * @fileoverview Metadata interface for venue amenities
 * @module types/MetaData
 */

/**
 * Interface representing venue amenities and features
 * 
 * @interface MetaData
 * @property {boolean} wifi - Indicates if the venue offers WiFi internet access
 * @property {boolean} parking - Indicates if the venue has parking available
 * @property {boolean} breakfast - Indicates if the venue offers breakfast
 * @property {boolean} pets - Indicates if the venue allows pets
 * 
 * @example
 * const venueAmenities: MetaData = {
 *   wifi: true,
 *   parking: true,
 *   breakfast: false,
 *   pets: true
 * };
 */
export interface MetaData {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}