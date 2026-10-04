import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, X } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [loggingIn, setLoggingIn] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      setLoggingIn(true);

      const result = await loginUser(email, password);

      if (result?.error) {
        toast.error(result.error.message || "Login failed");
        return;
      }

      // Better Auth session থেকে server JWT cookie তৈরি করবে
      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        {},
        {
          withCredentials: true,
        },
      );

      toast.success("Login successful");

      navigate(from, {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Login failed",
      );
    } finally {
      setLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      const result = await googleLogin(from);

      if (result?.error) {
        toast.error(result.error.message || "Google login failed");

        setGoogleLoading(false);
      }

      // Google OAuth হলে এখান থেকে redirect হবে।
      // callback-এর পর AuthProvider JWT cookie তৈরি করবে।
    } catch (error) {
      toast.error(error.message || "Google login failed");

      setGoogleLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--bg)] px-4 py-6 text-[var(--text)] md:py-8">
      {/* BACKGROUND GLOW */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-500/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-500/10 blur-[140px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT SIDE */}
          <div className="relative hidden overflow-hidden bg-[#0b1d13] lg:block">
            {/* MAP GRID */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />

            {/* ROAD LINES */}
            <div className="absolute left-[10%] top-[20%] h-[2px] w-[70%] rotate-12 bg-white/10" />
            <div className="absolute left-[20%] top-[58%] h-[2px] w-[55%] -rotate-12 bg-white/10" />
            <div className="absolute left-[30%] top-[10%] h-[70%] w-[2px] rotate-6 bg-white/10" />
            <div className="absolute left-[68%] top-[18%] h-[62%] w-[2px] -rotate-12 bg-white/10" />

            {/* CENTER PLAYER */}
            <div className="absolute left-1/2 top-1/2 z-20 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-8 border-white/20 bg-[#16281d] shadow-[0_0_40px_rgba(34,197,94,0.3)]">
              <img
                src="https://i.pravatar.cc/300?img=12"
                alt="SportNest player"
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            {/* FLOATING PLAYERS */}
            {[
              {
                img: "https://i.pravatar.cc/100?img=22",
                text: "Match tonight?",
                pos: "left-[18%] top-[26%]",
              },
              {
                img: "https://i.pravatar.cc/100?img=32",
                text: "I'm available!",
                pos: "right-[14%] top-[22%]",
              },
              {
                img: "https://i.pravatar.cc/100?img=14",
                text: "Let's play ⚽",
                pos: "left-[12%] bottom-[18%]",
              },
              {
                img: "https://i.pravatar.cc/100?img=40",
                text: "Book now?",
                pos: "right-[12%] bottom-[22%]",
              },
            ].map((item, index) => (
              <div key={index} className={`absolute ${item.pos}`}>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl">
                  <img
                    src={item.img}
                    alt=""
                    className="h-12 w-12 rounded-full border border-green-400/50 object-cover"
                  />

                  <p className="text-sm font-semibold text-white">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}

            {/* BRAND */}
            <div className="absolute bottom-10 left-10">
              <p className="text-sm uppercase tracking-[0.25em] text-green-400">
                SportNest
              </p>

              <h2 className="mt-3 max-w-sm text-4xl font-black uppercase leading-[1]">
                Find Arenas.
                <span className="block text-green-400">Book Your Game.</span>
              </h2>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative bg-[var(--surface)] p-5 sm:p-7 lg:p-8">
            <Link
              to="/"
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--muted)] transition hover:border-green-400/40 hover:text-green-400"
            >
              <X size={20} />
            </Link>

            <div className="max-w-md">
              <p className="mb-3 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-green-400">
                Welcome Back
              </p>

              <h1 className="text-3xl font-black uppercase leading-tight sm:text-4xl">
                Login to SportNest
              </h1>

              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Access your bookings, explore sports facilities and manage your
                reservations.
              </p>

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                {/* EMAIL */}
                <label className="block">
                  <span className="text-sm font-bold text-[var(--text)]">
                    Email Address
                  </span>

                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 transition focus-within:border-green-400/50">
                    <Mail size={20} className="text-green-400" />

                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                      className="w-full bg-transparent text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                    />
                  </div>
                </label>

                {/* PASSWORD */}
                <label className="block">
                  <span className="text-sm font-bold text-[var(--text)]">
                    Password
                  </span>
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 transition focus-within:border-green-400/50">
                    <Lock size={18} className="text-green-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      required
                      className="w-full bg-transparent text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[var(--muted)] transition hover:bg-green-500/10 hover:text-green-400"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full rounded-xl bg-green-500 py-3.5 text-base font-black text-white transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loggingIn ? "Logging in..." : "Login"}
                </button>
              </form>

              {/* DIVIDER */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-[var(--border)]" />

                <span className="text-xs text-[var(--muted)]">OR CONTINUE WITH</span>

                <div className="h-px flex-1 bg-[var(--border)]" />
              </div>

              {/* GOOGLE */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
               className="flex w-full items-center justify-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] py-3 font-bold text-[var(--text)] transition hover:border-green-400/40 hover:bg-green-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaGoogle size={20} />

                {googleLoading ? "Connecting..." : "Continue with Google"}
              </button>

              <p className="mt-6 text-center text-sm text-[var(--muted)]">
                Sign in securely to continue using SportNest.
              </p>

             <p className="mt-3 text-center text-sm text-[var(--muted)]">
                New here?{" "}
                <Link
                  to="/register"
                  className="font-black text-green-400 hover:text-green-300"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
