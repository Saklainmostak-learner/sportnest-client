import { Link } from "react-router-dom";
import { IoIosFootball, IoIosTennisball } from "react-icons/io";
import { PiPersonSimpleSwimFill } from "react-icons/pi";
import { GiShuttlecock, GiCricketBat, GiWeightLiftingUp } from "react-icons/gi";

const sports = [
  {
    name: "Football",
    venues: "12 Venues",
    icon: IoIosFootball,
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Swimming",
    venues: "04 Venues",
    icon: PiPersonSimpleSwimFill,
    image:
      "https://images.unsplash.com/photo-1560090995-01632a28895b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Badminton",
    venues: "08 Venues",
    icon: GiShuttlecock,
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Tennis",
    venues: "06 Venues",
    icon: IoIosTennisball,
    image:
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Cricket",
    venues: "09 Venues",
    icon: GiCricketBat,
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Gym Zone",
    venues: "15 Venues",
    icon: GiWeightLiftingUp,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
  },
];

const ExploreSports = () => {
  return (
    <section className="bg-[#020806] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
            Choose Your Arena
          </p>

          <h2 className="text-4xl font-black md:text-5xl">
            Explore Sports Categories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Pick a sport and discover verified venues designed for your next game.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[34px] border border-white/10 md:grid-cols-2 lg:grid-cols-3">
          {sports.map((sport) => {
            const Icon = sport.icon;

            return (
              <Link
                key={sport.name}
                to={`/facilities?type=${sport.name.toLowerCase()}`}
                className="group relative min-h-[260px] overflow-hidden border-white/10 md:border-r md:border-b"
              >
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/60 transition duration-500 group-hover:bg-black/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020806] via-transparent to-transparent" />

                <div className="absolute inset-0 grid place-items-center p-6 text-center">
                  <div>
                    <Icon className="mx-auto text-white transition duration-300 group-hover:scale-110 group-hover:text-green-400" size={76} />

                    <h3 className="mt-5 text-3xl font-black uppercase tracking-tight">
                      {sport.name}
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-green-400 opacity-0 transition duration-300 group-hover:opacity-100">
                      {sport.venues}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-green-500 transition-all duration-500 group-hover:w-full" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreSports;