import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppStateContext } from "../provider/AppStateProvider";
import EmptyState from "../components/EmptyState";

const Favorites = () => {
  const { favorites, toggleFavorite } = useContext(AppStateContext);

  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-36 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 inline-flex rounded-full bg-green-500/10 px-4 py-2 text-xs font-black uppercase text-green-400">
          Saved Venues
        </p>

        <h1 className="text-4xl font-black uppercase md:text-6xl">
          My Favorites
        </h1>

        <div className="mt-10">
          {favorites.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {favorites.map((item) => (
                <div
                  key={item._id || item.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-black">{item.name}</h3>
                    <p className="mt-2 text-slate-400">{item.location}</p>
                    <p className="mt-3 font-black text-green-400">
                      ৳{item.price}/hr
                    </p>

                    <div className="mt-5 flex gap-3">
                      <Link
                        to={`/facility/${item._id || item.id}`}
                        className="flex-1 rounded-2xl bg-green-500 py-3 text-center font-black text-white"
                      >
                        Book Now
                      </Link>

                      <button
                        onClick={() => toggleFavorite(item)}
                        className="rounded-2xl bg-red-500 px-4 text-white"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Favorites Yet"
              message="Click the star icon on facility cards to save favorites."
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Favorites;