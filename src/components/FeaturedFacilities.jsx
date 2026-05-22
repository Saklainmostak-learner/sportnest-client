import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FacilityCard from "./FacilityCard";

const FeaturedFacilities = () => {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/facilities`)
      .then((res) => res.json())
      .then((data) => setFacilities(data.slice(0, 6)))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#020806] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-green-500/10 blur-[100px]" />
      <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-green-400/30 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
              Popular Choices
            </p>

            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Featured Facilities
            </h2>

            <p className="mt-4 max-w-2xl text-slate-400">
              Handpicked premium sports venues for your next match, practice, or
              weekend game.
            </p>
          </div>

          <Link
            to="/facilities"
            className="flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-green-400/50 hover:bg-green-500/10"
          >
            View All Facilities
          </Link>
        </div>

        {facilities.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {facilities.map((facility) => (
              <FacilityCard key={facility._id} facility={facility} />
            ))}
          </div>
        ) : (
          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-10 text-center">
            <h3 className="text-2xl font-black">No Featured Facilities Yet</h3>
            <p className="mt-2 text-slate-400">
              Add facilities first. They will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedFacilities;