import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import FeaturedFacilities from "../components/FeaturedFacilities";

const AllFacilities = () => {
  return (
    <section className="min-h-screen bg-[#020806] pt-36 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl md:p-12">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-green-500/10 blur-[100px]" />

          <div className="relative">
            <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
              All Facilities
            </p>

            <h1 className="text-4xl font-black uppercase md:text-6xl">
              Find Your Perfect Arena
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400">
              Search, filter and explore verified sports facilities for your next game.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-[1fr_230px_auto]">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <Search className="text-green-400" />
                <input
                  placeholder="Search facility name..."
                  className="w-full bg-transparent outline-none"
                />
              </div>

              <select className="rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none">
                <option>All Sports</option>
                <option>Football</option>
                <option>Swimming</option>
                <option>Badminton</option>
                <option>Tennis</option>
              </select>

              <button className="flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-7 py-4 font-black text-white">
                <SlidersHorizontal size={18} /> Filter
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <MapPin size={16} className="text-green-400" />
              Showing premium facilities around Dhaka, Bangladesh
            </div>
          </div>
        </div>
      </div>

      <FeaturedFacilities />
    </section>
  );
};

export default AllFacilities;