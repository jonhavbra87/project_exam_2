import { SignUpButton } from '../../components/SignUpButton';
import SignUpImg from '../../assets/signup_collage.png';
import NoroffLogo from '../../assets/noroff_logo.svg';
import { CiLogin } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { IoLogIn } from 'react-icons/io5';


function Landingpage() {
  const navigation = useNavigate();
  
  return (
    <div className="flex gap-5 max-md:flex-col">
      <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full ">
        <img
          loading="lazy"
          src={SignUpImg}
          alt="Explore destinations with Holidaze"
          className="object-contain grow mx-auto md:align-center rounded-xl w-3/4 mt-10 md:w-full"
        />
      </div>
      <div className="flex flex-col items-center mt-40 w-full text-center max-md:mt-10 max-md:max-w-full">
        <div className="text-base text-text-secondary">Welcome to Holidaze</div>
        <div className="self-stretch mt-6 font-semibold text-primary max-md:max-w-full text-splash-desktop">
          <span className="text-stone-900">Let's explore the world</span>{' '}
          <span className="text-primary">together</span>
        </div>
        <div className="mt-20 text-ingress-desktop text-text-muted max-md:mt-10">
          Just curious? Click here for exploring Venues without signing in{' '}
          <CiLogin onClick={() => navigation('/venues')} className="inline-block text-text-secondary hover:cursor-pointer" />
        </div>
        <SignUpButton
        onClick={() => navigation('/register')}
        icon={NoroffLogo}
        text="Sign up with Noroff" />
        <div onClick={() => navigation('/login')} className="mt-6 text-body-small-mobile sm:text-body-medium-desktop text-text-secondary hover:cursor-pointer">Already have an account? Login<IoLogIn className="inline-block text-primary" /></div>
      </div>
    </div>
  );
}

export default Landingpage;
