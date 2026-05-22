import { MapPin, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const venues = [
  {
    id: 1,
    name: "Green Field Arena",
    location: "Bashundhara, Dhaka",
    rating: 4.9,
    type: "Football",
    position: [23.8103, 90.4125],
    image:
      "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Aqua Pro Swim",
    location: "Mirpur, Dhaka",
    rating: 4.8,
    type: "Swimming",
    position: [23.8067, 90.3686],
    image:
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Smash Point Court",
    location: "Dhanmondi, Dhaka",
    rating: 4.7,
    type: "Badminton",
    position: [23.7465, 90.376],
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
            Discover premium sports facilities nearby with real location preview.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
            <div className="overflow-hidden rounded-[28px]">
              <MapContainer
                center={[23.8103, 90.4125]}
                zoom={11}
                scrollWheelZoom={false}
                className="h-[340px] w-full md:h-[460px] lg:h-[520px]"
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {venues.map((venue) => (
                  <Marker key={venue.id} position={venue.position}>
                    <Popup>
                      <strong>{venue.name}</strong>
                      <br />
                      {venue.location}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          <div className="space-y-5">
            {venues.map((venue) => (
              <motion.div
                key={venue.id}
                whileHover={{ x: 6 }}
                className="group flex flex-col gap-4 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition sm:flex-row"
              >
                <div className="h-32 w-full overflow-hidden rounded-2xl sm:w-36">
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
                        <span className="text-sm font-bold">{venue.rating}</span>
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

                  <Link
                    to={`/facilities?type=${venue.type}`}
                    className="mt-5 flex w-fit items-center gap-2 rounded-2xl bg-green-500 px-5 py-3 text-sm font-black text-white transition hover:bg-green-400"
                  >
                    Explore Venue <ArrowRight size={17} />
                  </Link>
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