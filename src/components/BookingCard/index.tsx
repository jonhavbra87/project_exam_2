import { Booking } from '../../types/Booking';
import { useNavigate } from 'react-router-dom';
import { FaPeopleRoof } from 'react-icons/fa6';
import { FaTrash, FaCalendarAlt } from 'react-icons/fa';
import useToastNotification from '../../hooks/useToastNotification';
import { useBookingAPI } from '../../hooks/useBookingAPI';
import { useAuthStore } from '../../store/authStore';

/**
 * @module BookingCard
 * @description A component that displays booking information in a card format.
 * The card shows venue details, booking dates, number of guests, amenities,
 * and customer information. It also provides actions to view the venue or delete the booking.
 */

/**
 * @typedef {Object} BookingCardProps
 * @property {Booking} booking - The booking object containing venue and customer details
 * @property {boolean} isExpired - Flag indicating if the booking has expired
 * @property {Function} [onRefresh] - Optional callback function to refresh the parent component after deletion
 */

/**
 * BookingCard component displays detailed information about a booking
 *
 * @component
 * @param {Object} props - Component props
 * @param {Booking} props.booking - The booking object containing all booking information
 * @param {boolean} props.isExpired - Indicates whether the booking has expired
 * @param {Function} [props.onRefresh] - Optional callback to trigger data refresh in parent component
 * @returns {JSX.Element} - Rendered BookingCard component
 *
 * @example
 * // Basic usage with a booking object
 * <BookingCard
 *   booking={bookingData}
 *   isExpired={false}
 * />
 *
 * @example
 * // With refresh callback
 * <BookingCard
 *   booking={bookingData}
 *   isExpired={true}
 *   onRefresh={() => fetchBookings()}
 * />
 */

const BookingCard = ({
  booking,
  isExpired,
  onRefresh,
}: {
  booking: Booking;
  isExpired: boolean;
  onRefresh?: () => void;
}) => {
  const { venue, customer } = booking;
  const navigate = useNavigate();
  const toast = useToastNotification();
  const { deleteBooking } = useBookingAPI();
  const { profile } = useAuthStore();

  /**
   * @function navigateToVenue
   * @description Navigates to the venue details page
   *
   * @example
   * // Navigate to the venue page
   * navigateToVenue();
   * */

  const navigateToVenue = () => {
    if (venue?.id) {
      navigate(`/venue/${venue.id}`);
    }
  };

  /**
   * Handles the deletion of a booking
   *
   * @async
   * @function handleDeleteBooking
   * @description Deletes the booking from the database
   * @returns {Promise<void>} - A promise that resolves after the booking is deleted
   * @throws {Error} - If the booking deletion fails
   * @example
   * // Delete the booking
   * handleDeleteBooking();
   *
   * */
  const handleDeleteBooking = async () => {
    if (!booking.id) {
      toast.error('Error: Booking ID not found.');
      return;
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this booking?'
    );
    if (!confirmDelete) return;

    try {
      const success = await deleteBooking(booking.id);

      if (success) {
        // Use setTimeout to ensure toast and refresh happen after render
        setTimeout(() => {
          toast.success('Booking deleted successfully!');

          // Ensure onRefresh is called after toast
          if (onRefresh && typeof onRefresh === 'function') {
            onRefresh();
          }
        }, 0);
      } else {
        throw new Error('Failed to delete booking');
      }
    } catch (error) {
      console.error('Failed to delete booking', error);
      toast.error('Error: Could not delete the booking. Please try again.');
    }
  };

  return (
    <div className="p-1 sm:p-4 border rounded-lg shadow-md bg-white">
      {/* Responsive layout container - column on mobile, row on larger screens */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-stretch">
        {/* Image - Full width on mobile, right side on larger screens */}
        <div className="w-full md:hidden mb-3">
          <img
            src={venue?.media?.[0]?.url || 'https://via.placeholder.com/400'}
            alt={venue?.media?.[0]?.alt || 'Venue image'}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow md:pr-4">
          {/* Venue details */}
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading font-semibold">
            {venue?.name || 'Unknown place'}
          </h2>
          <p className="text-body-large-mobile md:text-body-medium-desktop font-body font-light text-text-secondary mt-1 line-clamp-2">
            {venue?.description?.slice(0, 150)}...
          </p>
          <p className="text-body-large-mobile md:text-body-medium-desktop font-body text-text-secondary font-semibold mt-2 flex items-center gap-2">
            <FaCalendarAlt />{' '}
            <span>
              {new Date(booking.dateFrom).toLocaleDateString()} -{' '}
              {new Date(booking.dateTo).toLocaleDateString()}
            </span>
          </p>
          <p className="text-body-large-mobile md:text-body-medium-desktop font-body text-text-secondary font-semibold mt-1 flex items-center gap-2">
            <FaPeopleRoof /> <span>{booking.guests} guests</span>
          </p>

          {/* Meta data */}
          <div className="mt-2 text-body-large-mobile md:text-body-medium-desktop font-body font-light text-text-secondary">
            <p>
              {[
                venue?.meta?.wifi ? 'WiFi' : null,
                venue?.meta?.parking ? 'Parking' : null,
                venue?.meta?.breakfast ? 'Breakfast' : null,
                venue?.meta?.pets ? 'Pets allowed' : null,
              ]
                .filter(Boolean)
                .join(' • ')}
            </p>
          </div>

          {/* Action buttons in a row */}
          <div className="flex flex-row items-center gap-3 mt-auto pt-4">
            <button
              onClick={navigateToVenue}
              className="px-4 py-2 bg-button-primary text-body-large-mobile md:text-body-medium-desktop font-button font-medium text-white rounded-lg hover:bg-button-hover"
            >
              View Venue
            </button>

            {profile && (
              <button
                className="p-2 text-red-500  hover:text-red-300"
                onClick={handleDeleteBooking}
                title="Delete booking"
              >
                <FaTrash />
              </button>
            )}

            <span
              className={`ml-auto text-body-large-mobile md:text-body-medium-desktop font-body font-semibold rounded-md py-2 px-3 ${isExpired ? 'bg-text-secondary text-text-contrast' : 'bg-primary text-text-contrast'}`}
            >
              {isExpired ? 'Expired' : 'Active'}
            </span>
          </div>

          {/* Customer info */}
          <div className="mt-4 flex items-center gap-4 border-t pt-4">
            <img
              src={customer?.avatar?.url || 'https://via.placeholder.com/50'}
              alt={customer?.avatar?.alt || 'Customer avatar'}
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <p className="text-body-large-mobile md:text-body-medium-desktop font-body font-semibold text-text-primary">
                {customer?.name || 'Unknown customer'}
              </p>
              <p className="text-body-small-mobile md:text-body-small-desktop font-body font-light text-text-secondary">
                {customer?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Image - Hidden on mobile, visible on larger screens */}
        <div className="hidden md:block md:flex-shrink-0 md:w-1/3 md:self-stretch">
          <img
            src={venue?.media?.[0]?.url || 'https://via.placeholder.com/400'}
            alt={venue?.media?.[0]?.alt || 'Venue image'}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
