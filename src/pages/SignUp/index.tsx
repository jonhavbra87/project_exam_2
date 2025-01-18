import { SignUpButton } from '../../styles/SignUpButton';
import SignUpImg from '../../assets/signup_collage.png';
import NoroffLogo from '../../assets/noroff_logo.svg';
import { CiLogin } from 'react-icons/ci';

function SignUp() {
  return (
    <div className="flex gap-5 max-md:flex-col">
      <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full ">
        <img
          loading="lazy"
          src={SignUpImg}
          alt="Explore destinations with Holidaze"
          className="object-contain grow w-full rounded-xl max-md:mt-10 max-md:max-w-full"
        />
      </div>
      <div className="flex flex-col items-center mt-40 w-full text-center max-md:mt-10 max-md:max-w-full">
        <div className="text-base text-neutral-700">Welcome to Holidaze</div>
        <div className="self-stretch mt-6 font-semibold text-primary max-md:max-w-full text-splash-desktop">
          <span className="text-stone-900">Let's explore the world</span>{' '}
          <span className="text-primary">together</span>
        </div>
        <div className="mt-20 text-ingress-desktop text-neutral-800 max-md:mt-10">
          Just curious? Click here for exploring Venues without signing in <CiLogin className="inline-block text-neutral-700" />
        </div>
        <SignUpButton
          icon={NoroffLogo}
          text="Sign up with Noroff"
        />
      </div>
    </div>
  );
}

export default SignUp;
