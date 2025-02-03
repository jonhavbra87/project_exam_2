import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import { useAuthStore } from "../../store/authStore";
import { useBookingAPI } from "../../hooks/useBookingAPI";
import { BookingCreateRequest } from "../../types/Booking";

const VenueCalendar: React.FC = () => {
  const { id } = useParams(); // 📌 Henter venue-ID fra URL
  const { fetchBookings, createBooking, bookings } = useBookingAPI();
  const { accessToken } = useAuthStore(); // 📌 Henter innloggingsstatus
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  useEffect(() => {
    if (id) {
      fetchBookings(); // 📌 Henter alle bookinger
    }
  }, [id, fetchBookings]);

  useEffect(() => {
    // 📌 Filtrer bookinger for denne spesifikke venue
    const venueBookings = bookings.filter((booking) => booking.venue?.id === id);

    // 📌 Konverter bookede datoer til en liste av `Date`-objekter
    const booked: Date[] = venueBookings.flatMap((booking) => {
      const start = dayjs(booking.dateFrom);
      const end = dayjs(booking.dateTo);
      const dates: Date[] = [];

      for (let d = start; d.isBefore(end) || d.isSame(end, "day"); d = d.add(1, "day")) {
        dates.push(d.toDate());
      }
      return dates;
    });

    setBookedDates(booked); // 📌 Oppdater state med bookede datoer
  }, [bookings, id]);

  const handleBooking = async () => {
    if (!accessToken) {
      alert("Du må være innlogget for å booke!");
      return;
    }

    if (!startDate || !endDate) {
      alert("Velg både start- og sluttdato!");
      return;
    }

    const newBooking: BookingCreateRequest = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests: 1, // 📌 Juster antall gjester etter behov
      venueId: id as string, // 📌 Venue-ID
    };

    const success = await createBooking(newBooking);

    if (success) {
      alert("Booking vellykket!");
      fetchBookings(); // 📌 Oppdater bookinger etter ny booking
    } else {
      alert("Booking feilet. Prøv igjen!");
    }
  };

  return (
    <div>
      <h2>Velg en dato for booking:</h2>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        excludeDates={bookedDates} // 📌 Blokker allerede bookede datoer
        minDate={new Date()} // 📌 Ikke tillat tidligere datoer
        selectsStart
        startDate={startDate}
        endDate={endDate}
        inline
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        excludeDates={bookedDates} // 📌 Blokker allerede bookede datoer
        minDate={startDate || new Date()} // 📌 Sluttdato må være etter startdato
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        inline
      />
      <button onClick={handleBooking} disabled={!startDate || !endDate}>
        Book denne perioden
      </button>
    </div>
  );
};

export default VenueCalendar;


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
