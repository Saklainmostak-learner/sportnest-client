import { NavLink, Link } from "react-router-dom";
import {
  Home,
  Dumbbell,
  CalendarCheck,
  PlusSquare,
  Building2,
  Menu,
  X,
  ShoppingCart,
  Heart,
  LogOut,
  UserCircle,
} from "lucide-react";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { AppStateContext } from "../provider/AppStateProvider";
import logo from "../assets/sportnest-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, logoutUser } = useContext(AuthContext);
  const { cart = [], favorites = [] } = useContext(AppStateContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 35);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logoutUser().catch(console.log);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "All Facilities", path: "/facilities", icon: Dumbbell },
    { name: "My Bookings", path: "/my-bookings", icon: CalendarCheck },
    { name: "Add Facility", path: "/add-facility", icon: PlusSquare },
    { name: "Manage Facilities", path: "/manage-facilities", icon: Building2 },
  ];

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
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="SportNest Logo"
            className={`w-auto object-contain drop-shadow-[0_0_18px_rgba(34,197,94,0.7)] transition-all duration-500 ${
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

        <div className="hidden items-center gap-4 xl:flex">
          <IconBadge icon={Heart} count={favorites.length} title="Favorites" />
          <IconBadge icon={ShoppingCart} count={cart.length} title="Cart" />

          {user ? (
            <div className="group relative">
              <button className="grid h-12 w-12 place-items-center rounded-full border-2 border-green-400/70 bg-white/5 p-0.5 shadow-[0_0_18px_rgba(34,197,94,0.35)] backdrop-blur-xl transition hover:scale-105">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="User"
                  className="h-full w-full rounded-full object-cover"
                />
              </button>

              <div className="invisible absolute right-0 top-[125%] w-72 translate-y-3 rounded-3xl border border-white/10 bg-[#07110b]/95 p-4 opacity-0 shadow-2xl backdrop-blur-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <img
                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="User"
                    className="h-14 w-14 rounded-full border-2 border-green-400 object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-white">
                      {user.displayName || "Player"}
                    </p>
                    <p className="truncate text-xs text-slate-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Link
                    to="/my-bookings"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10"
                  >
                    <CalendarCheck size={18} />
                    My Bookings
                  </Link>

                  <Link
                    to="/manage-facilities"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10"
                  >
                    <UserCircle size={18} />
                    Dashboard
                  </Link>

                  <button
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

        <button
          onClick={() => setOpen(!open)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-xl xl:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 mb-4 rounded-3xl border border-white/10 bg-[#06120c]/95 p-4 shadow-2xl backdrop-blur-2xl xl:hidden">
          <div className="mb-4 grid grid-cols-2 gap-3">
            <MobileBadge
              icon={Heart}
              count={favorites.length}
              label="Favorites"
            />
            <MobileBadge icon={ShoppingCart} count={cart.length} label="Cart" />
          </div>

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

          <div className="mt-5 border-t border-white/10 pt-4">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                  <img
                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="User"
                    className="h-12 w-12 rounded-full border-2 border-green-400 object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-white">
                      {user.displayName || "Player"}
                    </p>
                    <p className="truncate text-xs text-slate-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-red-500 py-3 font-bold text-white"
                >
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

const IconBadge = ({ icon: Icon, count, title }) => {
  const { cart = [], favorites = [] } = useContext(AppStateContext);

  const items = title === "Cart" ? cart : favorites;

  return (
    <div className="group relative">
      <button
        type="button"
        title={title}
        className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl transition hover:border-green-400/50 hover:bg-green-500/10"
      >
        <Icon size={21} />
        {count > 0 && (
          <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-green-500 px-1 text-xs font-black text-white">
            {count}
          </span>
        )}
      </button>

      <div className="invisible absolute right-0 top-[125%] z-50 w-80 translate-y-3 rounded-3xl border border-white/10 bg-[#07110b]/95 p-4 opacity-0 shadow-2xl backdrop-blur-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="mb-3 text-sm font-black text-white">{title}</h3>

        {items.length > 0 ? (
          <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item._id || item.id}
                className="flex gap-3 rounded-2xl bg-white/5 p-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-xl object-cover"
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white">
                    {item.name}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {item.location}
                  </p>
                  <p className="text-xs font-bold text-green-400">
                    ৳{item.price}/hr
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-white/5 p-4 text-sm text-slate-400">
            No items added yet.
          </p>
        )}
      </div>
    </div>
  );
};

const MobileBadge = ({ icon: Icon, count, label }) => {
  const { cart = [], favorites = [] } = useContext(AppStateContext);
  const [show, setShow] = useState(false);

  const items = label === "Cart" ? cart : favorites;

  return (
    <div>
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
      >
        <span className="flex items-center gap-2 text-sm font-bold">
          <Icon size={18} />
          {label}
        </span>

        <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-black">
          {count}
        </span>
      </button>

      {show && (
        <div className="mt-3 space-y-2 rounded-2xl bg-black/30 p-3">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id || item.id}
                className="flex gap-3 rounded-xl bg-white/5 p-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white">
                    {item.name}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {item.location}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">No items added yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
