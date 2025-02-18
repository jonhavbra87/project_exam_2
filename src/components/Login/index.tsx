import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import Logo from '../../assets/holidaze_logo.svg';
import { MdPassword } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { CustomInput } from '../CustomInput';
import { CustomButton } from '../CustomButton';
import NoroffLogo from '../../assets/noroff_logo.svg';
import { CiLogin } from 'react-icons/ci';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await login(email, password);
      navigate('/profile');
    } catch (error) {
      console.error('❌ Error in login:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex gap-5 max-md:flex-col justify-center items-center w-full max-w-4xl px-10 py-16">
        
        <div className="flex flex-col  items-center text-center w-1/2 max-md:w-full mb-8">
          <img src={Logo} alt="Holidaze logo" className="w-4/5 sm:w-3/5 mb-8"/>
          <p className="text-body-large-mobile md:text-body-large-desktop text-white font-ingress">Welcome to Holidaze</p>
          <h1 className="text-splash-desktop font-splash  text-white">
            Let’s explore the world <span className="text-accent">together</span>
          </h1>
        </div>

        <div className="flex flex-col items-center w-1/2 max-md:w-full">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <p className="text-ingress-mobile md:text-ingress-desktop font-ingress text-white mb-8">
              Please provide your existing information for successful login
            </p>

            {/* Feilmelding */}
            {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

            <CustomInput
              label="User e-mail"
              type="email"
              placeholder="Email"
              Icon={IoIosMail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <CustomInput
              label="Password"
              type="password"
              placeholder="Password"
              Icon={MdPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />


            <p onClick={() => navigate('/register')} className='text-white text-body-medium-desktop border-t border-text-white font-ingress hover:cursor-pointer py-4'>Not an account yet? <span className='bg-gradient-to-r from-white to-accent bg-clip-text text-transparent'>Register here</span>  <CiLogin  className="inline-block text-body-large-desktop text-accent" /></p>

            <CustomButton
              text={loading ? "Logging in..." : "Login with Noroff"}
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
