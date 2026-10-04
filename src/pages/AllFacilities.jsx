import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapPin, RotateCcw, Search } from "lucide-react";

import FacilityCard from "../components/FacilityCard";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import { normalizeFacilities } from "../utils/facility";

const AllFacilities = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialType = searchParams.get("type") || "";

  const [facilities, setFacilities] = useState([]);
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [type, setType] = useState(initialType);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage("");

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
          }`,
        );

        if (!response.ok) {
          throw new Error("Failed to load facilities");
        }

        const data = await response.json();

        setFacilities(normalizeFacilities(data));

        setSearchParams(params, {
          replace: true,
        });
      } catch (error) {
        console.error(error);

        setFacilities([]);
        setErrorMessage(
          "Facilities could not be loaded from the server.",
        );
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
    <section className="min-h-screen bg-[var(--bg)] px-4 pb-12 pt-24 text-[var(--text)] sm:px-6 md:pt-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <BackButton fallback="/" label="Back Home" />

        {/* HEADER */}
        <div className="relative mt-4 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_16px_45px_rgba(0,0,0,0.12)] backdrop-blur-2xl md:p-6">
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-green-500/10 blur-[90px]" />

          <div className="relative">
            <p className="mb-3 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-green-400">
              All Facilities
            </p>

            <h1 className="text-3xl font-black uppercase leading-tight md:text-4xl">
              Find Your Perfect Arena
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] md:text-base">
              Search and filter sports facilities to find the right venue for
              your next game.
            </p>

            {/* SEARCH + FILTER */}
            <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_210px_auto]">
              <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 transition focus-within:border-green-400/50">
                <Search size={18} className="shrink-0 text-green-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search facility name..."
                  className="w-full min-w-0 bg-transparent text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                />
              </div>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-green-400/50"
              >
                <option value="">All Sports</option>
                <option value="Football">Football</option>
                <option value="Swimming">Swimming</option>
                <option value="Badminton">Badminton</option>
                <option value="Tennis">Tennis</option>
                <option value="Cricket">Cricket</option>
                <option value="Gym">Gym</option>
              </select>

              <button
                type="button"
                onClick={handleReset}
                disabled={!search && !type}
                className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-3 font-black text-[var(--text)] transition hover:border-green-400/40 hover:bg-green-500/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RotateCcw size={17} />
                Reset
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--muted)]">
              <MapPin size={16} className="text-green-400" />

              {loading
                ? "Searching facilities..."
                : `Showing ${facilities.length} facilit${
                    facilities.length === 1 ? "y" : "ies"
                  }`}
            </div>
          </div>
        </div>

        {/* FACILITY RESULTS */}
        <div className="py-8 md:py-10">
          {loading ? (
            <Loading />
          ) : errorMessage ? (
            <EmptyState
              title="Unable to Load Facilities"
              message={errorMessage}
            />
          ) : facilities.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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