import { Link } from "react-router-dom";
import { Lock, Mail, X } from "lucide-react";
import { FaChrome } from "react-icons/fa";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Login successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Google login successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020806] px-4 pb-20 pt-28 text-white md:pt-36">
      {/* BACKGROUND GLOW */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-500/10 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-sky-500/10 blur-[140px]" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[40px] border border-white/10 bg-[#07110b]/95 shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl lg:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT SIDE */}
          <div className="relative hidden overflow-hidden bg-[#0b1d13] lg:block">
            {/* MAP GRID */}
            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />

            {/* ROAD LINES */}
            <div className="absolute left-[10%] top-[20%] h-[2px] w-[70%] rotate-12 bg-white/10" />
            <div className="absolute left-[20%] top-[58%] h-[2px] w-[55%] -rotate-12 bg-white/10" />
            <div className="absolute left-[30%] top-[10%] h-[70%] w-[2px] rotate-6 bg-white/10" />
            <div className="absolute left-[68%] top-[18%] h-[62%] w-[2px] -rotate-12 bg-white/10" />

            {/* CENTER PLAYER */}
            <div className="absolute left-1/2 top-1/2 z-20 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-8 border-white/20 bg-[#16281d] shadow-[0_0_40px_rgba(34,197,94,0.3)]">
              <img
                src="https://i.pravatar.cc/300?img=12"
                alt="player"
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
            ].map((item, i) => (
              <div key={i} className={`absolute ${item.pos}`}>
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
                SportNest Community
              </p>

              <h2 className="mt-3 max-w-sm text-5xl font-black uppercase leading-[1]">
                Find Players.
                <span className="block text-green-400">Book Arenas.</span>
              </h2>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative bg-[#07110b] p-6 sm:p-10 lg:p-14">
            {/* CLOSE */}
            <Link
              to="/"
              className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-green-400/40 hover:text-white"
            >
              <X size={24} />
            </Link>

            <div className="max-w-md">
              <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-green-400">
                Welcome Back
              </p>

              <h1 className="text-4xl font-black uppercase leading-tight sm:text-5xl">
                Login / Sign Up
              </h1>

              <p className="mt-5 text-slate-400">
                Access your bookings, explore sports venues and continue your
                journey.
              </p>

              {/* FORM */}
              <form onSubmit={handleLogin} className="mt-10 space-y-5">
                <label className="block">
                  <span className="text-sm font-bold text-slate-300">
                    Email Address
                  </span>

                  <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-5">
                    <Mail size={20} className="text-green-400" />

                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="w-full bg-transparent outline-none placeholder:text-slate-500"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-slate-300">
                    Password
                  </span>

                  <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-5">
                    <Lock size={20} className="text-green-400" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      className="w-full bg-transparent outline-none placeholder:text-slate-500"
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-green-500 py-5 text-lg font-black text-white transition hover:bg-green-400"
                >
                  Login
                </button>
              </form>

              {/* DIVIDER */}
              <div className="my-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-sm text-slate-500">OR CONTINUE WITH</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* SOCIAL */}
              <div>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-4 font-bold transition hover:border-green-400/40 hover:bg-green-500/10"
                >
                  <FaChrome size={20} />
                  Continue with Google
                </button>
              </div>

              {/* FOOTER */}
              <p className="mt-10 text-center text-sm text-slate-500">
                By continuing, you agree to SportNest’s terms and privacy
                policy.
              </p>

              <p className="mt-4 text-center text-slate-400">
                New here?{" "}
                <Link to="/register" className="font-black text-green-400">
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
