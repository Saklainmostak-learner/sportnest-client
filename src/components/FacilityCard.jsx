import {
  MapPin,
  Star,
  Users,
  Clock,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppStateContext } from "../provider/AppStateProvider";
import toast from "react-hot-toast";

const FacilityCard = ({ facility }) => {
  const { favorites, toggleFavorite, addToCart } = useContext(AppStateContext);

  const id = facility._id || facility.id;
  const isFavorite = favorites.some((item) => (item._id || item.id) === id);

  const handleFavorite = () => {
    toggleFavorite(facility);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleCart = () => {
    addToCart(facility);
    toast.success("Added to cart");
  };

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

        <button
          type="button"
          onClick={handleFavorite}
          className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full backdrop-blur-xl transition ${
            isFavorite
              ? "bg-yellow-400 text-slate-950"
              : "bg-black/40 text-white hover:bg-green-500"
          }`}
        >
          <Star size={18} fill={isFavorite ? "currentColor" : "none"} />
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
              ৳{facility.price}
              <span className="text-sm text-slate-400"> /hr</span>
            </h4>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCart}
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-green-500"
            >
              <ShoppingCart size={18} />
            </button>

            <Link
              to={`/facility/${id}`}
              className="flex items-center gap-2 rounded-2xl bg-green-500 px-5 py-3 text-sm font-black text-white transition hover:bg-green-400"
            >
              Book <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FacilityCard;