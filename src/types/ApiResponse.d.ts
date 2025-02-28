/**
 * @fileoverview API response interfaces for venue data
 * @module types/apiInterfaces
 */

import { Venues } from './Venues';

/**
 * Interface representing the standard API response structure for venues
 * 
 * @interface ApiResponse
 * @property {Venues[]} data - Array of venue objects returned by the API
 */
export interface ApiResponse {
  data: Venues[];
}

/**
 * Interface representing pagination metadata for API responses
 * 
 * @interface MetaData
 * @property {boolean} isFirstPage - Indicates if the current page is the first page
 * @property {boolean} isLastPage - Indicates if the current page is the last page
 * @property {number} currentPage - The current page number
 * @property {number|null} previousPage - The previous page number, or null if there is no previous page
 * @property {number|null} nextPage - The next page number, or null if there is no next page
 * @property {number} pageCount - Total number of pages
 * @property {number} totalCount - Total number of items across all pages
 */
export interface MetaData {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
}