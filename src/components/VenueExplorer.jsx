import {
  ArrowRight,
  MapPin,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
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
    <section className="relative overflow-hidden bg-[var(--bg)] px-4 py-14 text-[var(--text)] sm:px-6 md:py-16 lg:px-8">
      <div className="absolute left-0 top-16 h-64 w-64 rounded-full bg-green-500/10 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-8">
          <p className="mb-3 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-green-400">
            Explore Nearby
          </p>

          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Explore Venues Around Dhaka
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] md:text-base">
            Preview popular sports areas around Dhaka and explore facilities by
            sport type.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          {/* MAP */}
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[0_14px_40px_rgba(0,0,0,0.1)]">
            <div className="overflow-hidden rounded-xl">
              <MapContainer
                center={[23.8103, 90.4125]}
                zoom={11}
                scrollWheelZoom={false}
                className="h-[300px] w-full sm:h-[340px] lg:h-[390px]"
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {venues.map((venue) => (
                  <Marker
                    key={venue.id}
                    position={venue.position}
                  >
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

          {/* VENUE CARDS */}
          <div className="grid gap-3">
            {venues.map((venue) => (
              <article
                key={venue.id}
                className="group grid gap-3 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[0_12px_35px_rgba(0,0,0,0.08)] sm:grid-cols-[120px_1fr]"
              >
                <div className="h-32 overflow-hidden rounded-xl sm:h-full sm:min-h-[125px]">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex min-w-0 flex-col justify-between">
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-green-400">
                        {venue.type}
                      </span>

                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star
                          size={14}
                          fill="currentColor"
                        />

                        <span className="text-xs font-bold">
                          {venue.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="truncate text-base font-black text-[var(--text)]">
                      {venue.name}
                    </h3>

                    <p className="mt-1.5 flex min-w-0 items-center gap-2 text-sm text-[var(--muted)]">
                      <MapPin
                        size={14}
                        className="shrink-0 text-green-400"
                      />

                      <span className="truncate">
                        {venue.location}
                      </span>
                    </p>
                  </div>

                  <Link
                    to={`/all-facilities?type=${encodeURIComponent(
                      venue.type,
                    )}`}
                    className="mt-3 inline-flex w-fit items-center gap-2 rounded-xl bg-green-500 px-3.5 py-2 text-xs font-black text-white transition hover:bg-green-400"
                  >
                    Explore {venue.type}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueExplorer;