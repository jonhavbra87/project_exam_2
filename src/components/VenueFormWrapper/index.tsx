// // VenueFormWrapper.tsx
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import GradientHeading from '../../styles/GradientHeading';
// import VenueFormFields from '../VenueFormFields';


// const defaultValues = {
//   name: '',
//   description: '',
//   media: [{ url: '', alt: 'Venue Image' }],
//   price: 0,
//   maxGuests: 1,
//   rating: 0,
//   meta: {
//     wifi: false,
//     parking: false,
//     breakfast: false,
//     pets: false,
//   },
//   location: {
//     address: '',
//     city: '',
//     zip: '',
//     country: '',
//     continent: '',
//     lat: 0,
//     lng: 0,
//   },
// };

// const VenueFormWrapper = ({
//   onSubmit,
//   initialValues = defaultValues,
//   title = 'Venue Form',
//   submitButtonText = 'Submit',
//   isSubmitting = false
// }) => {
//   const navigate = useNavigate();
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: initialValues
//   });

//   const handleFormSubmit = async (data) => {
//     try {
//       const loadingToast = toast.loading('Processing...');
//       await onSubmit(data);
//       toast.success('Success!', { id: loadingToast });
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <GradientHeading>{title}</GradientHeading>
//       <form
//         onSubmit={handleSubmit(handleFormSubmit)}
//         className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
//       >
//         <VenueFormFields register={register} errors={errors} />
        
//         <div className="flex justify-between mt-6">
//           <button
//             type="button"
//             onClick={() => navigate('/profile')}
//             className="w-1/3 p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-1/3 p-2 rounded-lg ${
//               isSubmitting
//                 ? 'bg-gray-300'
//                 : 'bg-accent text-white hover:bg-accent/90'
//             }`}
//           >
//             {isSubmitting ? 'Processing...' : submitButtonText}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default VenueFormWrapper;