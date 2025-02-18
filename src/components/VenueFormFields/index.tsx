// import { FaHome, FaImage, FaMoneyBill, FaStar, FaUsers } from "react-icons/fa";

// const VenueFormFields = ( { register, errors }) => {

//   return(
//     <form
//     className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
//   >
//     {/* Venue Name */}
//     <label className="block text-sm font-semibold text-text-secondary">
//       Venue Name
//     </label>
//     <div className="relative flex items-center">
//       <FaHome className="absolute left-3 text-secondary" />
//       <input
//         {...register('name')}
//         type="text"
//         className="w-full pl-10 p-2 border rounded-lg bg-white text-text-secondary"
//       />
//       {errors.name && (
//         <span className="text-red-500 text-sm">{errors.name.message}</span>
//       )}
//     </div>

//     {/* Description */}
//     <label className="block mt-3 text-sm font-semibold text-text-secondary">
//       Description
//     </label>
//     <textarea
//       {...register('description')}
//       className="w-full p-2 border rounded-lg"
//     />
//     {errors.description && (
//       <span className="text-red-500 text-sm">
//         {errors.description.message}
//       </span>
//     )}

//     {/* Media */}
//     <label className="block mt-3 text-sm font-semibold text-text-secondary">
//       Media (Images)
//     </label>
//     <div className="relative flex items-center">
//       <FaImage className="absolute left-3 text-secondary" />
//       <input
//         {...register('media.0.url')}
//         type="text"
//         className="w-full pl-10 p-2 border rounded-lg"
//         placeholder="Image URL"
//       />
//     </div>
//     {errors.media && (
//       <span className="text-red-500 text-sm">{errors.media.message}</span>
//     )}

//     {/* Price */}
//     <label className="block mt-3 text-sm font-semibold text-text-secondary">
//       Price
//     </label>
//     <div className="relative flex items-center">
//       <FaMoneyBill className="absolute left-3 text-secondary" />
//       <input
//         {...register('price')}
//         type="number"
//         className="w-full pl-10 p-2 border rounded-lg"
//       />
//     </div>
//     {errors.price && (
//       <span className="text-red-500 text-sm">{errors.price.message}</span>
//     )}

//     {/* Max Guests */}
//     <label className="block mt-3 text-sm font-semibold text-text-secondary">
//       Max Guests
//     </label>
//     <div className="relative flex items-center">
//       <FaUsers className="absolute left-3 text-secondary" />
//       <input
//         {...register('maxGuests')}
//         type="number"
//         className="w-full pl-10 p-2 border rounded-lg"
//       />
//     </div>
//     {errors.maxGuests && (
//       <span className="text-red-500 text-sm">
//         {errors.maxGuests.message}
//       </span>
//     )}

//     {/* Rating */}
//     <label className="block mt-3 text-sm font-semibold text-text-secondary">
//       Rating
//     </label>
//     <div className="relative flex items-center">
//       <FaStar className="absolute left-3 text-secondary" />
//       <input
//         {...register('rating')}
//         type="number"
//         step="0.1"
//         className="w-full pl-10 p-2 border rounded-lg"
//       />
//     </div>
//     {errors.rating && (
//       <span className="text-red-500 text-sm">{errors.rating.message}</span>
//     )}

//     {/* Facilietes */}
//     <label className="block mt-3 text-sm font-semibold text-text-secondary">
//       Facilities
//     </label>
//     <div className="grid grid-cols-2 gap-3">
//       <label className="flex items-center space-x-2">
//         <input type="checkbox" {...register('meta.wifi')} />
//         <span className="text-sm">WiFi</span>
//       </label>

//       <label className="flex items-center space-x-2">
//         <input type="checkbox" {...register('meta.parking')} />
//         <span className="text-sm">Parking</span>
//       </label>

//       <label className="flex items-center space-x-2">
//         <input type="checkbox" {...register('meta.breakfast')} />
//         <span className="text-sm">Breakfast</span>
//       </label>

//       <label className="flex items-center space-x-2">
//         <input type="checkbox" {...register('meta.pets')} />
//         <span className="text-sm">Pets</span>
//       </label>
//     </div>

//     {/* Location */}
//     <label className="block mt-3 text-sm font-semibold text-text-secondary">
//       Location
//     </label>
//     <div className="grid grid-cols-2 gap-2">
//       <input
//         {...register('location.address')}
//         placeholder="Address"
//         className="p-2 border rounded-lg"
//       />
//       <input
//         {...register('location.city')}
//         placeholder="City"
//         className="p-2 border rounded-lg"
//       />
//       <input
//         {...register('location.zip')}
//         placeholder="ZIP"
//         className="p-2 border rounded-lg"
//       />
//       <input
//         {...register('location.country')}
//         placeholder="Country"
//         className="p-2 border rounded-lg"
//       />
//       <input
//         {...register('location.continent')}
//         placeholder="Continent"
//         className="p-2 border rounded-lg"
//       />
//     </div>
//     {errors.location && (
//       <span className="text-red-500 text-sm">
//         Please check location details
//       </span>
//     )}

//     {/* Coordinates */}
//     <label className="block mt-3 text-sm font-semibold text-text-secondary">
//       Coordinates
//     </label>
//     <div className="grid grid-cols-2 gap-2">
//       <input
//         {...register('location.lat')}
//         type="number"
//         placeholder="Latitude"
//         className="p-2 border rounded-lg"
//       />
//       <input
//         {...register('location.lng')}
//         type="number"
//         placeholder="Longitude"
//         className="p-2 border rounded-lg"
//       />
//     </div>

//   </form>
//   );
// };

// export default VenueFormFields;
