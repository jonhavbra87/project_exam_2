import {
  FaEnvelope,
  FaCalendarAlt,
  FaPlus,
  FaBuilding,
  FaFileAlt,
  FaLock,
  FaSignOutAlt,
  FaChevronRight,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { FiSettings } from 'react-icons/fi';
import UnauthProfile from '../../components/UnauthProfile';
/**
 * ProfilePage Component
 * 
 * Provides a comprehensive user profile dashboard with various management options
 * 
 * @component
 * @returns {React.ReactElement} A detailed profile page with user information and navigation menu
 * 
 * @description
 * Displays user profile with features including:
 * - User banner and avatar
 * - Venue manager status
 * - Customizable profile menu sections
 * - Options for venue management, bookings, messages, and account settings
 * 
 * @remarks
 * - Requires user authentication
 * - Dynamically renders menu items based on user's venue manager status
 * - Provides logout functionality
 * - Responsive design with different layouts for mobile and desktop
 * 
 * @example
 * // Typical usage in routing configuration
 * <Route path="/profile" element={<ProfilePage />} />
 */

const ProfilePage = (): JSX.Element => {
  const { profile, venueManager, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!profile) {
    return (
      <>
        <UnauthProfile />
      </>
    );
  }

  const sections = [
    venueManager && {
      items: [
        {
          icon: <FaPlus />,
          title: 'Add a Venue',
          description:
            'Create and list a new venue. Add details, upload images +++.',
          link: '/profile/venues/create',
        },
        {
          icon: <FaBuilding />,
          title: 'My Venues',
          description:
            'Manage your listed venues. Edit details or delete venue.',
          link: '/profile/venues',
        },
      ],
    },
    {
      items: [
        {
          icon: <FaEnvelope />,
          title: 'Messages',
          description:
            'Check your inbox for new messages and communicate with hosts or guests.',
          link: '/profile/messages',
        },
        {
          icon: <FaCalendarAlt />,
          title: 'My Bookings',
          description:
            'View and manage your past and upcoming bookings in one place.',
          link: '/profile/bookings',
        },
        {
          icon: <FiSettings />,
          title: 'Edit Profile',
          description:
            'Customize your profile by updating your profile picture and banner image.',
          link: '/profile/editprofile',
        },
        {
          icon: <FaFileAlt />,
          title: 'Terms of Service',
          description:
            'Review our terms to understand your rights and responsibilities.',
          link: '/profile/termsofservice',
        },
        {
          icon: <FaLock />,
          title: 'Guidelines for Privacy',
          description:
            'Learn how we handle your data and keep your information secure.',
          link: '/profile/privacyguidelines',
        },
        {
          icon: <FaSignOutAlt />,
          title: 'Logout',
          description:
            'Securely log out from your account and return to the homepage.',
          onClick: () => {
            logout();
            navigate('/');
          },
        },
      ],
    },
  ].filter(Boolean);

  return (
    <div className="w-full min-h-screen">
      {/* 📌 HERO BANNER */}
      <div className="relative w-full h-48 md:h-64">
        <img
          src={profile?.banner?.url || 'https://placehold.co/1200x300'}
          alt={profile?.banner?.alt || 'Banner'}
          className="w-full h-full object-cover ogject-center aspect-video overflow-hidden"
        />
      </div>

      {/* 📌 PROFILE CARD */}
      <div className="relative mx-auto mt-14 md:-mt-20 bg-white shadow-lg rounded-lg p-6 max-w-lg md:max-w-2xl text-center">
        <div className="flex flex-col items-center">
          <img
            src={profile?.avatar?.url || 'https://placehold.co/150'}
            alt={profile?.avatar?.alt || 'User avatar'}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-header object-cover object-center aspect-square"
          />
          <h2 className="text-body-large-desktop text-text-primary font-ingress font-bold mt-4">
            {profile?.name}
          </h2>

          {/* 📌 Venue Manager Status & Toggle */}
          <p
            className={`mt-2 p-4 text-body-large-mobile md:text-body-large-desktop text-text-contrast font-body font-semibold rounded ${
              venueManager ? 'bg-secondary' : 'bg-header'
            }`}
          >
            {venueManager ? 'You are a Venue Manager' : 'Not a Venue Manager'}
          </p>
        </div>
      </div>

      {/* 📌 PROFILE MENU SECTIONS */}
      <div className="container mx-auto mt-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-auto-fit gap-6">
          {sections.map((section, index) => (
            <div key={index}>
              {section && (
                <>
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-auto-fit">
                    {section.items.map((item, i) => {
                      const Component = item.link ? Link : 'button';
                      return (
                        <Component
                          key={i}
                          to={item.link || '#'}
                          onClick={item.onClick}
                          className={`flex items-center justify-between gap-4 px-4 py-6 bg-white rounded-lg shadow-[2px_3px_4.5px_rgba(0,0,0,0.25)]  hover:bg-gray-100 transition-all ${
                            item.link ? '' : 'text-red-600'
                          }`}
                        >
                          {/* Icon + Text */}
                          <div className="flex items-center gap-4">
                            <div className="text-xl">{item.icon}</div>
                            <div className="text-left">
                              <h3 className="text-body-large-mobile md:text-body-large-desktop font-ingress font-medium mb-2">
                                {item.title}
                              </h3>
                              <p className="text-body-medium-mobile md:text-body-medium-desktop text-text-secondary font-body font-light hidden sm:block">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <FaChevronRight className="text-text-secondary sm:hidden" />
                        </Component>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;