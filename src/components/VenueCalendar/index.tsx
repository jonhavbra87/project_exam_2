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
import { BsCalendarXFill, BsFillCalendarCheckFill } from 'react-icons/bs';

dayjs.extend(isBetween);

interface VenueCalendarProps {
  venueId: string;
  maxGuests: number;
  pricePerNight: number;
}

/**
 * VenueCalendar component for booking venue accommodations
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.venueId - ID of the venue to book
 * @param {number} props.maxGuests - Maximum number of guests allowed for the venue
 * @param {number} props.pricePerNight - Price per night for the venue
 * @returns {JSX.Element | null} - Rendered VenueCalendar component or null if no venueId
 *
 * @description
 * An interactive calendar component that allows users to book venues for specific dates.
 * Features:
 * - Date range selection with DatePicker
 * - Automatic blocking of already booked dates
 * - Guest count selection with validation against maximum allowed
 * - Real-time price calculation based on selected dates
 * - Booking submission with validation and error handling
 * - Loading state management
 *
 * The component fetches existing bookings for the venue and prevents users from
 * selecting date ranges that overlap with existing bookings. It validates user
 * inputs and provides appropriate feedback through toast notifications.
 *
 * Uses:
 * - react-datepicker for date selection
 * - dayjs for date manipulation and comparison
 * - react-hot-toast for notifications
 *
 * @example
 * // Basic usage with venue data
 * <VenueCalendar
 *   venueId="123abc"
 *   maxGuests={4}
 *   pricePerNight={1200}
 * />
 */

const VenueCalendar: React.FC<VenueCalendarProps> = ({
  venueId,
  maxGuests,
  pricePerNight,
}) => {
  const { fetchBookingDetails, createBooking, bookings, isLoading } =
    useBookingAPI();
  const { accessToken } = useAuthStore();
  const [selectedDates, setSelectedDates] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const [guests, setGuests] = useState<number>(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

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

      for (
        let d = start;
        d.isBefore(end) || d.isSame(end, 'day');
        d = d.add(1, 'day')
      ) {
        dates.push(d.toDate());
      }
      return dates;
    });

    setBookedDates(booked);
  }, [bookings, venueId]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setSelectedDates(dates);
    if (dates[0] && dates[1]) {
      const nights = dayjs(dates[1]).diff(dayjs(dates[0]), 'day');
      setTotalPrice(nights * pricePerNight);
    } else {
      setTotalPrice(0);
    }
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
        setTotalPrice(0);
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
              <label
                htmlFor="guests"
                className="block text-body-small-mobile md:text-body-medium-desktop font-medium font-body mb-2"
              >
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
              <p className="text-body-small-mobile md:text-body-small-desktop font-light font-body text-text-secondary">
                Max guests: {maxGuests}
              </p>
            </div>
            <div className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body text-text-primary">
              Total Price: {totalPrice} NOK
            </div>
            <CustomButton
              text={isBooking ? 'Booking...' : 'Book now'}
              onClick={handleBooking}
              disabled={!selectedDates[0] || !selectedDates[1] || isBooking}
              variant="accent"
              icon={
                isBooking ? (
                  <BsCalendarXFill />
                ) : selectedDates[0] && selectedDates[1] ? (
                  <BsFillCalendarCheckFill />
                ) : (
                  <BsCalendarXFill />
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueCalendar;
