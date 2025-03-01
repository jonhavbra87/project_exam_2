import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

/**
 * @module Layout
 * @description Main layout component that wraps the application content.
 * It conditionally renders the Header and Footer components based on the current route.
 * For authentication pages (login/register), it displays a gradient background without header/footer.
 * For all other pages, it displays the standard layout with header and footer.
 *
 * @component
 * @returns {JSX.Element} - Rendered Layout component with conditional header/footer and Outlet for nested routes
 *
 * @example
 * // Usage in a Router configuration
 * const router = createBrowserRouter([
 *   {
 *     path: "/",
 *     element: <Layout />,
 *     children: [
 *       { path: "/", element: <HomePage /> },
 *       { path: "/venue/:id", element: <VenuePage /> },
 *       { path: "/login", element: <LoginPage /> },
 *       { path: "/register", element: <RegisterPage /> },
 *     ],
 *   },
 * ]);
 *
 * @example
 * // Usage with React Router DOM v6
 * <BrowserRouter>
 *   <Routes>
 *     <Route path="/" element={<Layout />}>
 *       <Route index element={<HomePage />} />
 *       <Route path="venue/:id" element={<VenuePage />} />
 *       <Route path="login" element={<LoginPage />} />
 *       <Route path="register" element={<RegisterPage />} />
 *     </Route>
 *   </Routes>
 * </BrowserRouter>
 */

function Layout() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <div
      className={`flex flex-col min-h-screen ${isAuthPage ? 'bg-gradient-to-t from-primary-3 via-primary-3 to-secondary' : 'bg-background'}`}
    >
      {!isAuthPage && <Header />}
      <main
        className={`flex-grow w-11/12 lg:w-10/12 max-w-screen-xl mx-auto my-20 ${isAuthPage ? 'flex items-center justify-center' : ''}`}
      >
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default Layout;
