import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Image,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [registering, setRegistering] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photo = form.photo.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    try {
      setRegistering(true);

      const result = await createUser(name, email, password, photo);

      if (result?.error) {
        toast.error(result.error.message || "Registration failed");
        return;
      }

      toast.success("Registration successful. Please login.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      const result = await googleLogin("/");

      if (result?.error) {
        toast.error(result.error.message || "Google login failed");
        setGoogleLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "Google login failed");
      setGoogleLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[var(--bg)] px-4 py-6 text-[var(--text)] md:py-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm font-bold text-[var(--text)] transition hover:border-green-400/40 hover:bg-green-500/10 hover:text-green-400"
        >
          <ArrowLeft size={18} />
          Back Home
        </Link>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          {/* LEFT SIDE */}
          <div>
            <p className="mb-3 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-green-400">
              Join SportNest
            </p>

            <h1 className="text-3xl font-black uppercase leading-tight md:text-4xl">
              Create Your Account
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">
              Explore sports facilities, make reservations and manage your own
              facility listings from one place.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                <h3 className="font-black text-green-400">
                  Book Facilities
                </h3>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Select a date, choose an available slot and reserve your
                  preferred facility.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                <h3 className="font-black text-green-400">
                  List Facilities
                </h3>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Add and manage your own sports facilities after signing in.
                </p>
              </div>
            </div>
          </div>

          {/* REGISTER CARD */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-2xl md:p-6">
            <h2 className="text-2xl font-black">Register</h2>

            <p className="mt-1 text-sm text-[var(--muted)]">
              Enter your information to create a SportNest account.
            </p>

            <form onSubmit={handleRegister} className="mt-5 space-y-3">
              <Input
                icon={User}
                name="name"
                label="Name"
                placeholder="Your name"
              />

              <Input
                icon={Mail}
                name="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
              />

              <Input
                icon={Image}
                name="photo"
                label="Photo URL"
                type="url"
                placeholder="https://example.com/photo.jpg"
              />

              {/* PASSWORD */}
              <label className="block">
                <span className="text-sm font-bold text-[var(--text)]">
                  Password
                </span>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 transition focus-within:border-green-400/50">
                  <Lock size={18} className="text-green-400" />

                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="At least 6 characters"
                    className="w-full min-w-0 bg-transparent text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[var(--muted)] transition hover:bg-green-500/10 hover:text-green-400"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </label>

              {/* CONFIRM PASSWORD */}
              <label className="block">
                <span className="text-sm font-bold text-[var(--text)]">
                  Confirm Password
                </span>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 transition focus-within:border-green-400/50">
                  <Lock size={18} className="text-green-400" />

                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="Confirm your password"
                    className="w-full min-w-0 bg-transparent text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((value) => !value)
                    }
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[var(--muted)] transition hover:bg-green-500/10 hover:text-green-400"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    title={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </label>

              {/* PASSWORD RULES */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3">
                <p className="text-xs leading-5 text-[var(--muted)]">
                  Password must contain at least{" "}
                  <span className="font-bold text-[var(--text)]">
                    6 characters
                  </span>
                  , one{" "}
                  <span className="font-bold text-[var(--text)]">
                    uppercase
                  </span>{" "}
                  letter and one{" "}
                  <span className="font-bold text-[var(--text)]">
                    lowercase
                  </span>{" "}
                  letter.
                </p>
              </div>

              <button
                type="submit"
                disabled={registering}
                className="w-full rounded-xl bg-green-500 py-3.5 font-black text-white transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {registering ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="my-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-[var(--border)]" />

              <span className="text-xs font-bold text-[var(--muted)]">
                OR
              </span>

              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] py-3 font-bold text-[var(--text)] transition hover:border-green-400/40 hover:bg-green-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaGoogle size={19} />

              {googleLoading
                ? "Connecting..."
                : "Continue with Google"}
            </button>

            <p className="mt-4 text-center text-sm text-[var(--muted)]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-green-400 transition hover:text-green-300"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Input = ({
  icon: Icon,
  name,
  label,
  type = "text",
  placeholder,
}) => (
  <label className="block">
    <span className="text-sm font-bold text-[var(--text)]">
      {label}
    </span>

    <div className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 transition focus-within:border-green-400/50">
      <Icon size={18} className="shrink-0 text-green-400" />

      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
      />
    </div>
  </label>
);

export default Register;