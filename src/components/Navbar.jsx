import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Home,
  Dumbbell,
  CalendarCheck,
  PlusSquare,
  Building2,
  Menu,
  X,
  LogOut,
  UserCircle,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/sportnest-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("sportnest_theme") || "dark");
  const profileRef = useRef(null);

  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 35);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);


  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("sportnest_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true },
      );
      await logoutUser();
      toast.success("Logged out successfully");
      setOpen(false);
      setProfileOpen(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Logout failed");
    }
  };

  const publicLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "All Facilities", path: "/all-facilities", icon: Dumbbell },
  ];

  const privateLinks = [
    { name: "My Bookings", path: "/my-bookings", icon: CalendarCheck },
    { name: "Add Facility", path: "/add-facility", icon: PlusSquare },
    { name: "Manage Facilities", path: "/manage-facilities", icon: Building2 },
  ];

  const navLinks = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const closeMenus = () => {
    setOpen(false);
    setProfileOpen(false);
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-[#020806]/90 shadow-[0_10px_40px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <Link to="/" className="flex items-center" onClick={closeMenus}>
          <img
            src={logo}
            alt="SportNest Logo"
            className={`w-auto object-contain drop-shadow-[0_0_18px_rgba(34,197,94,0.7)] transition-all duration-300 ${
              scrolled ? "h-12" : "h-16 md:h-20"
            }`}
          />
        </Link>

        <div className="hidden items-center gap-7 xl:flex">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 text-sm font-semibold transition ${
                    isActive ? "text-green-400" : "text-slate-300 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </div>

        <div className="hidden items-center gap-4 xl:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((value) => !value)}
                aria-expanded={profileOpen}
                className="flex items-center gap-2 rounded-full border border-green-400/40 bg-white/5 p-1 pr-3 text-white backdrop-blur-xl transition hover:border-green-400/70 hover:bg-white/10"
              >
                <img
                  src={user.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt={user.name || "User"}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <ChevronDown
                  size={16}
                  className={`transition ${profileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 rounded-3xl border border-white/10 bg-[#07110b]/98 p-4 shadow-2xl backdrop-blur-2xl">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <img
                      src={user.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt={user.name || "User"}
                      className="h-14 w-14 rounded-full border-2 border-green-400 object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-white">
                        {user.name || "Player"}
                      </p>
                      <p className="truncate text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <DropdownLink to="/my-bookings" icon={CalendarCheck} onClick={closeMenus}>
                      My Bookings
                    </DropdownLink>
                    <DropdownLink to="/add-facility" icon={PlusSquare} onClick={closeMenus}>
                      Add Facility
                    </DropdownLink>
                    <DropdownLink to="/manage-facilities" icon={Building2} onClick={closeMenus}>
                      Manage My Facilities
                    </DropdownLink>
                    <DropdownLink to="/dashboard" icon={UserCircle} onClick={closeMenus}>
                      Dashboard
                    </DropdownLink>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-2xl bg-red-500 px-4 py-3 text-sm font-black text-white transition hover:bg-red-400"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-2xl bg-green-500 px-6 py-3 text-sm font-black text-white transition hover:bg-green-400"
            >
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-xl xl:hidden"
          aria-label="Toggle navigation menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 mb-4 rounded-3xl border border-white/10 bg-[#06120c]/98 p-4 shadow-2xl backdrop-blur-2xl xl:hidden">
          <div className="space-y-2">
            {publicLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenus}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-green-500 text-white"
                        : "text-slate-200 hover:bg-white/10"
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              );
            })}
          </div>

          <div className="mt-5 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 font-bold text-white"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              {theme === "dark" ? "Light Theme" : "Dark Theme"}
            </button>

            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                  <img
                    src={user.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt={user.name || "User"}
                    className="h-12 w-12 rounded-full border-2 border-green-400 object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-white">
                      {user.name || "Player"}
                    </p>
                    <p className="truncate text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>

                {privateLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={closeMenus}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-4 py-3 font-bold transition ${
                          isActive
                            ? "bg-green-500 text-white"
                            : "bg-white/5 text-white hover:bg-white/10"
                        }`
                      }
                    >
                      <Icon size={18} />
                      {item.name}
                    </NavLink>
                  );
                })}

                <NavLink
                  to="/dashboard"
                  onClick={closeMenus}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 font-bold transition ${
                      isActive
                        ? "bg-green-500 text-white"
                        : "bg-white/5 text-white hover:bg-white/10"
                    }`
                  }
                >
                  <UserCircle size={18} />
                  Dashboard
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-bold text-white transition hover:bg-red-400"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMenus}
                className="block w-full rounded-xl bg-green-500 py-3 text-center font-bold text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

const DropdownLink = ({ to, icon: Icon, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10"
  >
    <Icon size={18} />
    {children}
  </Link>
);

export default Navbar;
