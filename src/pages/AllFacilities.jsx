import { useEffect, useState } from "react";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import FacilityCard from "../components/FacilityCard";
import EmptyState from "../components/EmptyState";

const AllFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/facilities?search=${search}&type=${type}`,
    )
      .then((res) => res.json())
      .then((data) => setFacilities(data))
      .catch((error) => console.log(error.message));
  }, [search, type]);

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search facility name..."
                  className="w-full bg-transparent outline-none"
                />
              </div>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none"
              >
                <option value="">All Sports</option>
                <option value="Football">Football</option>
                <option value="Swimming">Swimming</option>
                <option value="Badminton">Badminton</option>
                <option value="Tennis">Tennis</option>
                <option value="Cricket">Cricket</option>
                <option value="Gym">Gym</option>
              </select>

              <button className="flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-7 py-4 font-black text-white">
                <SlidersHorizontal size={18} /> Filter
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <MapPin size={16} className="text-green-400" />
              Showing {facilities.length} facilities around Dhaka, Bangladesh
            </div>
          </div>
        </div>

        <div className="py-16">
          {facilities.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {facilities.map((facility) => (
                <FacilityCard key={facility._id} facility={facility} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Facilities Found"
              message="Try another search keyword or sport type."
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AllFacilities;