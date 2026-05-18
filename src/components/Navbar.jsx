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
      setScrolled(window.scrollY > 40);
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
          ? "border-b border-white/10 bg-[#020806]/75 shadow-[0_8px_35px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "border-b border-white/5 bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 ${
          scrolled ? "py-2" : "py-5"
        }`}
      >
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="SportNest Logo"
            className={`w-auto object-contain drop-shadow-[0_0_20px_rgba(34,197,94,0.65)] transition-all duration-500 hover:scale-105 ${
              scrolled ? "h-14 md:h-16" : "h-20 md:h-24"
            }`}
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
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

        <div className="hidden items-center gap-5 lg:flex">
          <div className="relative">
            <Bell className="text-white" size={22} />
            <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-green-500 text-xs font-bold text-white">
              3
            </span>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="https://i.ibb.co.com/4m1vV23/user.png"
              alt="User"
              className="h-10 w-10 rounded-full border-2 border-white/40 object-cover"
            />
            <span className="text-sm font-semibold text-white">Mahfuz</span>
            <ChevronDown size={16} className="text-white" />
          </div>
        </div>

        <button onClick={() => setOpen(!open)} className="text-white lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="space-y-4 border-t border-white/10 bg-[#020806]/95 px-5 py-5 backdrop-blur-xl lg:hidden">
          {navLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 text-sm font-semibold text-slate-200"
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;