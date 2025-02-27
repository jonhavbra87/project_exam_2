import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaImage, FaMoneyBill, FaUsers, FaStar, FaHome, FaPlus, FaTrash } from 'react-icons/fa';
import GradientHeading from '../../../../styles/GradientHeading';
import { type VenueFormData } from '../../../../components/VenueFormSchema';
import { useVenueAPI } from '../../../../hooks/useVenueAPI';
import { useAuthStore } from '../../../../store/authStore';
import { useEffect, useState } from 'react';
import { API_VENUES, BASE_API_URL } from '../../../../api/apiConfig';

const ProfileVenueUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateVenue, fetchVenueDetails, venueDetails, isLoading } = useVenueAPI();
  const { profile } = useAuthStore((state) => state);

  const [mediaItems, setMediaItems] = useState<Array<{url: string, alt: string}>>([{ url: '', alt: 'Venue Image' }]);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues
  } = useForm<VenueFormData>({
    defaultValues: {
      name: '',
      description: '',
      media: [{ url: '', alt: 'Venue Image' }],
      price: 0,
      maxGuests: 1,
      rating: 0,
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

  // Hent venue-detaljer når komponenten lastes
  useEffect(() => {
    const getVenueData = async () => {
      if (id) {
        try {
          await fetchVenueDetails(`${BASE_API_URL}${API_VENUES}/${id}`);
        } catch (error) {
          console.error('Error fetching venue details:', error);
          toast.error('Failed to load venue details');
        }
      }
    };
    
    getVenueData();
  }, [id, fetchVenueDetails]);

  // Oppdater skjemaet når venue-detaljer er lastet
  useEffect(() => {
    if (venueDetails) {
      const mediaArray = venueDetails.media && venueDetails.media.length > 0 
        ? venueDetails.media 
        : [{ url: '', alt: 'Venue Image' }];
      
      setMediaItems(mediaArray);
      
      reset({
        name: venueDetails.name || '',
        description: venueDetails.description || '',
        media: mediaArray,
        price: venueDetails.price || 0,
        maxGuests: venueDetails.maxGuests || 1,
        rating: venueDetails.rating || 0,
        meta: {
          wifi: venueDetails.meta?.wifi || false,
          parking: venueDetails.meta?.parking || false,
          breakfast: venueDetails.meta?.breakfast || false,
          pets: venueDetails.meta?.pets || false,
        },
        location: {
          address: venueDetails.location?.address || '',
          city: venueDetails.location?.city || '',
          zip: venueDetails.location?.zip || '',
          country: venueDetails.location?.country || '',
          continent: venueDetails.location?.continent || '',
          lat: venueDetails.location?.lat || 0,
          lng: venueDetails.location?.lng || 0,
        },
      });
    }
  }, [venueDetails, reset]);

  const onSubmit = async (data: VenueFormData) => {
    try {
      console.log('Form data before formatting:', data);

      if (!profile) {
        toast.error('You need to be logged in to update a venue.');
        return;
      }
      if (!id) {
        toast.error('Venue ID is missing.');
        return;
      }

      console.log('Profile:', profile);

      const loadingToast = toast.loading('Updating venue...');

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
                alt: 'Placeholder venue image',
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
            url: profile.avatar?.url || 'https://images.unsplash.com/photo-1578593828319-a0f580bd9d07?q=80&w=1328&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: profile.avatar?.alt || 'User avatar',
          },
          banner: {
            url: profile.banner?.url || 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
          ...data.location,
          zip: data.location.zip ? String(data.location.zip) : '',
          lat: Number(data.location.lat),
          lng: Number(data.location.lng),
        },
      };
      console.log('Formatted data:', formattedData);

      const success = await updateVenue(id, formattedData);
      console.log('Success:', success);

      if (success) {
        toast.success('Venue updated!', { id: loadingToast });
        navigate('/profile');
      } else {
        toast.error('Could not update venue. Try again.', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Try again later.');
    }
  };

  return (
    <div>
      <GradientHeading>Update Venue</GradientHeading>
      {isLoading ? (
        <div className="text-center p-4">Laster venue-data...</div>
      ) : (
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
          <div className="space-y-2">
            {mediaItems.map((item, index) => (
              <div key={index} className="relative flex items-center mb-2">
                <FaImage className="absolute left-3 text-secondary" />
                <input
                  {...register(`media.${index}.url`)}
                  type="text"
                  className="w-full pl-10 p-2 border rounded-lg"
                  placeholder="Image URL"
                  defaultValue={item.url}
                />
                <input
                  {...register(`media.${index}.alt`)}
                  type="text"
                  className="w-1/3 ml-2 p-2 border rounded-lg"
                  placeholder="Alt Text"
                  defaultValue={item.alt}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const updatedItems = [...mediaItems];
                      updatedItems.splice(index, 1);
                      setMediaItems(updatedItems);
                      
                      // Oppdater form-verdiene
                      const currentValues = getValues();
                      currentValues.media = updatedItems;
                      reset(currentValues);
                    }}
                    className="ml-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    title="Remove image"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const updatedItems = [...mediaItems, { url: '', alt: 'Venue Image' }];
                setMediaItems(updatedItems);
                
                // Oppdater form-verdiene
                const currentValues = getValues();
                currentValues.media = updatedItems;
                reset(currentValues);
              }}
              className="flex items-center justify-center w-full p-2 bg-gray-100 text-gray-700 border border-dashed rounded-lg hover:bg-gray-200"
            >
              <FaPlus className="mr-1" /> Add Image
            </button>
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
              step="0.1"
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
              {isSubmitting ? 'Updating...' : 'Confirm'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileVenueUpdate;