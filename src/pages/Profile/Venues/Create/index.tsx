import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { FaImage, FaMoneyBill, FaUsers, FaStar, FaHome } from 'react-icons/fa';
import GradientHeading from '../../../../styles/GradientHeading';
import {
  venueSchema,
  type VenueFormData,
} from '../../../../components/VenueFormSchema';
import { useVenueAPI } from '../../../../hooks/useVenueAPI';
import { useAuthStore } from '../../../../store/authStore';
/**
 * ProfileVenueCreate Component
 *
 * Provides a comprehensive form for creating a new venue with multiple input fields
 *
 * @component
 * @returns {React.ReactElement} A detailed venue creation form with validation
 *
 * @description
 * Allows authenticated users to create a new venue with:
 * - Venue details (name, description, price, max guests)
 * - Media upload
 * - Facility options (WiFi, parking, breakfast, pets)
 * - Detailed location information
 * - Client-side validation using Yup schema
 *
 * @remarks
 * - Requires user authentication
 * - Uses react-hook-form for form management
 * - Provides toast notifications for submission status
 *
 * @example
 * // Typical usage in a protected route
 * <Route path="/profile/create-venue" element={<ProfileVenueCreate />} />
 */

const ProfileVenueCreate = (): JSX.Element => {
  const navigate = useNavigate();
  const createVenue = useVenueAPI((state) => state.createVenue);
  const { profile } = useAuthStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VenueFormData>({
    resolver: yupResolver(venueSchema),
    defaultValues: {
      name: '',
      description: '',
      media: [{ url: '', alt: 'Venue Image' }],
      price: 0,
      maxGuests: 1,
      rating: 1,
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: '',
        city: '',
        zip: '',
        country: '',
        continent: '',
        lat: 0,
        lng: 0,
      },
    },
  });

  const onSubmit = async (data: VenueFormData) => {
    try {
      if (!profile) {
        toast.error('You need to be logged in to create a venue.');
        return;
      }
      const loadingToast = toast.loading('Oppretter venue...');
      const validMedia = Array.isArray(data.media)
        ? data.media.filter(
            (item): item is { url: string; alt: string } =>
              typeof item.url === 'string' && item.url !== ''
          )
        : [];
      const mediaToSubmit =
        validMedia.length > 0
          ? validMedia
          : [
              {
                url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'Default venue image',
              },
            ];

      const formattedData = {
        ...data,
        media: mediaToSubmit,
        owner: {
          name: profile.name || 'Unknown',
          email: profile.email,
          bio: profile.bio || '',
          avatar: {
            url:
              profile.avatar?.url ||
              'https://images.unsplash.com/photo-1578593828319-a0f580bd9d07?q=80&w=1328&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: profile.avatar?.alt || 'User avatar',
          },
          banner: {
            url:
              profile.banner?.url ||
              'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: profile.banner?.alt || 'User banner',
          },
        },
        price: Number(data.price),
        maxGuests: Number(data.maxGuests),
        rating: Number(data.rating),
        meta: {
          wifi: Boolean(data.meta.wifi),
          parking: Boolean(data.meta.parking),
          breakfast: Boolean(data.meta.breakfast),
          pets: Boolean(data.meta.pets),
        },
        location: {
          address: data.location.address,
          city: data.location.city,
          zip: data.location.zip,
          country: data.location.country,
          continent: data.location.continent,
          lat: Number(data.location.lat),
          lng: Number(data.location.lng),
        },
      };
      const success = await createVenue(formattedData);

      if (success) {
        toast.success('Venue opprettet!', {
          id: loadingToast,
        });
        navigate('/profile');
      } else {
        console.error('Error creating venue');
        toast.error('Kunne ikke opprette venue. Prøv igjen.', {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Noe gikk galt. Prøv igjen senere.');
    }
  };

  return (
    <div>
      <GradientHeading>Create Venue</GradientHeading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
      >
        {/* Venue Name */}
        <label className="block text-sm font-semibold text-text-secondary">
          Venue Name
        </label>
        <div className="relative flex items-center">
          <FaHome className="absolute left-3 text-secondary" />
          <input
            {...register('name')}
            type="text"
            className="w-full pl-10 p-2 border rounded-lg bg-white text-text-secondary"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        {/* Description */}
        <label className="block mt-3 text-sm font-semibold text-text-secondary">
          Description
        </label>
        <textarea
          {...register('description')}
          className="w-full p-2 border rounded-lg"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}

        {/* Media */}
        <label className="block mt-3 text-sm font-semibold text-text-secondary">
          Media (Images)
        </label>
        <div className="relative flex items-center">
          <FaImage className="absolute left-3 text-secondary" />
          <input
            {...register('media.0.url')}
            type="text"
            className="w-full pl-10 p-2 border rounded-lg"
            placeholder="Image URL"
          />
        </div>
        {errors.media && (
          <span className="text-red-500 text-sm">{errors.media.message}</span>
        )}

        {/* Price */}
        <label className="block mt-3 text-sm font-semibold text-text-secondary">
          Price
        </label>
        <div className="relative flex items-center">
          <FaMoneyBill className="absolute left-3 text-secondary" />
          <input
            {...register('price')}
            type="number"
            className="w-full pl-10 p-2 border rounded-lg"
          />
        </div>
        {errors.price && (
          <span className="text-red-500 text-sm">{errors.price.message}</span>
        )}

        {/* Max Guests */}
        <label className="block mt-3 text-sm font-semibold text-text-secondary">
          Max Guests
        </label>
        <div className="relative flex items-center">
          <FaUsers className="absolute left-3 text-secondary" />
          <input
            {...register('maxGuests')}
            type="number"
            placeholder="Max guests allowed (100)"
            className="w-full pl-10 p-2 border rounded-lg"
          />
        </div>
        {errors.maxGuests && (
          <span className="text-red-500 text-sm">
            {errors.maxGuests.message}
          </span>
        )}

        {/* Rating */}
        <label className="block mt-3 text-sm font-semibold text-text-secondary">
          Rating
        </label>
        <div className="relative flex items-center">
          <FaStar className="absolute left-3 text-secondary" />
          <input
            {...register('rating')}
            type="number"
            step="1"
            placeholder="Rating between 1 and 5"
            className="w-full pl-10 p-2 border rounded-lg"
          />
        </div>
        {errors.rating && (
          <span className="text-red-500 text-sm">{errors.rating.message}</span>
        )}

        {/* Facilietes */}
        <label className="block mt-3 text-sm font-semibold text-text-secondary">
          Facilities
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register('meta.wifi')} />
            <span className="text-sm">WiFi</span>
          </label>

          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register('meta.parking')} />
            <span className="text-sm">Parking</span>
          </label>

          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register('meta.breakfast')} />
            <span className="text-sm">Breakfast</span>
          </label>

          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register('meta.pets')} />
            <span className="text-sm">Pets</span>
          </label>
        </div>

        {/* Location */}
        <label className="block mt-3 text-sm font-semibold text-text-secondary">
          Location
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            {...register('location.address')}
            placeholder="Address"
            className="p-2 border rounded-lg"
          />
          <input
            {...register('location.city')}
            placeholder="City"
            className="p-2 border rounded-lg"
          />
          <input
            {...register('location.zip')}
            placeholder="ZIP"
            className="p-2 border rounded-lg"
          />
          <input
            {...register('location.country')}
            placeholder="Country"
            className="p-2 border rounded-lg"
          />
          <input
            {...register('location.continent')}
            placeholder="Continent"
            className="p-2 border rounded-lg"
          />
        </div>
        {errors.location && (
          <span className="text-red-500 text-sm">
            Please check location details
          </span>
        )}

        {/* Coordinates */}
        <label className="block mt-3 text-sm font-semibold text-text-secondary">
          Coordinates
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            {...register('location.lat')}
            type="number"
            placeholder="Latitude"
            className="p-2 border rounded-lg"
          />
          <input
            {...register('location.lng')}
            type="number"
            placeholder="Longitude"
            className="p-2 border rounded-lg"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="w-1/3 p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-1/3 p-2 rounded-lg ${
              isSubmitting
                ? 'bg-gray-300'
                : 'bg-accent text-white hover:bg-accent/90'
            }`}
          >
            {isSubmitting ? 'Creating...' : 'Confirm'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileVenueCreate;
