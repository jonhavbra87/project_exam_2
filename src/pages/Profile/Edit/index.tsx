import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaImage } from 'react-icons/fa';
import { useAuthStore } from '../../../store/authStore';
import useUpdateProfile from '../../../hooks/useUpdateProfile';
import { useNavigate } from 'react-router-dom';
import UpdateProfile from '../../../components/UpdateProfile';
import GradientHeading from '../../../styles/GradientHeading';

interface ProfileFormValues {
  avatar: string;
  banner: string;
  venueManager: boolean;
  bio: string;
}
const ProfileEditForm = () => {
  const { profile } = useAuthStore();
  const { updateProfile, loading } = useUpdateProfile();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    //reset,
    // watch,
  } = useForm<ProfileFormValues>({
    defaultValues: {
      avatar: profile?.avatar?.url || '',
      banner: profile?.banner?.url || '',
    },
  });

  const onSubmit = async (data: {
    avatar: string;
    banner: string;
    bio: string;
    venueManager: boolean;
  }) => {
    const updatedData = {
      avatar: data.avatar
        ? { url: data.avatar, alt: profile?.avatar?.alt || 'User Avatar' }
        : profile?.avatar,
      banner: data.banner
        ? { url: data.banner, alt: profile?.banner?.alt || 'User Banner' }
        : profile?.banner,
      bio: data.bio,
      venueManager: data.venueManager,
    };

    await updateProfile(updatedData);
    navigate('/profile'); // ✅ Navigerer tilbake etter oppdatering
  };

  return (
    <div>
      <GradientHeading>Edit Profile</GradientHeading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
      >
        {/* 🔹 Username (Read-only) */}
        <label className="block text-sm font-semibold text-gray-700">
          Username
        </label>
        <div className="relative flex items-center">
          <FaUser className="absolute left-3 text-gray-500" />
          <input
            type="text"
            value={profile?.name || ''}
            disabled
            className="w-full pl-10 p-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        {/* 🔹 Email (Read-only) */}
        <label className="block mt-3 text-sm font-semibold text-gray-700">
          E-mail
        </label>
        <div className="relative flex items-center">
          <FaEnvelope className="absolute left-3 text-gray-500" />
          <input
            type="email"
            value={profile?.email || ''}
            disabled
            className="w-full pl-10 p-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        {/* 🔹 Avatar (Editable) */}
        <label className="block mt-3 text-sm font-semibold text-gray-700">
          Avatar URL
        </label>
        <div className="relative flex items-center">
          <FaImage className="absolute left-3 text-gray-500" />
          <input
            {...register('avatar')}
            type="text"
            className="w-full pl-10 p-2 border rounded-lg"
          />
        </div>

        {/* 🔹 Banner (Editable) */}
        <label className="block mt-3 text-sm font-semibold text-gray-700">
          Banner URL
        </label>
        <div className="relative flex items-center">
          <FaImage className="absolute left-3 text-gray-500" />
          <input
            {...register('banner')}
            type="text"
            className="w-full pl-10 p-2 border rounded-lg"
          />
        </div>
        {/* 🔹 Bio (Editable) */}
        {/* <label className="block mt-3 text-sm font-semibold text-gray-700">Bio</label>
      <div className="relative flex items-center">
        <FaInfoCircle className="absolute left-3 text-gray-500" />
        <input
          {...register("bio")}
          type="text"
          className="w-full pl-10 p-2 border rounded-lg"
        />
      </div> */}

        {/* 🔹 Venue Manager Toggle */}
        <div className="flex items-center justify-between mt-4">
          {/* <span className="text-sm font-semibold text-gray-700">Venue Manager</span> */}
          <UpdateProfile />
        </div>

        {/* 🔹 Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate('/profile')} // ✅ Går tilbake uten å endre
            className="w-1/3 p-2 bg-gray-400 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`w-1/3 p-2 rounded-lg ${loading ? 'bg-gray-300' : 'bg-accent text-white'}`}
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
