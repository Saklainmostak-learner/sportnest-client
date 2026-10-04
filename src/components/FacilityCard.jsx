import {
  ArrowRight,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { normalizeFacility } from "../utils/facility";

const FacilityCard = ({ facility: rawFacility }) => {
  const facility = normalizeFacility(rawFacility);

  const id = facility._id || facility.id;
  const availableSlots = facility.availableSlots || [];
  const hasPrice = Number(facility.pricePerHour) > 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_14px_40px_rgba(0,0,0,0.12)] transition duration-300 hover:border-green-400/30 hover:shadow-[0_16px_42px_rgba(34,197,94,0.08)]">
      <div className="relative h-44 overflow-hidden sm:h-48">
        <img
          src={facility.image}
          alt={facility.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

        <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] text-white backdrop-blur-md">
          {facility.type}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <h3 className="truncate text-lg font-black text-[var(--text)]">
            {facility.name}
          </h3>

          <p className="mt-2 flex min-w-0 items-center gap-2 text-sm text-[var(--muted)]">
            <MapPin
              size={15}
              className="shrink-0 text-green-400"
            />

            <span className="truncate">
              {facility.location}
            </span>
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3">
              <p className="flex items-center gap-2 text-xs text-[var(--muted)]">
                <Users size={15} className="text-green-400" />
                Capacity
              </p>

              <p className="mt-1 text-sm font-bold text-[var(--text)]">
                {facility.capacity || 0} Players
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3">
              <p className="flex items-center gap-2 text-xs text-[var(--muted)]">
                <Clock size={15} className="text-green-400" />
                Slots
              </p>

              <p className="mt-1 text-sm font-bold text-[var(--text)]">
                {availableSlots.length} Available
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
              Price per hour
            </p>

            <p className="mt-0.5 text-xl font-black text-green-400">
              {hasPrice ? `৳${facility.pricePerHour}` : "Not set"}

              {hasPrice && (
                <span className="text-xs font-semibold text-[var(--muted)]">
                  {" "}
                  /hr
                </span>
              )}
            </p>
          </div>

          <Link
            to={`/facility/${id}`}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-black text-white transition hover:bg-green-400"
          >
            Book Now
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FacilityCard;