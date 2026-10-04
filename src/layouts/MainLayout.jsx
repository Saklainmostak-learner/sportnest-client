import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--text)]">
      <ScrollToTop />

      {!hideLayout && <Navbar />}

      <main className="flex-1">
        <Outlet />
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default MainLayout;