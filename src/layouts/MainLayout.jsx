import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex min-h-screen flex-col">
      {!hideLayout && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default MainLayout;