import {
  MapPin,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { normalizeFacility } from "../utils/facility";

const FacilityCard = ({ facility: rawFacility }) => {
  const facility = normalizeFacility(rawFacility);
  const id = facility._id || facility.id;
  const availableSlots = facility.availableSlots || [];
  const hasPrice = Number(facility.pricePerHour) > 0;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl transition duration-300 hover:border-green-400/35 hover:shadow-[0_18px_45px_rgba(34,197,94,0.10)]">
      <div className="relative h-56 overflow-hidden">
        <img
          src={facility.image}
          alt={facility.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#020806] via-transparent to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-green-500 px-4 py-1.5 text-xs font-black uppercase text-white">
          {facility.type}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <h3 className="text-xl font-black text-white">{facility.name}</h3>

          <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={16} />
            {facility.location}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="flex items-center gap-2 text-slate-400">
                <Users size={16} /> Capacity
              </p>
              <h4 className="mt-1 font-bold text-white">
                {facility.capacity || 0} Players
              </h4>
            </div>

            <div className="rounded-2xl bg-white/5 p-3">
              <p className="flex items-center gap-2 text-slate-400">
                <Clock size={16} /> Slots
              </p>
              <h4 className="mt-1 font-bold text-white">
                {availableSlots.length} Available
              </h4>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400">Price per hour</p>
            <h4 className="text-2xl font-black text-green-400">
              {hasPrice ? `৳${facility.pricePerHour}` : "Not set"}
              {hasPrice && (
                <span className="text-sm text-slate-400"> /hr</span>
              )}
            </h4>
          </div>

          <Link
            to={`/facility/${id}`}
            className="flex items-center gap-2 rounded-2xl bg-green-500 px-5 py-3 text-sm font-black text-white transition hover:bg-green-400"
          >
            Book Now
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
