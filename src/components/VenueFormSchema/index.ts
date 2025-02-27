import * as yup from 'yup';

export const venueSchema = yup
  .object({
    name: yup.string().required('Name is required'),
    description: yup
      .string()
      .min(10, 'Description must be at least 10 characters')
      .required('Description is required'),
    media: yup.array().of(
      yup.object({
        url: yup.string().url('Invalid URL format').required('URL is required'),
        alt: yup.string().required('Image caption is required'),
      })
    ),
    rating: yup
      .number()
      .typeError('Rating must be a number')
      .min(1, 'Rating must be between 1 and 5')
      .max(5, 'Rating must be between 1 and 5')
      .required('Rating is required'),
    price: yup
      .number()
      .typeError('Price must be a number')
      .positive('Price must be greater than 0')
      .required('Price is required'),
    maxGuests: yup
      .number()
      .typeError('Number of guests must be a number')
      .positive('Number of guests must be greater than 0')
      .integer('Number of guests must be an integer')
      .required('Max number of guests is required'),
    meta: yup.object({
      wifi: yup.boolean(),
      parking: yup.boolean(),
      breakfast: yup.boolean(),
      pets: yup.boolean(),
    }),
    location: yup.object({
      address: yup.string().required('Address is required'),
      city: yup.string().required('City is required'),
      zip: yup.string().required('ZIP is required'),
      country: yup.string().required('Country is required'),
      continent: yup.string().required('Continent is required'),
      lat: yup
        .number()
        .typeError('Latitude must be a number')
        .required('Latitude is required')
        .min(-90, 'Latitude must be between -90 and 90')
        .max(90, 'Latitude must be between -90 and 90'),
      lng: yup
        .number()
        .typeError('Longitude must be a number')
        .required('Longitude is required')
        .min(-180, 'Longitude must be between -180 and 180')
        .max(180, 'Longitude must be between -180 and 180'),
    }),
  })
  .required();

// Define TypeScript type based on Yup schema
export type VenueFormData = yup.InferType<typeof venueSchema>;
