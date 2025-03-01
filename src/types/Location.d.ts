/**
 * @fileoverview Location interface for venue geographical information
 * @module types/Location
 */

/**
 * Interface representing a geographical location with address and coordinates
 *
 * @interface Location
 * @property {string} address - Street address or specific location name
 * @property {string} city - City or town name
 * @property {string} zip - Postal or ZIP code
 * @property {string} country - Country name
 * @property {string} continent - Continent name
 * @property {number} lat - Latitude coordinate
 * @property {number} lng - Longitude coordinate
 *
 * @example
 * const venueLocation: Location = {
 *   address: "123 Ocean Drive",
 *   city: "Miami",
 *   zip: "33139",
 *   country: "USA",
 *   continent: "North America",
 *   lat: 25.7617,
 *   lng: -80.1918
 * };
 */
export interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}
