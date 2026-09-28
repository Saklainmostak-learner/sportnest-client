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
} from "lucide-react";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/sportnest-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 35);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Better Auth session logout
      await logoutUser();

      // JWT HTTPOnly cookie clear
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      toast.success("Logged out successfully");

      setOpen(false);

      navigate("/");
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  };

  const publicLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "All Facilities",
      path: "/all-facilities",
      icon: Dumbbell,
    },
  ];

  const privateLinks = [
    {
      name: "My Bookings",
      path: "/my-bookings",
      icon: CalendarCheck,
    },
    {
      name: "Add Facility",
      path: "/add-facility",
      icon: PlusSquare,
    },
    {
      name: "Manage Facilities",
      path: "/manage-facilities",
      icon: Building2,
    },
  ];

  const navLinks = user ? [...publicLinks, ...privateLinks] : publicLinks;

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/10 bg-[#020806]/85 shadow-[0_10px_40px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="SportNest Logo"
            className={`w-auto object-contain drop-shadow-[0_0_18px_rgba(34,197,94,0.7)] transition-all duration-500 ${
              scrolled ? "h-12" : "h-16 md:h-20"
            }`}
          />
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden items-center gap-7 xl:flex">
          {navLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 text-sm font-semibold transition ${
                    isActive
                      ? "text-green-400"
                      : "text-slate-300 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />

                {item.name}
              </NavLink>
            );
          })}
        </div>

        {/* DESKTOP USER AREA */}
        <div className="hidden items-center gap-4 xl:flex">
          {user ? (
            <div className="group relative">
              {/* PROFILE BUTTON */}
              <button
                type="button"
                className="grid h-12 w-12 place-items-center rounded-full border-2 border-green-400/70 bg-white/5 p-0.5 shadow-[0_0_18px_rgba(34,197,94,0.35)] backdrop-blur-xl transition hover:scale-105"
              >
                <img
                  src={user.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt={user.name || "User"}
                  className="h-full w-full rounded-full object-cover"
                />
              </button>

              {/* PROFILE DROPDOWN */}
              <div className="invisible absolute right-0 top-[125%] w-72 translate-y-3 rounded-3xl border border-white/10 bg-[#07110b]/95 p-4 opacity-0 shadow-2xl backdrop-blur-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {/* USER INFO */}
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

                    <p className="truncate text-xs text-slate-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* DROPDOWN LINKS */}
                <div className="mt-4 space-y-2">
                  <Link
                    to="/my-bookings"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10"
                  >
                    <CalendarCheck size={18} />
                    My Bookings
                  </Link>

                  <Link
                    to="/add-facility"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10"
                  >
                    <PlusSquare size={18} />
                    Add Facility
                  </Link>

                  <Link
                    to="/manage-facilities"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10"
                  >
                    <Building2 size={18} />
                    Manage My Facilities
                  </Link>

                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10"
                  >
                    <UserCircle size={18} />
                    Dashboard
                  </Link>

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

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-xl xl:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="mx-4 mb-4 rounded-3xl border border-white/10 bg-[#06120c]/95 p-4 shadow-2xl backdrop-blur-2xl xl:hidden">
          {/* MOBILE NAV LINKS */}
          <div className="space-y-2">
            {navLinks.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
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

          {/* MOBILE USER AREA */}
          <div className="mt-5 border-t border-white/10 pt-4">
            {user ? (
              <div className="space-y-3">
                {/* USER INFO */}
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

                    <p className="truncate text-xs text-slate-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* MOBILE PRIVATE LINKS */}
                <Link
                  to="/my-bookings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  <CalendarCheck size={18} />
                  My Bookings
                </Link>

                <Link
                  to="/add-facility"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  <PlusSquare size={18} />
                  Add Facility
                </Link>

                <Link
                  to="/manage-facilities"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  <Building2 size={18} />
                  Manage My Facilities
                </Link>

                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  <UserCircle size={18} />
                  Dashboard
                </Link>

                {/* MOBILE LOGOUT */}
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
                onClick={() => setOpen(false)}
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

export default Navbar;
