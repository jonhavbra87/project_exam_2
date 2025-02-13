import * as yup from 'yup';

export const venueSchema = yup
  .object({
    name: yup.string().required('Navn er påkrevd'),
    description: yup
      .string()
      .min(10, 'Beskrivelse må være minst 10 tegn')
      .required('Beskrivelse er påkrevd'),
    media: yup.array().of(
      yup.object({
        url: yup.string().url('Ugyldig URL format').required('URL er påkrevd'),
        alt: yup.string().required('Bildetekst er påkrevd'),
      })
    ),
    rating: yup
      .number()
      .typeError('Vurdering må være et tall')
      .min(1, 'Vurdering må være mellom 1 og 5')
      .max(5, 'Vurdering må være mellom 1 og 5')
      .required('Vurdering er påkrevd'),
    price: yup
      .number()
      .typeError('Pris må være et tall')
      .positive('Pris må være større enn 0')
      .required('Pris er påkrevd'),
    maxGuests: yup
      .number()
      .typeError('Antall gjester må være et tall')
      .positive('Antall gjester må være større enn 0')
      .integer('Antall gjester må være et helt tall')
      .required('Maks antall gjester er påkrevd'),
    meta: yup.object({
      wifi: yup.boolean(),
      parking: yup.boolean(),
      breakfast: yup.boolean(),
      pets: yup.boolean(),
    }),
    location: yup.object({
      address: yup.string().required('Adresse er påkrevd'),
      city: yup.string().required('By er påkrevd'),
      zip: yup.string().required('Postnummer er påkrevd'),
      country: yup.string().required('Land er påkrevd'),
      continent: yup.string().required('Kontinent er påkrevd'),
      lat: yup
        .number()
        .typeError('Breddegrad må være et tall')
        .required('Breddegrad er påkrevd')
        .min(-90, 'Breddegrad må være mellom -90 og 90')
        .max(90, 'Breddegrad må være mellom -90 og 90'),
      lng: yup
        .number()
        .typeError('Lengdegrad må være et tall')
        .required('Lengdegrad er påkrevd')
        .min(-180, 'Lengdegrad må være mellom -180 og 180')
        .max(180, 'Lengdegrad må være mellom -180 og 180'),
    }),
    owner: yup.string().required('Eier er påkrevd'),
  })
  .required();

// Definer TypeScript type basert på Yup schema
export type VenueFormData = yup.InferType<typeof venueSchema>;
