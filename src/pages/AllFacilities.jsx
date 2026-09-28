import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapPin, Search, RotateCcw } from "lucide-react";

import FacilityCard from "../components/FacilityCard";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";

const AllFacilities = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialType = searchParams.get("type") || "";

  const [facilities, setFacilities] = useState([]);
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [type, setType] = useState(initialType);

  const [loading, setLoading] = useState(true);

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch facilities
  useEffect(() => {
    const loadFacilities = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (debouncedSearch) {
          params.set("search", debouncedSearch);
        }

        if (type) {
          params.set("type", type);
        }

        const queryString = params.toString();

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/facilities${
            queryString ? `?${queryString}` : ""
          }`
        );

        if (!response.ok) {
          throw new Error("Failed to load facilities");
        }

        const data = await response.json();

        setFacilities(data);

        // URL sync
        setSearchParams(params, {
          replace: true,
        });
      } catch (error) {
        console.error(error);

        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };

    loadFacilities();
  }, [debouncedSearch, type, setSearchParams]);

  const handleReset = () => {
    setSearch("");
    setDebouncedSearch("");
    setType("");
    setSearchParams({});
  };

  return (
    <section className="min-h-screen bg-[#020806] pt-36 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
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
              Search and filter sports facilities to find the right venue for
              your next game.
            </p>

            {/* SEARCH + FILTER */}
            <div className="mt-8 grid gap-4 md:grid-cols-[1fr_230px_auto]">
              {/* SEARCH */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition focus-within:border-green-400/50">
                <Search className="text-green-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search facility name..."
                  className="w-full bg-transparent outline-none placeholder:text-slate-500"
                />
              </div>

              {/* SPORT FILTER */}
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-slate-300 outline-none transition focus:border-green-400/50"
              >
                <option value="">All Sports</option>
                <option value="Football">Football</option>
                <option value="Swimming">Swimming</option>
                <option value="Badminton">Badminton</option>
                <option value="Tennis">Tennis</option>
                <option value="Cricket">Cricket</option>
                <option value="Gym">Gym</option>
              </select>

              {/* RESET */}
              <button
                type="button"
                onClick={handleReset}
                disabled={!search && !type}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-black text-white transition hover:border-green-400/40 hover:bg-green-500/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RotateCcw size={18} />
                Reset
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <MapPin
                size={16}
                className="text-green-400"
              />

              {loading
                ? "Searching facilities..."
                : `Showing ${facilities.length} facilit${
                    facilities.length === 1 ? "y" : "ies"
                  }`}
            </div>
          </div>
        </div>

        {/* FACILITY RESULTS */}
        <div className="py-16">
          {loading ? (
            <Loading />
          ) : facilities.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {facilities.map((facility) => (
                <FacilityCard
                  key={facility._id}
                  facility={facility}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Facilities Found"
              message="Try another facility name or sport type."
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AllFacilities;