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

// 📌 Venue-informasjon (forenklet)
// export interface Venue {
//   id: string;
//   name: string;
// }

// export interface Booking {
//   id: string;
//   dateFrom: string;
//   dateTo: string;
//   guests: number;
//   created: string;
//   updated: string;
//   venue?: Venues; // 📌 Venue er en referanse, ikke dupliserte felt
//   customer?: Customer; // 📌 Valgfri kundeinformasjon
// }

// // 📌 Definer `Customer` separat for renere kode
// export interface Customer {
//   name: string;
//   email: string;
//   bio?: string; // Bio kan være valgfritt
//   avatar: {
//     url: string;
//     alt: string;
//   };
//   banner: {
//     url: string;
//     alt: string;
//   };
// }
