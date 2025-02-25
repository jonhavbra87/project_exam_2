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
import { StyledDatePickerWrapper } from '../../styles/StyledDatePickerWrapper';
dayjs.extend(isBetween);

interface VenueCalendarProps {
  venueId: string;
  maxGuests: number;
}

const VenueCalendar: React.FC<VenueCalendarProps> = ({ venueId, maxGuests}) => {
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
      toast.error('You have to be logged in to make a booking!');
      return;
    }

    if (!selectedDates[0] || !selectedDates[1]) {
      toast.error('Choose a start and end date!');
      return;
    }

    if (isDateRangeBooked()) {
      toast.error('These dates are already booked!');
      return;
    }

    if (guests < 1) {
      toast.error('Number of guests must be at least 1!');
      return;
    }

    setIsBooking(true);

    const newBooking: BookingCreateRequest = {
      dateFrom: selectedDates[0].toISOString(),
      dateTo: selectedDates[1].toISOString(),
      guests,
      venueId, 
    };

    try {
      const success = await createBooking(newBooking);
      
      if (success) {
        toast.success('Booking success!');
        fetchBookingDetails(venueId);
        setSelectedDates([null, null]);
        setGuests(1);
      } else {
        toast.error('Booking failed. Try again.');
      }
    } catch (error) {
      toast.error('An error occurred during booking. Please try again.');
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
      <div>
        {isLoading ? (
          <p className="text-center">Loading bookings...</p>
        ) : (
          <div className="space-y-6">
            <div>
              <StyledDatePickerWrapper>
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
              />
              </StyledDatePickerWrapper>
            </div>
                        
            <div>
              <label htmlFor="guests" className="block text-body-small-mobile md:text-body-medium-desktop font-medium font-body mb-2">
                Guests
              </label>
              <input
                id="guests"
                type="number"
                value={guests}
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value) || 1);
                  if (value <= maxGuests) {
                    setGuests(value);
                  } else {
                    toast.error(`Maximum guests allowed is ${maxGuests}`);
                  }
                }}
                min={1}
                max={maxGuests}
                className="w-full border rounded-md p-2"
              />
              <p className="text-sm text-gray-500">Max guests: {maxGuests}</p>
            </div>

            {/* <div>
              <label htmlFor="guests" className="block text-body-small-mobile md:text-body-medium-desktop font-medium font-body mb-2">
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
            </div> */}

            <CustomButton
              text={isBooking ? 'Booking...' : 'Book now'}
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