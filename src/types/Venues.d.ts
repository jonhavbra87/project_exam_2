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
  bookings: Bookings[]; // Array of bookings
}

export interface MetaData {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

export interface Owner {
  name: string;
  email: string;
  bio: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
}

export interface Bookings {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: {
    name: string;
    email: string;
    avatar: {
      url: string;
      alt: string;
    };
    banner: {
      url: string;
      alt: string;
    };
  };
}
