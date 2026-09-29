import { useContext, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Image,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { createUser, googleLogin } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [registering, setRegistering] =
    useState(false);
  const [googleLoading, setGoogleLoading] =
    useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photo = form.photo.value.trim();

    const password =
      form.password.value;

    const confirmPassword =
      form.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter"
      );
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error(
        "Password must contain at least one lowercase letter"
      );
      return;
    }

    try {
      setRegistering(true);

      const result = await createUser(
        name,
        email,
        password,
        photo
      );

      if (result?.error) {
        toast.error(
          result.error.message ||
            "Registration failed"
        );
        return;
      }

      toast.success(
        "Registration successful. Please login."
      );

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error.message ||
          "Registration failed"
      );
    } finally {
      setRegistering(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      const result =
        await googleLogin();

      if (result?.error) {
        toast.error(
          result.error.message ||
            "Google login failed"
        );

        setGoogleLoading(false);
      }
    } catch (error) {
      toast.error(
        error.message ||
          "Google login failed"
      );

      setGoogleLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-20 pt-28 text-white md:pt-36">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        {/* LEFT */}
        <div>
          <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
            Join SportNest
          </p>

          <h1 className="text-4xl font-black uppercase md:text-6xl">
            Create Your Account
          </h1>

          <p className="mt-5 max-w-xl text-slate-400">
            Explore sports facilities, make
            reservations and manage your own facility
            listings from one place.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="font-black text-green-400">
                Book Facilities
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Select a date, choose an available
                slot and reserve your preferred
                facility.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="font-black text-green-400">
                List Facilities
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Add and manage your own sports
                facilities after signing in.
              </p>
            </div>
          </div>
        </div>

        {/* REGISTER CARD */}
        <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl md:p-8">
          <h2 className="text-3xl font-black">
            Register
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Enter your information to create a
            SportNest account.
          </p>

          <form
            onSubmit={handleRegister}
            className="mt-8 space-y-4"
          >
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

            <Input
              icon={Lock}
              name="password"
              label="Password"
              type="password"
              placeholder="At least 6 characters"
            />

            <Input
              icon={Lock}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
            />

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs leading-6 text-slate-400">
                Password must contain at least{" "}
                <span className="font-bold text-white">
                  6 characters
                </span>
                , one{" "}
                <span className="font-bold text-white">
                  uppercase
                </span>{" "}
                letter and one{" "}
                <span className="font-bold text-white">
                  lowercase
                </span>{" "}
                letter.
              </p>
            </div>

            <button
              type="submit"
              disabled={registering}
              className="w-full rounded-2xl bg-green-500 py-4 font-black text-white transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {registering
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs font-bold text-slate-500">
              OR
            </span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* GOOGLE */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-4 font-bold text-white transition hover:border-green-400/40 hover:bg-green-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaGoogle size={20} />

            {googleLoading
              ? "Connecting..."
              : "Continue with Google"}
          </button>

          <p className="mt-6 text-center text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-green-400 hover:text-green-300"
            >
              Login
            </Link>
          </p>
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
    <span className="text-sm font-bold text-slate-300">
      {label}
    </span>

    <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition focus-within:border-green-400/50">
      <Icon
        size={18}
        className="text-green-400"
      />

      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full bg-transparent outline-none placeholder:text-slate-500"
      />
    </div>
  </label>
);

export default Register;