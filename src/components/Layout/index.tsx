import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { FaArrowLeft } from 'react-icons/fa';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  return (
    <div className="flex flex-col h-dvh relative">
      <Header />
      <main className="pt-20 w-11/12 lg:w-10/12 max-w-screen-xl mx-auto flex-grow">
        {!isLandingPage && (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-6 flex items-center text-red-600 hover:text-gray-900 transition-all"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;


// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import Header from '../Header';
// import Footer from '../Footer';
// import { FaArrowLeft } from 'react-icons/fa';

// function Layout() {
//   const navigate = useNavigate();
//   const location = useLocation();


//   const isLandingPage = location.pathname === "/" || location.pathname === "/venues";

//   const handleBack = () => {
//     if (window.history.length > 2) {
//       navigate(-1);
//     } else {
//       navigate("/"); // Går til forsiden hvis ingen historikk finnes
//     }
//   };

//   return (
//     <div className="flex flex-col h-dvh relative">
//       <Header />

//       {/* 🔙 Tilbakeknapp - vises på alle sider unntatt landingpage */}
//       {!isLandingPage && (
//         <button
//           onClick={handleBack}
//           className="absolute top-20 left-6 flex items-center text-gray-700 hover:text-gray-900 transition-all z-50"
//         >
//           <FaArrowLeft className="mr-2" />
//           Back
//         </button>
//       )}

//       {/* 📌 Hovedinnhold */}
//       <main className="pt-20 w-11/12 lg:w-10/12 max-w-screen-xl mx-auto flex-grow">
//         <Outlet />
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default Layout;
