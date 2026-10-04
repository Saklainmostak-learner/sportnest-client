import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Building2,
  CalendarCheck,
  ChevronDown,
  Dumbbell,
  Home,
  LogOut,
  Menu,
  Moon,
  PlusSquare,
  Sun,
  UserCircle,
  X,
} from "lucide-react";
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/sportnest-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("sportnest_theme") || "dark",
  );

  const profileRef = useRef(null);

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("sportnest_theme", theme);
  }, [theme]);

  // Prevent the page behind the mobile menu from scrolling.
  // The menu itself remains scrollable.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "dark" ? "light" : "dark",
    );
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      await logoutUser();

      toast.success("Logged out successfully");

      setOpen(false);
      setProfileOpen(false);

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Logout failed",
      );
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

  const navLinks = user
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  const closeMenus = () => {
    setOpen(false);
    setProfileOpen(false);
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled || open
          ? "border-b border-[var(--border)] bg-[var(--navbar)] shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center"
          onClick={closeMenus}
        >
          <img
            src={logo}
            alt="SportNest Logo"
            className={`w-auto object-contain drop-shadow-[0_0_18px_rgba(34,197,94,0.7)] transition-all duration-300 ${
              scrolled
                ? "h-10"
                : "h-11 sm:h-12"
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
                      : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-4 xl:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text)] transition hover:border-green-400/40 hover:bg-green-500/10"
            aria-label={`Switch to ${
              theme === "dark" ? "light" : "dark"
            } theme`}
            title={`Switch to ${
              theme === "dark" ? "light" : "dark"
            } theme`}
          >
            {theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {user ? (
            <div
              className="relative"
              ref={profileRef}
            >
              <button
                type="button"
                onClick={() =>
                  setProfileOpen((value) => !value)
                }
                aria-expanded={profileOpen}
                className="flex items-center gap-2 rounded-full border border-green-400/40 bg-[var(--surface-soft)] p-1 pr-3 text-[var(--text)] backdrop-blur-xl transition hover:border-green-400/70 hover:bg-green-500/10"
              >
                <UserAvatar
                  user={user}
                  size="small"
                />

                <ChevronDown
                  size={16}
                  className={`transition ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-2xl backdrop-blur-2xl">
                  <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
                    <UserAvatar
                      user={user}
                      size="large"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-[var(--text)]">
                        {user.name || "Player"}
                      </p>

                      <p className="truncate text-xs text-[var(--muted)]">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    <DropdownLink
                      to="/my-bookings"
                      icon={CalendarCheck}
                      onClick={closeMenus}
                    >
                      My Bookings
                    </DropdownLink>

                    <DropdownLink
                      to="/add-facility"
                      icon={PlusSquare}
                      onClick={closeMenus}
                    >
                      Add Facility
                    </DropdownLink>

                    <DropdownLink
                      to="/manage-facilities"
                      icon={Building2}
                      onClick={closeMenus}
                    >
                      Manage My Facilities
                    </DropdownLink>

                    <DropdownLink
                      to="/dashboard"
                      icon={UserCircle}
                      onClick={closeMenus}
                    >
                      Dashboard
                    </DropdownLink>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl bg-red-500 px-3 py-2.5 text-sm font-black text-white transition hover:bg-red-400"
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
              className="rounded-xl bg-green-500 px-5 py-2.5 text-sm font-black text-white transition hover:bg-green-400"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => {
            setOpen((value) => !value);
            setProfileOpen(false);
          }}
          className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text)] backdrop-blur-xl xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute left-0 right-0 top-full xl:hidden">
          <div
            className="
              mx-3 mt-2
              max-h-[calc(100dvh-80px)]
              overflow-y-auto
              overscroll-contain
              rounded-2xl
              border border-[var(--border)]
              bg-[var(--surface)]
              p-3
              pb-8
              shadow-2xl
              backdrop-blur-2xl
              [scrollbar-width:thin]
            "
          >
            {/* PUBLIC LINKS */}
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
                          : "text-[var(--text)] hover:bg-green-500/10"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {item.name}
                  </NavLink>
                );
              })}
            </div>

            <div className="mt-4 border-t border-[var(--border)] pt-3">
              {/* THEME */}
              <button
                type="button"
                onClick={toggleTheme}
                className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] py-2.5 font-bold text-[var(--text)] transition hover:bg-green-500/10"
              >
                {theme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}

                {theme === "dark"
                  ? "Light Theme"
                  : "Dark Theme"}
              </button>

              {user ? (
                <div className="space-y-3">
                  {/* USER INFO */}
                  <div className="flex items-center gap-3 rounded-xl bg-[var(--surface-soft)] p-3">
                    <UserAvatar
                      user={user}
                      size="medium"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-[var(--text)]">
                        {user.name || "Player"}
                      </p>

                      <p className="truncate text-xs text-[var(--muted)]">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* PRIVATE LINKS */}
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
                              : "bg-[var(--surface-soft)] text-[var(--text)] hover:bg-green-500/10"
                          }`
                        }
                      >
                        <Icon size={18} />
                        {item.name}
                      </NavLink>
                    );
                  })}

                  {/* DASHBOARD */}
                  <NavLink
                    to="/dashboard"
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 font-bold transition ${
                        isActive
                          ? "bg-green-500 text-white"
                          : "bg-[var(--surface-soft)] text-[var(--text)] hover:bg-green-500/10"
                      }`
                    }
                  >
                    <UserCircle size={18} />
                    Dashboard
                  </NavLink>

                  {/* LOGOUT */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-bold text-white transition hover:bg-red-400"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>

                  <div className="h-2" />
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
        </div>
      )}
    </header>
  );
};

const UserAvatar = ({
  user,
  size = "medium",
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  const imageUrl =
    user?.image ||
    user?.photoURL ||
    "";

  const sizeClass = {
    small: "h-9 w-9",
    medium: "h-12 w-12",
    large: "h-14 w-14",
  }[size];

  const shouldShowImage =
    imageUrl &&
    !imageFailed &&
    /^https?:\/\//i.test(imageUrl);

  if (shouldShowImage) {
    return (
      <img
        src={imageUrl}
        alt={user?.name || "User"}
        onError={() => setImageFailed(true)}
        className={`${sizeClass} shrink-0 rounded-full border-2 border-green-400 object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} grid shrink-0 place-items-center rounded-full border-2 border-green-400 bg-green-500/10 text-green-400`}
      title={user?.name || "User"}
    >
      <UserCircle
        size={
          size === "large"
            ? 28
            : size === "medium"
              ? 24
              : 20
        }
      />
    </div>
  );
};

const DropdownLink = ({
  to,
  icon: Icon,
  children,
  onClick,
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--text)] transition hover:bg-green-500/10"
  >
    <Icon size={18} />
    {children}
  </Link>
);

export default Navbar;