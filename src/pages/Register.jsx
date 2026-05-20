import { Link } from "react-router-dom";
import { Mail, Lock, User, Image } from "lucide-react";
import { FaChrome } from "react-icons/fa";

const Register = () => {
  return (
    <section className="min-h-screen bg-[#020806] px-4 pt-36 pb-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
            Join SportNest
          </p>
          <h1 className="text-4xl font-black uppercase md:text-6xl">
            Create Your Player Account
          </h1>
          <p className="mt-5 max-w-xl text-slate-400">
            Book venues, manage slots and become part of the local sports community.
          </p>
        </div>

        <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl md:p-8">
          <h2 className="text-3xl font-black">Register</h2>

          <form className="mt-8 space-y-4">
            <Input icon={User} label="Name" placeholder="Your name" />
            <Input icon={Mail} label="Email" placeholder="you@example.com" />
            <Input icon={Image} label="Photo URL" placeholder="https://..." />
            <Input icon={Lock} label="Password" type="password" placeholder="At least 6 characters" />

            <p className="text-xs text-slate-400">
              Password must include uppercase, lowercase and minimum 6 characters.
            </p>

            <button className="w-full rounded-2xl bg-green-500 py-4 font-black text-white transition hover:bg-green-400">
              Register
            </button>
          </form>

          <button className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-4 font-bold text-white transition hover:bg-white/10">
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

const Input = ({ icon: Icon, label, type = "text", placeholder }) => (
  <label className="block">
    <span className="text-sm font-bold text-slate-300">{label}</span>
    <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
      <Icon size={18} className="text-green-400" />
      <input type={type} className="w-full bg-transparent outline-none" placeholder={placeholder} />
    </div>
  </label>
);

export default Register;