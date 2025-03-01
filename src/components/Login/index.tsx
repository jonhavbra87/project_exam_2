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

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .matches(/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/, "Email must be a @stud.noroff.no address")
    .required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

/**
 * Login component for user authentication
 * 
 * @component
 * @returns {JSX.Element} - Rendered Login component
 * 
 * @description
 * Provides a form for users to log in with their Noroff student credentials.
 * The component uses react-hook-form for form handling and validation with Yup schema.
 * It requires a valid @stud.noroff.no email address and password with minimum 8 characters.
 * On successful login, the user is redirected to their profile page.
 * 
 * @example
 * // Basic usage in router
 * <Route path="/login" element={<Login />} />
 * 
 * @example
 * // Usage with navigation
 * const navigate = useNavigate();
 * 
 * // Redirect to login
 * const redirectToLogin = () => {
 *   navigate('/login');
 * };
 */

function Login(): JSX.Element {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /**
   * Interface for login form data
   * 
   * @interface LoginFormData
   * @property {string} email - User's Noroff email address
   * @property {string} password - User's password
   */

  interface LoginFormData {
    email: string;
    password: string;
  }

  /**
   * Handles form submission for login
   * 
   * @async
   * @function onSubmit
   * @param {LoginFormData} data - Form data with email and password
   * @returns {Promise<void>}
   */
  
  const onSubmit = async (data: LoginFormData) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting! ❌");
      return;
    }
    try {
      const response = await login(data.email, data.password);
      if (!response) {
        toast.error("Invalid username or password! ❌");
        return;
      }
      toast.success("Successfully logged in! ✅");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      toast.error("Login failed: " + ((error as Error).message || "Unknown error") + " ❌");
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
