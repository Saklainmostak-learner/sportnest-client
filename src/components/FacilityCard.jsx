import { MapPin, Star, Users, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FacilityCard = ({ facility }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={facility.image}
          alt={facility.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#020806] via-transparent to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-green-500 px-4 py-1.5 text-xs font-black uppercase text-white">
          {facility.type}
        </div>

        <button className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur-xl transition hover:bg-green-500">
          <Star size={18} />
        </button>
      </div>

      <div className="p-5">
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
            <h4 className="mt-1 font-bold text-white">{facility.capacity}</h4>
          </div>

          <div className="rounded-2xl bg-white/5 p-3">
            <p className="flex items-center gap-2 text-slate-400">
              <Clock size={16} /> Slots
            </p>
            <h4 className="mt-1 font-bold text-white">{facility.slots}</h4>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Starting from</p>
            <h4 className="text-2xl font-black text-green-400">
              $ {facility.price}
              <span className="text-sm text-slate-400"> /hr</span>
            </h4>
          </div>

          <Link
            to={`/facility/${facility.id}`}
            className="flex items-center gap-2 rounded-2xl bg-green-500 px-5 py-3 text-sm font-black text-white transition hover:bg-green-400"
          >
            Book <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FacilityCard;
