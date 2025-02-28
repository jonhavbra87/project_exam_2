import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import GradientHeading from '../../styles/GradientHeading';
import toast from 'react-hot-toast';

// Validationg schema with yup
const schema = yup
  .object({
    firstName: yup
      .string()
      .min(3, 'Your first name should be at least 3 characters.')
      .max(20, 'Your first name cannot be longer than 20 characters.')
      .required('Please enter your first name'),
    lastName: yup
      .string()
      .min(3, 'Your last name should be at least 3 characters.')
      .max(20, 'Your last name cannot be longer than 20 characters.')
      .required('Please enter your first name'),
    email: yup
      .string()
      .email('Please enter a valid email address')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address'
      )
      .required('Please enter your email address'),
    body: yup
      .string()
      .min(3, 'Your message should be at least 3 characters.')
      .max(500, 'Your message cannot be longer than 500 characters.')
      .required('Please enter your message'),
  })
  .required();

// Bruker `yup.InferType` for å automatisk hente ut typene fra schema
type FormData = yup.InferType<typeof schema>;

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  function onSubmit(data: FormData) {
    console.info('Data:', data);
    toast.success('Your message has been sent!');
    reset();
  }

  return (
    <div>
      <GradientHeading>Contact Us</GradientHeading>
      <div className='flex flex-col md:flex-row'>
      <div className='w-full md:w-1/3 md:mr-8'>
        <h2 className='text-h2-mobile md:text-h2-desktop font-heading font-semibold text-text-primary mb-8 text-center md:text-start'>Get in Touch – We’re Here to Help!</h2>
        <p className='text-body-large-mobile md:text-body-large-desktop font-body font-light text-text-primary mb-4'>Have questions, feedback, or need assistance? We’d love to hear from you! Whether you're a venue manager looking for support, a customer with inquiries, or just someone who wants to learn more, our team is ready to assist.</p>
        <p className='text-body-large-mobile md:text-body-large-desktop font-body font-light text-text-primary mb-4'>Email Us: Reach out anytime, and we’ll get back to you as soon as possible.</p>
        <p className='text-body-large-mobile md:text-body-large-desktop font-body font-light text-text-primary mb-4'>Call Us: Need immediate assistance? Our support team is just a call away.</p>
        <p className='text-body-large-mobile md:text-body-large-desktop font-body font-light text-text-primary mb-4'>Live Chat: Get quick answers through our real-time chat feature.</p>
        <p className='text-body-large-mobile md:text-body-large-desktop font-body font-light text-text-primary mb-4'>We value every message and strive to provide the best support experience. Don’t hesitate—contact us today, and let’s make your experience even better!</p>
      </div>
      <form
        className="flex flex-col gap-6 p-8 w-full md:w-2/3 mx-auto bg-gradient-to-t from-primary-3 to-secondary rounded-lg shadow-md lg:p-10 xl:max-w-4xl xl:p-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="mb-1 font-semibold text-white text-lg lg:text-xl"
            >
              First Name
            </label>
            <input
              id="firstName"
              className="border text-black p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary 
                      transition-all duration-300 ease-in-out lg:p-5 "
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="mb-1 font-semibold text-white text-lg lg:text-xl"
            >
              Last Name
            </label>
            <input
              id="lastName"
              className="border text-black border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary
                      transition-all duration-300 ease-in-out lg:p-5"
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-1 font-semibold text-white text-lg lg:text-xl"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="border text-black border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary
                    transition-all duration-300 ease-in-out lg:p-5"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="body"
            className="mb-1 font-semibold text-white text-lg lg:text-xl"
          >
            Message
          </label>
          <textarea
            id="body"
            className="border text-black border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary 
                    transition-all duration-300 ease-in-out resize-none lg:p-5 lg:h-40"
            {...register('body')}
          />
          {errors.body && (
            <p className="mt-1 text-sm text-red-400">{errors.body.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 py-6 w-full self-center px-4 py-2 bg-button-secondary hover:bg-button-hoverSecondary rounded-md "
        >
          Submit
        </button>
      </form>
      </div>
    </div>
  );
}

export default Contact;
