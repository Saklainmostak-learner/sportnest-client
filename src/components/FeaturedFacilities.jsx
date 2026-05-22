import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";
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
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-green-400/30 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
              Popular Choices
            </p>

            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Featured Facilities
            </h2>
          </div>

          <Link to="/facilities" className="rounded-2xl bg-green-500 px-6 py-3 font-bold text-white">
            View All Facilities
          </Link>
        </div>

        {facilities.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {facilities.map((facility) => (
              <FacilityCard key={facility._id || facility.id} facility={facility} />
            ))}
          </div>
        ) : (
          <EmptyState title="No Featured Facilities" message="Add facilities first." />
        )}
      </div>
    </section>
  );
};

export default FeaturedFacilities;