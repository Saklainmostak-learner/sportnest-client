import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import EmptyState from "./EmptyState";
import FacilityCard from "./FacilityCard";
import Loading from "./Loading";

const FeaturedFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadFeaturedFacilities = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/facilities`
        );

        if (!response.ok) {
          throw new Error("Failed to load featured facilities");
        }

        const data = await response.json();

        setFacilities(data.slice(0, 6));
      } catch (error) {
        console.error(error);
        setFacilities([]);
        setErrorMessage("Featured facilities could not be loaded. Please try again after the server/database is available.");
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedFacilities();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#020806] px-4 py-24 text-white sm:px-6 lg:px-8">
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
              Explore some of the available sports facilities and book the
              perfect venue for your next game.
            </p>
          </div>

          <Link
            to="/all-facilities"
            className="w-fit rounded-2xl bg-green-500 px-6 py-3 font-bold text-white transition hover:bg-green-400"
          >
            View All Facilities
          </Link>
        </div>

        {loading ? (
          <Loading />
        ) : errorMessage ? (
          <EmptyState
            title="Unable to Load Facilities"
            message={errorMessage}
          />
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
            title="No Featured Facilities"
            message="Facilities will appear here once they are added."
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedFacilities;