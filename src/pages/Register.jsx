import { Link, useNavigate } from "react-router-dom";
import { Image, Lock, Mail, User } from "lucide-react";
import { FaChrome } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, googleLogin, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
      toast.error(
        "Password must include uppercase, lowercase and minimum 6 characters",
      );
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo)
          .then(() => {
            toast.success("Registration successful");
            navigate("/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Google login successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-20 pt-28 text-white md:pt-36">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
            Join SportNest
          </p>

          <h1 className="text-4xl font-black uppercase md:text-6xl">
            Create Your Player Account
          </h1>

          <p className="mt-5 max-w-xl text-slate-400">
            Book venues, manage slots and become part of the local sports
            community.
          </p>
        </div>

        <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl md:p-8">
          <h2 className="text-3xl font-black">Register</h2>

          <form onSubmit={handleRegister} className="mt-8 space-y-4">
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
              placeholder="you@example.com"
            />
            <Input
              icon={Image}
              name="photo"
              label="Photo URL"
              placeholder="https://..."
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
            <p className="text-xs text-slate-400">
              Password must include uppercase, lowercase and minimum 6
              characters.
            </p>

            <button
              type="submit"
              className="w-full rounded-2xl bg-green-500 py-4 font-black text-white transition hover:bg-green-400"
            >
              Register
            </button>
          </form>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-4 font-bold text-white transition hover:bg-white/10"
          >
            <FaChrome size={20} /> Continue with Google
          </button>

          <p className="mt-6 text-center text-slate-400">
            Already have account?{" "}
            <Link to="/login" className="font-bold text-green-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

const Input = ({ icon: Icon, name, label, type = "text", placeholder }) => (
  <label className="block">
    <span className="text-sm font-bold text-slate-300">{label}</span>
    <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
      <Icon size={18} className="text-green-400" />
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full bg-transparent outline-none"
      />
    </div>
  </label>
);

export default Register;
