/**
* @fileoverview Owner interface for venue owner profiles
* @module types/Owner
*/

/**
* Interface representing a venue owner profile
* 
* @interface Owner
* @property {string} name - The owner's username or display name
* @property {string} email - The owner's email address
* @property {string} [bio] - Optional biography or description of the owner
* @property {Object} avatar - The owner's profile avatar image
* @property {string} avatar.url - URL of the avatar image
* @property {string} avatar.alt - Alt text description for the avatar image
* @property {Object} banner - The owner's profile banner image
* @property {string} banner.url - URL of the banner image
* @property {string} banner.alt - Alt text description for the banner image
* 
* @example
* const venueOwner: Owner = {
*   name: "Oliver Dipple",
*   email: "oliver.dippleh@example.com",
*   bio: "Experienced property manager with 10+ vacation rentals",
*   avatar: {
*     url: "https://example.com/avatars/oliverdipple.jpg",
*     alt: "Oliver Dipple profile picture"
*   },
*   banner: {
*     url: "https://example.com/banners/oliverdipple-properties.jpg",
*     alt: "Oliver Dipple properties banner"
*   }
* };
*/
export interface Owner {
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