import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { FaImage, FaMoneyBill, FaUsers, FaStar, FaHome } from 'react-icons/fa';
import GradientHeading from '../../../../styles/GradientHeading';
import {
  type VenueFormData,
} from '../../../../components/VenueFormSchema';
import { useVenueAPI } from '../../../../hooks/useVenueAPI';
import { useAuthStore } from '../../../../store/authStore';

const VenueForm = () => {
  const navigate = useNavigate();
  // const { useCreateVenue } = useVenueAPI();
  const createVenue = useVenueAPI((state) => state.createVenue);
  const { profile } = useAuthStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VenueFormData>({
    // resolver: yupResolver(venueSchema),
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

  const onSubmit = async (data: VenueFormData) => {
    try {
      console.log('Form date before formatting:', data);

      if (!profile) {
        toast.error('You need to be logged in to create a venue.');
        return;
      }
      console.log('Profile:', profile);

      const loadingToast = toast.loading('Oppretter venue...');

      console.log('Toast loading created:', loadingToast);

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
                url: 'https://placeholder.com/image.jpg',
                alt: 'Default venue image',
              },
            ];

      const formattedData = {
        ...data,
        media: mediaToSubmit,
        owner: profile.email, // ✅ Sørger for at eieren er en string
        price: Number(data.price), // 🔥 Konverterer til number
        maxGuests: Number(data.maxGuests), // 🔥 Konverterer til number
        rating: Number(data.rating), // 🔥 Konverterer til number
        meta: {
          wifi: Boolean(data.meta.wifi),
          parking: Boolean(data.meta.parking),
          breakfast: Boolean(data.meta.breakfast),
          pets: Boolean(data.meta.pets),
        },
        zip: Number(data.location.zip),
        lat: Number(data.location.lat),
        lng: Number(data.location.lng),
      };
      console.log('Formatted data:', formattedData);
      
      const success = await createVenue(formattedData);
      console.log('Success:', success);
      
      if (success) {
        toast.success('Venue opprettet!', {
          id: loadingToast,
        });
        navigate('/profile');
      } else {
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
            {isSubmitting ? 'Creating...' : 'Confirm'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VenueForm;

// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import GradientHeading from "../../../../styles/GradientHeading";
// import { FaImage, FaMoneyBill, FaUsers, FaStar } from "react-icons/fa";
// import { Venues } from "../../../../types/Venues";

// import { yupResolver } from '@hookform/resolvers/yup';
// import { useVenueAPI } from '../store/venueStore';
// import { toast } from 'react-hot-toast';
// import { venueSchema, type VenueFormData } from './VenueFormSchema';

// export const VenueForm = () => {
//   const navigate = useNavigate();
//   const { useCreateVenue } = useVenueAPI();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting }
//   } = useForm<VenueFormData>({
//     resolver: yupResolver(venueSchema),
//     defaultValues: {
//       meta: {
//         wifi: false,
//         parking: false,
//         breakfast: false,
//         pets: false
//       },
//       media: [{ url: '', alt: '' }]
//     }
//   });

//   const onSubmit = async (data: VenueFormData) => {
//     try {
//       const loadingToast = toast.loading('Oppretter venue...');

//       // Med Yup trenger vi ikke eksplisitt type konvertering siden
//       // schema'et allerede har konvertert verdiene til riktig type
//       const success = await useCreateVenue(data);

//       if (success) {
//         toast.success('Venue opprettet!', {
//           id: loadingToast
//         });
//         navigate('/venues');
//       } else {
//         toast.error('Kunne ikke opprette venue. Prøv igjen.', {
//           id: loadingToast
//         });
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         toast.error(`Feil: ${error.message}`);
//       } else {
//         toast.error('Noe gikk galt. Prøv igjen senere.');
//       }
//     }
//   };

// const ProfileVenueCreate = () => {
//   const navigate = useNavigate();
// //   const { createVenue, loading } = useCreateVenue();

//   const {
//     register,
//     handleSubmit,
//   } = useForm<Venues>({
//     defaultValues: {
//       name: "",
//       description: "",
//       media: [{ url: "", alt: "" }],
//       price: 0,
//       maxGuests: 1,
//       rating: 0,
//       meta: {
//         wifi: false,
//         parking: false,
//         breakfast: false,
//         pets: false,
//       },
//       location: {
//         address: "",
//         city: "",
//         zip: "",
//         country: "",
//         continent: "",
//         lat: 0,
//         lng: 0,
//       },
//     },
//   });

// //   const onSubmit = async (data: Venues) => {
// //     await createVenue(data);
// //     navigate("/profile"); // ✅ Navigerer tilbake etter opprettelse
// //   };@
// const onSubmit = async (data: VenueFormData) => {
//     try {
//       // Start loading state
//       const loadingToast = toast.loading('Oppretter venue...');

//       // Format media array correctly
//       const formattedData = {
//         ...data,
//         media: Array.isArray(data.media)
//           ? data.media
//           : [{ url: data.media, alt: 'Venue image' }],
//         price: Number(data.price),
//         maxGuests: Number(data.maxGuests),
//         location: {
//           ...data.location,
//           lat: Number(data.location.lat),
//           lng: Number(data.location.lng)
//         }
//       };

//       // Send data to API using store method
//       const success = await useCreateVenue(formattedData);

//       // Handle response
//       if (success) {
//         toast.success('Venue opprettet!', {
//           id: loadingToast
//         });
//         // Redirect to venues list or the new venue's page
//         navigate('/venues');
//       } else {
//         toast.error('Kunne ikke opprette venue. Prøv igjen.', {
//           id: loadingToast
//         });
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       toast.error('Noe gikk galt. Prøv igjen senere.');
//     }
//   };

//   return (
//     <div>
//       <GradientHeading>Create Venue</GradientHeading>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
//       >
//         {/* 🔹 Venue Name */}
//         <label className="block text-sm font-semibold text-text-secondary">Venue Name</label>
//         <div className="relative flex items-center">
//           <FaHouse className="absolute left-3 text-secondary" />
//           <input
//             {...register("name", { required: "Venue name is required" })}
//             type="text"
//             className="w-full pl-10 p-2 border rounded-lg bg-white text-text-secondary"
//           />
//         </div>

//         {/* 🔹 Description */}
//         <label className="block mt-3 text-sm font-semibold text-text-secondary">Description</label>
//         <textarea
//           {...register("description", { required: "Description is required" })}
//           className="w-full p-2 border rounded-lg"
//         />

//         {/* 🔹 Media (Image URLs) */}
//         <label className="block mt-3 text-sm font-semibold text-text-secondary">Media (Images)</label>
//         <div className="relative flex items-center">
//           <FaImage className="absolute left-3 text-secondary" />
//           <input
//             {...register("media.0.url")}
//             type="text"
//             className="w-full pl-10 p-2 border rounded-lg"
//             placeholder="Image URL"
//           />
//         </div>

//         {/* 🔹 Price */}
//         <label className="block mt-3 text-sm font-semibold text-text-secondary">Price</label>
//         <div className="relative flex items-center">
//           <FaMoneyBill className="absolute left-3 text-secondary" />
//           <input
//             {...register("price", { required: true, min: 0, max: 10000 })}
//             type="number"
//             className="w-full pl-10 p-2 border rounded-lg"
//           />
//         </div>

//         {/* 🔹 Max Guests */}
//         <label className="block mt-3 text-sm font-semibold text-text-secondary">Max Guests</label>
//         <div className="relative flex items-center">
//           <FaUsers className="absolute left-3 text-secondary" />
//           <input
//             {...register("maxGuests", { required: true, min: 1, max: 100 })}
//             type="number"
//             className="w-full pl-10 p-2 border rounded-lg"
//           />
//         </div>

//         {/* 🔹 Rating */}
//         <label className="block mt-3 text-sm font-semibold text-text-secondary">Rating</label>
//         <div className="relative flex items-center">
//           <FaStar className="absolute left-3 text-secondary" />
//           <input
//             {...register("rating", { min: 0, max: 5 })}
//             type="number"
//             step="0.1"
//             className="w-full pl-10 p-2 border rounded-lg"
//           />
//         </div>

//         {/* 🔹 Meta (Amenities) */}
//         <label className="block mt-3 text-sm font-semibold text-text-secondary">Amenities</label>
//         <div className="grid grid-cols-2 gap-3">
//           {["wifi", "parking", "breakfast", "pets"].map((amenity) => (
//             <label key={amenity} className="flex items-center space-x-2">
//               <input type="checkbox" {...register(`meta.${amenity}`)} />
//               <span className="text-sm">{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>
//             </label>
//           ))}
//         </div>

//         {/* 🔹 Location */}
//         <label className="block mt-3 text-sm font-semibold text-text-secondary">Location</label>
//         <div className="grid grid-cols-2 gap-2">
//           <input {...register("location.address")} placeholder="Address" className="p-2 border rounded-lg" />
//           <input {...register("location.city")} placeholder="City" className="p-2 border rounded-lg" />
//           <input {...register("location.zip")} placeholder="ZIP" className="p-2 border rounded-lg" />
//           <input {...register("location.country")} placeholder="Country" className="p-2 border rounded-lg" />
//           <input {...register("location.continent")} placeholder="Continent" className="p-2 border rounded-lg" />
//         </div>

//         {/* 🔹 Latitude & Longitude */}
//         <label className="block mt-3 text-sm font-semibold text-text-secondary">Coordinates</label>
//         <div className="grid grid-cols-2 gap-2">
//           <input {...register("location.lat")} type="number" placeholder="Latitude" className="p-2 border rounded-lg" />
//           <input {...register("location.lng")} type="number" placeholder="Longitude" className="p-2 border rounded-lg" />
//         </div>

//         {/* 🔹 Action Buttons */}
//         <div className="flex justify-between mt-6">
//           <button
//             type="button"
//             onClick={() => navigate("/profile")}
//             className="w-1/3 p-2 bg-gray-400 text-white rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-1/3 p-2 rounded-lg ${loading ? "bg-gray-300" : "bg-accent text-white"}`}
//           >
//             Confirm
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProfileVenueCreate;
