import { Venues } from "./Venues";

export interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    venue?: Venues; // 📌 Venue er valgfri fordi den kanskje ikke returneres av API
    customer?: Customer;
  }
  
  // 📌 Ny type for opprettelse av booking (API-krav)
  export interface BookingCreateRequest {
    dateFrom: string;
    dateTo: string;
    guests: number;
    venueId: string; // 📌 Må være inkludert ved opprettelse
  }
  
  // 📌 Kunde-informasjon
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
