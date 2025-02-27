import { Venues } from './Venues';

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


export interface BookingCreateRequest {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string; 
}


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