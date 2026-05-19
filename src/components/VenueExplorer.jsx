import { MapPin, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const venues = [
  {
    id: 1,
    name: "Green Field Arena",
    location: "Bashundhara, Dhaka",
    rating: 4.9,
    type: "Football",
    image:
      "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Aqua Pro Swim",
    location: "Mirpur, Dhaka",
    rating: 4.8,
    type: "Swimming",
    image:
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Smash Point Court",
    location: "Dhanmondi, Dhaka",
    rating: 4.7,
    type: "Badminton",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1200&auto=format&fit=crop",
  },
];

const VenueExplorer = () => {
  return (
    <section className="relative overflow-hidden bg-[#020806] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-green-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
            Explore Nearby
          </p>

          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Explore Venues Near You
          </h2>

          <p className="mt-4 max-w-2xl text-slate-400">
            Discover premium sports facilities nearby with real-time
            availability.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT MAP */}
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
            <div className="relative h-[520px] overflow-hidden rounded-[28px]">
              <div className="absolute inset-0 bg-[#07130d]">
                <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(34,197,94,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.18)_1px,transparent_1px)] bg-[size:42px_42px]" />

                <div className="absolute left-[10%] top-[25%] h-[2px] w-[70%] rotate-12 bg-green-400/25" />
                <div className="absolute left-[18%] top-[55%] h-[2px] w-[60%] -rotate-6 bg-green-400/20" />
                <div className="absolute left-[35%] top-[15%] h-[70%] w-[2px] rotate-12 bg-green-400/20" />
                <div className="absolute left-[65%] top-[18%] h-[65%] w-[2px] -rotate-12 bg-green-400/20" />

                <div className="absolute left-6 top-6 rounded-2xl border border-green-400/20 bg-black/30 px-4 py-3 backdrop-blur-xl">
                  <p className="text-xs text-slate-400">Region</p>
                  <h4 className="font-black text-white">Dhaka Sports Zone</h4>
                </div>
              </div>

              {/* MAP PINS */}
              <div className="map-pin left-[22%] top-[32%]" />
              <div className="map-pin left-[58%] top-[48%]" />
              <div className="map-pin left-[72%] top-[26%]" />

              <div className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
                <p className="text-sm text-slate-300">Live Active Venues</p>
                <h3 className="mt-1 text-4xl font-black">128</h3>
              </div>
            </div>
          </div>

          {/* RIGHT CARDS */}
          <div className="space-y-5">
            {venues.map((venue) => (
              <motion.div
                key={venue.id}
                whileHover={{ x: 6 }}
                className="group flex gap-4 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition"
              >
                <div className="h-32 w-36 overflow-hidden rounded-2xl">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-black uppercase text-green-400">
                        {venue.type}
                      </span>

                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-bold">
                          {venue.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-white">
                      {venue.name}
                    </h3>

                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                      <MapPin size={16} />
                      {venue.location}
                    </p>
                  </div>

                  <button className="mt-5 flex w-fit items-center gap-2 rounded-2xl bg-green-500 px-5 py-3 text-sm font-black text-white transition hover:bg-green-400">
                    Explore Venue
                    <ArrowRight size={17} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueExplorer;
