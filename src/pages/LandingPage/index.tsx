import { CustomButton } from '../../components/CustomButton';
import SignUpImg from '../../assets/signup_collage.webp';
import NoroffLogo from '../../assets/noroff_logo.svg';
import { CiLogin } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { IoLogIn } from 'react-icons/io5';

function LandingPage() {
  const navigation = useNavigate();

  return (
    <div className="flex gap-5 max-md:flex-col min-h-screen justify-center items-center w-full">
      <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full ">
        <img
          loading="lazy"
          src={SignUpImg}
          alt="Explore destinations with Holidaze"
          className="object-contain grow mx-auto md:align-center rounded-xl w-3/4 mt-10 md:w-full"
        />
      </div>
      <div className="flex flex-col items-center mt-20 w-full text-center md:mt-40">
        <div className="text-ingress-mobile md:text-ingress-desktop text-text-secondary">
          Welcome to Holidaze
        </div>
        <div className="self-stretch mt-6 text-primary max-w-full text-splash-mobile md:text-splash-desktop font-splash text-center">
          <span className="text-text-primary">Let's explore the world</span>{' '}
          <span className="text-primary block">together</span>
        </div>
        <div className="group cursor-pointer relative">
          <p
            onClick={() => navigation('/venues')}
            className="mt-20 text-ingress-mobile md:text-ingress-desktop font-body max-md:mt-10 
            transition-all duration-500 ease-in-out 
            text-text-primary bg-gradient-to-r from-text-primary to-accent bg-clip-text 
            group-hover:text-transparent"
          >
            Just curious? Click here for exploring Venues without signing in{' '}
            <CiLogin className="inline-block text-accent hover:cursor-pointer" />
          </p>
        </div>
        <div className="md:w-3/5">
          <CustomButton
            onClick={() => navigation('/register')}
            icon={NoroffLogo}
            text="Sign up with Noroff"
          />
          <div className="group text-center cursor-pointer relative">
            <p
              onClick={() => navigation('/login')}
              className="mt-6 text-body-large-mobile sm:text-body-large-desktop font-body transition-all duration-500 ease-in-out text-text-primary bg-gradient-to-r from-text-secondary to-primary bg-clip-text 
            group-hover:text-transparent"
            >
              Already have an account? Login
              <IoLogIn className="inline-block text-primary text-2xl" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
