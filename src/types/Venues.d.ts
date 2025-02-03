import { Booking } from "./Booking";
import { Location } from "./Location";
import { MetaData } from "./metaData";
import { Owner } from "./Owner";

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
  owner: Owner; // Single owner object
  bookings?: Booking[]; // Array of bookings
}



