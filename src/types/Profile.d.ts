/**
 * @fileoverview Profile type definition for user profiles
 * @module types/Profile
 */

/**
 * Type representing a user profile in the system
 *
 * @typedef {Object} Profile
 * @property {string} name - The user's username or display name
 * @property {string} email - The user's email address
 * @property {string} [bio] - Optional user biography or description
 * @property {Object} [avatar] - Optional user profile avatar image
 * @property {string} avatar.url - URL of the avatar image
 * @property {string} avatar.alt - Alt text description for the avatar image
 * @property {Object} [banner] - Optional user profile banner image
 * @property {string} banner.url - URL of the banner image
 * @property {string} banner.alt - Alt text description for the banner image
 *
 * @example
 * // Minimal profile
 * const basicProfile: Profile = {
 *   name: "john_doe",
 *   email: "john.doe@example.com"
 * };
 *
 * @example
 * // Complete profile with all fields
 * const fullProfile: Profile = {
 *   name: "jane_smith",
 *   email: "jane.smith@example.com",
 *   bio: "Travel enthusiast and photographer",
 *   avatar: {
 *     url: "https://example.com/avatars/janesmith.jpg",
 *     alt: "Jane Smith smiling"
 *   },
 *   banner: {
 *     url: "https://example.com/banners/janesmith-travel.jpg",
 *     alt: "Jane's travel collage"
 *   }
 * };
 */
export type Profile = {
  name: string;
  email: string;
  bio?: string;
  avatar?: { url: string; alt: string };
  banner?: { url: string; alt: string };
};
