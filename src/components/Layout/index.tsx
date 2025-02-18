import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { FaArrowLeft } from 'react-icons/fa';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className={`flex flex-col h-dvh ${isAuthPage ? 'bg-gradient-to-t from-primary-3 via-primary-3 to-secondary' : 'bg-background'}`}>
      <div className={`flex flex-col h-dvh ${isAuthPage ? '' : ''}`}>

      {!isAuthPage && <Header />}
      </div>
    {/* Main content tar hele skjermen */}
    <main className={`flex-grow w-11/12 lg:w-10/12 max-w-screen-xl mx-auto ${isAuthPage ? "flex items-center justify-center" : ""}`}>
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
      {!isAuthPage && <Footer />}
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
