import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
// import { FaArrowLeft } from "react-icons/fa";

function Layout() {
  // const navigate = useNavigate();
  const location = useLocation();

  // const isLandingPage = location.pathname === "/";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={`flex flex-col min-h-screen ${isAuthPage ? "bg-gradient-to-t from-primary-3 via-primary-3 to-secondary" : "bg-background"}`}>
      {!isAuthPage && <Header />}
      <main className={`flex-grow w-11/12 lg:w-10/12 max-w-screen-xl mx-auto my-20 ${isAuthPage ? "flex items-center justify-center" : ""}`}>
        {/* {!isLandingPage && (
          <button
            onClick={() => navigate(-1)}
            className="absolute top-20 left-6 flex items-center text-primary-3 hover:text-gray-900 transition-all"
          >
            <FaArrowLeft className="font-bold text-xl z-50" />
          </button>
        )} */}

        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default Layout;