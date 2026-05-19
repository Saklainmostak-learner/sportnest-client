import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="grid min-h-screen place-items-center bg-[#020806] px-4 text-white">
      <div className="text-center">
        <h1 className="text-8xl font-black text-green-400">404</h1>
        <h2 className="mt-4 text-3xl font-black">Page Not Found</h2>
        <p className="mt-3 text-slate-400">The arena you are looking for does not exist.</p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-2xl bg-green-500 px-7 py-4 font-black text-white"
        >
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;