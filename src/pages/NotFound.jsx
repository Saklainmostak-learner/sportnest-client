import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-[#020806] px-4 text-white">
      <div className="absolute h-96 w-96 rounded-full bg-green-500/10 blur-[130px]" />

      <div className="relative text-center">
        <h1 className="text-9xl font-black text-green-400">404</h1>
        <h2 className="mt-4 text-4xl font-black uppercase">Arena Not Found</h2>
        <p className="mx-auto mt-4 max-w-md text-slate-400">
          The sports arena you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-green-500 px-7 py-4 font-black text-white"
        >
          <Home size={20} /> Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;