import { NavLink, Link } from "react-router-dom";
import {
  Home,
  Dumbbell,
  CalendarCheck,
  PlusSquare,
  Building2,
  Bell,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../assets/sportnest-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 35);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        scrolled
          ? "border-b border-white/10 bg-[#020806]/80 shadow-[0_10px_40px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
          scrolled ? "py-1" : "py-2 md:py-3"
        }`}
      >
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="SportNest Logo"
            className={`w-auto object-contain drop-shadow-[0_0_20px_rgba(34,197,94,0.75)] transition-all duration-500 hover:scale-105 ${
              scrolled ? "h-14 sm:h-16 md:h-20" : "h-20 sm:h-24 md:h-28"
            }`}
          />
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
          {navLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 text-sm font-semibold transition ${
                    isActive ? "text-white" : "text-slate-300 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} />
                    {item.name}
                    {isActive && (
                      <span className="absolute -bottom-5 left-0 h-[3px] w-full rounded-full bg-green-500 shadow-[0_0_14px_#22c55e]" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        <div className="hidden items-center gap-5 xl:flex">
          <div className="relative">
            <Bell className="text-white" size={22} />
            <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-green-500 text-xs font-bold text-white">
              3
            </span>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="User"
              className="h-10 w-10 rounded-full border-2 border-white/40 object-cover"
            />
            <span className="text-sm font-semibold text-white">Mahfuz</span>
            <ChevronDown size={16} className="text-white" />
          </div>
        </div>

        <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-xl xl:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-[#06120c]/95 p-4 shadow-2xl backdrop-blur-2xl xl:hidden">
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
         <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="User"
                className="h-10 w-10 rounded-full border-2 border-white/30"
              />
              <div>
                <p className="text-sm font-bold text-white">Mahfuz</p>
                <p className="text-xs text-slate-400">Player Account</p>
              </div>
            </div>
            <Bell className="text-white" size={20} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;