import { FaUser, FaEnvelope, FaCalendarAlt, FaPlus, FaBuilding, FaFileAlt, FaLock, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import useFetchVenueManager from "../../hooks/useFetchVenueManager";
import UpdateProfile from "../../components/UpdateProfile";

const ProfilePage = () => {
  const { profile, logout } = useAuthStore();
  const { venueManager, fetchVenueManager } = useFetchVenueManager();
  const navigate = useNavigate();

  if (!profile) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  const sections = [
    {
      title: "Preferences",
      items: [
        { icon: <FaUser />, text: "Personal Information", link: "/profile/edit" },
        { icon: <FaEnvelope />, text: "Messages", link: "/messages" },
        { icon: <FaCalendarAlt />, text: "My Bookings", link: "/bookings" },
      ],
    },
    venueManager && {
      title: "Venue Manager",
      items: [
        { icon: <FaBuilding />, text: "My Venues", link: "/venues" },
        { icon: <FaPlus />, text: "Add a Venue", link: "/venues/add" },
      ],
    },
    {
      title: "Legal",
      items: [
        { icon: <FaFileAlt />, text: "Terms of Service", link: "/terms" },
        { icon: <FaLock />, text: "Guidelines for Privacy", link: "/privacy" },
      ],
    },
  ].filter(Boolean);

  return (
    <div className="w-full min-h-screen">
      {/* 📌 HERO BANNER */}
      <div className="relative w-full h-48 md:h-64">
        <img
          src={profile?.banner?.url || "https://via.placeholder.com/1200x300"}
          alt={profile?.banner?.alt || "Banner"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 📌 PROFILE CARD */}
      <div className="relative mx-auto -mt-14 md:-mt-20 bg-white shadow-lg rounded-lg p-6 max-w-lg md:max-w-2xl text-center">
        <div className="flex flex-col items-center">
          <img
            src={profile?.avatar?.url || "https://via.placeholder.com/150"}
            alt={profile?.avatar?.alt || "User avatar"}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border"
          />
          <h2 className="text-2xl font-bold mt-2">{profile?.name}</h2>
          <p className="text-gray-600">{profile?.email}</p>

          {/* 📌 Venue Manager Status & Toggle */}
          <p className="mt-2 px-4 py-1 bg-primary text-white rounded">
            {venueManager ? "You are a Venue Manager" : "Not a Venue Manager"}
          </p>

        {/* 📌 Update Profile Button */}
          <div className="mt-4 flex justify-center"  onClick={fetchVenueManager}>
          <UpdateProfile />
          </div>
        </div>
      </div>

      {/* 📌 PROFILE MENU SECTIONS */}
      <div className="container mx-auto mt-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <div key={index}>
              {section && (
                <>
                  <h3 className="text-lg font-bold mb-3">{section.title}</h3>
                  <div className="grid gap-3">
                    {section.items.map((item, i) => (
                      <Link
                        key={i}
                        to={item.link}
                        className="flex items-center gap-3 p-4 bg-white shadow-md rounded-lg hover:bg-gray-100"
                      >
                        <div className="text-text-primary text-xl">{item.icon}</div>
                        <span className="text-text-secondary font-medium">{item.text}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* 📌 LOGOUT BUTTON */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex items-center gap-3 p-4 bg-white shadow-md rounded-lg text-red-600 hover:bg-gray-100"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
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
