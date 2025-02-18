import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import Logo from '../../assets/holidaze_logo.svg';
import { MdPassword } from 'react-icons/md';
import { IoIosMail } from 'react-icons/io';
import { CustomInput } from '../CustomInput';
import { CustomButton } from '../CustomButton';
import NoroffLogo from '../../assets/noroff_logo.svg';
import { CiLogin } from 'react-icons/ci';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login, loading, error } = useLogin();
//   const navigate = useNavigate();

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       await login(email, password);
//       toast.success("Successfully logged in! ✅"); 
//       setTimeout(() => {
//       navigate('/profile');
//       }
//       , 2000);
      
//     } catch (error) {
//       toast.error("Invalid username or password! ❌");
//       console.error('❌ Error in login:', error);
//       return;
//     }
//   };

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .matches(/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/, "Email must be a @stud.noroff.no address")
    .required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log("Form errors:", errors);


  const onSubmit = async (data) => {
    console.log("Submitting with data:", data);
  
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting! ❌");
      return;
    }
  
    try {
      const response = await login(data.email, data.password);
  
      if (!response) {
        toast.error("Invalid username or password! ❌");
        return; // 🚀 STOPP navigering hvis API returnerer en feil
      }
  
      toast.success("Successfully logged in! ✅");
  
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      toast.error("Login failed: " + (error.message || "Unknown error") + " ❌");
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex gap-5 max-md:flex-col justify-center items-center w-full max-w-4xl ">
        <div className="flex flex-col  items-center text-center w-1/2 max-md:w-full mb-8">
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
              Please provide your existing information for successful login
            </p>

            {error && (
              <p className="text-red-500 text-body-large-mobile md:text-body-large-desktop text-center mb-3">
                {error}
              </p>
            )}

            <CustomInput
              label="User e-mail"
              type="email"
              placeholder="Email"
              Icon={IoIosMail}
              {...register("email")}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              // required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <CustomInput
              label="Password"
              type="password"
              placeholder="Password"
              Icon={MdPassword}
              {...register("password")}
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              // required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <p
              onClick={() => navigate('/register')}
              className="text-white text-body-medium-desktop border-t border-text-white font-ingress hover:cursor-pointer py-4"
            >
              Not an account yet?{' '}
              <span className="bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                Register here
              </span>{' '}
              <CiLogin className="inline-block text-body-large-desktop text-accent" />
            </p>

            <CustomButton
              text={loading ? 'Logging in...' : 'Login with Noroff'}
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

export default Login;
