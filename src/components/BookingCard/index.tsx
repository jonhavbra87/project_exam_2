import { Booking } from '../../types/Booking';
import { useNavigate } from 'react-router-dom';
import { FaPeopleRoof } from 'react-icons/fa6';
import { FaTrash, FaCalendarAlt } from 'react-icons/fa';
import useToastNotification from '../../hooks/useToastNotification';
import { useBookingAPI } from '../../hooks/useBookingAPI';
import { useAuthStore } from '../../store/authStore';

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

  const navigateToVenue = () => {
    if (venue?.id) {
      navigate(`/venue/${venue.id}`);
    }
  };

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
        toast.success('Booking deleted successfully!');
        if (onRefresh && typeof onRefresh === 'function') {
          onRefresh();
        }
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
          <h2 className="text-h2-mobile md:text-h2-desktop font-semibold">
            {venue?.name || 'Unknown place'}
          </h2>
          <p className="text-text-secondary mt-1 line-clamp-2">
            {venue?.description?.slice(0, 150)}...
          </p>
          <p className="text-text-secondary font-semibold mt-2 flex items-center gap-2">
            <FaCalendarAlt /> <span>{new Date(booking.dateFrom).toLocaleDateString()} - {new Date(booking.dateTo).toLocaleDateString()}</span>
          </p>
          <p className="text-text-secondary font-semibold mt-1 flex items-center gap-2">
            <FaPeopleRoof /> <span>{booking.guests} guests</span>
          </p>
          
          {/* Meta data */}
          <div className="mt-2 text-text-secondary">
            <p>
              {[
                venue?.meta?.wifi ? "WiFi" : null,
                venue?.meta?.parking ? "Parking" : null,
                venue?.meta?.breakfast ? "Breakfast" : null,
                venue?.meta?.pets ? "Pets allowed" : null
              ]
                .filter(Boolean)
                .join(" • ")}
            </p>
          </div>
          
          {/* Action buttons in a row */}
          <div className="flex flex-row items-center gap-3 mt-auto pt-4">
            <button
              onClick={navigateToVenue}
              className="px-4 py-2 bg-button-primary text-white rounded-lg hover:bg-button-hover"
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
            
            <span className={`ml-auto font-semibold ${isExpired ? 'text-text-muted' : 'text-primary'}`}>
              {isExpired ? '❌ Expired' : 'Active'}
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
              <p className="font-semibold">{customer?.name || 'Unknown customer'}</p>
              <p className="text-sm text-gray-500">{customer?.email}</p>
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