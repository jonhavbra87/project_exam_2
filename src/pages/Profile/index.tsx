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

const ProfilePage = () => {
  const { profile, venueManager, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!profile) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
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
          link: '/venues',
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
          link: '/messages',
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
          link: '/terms',
        },
        {
          icon: <FaLock />,
          title: 'Guidelines for Privacy',
          description:
            'Learn how we handle your data and keep your information secure.',
          link: '/privacy',
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
          src={profile?.banner?.url || 'https://via.placeholder.com/1200x300'}
          alt={profile?.banner?.alt || 'Banner'}
          className="w-full h-full object-cover ogject-center aspect-video overflow-hidden"
        />
      </div>

      {/* 📌 PROFILE CARD */}
      <div className="relative mx-auto -mt-14 md:-mt-20 bg-white shadow-lg rounded-lg p-6 max-w-lg md:max-w-2xl text-center">
        <div className="flex flex-col items-center">
          <img
            src={profile?.avatar?.url || 'https://via.placeholder.com/150'}
            alt={profile?.avatar?.alt || 'User avatar'}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-header object-cover object-center aspect-square"
          />
          <h2 className="text-body-large-desktop text-text-primaryfont-bold mt-2">
            {profile?.name}
          </h2>
          {/* <p className="text-body-medium-desktop text-text-secondary font-normal">{profile?.bio}</p> */}

          {/* 📌 Venue Manager Status & Toggle */}
          <p
            className={`mt-2 p-4 text-white rounded ${
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
                      const Component = item.link ? Link : 'button'; // 🔥 Dynamically decide tag
                      return (
                        <Component
                          key={i}
                          to={item.link || '#'}
                          onClick={item.onClick}
                          className={`flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-[2px_3px_4.5px_rgba(0,0,0,0.25)]  hover:bg-gray-100 transition-all ${
                            item.link ? '' : 'text-red-600'
                          }`}
                        >
                          {/* Ikon + Tekst */}
                          <div className="flex items-center gap-4">
                            <div className="text-xl">{item.icon}</div>
                            <div className="text-left">
                              <h3 className="text-body-large-mobile md:text-body-large-desktop font-medium mb-2">
                                {item.title}
                              </h3>
                              <p className="text-body-medium-mobile md:text-body-medium-desktop text-text-secondary text-sm hidden sm:block">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          {/* Pil som ligger helt til høyre og kun vises på mobil */}
                          <FaChevronRight className="text-gray-400 sm:hidden" />
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

// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../store/authStore";
// import useFetchVenueManager from "../../hooks/useFetchVenueManager";
// import GradientHeading from "../../styles/GradientHeading";
// import UpdateProfile from "../../components/UpdateProfile";

// import { FaBuilding, FaCalendarAlt, FaEnvelope, FaFileAlt, FaLock, FaPlus, FaUser, FaSignOutAlt } from "react-icons/fa";
// import ProfileSection from "../../components/ProfileSections";
// import ProfileCard from "../../components/ProfileCard"; // 🔹 Import ProfileCard directly for Logout

// function ProfilePage() {
//   const { profile, logout } = useAuthStore();
//   const { venueManager, fetchVenueManager, loading, error } = useFetchVenueManager();
//   const navigate = useNavigate();

//   if (!profile) {
//     return <div className="text-center text-gray-500">Loading...</div>;
//   }

//   // 📌 Define Menu Sections
//   const profileItems = [
//     { icon: <FaUser />, title: "Personal Information", description: "Manage your profile settings", link: "/profile/edit" },
//     { icon: <FaEnvelope />, title: "Messages", description: "Check your inbox for new messages", link: "/messages" },
//     { icon: <FaCalendarAlt />, title: "My Bookings", description: "View and manage your bookings", link: "/bookings" },
//   ];

//   const venueManagerItems = [
//     { icon: <FaPlus />, title: "Add a Venue", description: "Create and list a new venue", link: "/venues/add" },
//     { icon: <FaBuilding />, title: "My Venues", description: "Manage your listed venues", link: "/venues" },
//   ];

//   const legalItems = [
//     { icon: <FaFileAlt />, title: "Terms of Service", description: "Review our terms and conditions", link: "/terms" },
//     { icon: <FaLock />, title: "Guidelines for Privacy", description: "How we handle your data", link: "/privacy" },
//   ];

//   return (
//     <div className="container mx-auto p-6">
//       <GradientHeading className="text-h1-desktop font-bold text-center mb-6">
//         Profile
//       </GradientHeading>

//    {/* 📌 Profile Card */}
//    <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
//         <div className="flex flex-col items-center md:flex-row md:items-start md:gap-6">
//           <img
//             src={profile?.avatar?.url || "https://via.placeholder.com/150"}
//             alt={profile?.avatar?.alt || "User avatar"}
//             className="w-24 h-24 md:w-32 md:h-32 rounded-full border"
//           />
//           <div className="text-center md:text-left">
//             <h2 className="text-2xl font-bold mt-4">{profile?.name}</h2>
//             <p className="text-gray-600">{profile?.email}</p>
//           </div>
//         </div>

//         {/* 📌 Venue Manager Status */}
//         {loading ? (
//           <p className="text-gray-500 text-center mt-2">Checking venue status...</p>
//         ) : error ? (
//           <p className="text-red-500 text-center mt-2">{error}</p>
//         ) : (
//           <p className="mt-2 px-4 py-1 text-center bg-blue-100 text-blue-700 rounded">
//             {venueManager ? "You are a Venue Manager" : "Not a Venue Manager"}
//           </p>
//         )}

//         {/* 📌 Update Profile Button */}
//         <div className="mt-4 flex justify-center"  onClick={fetchVenueManager}>
//           <UpdateProfile />
//         </div>
//       </div>

//       {/* 📌 Profile Sections - Responsive Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto mt-6">
//         <ProfileSection title="Preferences" items={profileItems} />
//         {venueManager && <ProfileSection title="Venue Manager" items={venueManagerItems} />}
//         <ProfileSection title="Legal" items={legalItems} />

//         {/* 📌 Logout Styled as a Profile Card */}
//         <ProfileCard
//           icon={<FaSignOutAlt />}
//           title="Logout"
//           description={
//             <>
//               <span className="block md:hidden">Logout</span>
//               <span className="hidden md:block">Securely log out from your account and return to the homepage.</span>
//             </>
//           }
//           onClick={() => {
//             logout();
//             navigate("/login");
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;
