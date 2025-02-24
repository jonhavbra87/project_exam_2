import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useBookingAPI } from '../../hooks/useBookingAPI';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import { CustomButton } from '../CustomButton';
import { BookingCreateRequest } from '../../types/Booking';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

interface VenueCalendarProps {
  venueId: string;
}

const VenueCalendar: React.FC<VenueCalendarProps> = ({ venueId }) => {
  const { fetchBookingDetails, createBooking, bookings, isLoading } = useBookingAPI();
  const { accessToken } = useAuthStore();
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
  const [guests, setGuests] = useState<number>(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  

  useEffect(() => {
    if (venueId) {
      fetchBookingDetails(venueId);
    }
  }, [venueId, fetchBookingDetails]);

  
  useEffect(() => {
    if (!venueId || bookings.length === 0) return;

    const venueBookings = bookings || [];

    const booked: Date[] = venueBookings.flatMap((booking) => {
      const start = dayjs(booking.dateFrom).startOf('day');
      const end = dayjs(booking.dateTo).startOf('day');
      const dates: Date[] = [];

      for (let d = start; d.isBefore(end) || d.isSame(end, 'day'); d = d.add(1, 'day')) {
        dates.push(d.toDate());
      }
      return dates;
    });

    setBookedDates(booked);
  }, [bookings, venueId]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setSelectedDates(dates);

  };
  
  const isDateRangeBooked = () => {
    const [start, end] = selectedDates;
    if (!start || !end) return false;
  
    const selectedStart = dayjs(start);
    const selectedEnd = dayjs(end);
  
    return bookedDates.some((bookedDate) => {
      const existing = dayjs(bookedDate);
      return existing.isBetween(selectedStart, selectedEnd, 'day', '[]');
    });
  };
  
  const handleBooking = async () => {
    if (!accessToken) {
      toast.error('Du må være innlogget for å gjøre en booking!');
      return;
    }

    if (!selectedDates[0] || !selectedDates[1]) {
      toast.error('Velg både start- og sluttdato!');
      return;
    }

    if (isDateRangeBooked()) {
      toast.error('Datoene er allerede booket!');
      return;
    }

    if (guests < 1) {
      toast.error('Antall gjester må være minst 1!');
      return;
    }

    setIsBooking(true);

    const newBooking: BookingCreateRequest = {
      dateFrom: selectedDates[0].toISOString(),
      dateTo: selectedDates[1].toISOString(),
      guests: guests,
      venueId: venueId, // Endret fra id til venueId
    };

    try {
      const success = await createBooking(newBooking);
      
      if (success) {
        toast.success('Booking vellykket!');
        fetchBookingDetails(venueId);
        setSelectedDates([null, null]);
        setGuests(1);
      } else {
        toast.error('Booking feilet. Prøv igjen.');
      }
    } catch (error) {
      toast.error('En feil oppstod under booking. Vennligst prøv igjen.');
      console.error('Booking error:', error);
    } finally {
      setIsBooking(false);
    }
  };

  if (!venueId) {
    return null;
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <h3 className='text-h3-desktop'>Pick a date for booking</h3>
      <div>
        {isLoading ? (
          <p className="text-center">Loading bookings...</p>
        ) : (
          <div className="space-y-6">
            <div>
              <DatePicker
                selected={selectedDates[0]}
                onChange={handleDateChange}
                startDate={selectedDates[0]}
                endDate={selectedDates[1]}
                selectsRange
                inline
                minDate={new Date()}
                excludeDates={bookedDates}
                selectsDisabledDaysInRange
                dateFormat="dd/MM/yyyy"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="guests" className="block text-sm font-medium mb-2">
                Guests
              </label>
              <input
                id="guests"
                type="number"
                value={guests}
                onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                min={1}
                className="w-full border rounded-md p-2"
              />
            </div>

            <CustomButton
              text={isBooking ? 'Booker...' : 'Book nå'}
              onClick={handleBooking}
              disabled={!selectedDates[0] || !selectedDates[1] || isBooking}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueCalendar;

/* import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { useBookingAPI } from '../../hooks/useBookingAPI';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import { CustomButton } from '../CustomButton';

dayjs.extend(isBetween);

// interface DateInterval {
//   start: Date;
//   end: Date;
// }

interface BookingCreateRequest {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

const VenueCalendar: React.FC = () => {
  const { id } = useParams();
  const { fetchBookingDetails, createBooking, bookings, isLoading } = useBookingAPI();
  const { accessToken } = useAuthStore();
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
  const [guests, setGuests] = useState<number>(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  useEffect(() => {
    if (id) {
      console.log(`Fetching bookings for venue ID: ${id}`);
      fetchBookingDetails(id);
    }
  }, [id, fetchBookingDetails]);

  useEffect(() => {
    if (!id || bookings.length === 0) return;

    const venueBookings = bookings.filter((booking) => booking.venue?.id === id);
    console.log('Filtered bookings for venue:', venueBookings);

    const booked: Date[] = venueBookings.flatMap((booking) => {
      const start = dayjs(booking.dateFrom).startOf('day');
      const end = dayjs(booking.dateTo).startOf('day');
      const dates: Date[] = [];

      for (let d = start; d.isBefore(end) || d.isSame(end, 'day'); d = d.add(1, 'day')) {
        dates.push(d.toDate());
      }
      return dates;
    });

    console.log('Processed booked dates:', booked);
    setBookedDates(booked);
  }, [bookings, id]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setSelectedDates(dates);
    console.log('Selected dates:', dates);
  };

  const isDateRangeBooked = () => {
    const [start, end] = selectedDates;
    if (!start || !end) return false;

    const selectedStart = dayjs(start);
    const selectedEnd = dayjs(end);

    return bookedDates.some((bookedDate) => {
      const existing = dayjs(bookedDate);
      return existing.isBetween(selectedStart, selectedEnd, 'day', '[]');
    });
  };

  const handleBooking = async () => {
    if (!accessToken) {
      toast.error('Du må være innlogget for å gjøre en booking!');
      return;
    }

    if (!selectedDates[0] || !selectedDates[1]) {
      toast.error('Velg både start- og sluttdato!');
      return;
    }

    if (isDateRangeBooked()) {
      toast.error('Datoene er allerede booket!');
      return;
    }

    if (guests < 1) {
      toast.error('Antall gjester må være minst 1!');
      return;
    }

    setIsBooking(true);

    const newBooking: BookingCreateRequest = {
      dateFrom: selectedDates[0].toISOString(),
      dateTo: selectedDates[1].toISOString(),
      guests: guests,
      venueId: id as string,
    };

    try {
      const success = await createBooking(newBooking);
      
      if (success) {
        toast.success('Booking vellykket!');
        fetchBookingDetails(id ?? '');
        setSelectedDates([null, null]);
        setGuests(1);
      } else {
        toast.error('Booking feilet. Prøv igjen.');
      }
    } catch (error) {
      toast.error('En feil oppstod under booking. Vennligst prøv igjen.');
      console.error('Booking error:', error);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
        <h3 className='text-h3-desktop'>Pick a date for booking</h3>
      <div>
        {isLoading ? (
          <p className="text-center">Lodaing bookings...</p>
        ) : (
          <div className="space-y-6">
            <div>
              <DatePicker
                selected={selectedDates[0]}
                onChange={handleDateChange}
                startDate={selectedDates[0]}
                endDate={selectedDates[1]}
                selectsRange
                inline
                minDate={new Date()}
                excludeDates={bookedDates}
                selectsDisabledDaysInRange
                dateFormat="dd/MM/yyyy"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="guests" className="block text-sm font-medium mb-2">
                Guests
              </label>
              <input
                id="guests"
                type="number"
                value={guests}
                onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                min={1}
                className="w-full border rounded-md p-2"
              />
            </div>

            <CustomButton
              text={isBooking ? 'Booker...' : 'Book nå'}
              onClick={handleBooking}
              disabled={!selectedDates[0] || !selectedDates[1] || isBooking}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueCalendar; */

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import dayjs from 'dayjs';
// import isBetween from 'dayjs/plugin/isBetween';

// import { useBookingAPI } from '../../hooks/useBookingAPI';
// import { useAuthStore } from '../../store/authStore';
// import toast from 'react-hot-toast';
// import { CustomButton } from '../CustomButton';

// dayjs.extend(isBetween);

// interface BookingCreateRequest {
//   dateFrom: string;
//   dateTo: string;
//   guests: number;
//   venueId: string;
// }

// const VenueCalendar: React.FC = () => {
//   const { id } = useParams();
//   const { fetchBookingDetails, createBooking, bookings, isLoading } = useBookingAPI();
//   const { accessToken } = useAuthStore();
//   const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
//   const [bookedDates, setBookedDates] = useState<Date[]>([]);
//   const [isBooking, setIsBooking] = useState(false);

//   // 📌 Hent bookinger ved lasting av siden
//   useEffect(() => {
//     if (id) {
//       console.log(`🔄 Fetching bookings for venue ID: ${id}`);
//       fetchBookingDetails(id ?? '');
//     }
//   }, [id, fetchBookingDetails]);

//   // 📌 Oppdaterer bookede datoer etter at bookinger er hentet
//   useEffect(() => {
//     if (!id || bookings.length === 0) return;

//     console.log('📌 Bookings fetched:', bookings);

//     // Filtrer bookinger for dette spesifikke venue
//     const venueBookings = bookings.filter((booking) => booking.venue?.id === id);

//     console.log(`🔍 Filtered bookings for venue ${id}:`, venueBookings);

//     // Konverter bookede datoer til en liste av `Date`-objekter
//     const booked: Date[] = venueBookings.flatMap((booking) => {
//       const start = dayjs(booking.dateFrom).startOf('day'); // Sett til starten av dagen
//       const end = dayjs(booking.dateTo).startOf('day');
//       const dates: Date[] = [];
      
//       for (let d = start; d.isBefore(end) || d.isSame(end, 'day'); d = d.add(1, 'day')) {
//         dates.push(d.toDate());
//       }
//       return dates;
//     });
    

//     console.log('📅 Booked dates:', booked);

//     setBookedDates(booked);
//   }, [bookings, id]);

//   // 📌 Håndterer datoendring
//   const handleDateChange = (dates: [Date | null, Date | null]) => {
//     setSelectedDates(dates);
//     console.log('📅 Selected dates:', dates);
//   };

//   // 📌 Sjekk om de valgte datoene overlapper med en eksisterende booking
//   const isDateRangeBooked = () => {
//     const [start, end] = selectedDates;
//     if (!start || !end) return false;

//     const selectedStart = dayjs(start);
//     const selectedEnd = dayjs(end);

//     console.log(`📌 Checking if range ${selectedStart.format('YYYY-MM-DD')} - ${selectedEnd.format('YYYY-MM-DD')} is booked`);

//     return bookedDates.some((bookedDate) => {
//       const existing = dayjs(bookedDate);
//       const isOverlap = existing.isBetween(selectedStart, selectedEnd, 'day', '[]');
//       if (isOverlap) {
//         console.log(`❌ Overlap detected with booked date: ${existing.format('YYYY-MM-DD')}`);
//       }
//       return isOverlap;
//     });
//   };

//   // 📌 Håndterer booking
//   // const handleBooking = async () => {
//   //   if (!accessToken) {
//   //     toast.error('You need to be signed in to make a booking!');
//   //     return;
//   //   }

//   //   if (!selectedDates[0] || !selectedDates[1]) {
//   //     toast.error('Select both start and end date!');
//   //     return;
//   //   }

//   //   if (isDateRangeBooked()) {
//   //     toast.error('This venue is already booked for the selected dates!');
//   //     return;
//   //   }

//   //   setIsBooking(true);
    
//   //   const newBooking: BookingCreateRequest = {
//   //     dateFrom: selectedDates[0].toISOString(),
//   //     dateTo: selectedDates[1].toISOString(),
//   //     guests: 1, 
//   //     venueId: id as string, 
//   //   };

//   //   console.log('📌 Sending booking request:', newBooking);

//   //   const success = await createBooking(newBooking);
//   //   setIsBooking(false);

//   //   if (success) {
//   //     toast.success('Booking successful!');
//   //     console.log('✅ Booking was successful!');
//   //     fetchBookings();
//   //   } else {
//   //     toast.error('Booking failed. Try again!');
//   //     console.error('❌ Booking failed.');
//   //   }
//   // };
//   const handleBooking = async () => {
//     if (!accessToken) {
//       toast.error('Du må være innlogget for å gjøre en booking!');
//       return;
//     }
  
//     if (!selectedDates[0] || !selectedDates[1]) {
//       toast.error('Velg både start- og sluttdato!');
//       return;
//     }
  
//     if (isDateRangeBooked()) {
//       toast.error('Datoene er allerede booket!');
//       return;
//     }
  
//     setIsBooking(true);
  
//     const newBooking: BookingCreateRequest = {
//       dateFrom: selectedDates[0].toISOString(),
//       dateTo: selectedDates[1].toISOString(),
//       guests: 1,
//       venueId: id as string,
//     };
  
//     const success = await createBooking(newBooking);
//     setIsBooking(false);
  
//     if (success) {
//       toast.success('Booking vellykket!');
//       fetchBookingDetails(id ?? ''); 
//     } else {
//       toast.error('Booking feilet. Prøv igjen.');
//     }
//   };
  
//   return (
//     <div>
//       <h2>Velg dato for booking:</h2>
//       {isLoading ? (
//   <p>Loading bookings...</p>
// ) : (
//   <DatePicker
//     selected={selectedDates[0]}
//     onChange={handleDateChange}
//     startDate={selectedDates[0]}
//     endDate={selectedDates[1]}
//     selectsRange
//     inline
//     minDate={new Date()}
//     excludeDates={bookedDates} // 📌 Marker bookede datoer som deaktivert
//   />
// )}
// <CustomButton
//   text={isBooking ? 'Booking...' : 'Make a booking'}
//   onClick={handleBooking}
//   disabled={!selectedDates[0] || !selectedDates[1] || isBooking}
// />

//     </div>
//   );
// };

// export default VenueCalendar;


// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import dayjs from 'dayjs';

// import { useBookingAPI } from '../../hooks/useBookingAPI';
// import { useAuthStore } from '../../store/authStore';
// import toast from 'react-hot-toast';
// import { CustomButton } from '../CustomButton';

// interface BookingCreateRequest {
//   dateFrom: string;
//   dateTo: string;
//   guests: number;
//   venueId: string;
// }

// const VenueCalendar: React.FC = () => {
//   const { id } = useParams(); // 📌 Henter venue-ID fra URL
//   const { fetchBookings, createBooking, bookings, isLoading } = useBookingAPI();
//   const { accessToken } = useAuthStore();
//   const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
//   const [bookedDates, setBookedDates] = useState<Date[]>([]);
//   const [isBooking, setIsBooking] = useState(false);

//   // 📌 Henter bookinger ved lasting av siden
//   useEffect(() => {
//     if (id) {
//       fetchBookings();
//     }
//   }, [id, fetchBookings]);

//   // 📌 Oppdaterer bookede datoer etter at bookings er lastet inn
//   useEffect(() => {
//     if (!id || bookings.length === 0) return;

//     // 📌 Filtrer bookinger for dette venue
//     const venueBookings = bookings.filter((booking) => booking.venue?.id === id);

//     // 📌 Konverter bookede datoer til en liste av `Date`-objekter
//     const booked: Date[] = venueBookings.flatMap((booking) => {
//       const start = dayjs(booking.dateFrom);
//       const end = dayjs(booking.dateTo);
//       const dates: Date[] = [];

//       for (
//         let d = start;
//         d.isBefore(end) || d.isSame(end, 'day');
//         d = d.add(1, 'day')
//       ) {
//         dates.push(d.toDate());
//       }
//       return dates;
//     });

//     setBookedDates(booked); // 📌 Oppdaterer state med bookede datoer
//   }, [bookings, id]);

//   // 📌 Håndterer datoendring
//   const handleDateChange = (dates: [Date | null, Date | null]) => {
//     setSelectedDates(dates);
//   };

//   // 📌 Sjekk om de valgte datoene er booket
//   const isDateRangeBooked = () => {
//     const [start, end] = selectedDates;
//     if (!start || !end) return false;

//     const selectedStart = dayjs(start);
//     const selectedEnd = dayjs(end);

//     return bookedDates.some((bookedDate) => {
//       const existing = dayjs(bookedDate);
//       return existing.isBetween(selectedStart, selectedEnd, null, '[]');
//     });
//   };

//   const handleBooking = async () => {
//     if (!accessToken) {
//       toast.error('You need to be signed in to make a booking!');
//       return;
//     }

//     if (!selectedDates[0] || !selectedDates[1]) {
//       toast.error('Select both start and end date!');
//       return;
//     }

//     if (isDateRangeBooked()) {
//       toast.error('This venue is already booked for the selected dates!');
//       return;
//     }

//     setIsBooking(true); // 🔄 Viser loader

//     const newBooking: BookingCreateRequest = {
//       dateFrom: selectedDates[0].toISOString(),
//       dateTo: selectedDates[1].toISOString(),
//       guests: 1, // 📌 Juster antall gjester etter behov
//       venueId: id as string, // 📌 Venue-ID
//     };

//     const success = await createBooking(newBooking);
//     setIsBooking(false); // 🔄 Skjuler loader

//     if (success) {
//       toast.success('Booking successful!');
//       fetchBookings(); // 📌 Oppdater bookinger etter ny booking
//     } else {
//       toast.error('Booking failed. Try again!');
//     }
//   };

//   return (
//     <div>
//       <h2>Velg dato for booking:</h2>
//       {isLoading ? (
//         <p>Loading bookings...</p>
//       ) : (
//         <DatePicker
//           selected={selectedDates[0]}
//           onChange={handleDateChange}
//           startDate={selectedDates[0]}
//           endDate={selectedDates[1]}
//           selectsRange
//           inline
//           minDate={new Date()}
//           excludeDates={bookedDates} // 📌 Blokker allerede bookede datoer
//         />
//       )}
//       <CustomButton
//         text={isBooking ? 'Booking...' : 'Make a booking'}
//         onClick={handleBooking}
//         disabled={!selectedDates[0] || !selectedDates[1] || isBooking}
//       />
//     </div>
//   );
// };

// export default VenueCalendar;



//Button booking
{/* <button
onClick={handleBooking}
disabled={!selectedDates[0] || !selectedDates[1] || isBooking}
className={`mt-4 px-6 py-2 rounded-lg text-white ${
  isBooking ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'
}`}
>
{isBooking ? 'Booking...' : 'Book denne perioden'}
</button> */}

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import dayjs from 'dayjs';

// import { useAuthStore } from '../../store/authStore';
// import { useBookingAPI } from '../../hooks/useBookingAPI';
// import { BookingCreateRequest } from '../../types/Booking';

// const VenueCalendar: React.FC = () => {
//   const { id } = useParams(); // 📌 Henter venue-ID fra URL
//   const { fetchBookings, createBooking, bookings } = useBookingAPI();
//   const { accessToken } = useAuthStore(); // 📌 Henter innloggingsstatus
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [bookedDates, setBookedDates] = useState<Date[]>([]);

//   useEffect(() => {
//     if (id) {
//       fetchBookings(); // 📌 Henter alle bookinger
//     }
//   }, [id, fetchBookings]);

//   useEffect(() => {
//     // 📌 Filtrer bookinger for denne spesifikke venue
//     const venueBookings = bookings.filter(
//       (booking) => booking.venue?.id === id
//     );

//     // 📌 Konverter bookede datoer til en liste av `Date`-objekter
//     const booked: Date[] = venueBookings.flatMap((booking) => {
//       const start = dayjs(booking.dateFrom);
//       const end = dayjs(booking.dateTo);
//       const dates: Date[] = [];

//       for (
//         let d = start;
//         d.isBefore(end) || d.isSame(end, 'day');
//         d = d.add(1, 'day')
//       ) {
//         dates.push(d.toDate());
//       }
//       return dates;
//     });

//     setBookedDates(booked); // 📌 Oppdater state med bookede datoer
//   }, [bookings, id]);

//   const handleBooking = async () => {
//     if (!accessToken) {
//       alert('Du må være innlogget for å booke!');
//       return;
//     }

//     if (!startDate || !endDate) {
//       alert('Velg både start- og sluttdato!');
//       return;
//     }

//     const newBooking: BookingCreateRequest = {
//       dateFrom: startDate.toISOString(),
//       dateTo: endDate.toISOString(),
//       guests: 1, // 📌 Juster antall gjester etter behov
//       venueId: id as string, // 📌 Venue-ID
//     };

//     const success = await createBooking(newBooking);

//     if (success) {
//       alert('Booking vellykket!');
//       fetchBookings(); // 📌 Oppdater bookinger etter ny booking
//     } else {
//       alert('Booking feilet. Prøv igjen!');
//     }
//   };

//   return (
//     <div>
//       <h2>Velg en dato for booking:</h2>
//       <DatePicker
//         selected={startDate}
//         onChange={(date) => setStartDate(date)}
//         excludeDates={bookedDates} // 📌 Blokker allerede bookede datoer
//         minDate={new Date()} // 📌 Ikke tillat tidligere datoer
//         selectsStart
//         startDate={startDate}
//         endDate={endDate}
//         inline
//       />
//       <DatePicker
//         selected={endDate}
//         onChange={(date) => setEndDate(date)}
//         excludeDates={bookedDates} // 📌 Blokker allerede bookede datoer
//         minDate={startDate || new Date()} // 📌 Sluttdato må være etter startdato
//         selectsEnd
//         startDate={startDate}
//         endDate={endDate}
//         inline
//       />
//       <button onClick={handleBooking} disabled={!startDate || !endDate}>
//         Book denne perioden
//       </button>
//     </div>
//   );
// };

// export default VenueCalendar;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import dayjs from "dayjs";

// import { useAuthStore } from "../../store/authStore";
// import { useBookingAPI } from "../../hooks/useBookingAPI";
// import { BookingCreateRequest } from "../../types/Booking";

// const VenueCalendar: React.FC = () => {
//   const { id } = useParams(); // 📌 Henter venue-ID fra URL
//   const { fetchBookings, createBooking, bookings } = useBookingAPI();
//   const { accessToken } = useAuthStore(); // 📌 Henter innloggingsstatus
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [bookedDates, setBookedDates] = useState<Date[]>([]);

//   useEffect(() => {
//     if (id) {
//       fetchBookings(); // 📌 Henter alle bookinger
//     }
//   }, [id]);

//   useEffect(() => {
//     // Sjekk at `venue` finnes før du prøver å bruke `booking.venue.id`
// const venueBookings = bookings.filter((booking) => booking.venue && booking.venue.id === id);

//     // 📌 Konverter bookede datoer til en liste av `Date`-objekter
//     let booked: Date[] = [];
//     venueBookings.forEach((booking) => {
//       const start = dayjs(booking.dateFrom);
//       const end = dayjs(booking.dateTo);

//       for (let d = start; d.isBefore(end) || d.isSame(end, "day"); d = d.add(1, "day")) {
//         booked.push(d.toDate());
//       }
//     });

//     setBookedDates(booked); // 📌 Oppdater state med bookede datoer
//   }, [bookings, id]);

//         const handleBooking = async () => {
//             if (!accessToken) {
//             alert("Du må være innlogget for å booke!");
//             return;
//             }

//             if (!startDate || !endDate) {
//             alert("Velg både start- og sluttdato!");
//             return;
//             }
//         const newBooking: BookingCreateRequest = {
//             dateFrom: startDate.toISOString(),
//             dateTo: endDate.toISOString(),
//             guests: 1, // 📌 Juster antall gjester etter behov
//             venueId: id as string, // 📌 Venue-ID
//         };

//         const success = await createBooking(newBooking);

//         if (success) {
//             alert("Booking vellykket!");
//             fetchBookings(); // 📌 Oppdater bookinger etter ny booking
//         } else {
//             alert("Booking feilet. Prøv igjen!");
//         }
// };

//     // const success = await createBooking({
//     //     dateFrom: startDate.toISOString(),
//     //     dateTo: endDate.toISOString(),
//     //     guests: 1,
//     //     venueId: id as string, // 📌 Venue-ID må sendes som string
//     //   });

//     // if (success) {
//     //   alert("Booking vellykket!");
//     //   fetchBookings(); // 📌 Oppdater bookinger etter ny booking
//     // } else {
//     //   alert("Booking feilet. Prøv igjen!");
//     // }
//     // };

//   return (
//     <div>
//       <h2>Velg en dato for booking:</h2>
//       <DatePicker
//         selected={startDate}
//         onChange={(date) => setStartDate(date)}
//         excludeDates={bookedDates} // 📌 Blokker allerede bookede datoer
//         minDate={new Date()} // 📌 Ikke tillat tidligere datoer
//         selectsStart
//         startDate={startDate}
//         endDate={endDate}
//         inline
//       />
//       <DatePicker
//         selected={endDate}
//         onChange={(date) => setEndDate(date)}
//         excludeDates={bookedDates} // 📌 Blokker allerede bookede datoer
//         minDate={startDate || new Date()} // 📌 Sluttdato må være etter startdato
//         selectsEnd
//         startDate={startDate}
//         endDate={endDate}
//         inline
//       />
//       <button onClick={handleBooking} disabled={!startDate || !endDate}>
//         Book denne perioden
//       </button>
//     </div>
//   );
// };

// export default VenueCalendar;
