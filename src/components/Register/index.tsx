import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/holidaze_logo.svg';
import { MdPassword } from 'react-icons/md';
import { IoIosMail, IoIosPerson } from 'react-icons/io';
import { CustomInput } from '../CustomInput';
import { CustomButton } from '../CustomButton';
import NoroffLogo from '../../assets/noroff_logo.svg';
import { CiLogin } from 'react-icons/ci';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useRegister from '../../hooks/useRegister';


const schema = yup.object().shape({
  name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .matches(/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/, "Email must be a @stud.noroff.no address")
    .required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  venueManager: yup.boolean(),
});

function Register() {
  const navigate = useNavigate();
  const { register: registerUser, loading, error } = useRegister();
  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    venueManager?: boolean;
  }


  const onSubmit = async (data: RegisterFormData) => {
  const defaultAvatar = "https://images.unsplash.com/photo-1578593828319-a0f580bd9d07?q=80&w=1328&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; 
  const defaultBanner = "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  
    const response = await registerUser(
      data.name,
      data.email,
      data.password,
      data.venueManager ?? false,
      defaultAvatar,
      defaultBanner
    );
  
    if (response) {
      toast.success("Successfully registered and logged in! ✅");
      navigate("/profile");
    } else {
      toast.error("Registration failed! ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex gap-5 max-md:flex-col justify-center items-center w-full max-w-4xl ">

        <div className="flex flex-col items-center text-center w-1/2 max-md:w-full mb-8">
          <img src={Logo} alt="Holidaze logo" className="w-4/5 sm:w-3/5 mb-8" />
          <p className="text-body-large-mobile md:text-body-large-desktop text-white font-ingress">
            Welcome to Holidaze
          </p>
          <h1 className="text-splash-mobile md:text-splash-desktop font-splash  text-white">
            Let’s explore the world{' '}
            <span className="text-accent">together</span>
          </h1>
        </div>


        <div className="flex flex-col items-center w-1/2 max-md:w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
            <p className="text-ingress-mobile md:text-ingress-desktop font-ingress text-white mb-8">
              Fill out the details below to create an account.
            </p>

            {error && (
              <p className="text-red-500 text-body-large-mobile md:text-body-large-desktop text-center mb-3">
                {error}
              </p>
            )}

            <CustomInput
              label="Full Name"
              type="text"
              Icon={IoIosPerson}
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <CustomInput
              label="User e-mail"
              type="email"
              Icon={IoIosMail}
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <CustomInput
              label="Password"
              type="password"
              Icon={MdPassword}
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            {/* ✅ Venue Manager Toggle */}
            <div className="flex items-center justify-between mt-4">
              <label htmlFor="venueManager" className="text-md text-gray-300">
                Register as Venue Manager?
              </label>
              <input
                id="venueManager"
                type="checkbox"
                className="w-5 h-5 ml-2 cursor-pointer"
                {...register("venueManager")}
              />
            </div>


            <p
              onClick={() => navigate('/login')}
              className="text-white text-body-medium-desktop border-t border-text-white font-ingress hover:cursor-pointer py-4"
            >
              Already have an account?{' '}
              <span className="bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                Login here
              </span>{' '}
              <CiLogin className="inline-block text-body-large-desktop text-accent" />
            </p>


            <CustomButton
              text={loading ? 'Registering...' : 'Sign up with Noroff'}
              icon={NoroffLogo}
              type="submit"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;



// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useRegister from '../../hooks/useRegiser';


// function Register() {
//   const { register } = useRegister();
//   const [venueManager, setVenueManager] = useState(false); // ✅ Bruker kan velge Venue Manager
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setError(null);

//     try {
//       await register(name, email, password, venueManager);
//       navigate('/profile'); // ✅ Naviger til profil etter registrering
//     } catch (error) {
//       setError('Registration failed. Please try again.');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form
//         onSubmit={handleSubmit}
//         className="p-6 bg-white shadow-md rounded-lg w-96"
//       >
//         <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

//         {error && (
//           <p className="text-red-500 text-sm text-center mb-3">{error}</p>
//         )}

//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full p-2 border rounded mb-2"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded mb-2"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border rounded mb-2"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         {/* ✅ Venue Manager Toggle */}
//         <div className="flex items-center justify-between mt-4">
//           <label htmlFor="venueManager" className="text-md text-gray-700">
//             Register as Venue Manager?
//           </label>
//           <input
//             id="venueManager"
//             type="checkbox"
//             className="w-5 h-5 ml-2 cursor-pointer"
//             checked={venueManager}
//             onChange={() => setVenueManager(!venueManager)}
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Register;
