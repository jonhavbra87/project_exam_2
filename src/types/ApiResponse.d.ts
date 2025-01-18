// types/apiResponse.ts
import { Venues } from './Venues';

export interface ApiResponse {
  data: Venues[];
  //meta: MetaData;
}

//Pagination.

export interface MetaData {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
}
