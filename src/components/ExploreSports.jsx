import { Link } from "react-router-dom";
import { IoIosFootball, IoIosTennisball } from "react-icons/io";
import { PiPersonSimpleSwimFill } from "react-icons/pi";
import {
  GiShuttlecock,
  GiCricketBat,
  GiWeightLiftingUp,
} from "react-icons/gi";

const sports = [
  {
    name: "Football",
    label: "Football",
    venues: "12 Venues",
    icon: IoIosFootball,
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Swimming",
    label: "Swimming",
    venues: "04 Venues",
    icon: PiPersonSimpleSwimFill,
    image:
      "https://images.unsplash.com/photo-1560090995-01632a28895b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Badminton",
    label: "Badminton",
    venues: "08 Venues",
    icon: GiShuttlecock,
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Tennis",
    label: "Tennis",
    venues: "06 Venues",
    icon: IoIosTennisball,
    image:
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Cricket",
    label: "Cricket",
    venues: "09 Venues",
    icon: GiCricketBat,
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Gym",
    label: "Gym Zone",
    venues: "15 Venues",
    icon: GiWeightLiftingUp,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
  },
];

const ExploreSports = () => {
  return (
    <section className="bg-[var(--bg)] px-4 py-14 text-[var(--text)] sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="mb-3 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-green-400">
            Choose Your Arena
          </p>

          <h2 className="text-3xl font-black md:text-4xl">
            Explore Sports Categories
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] md:text-base">
            Pick a sport and discover venues designed for your next game.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sports.map((sport) => {
            const Icon = sport.icon;

            return (
              <Link
                key={sport.name}
                to={`/all-facilities?type=${encodeURIComponent(
                  sport.name,
                )}`}
                className="group relative min-h-[210px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_12px_35px_rgba(0,0,0,0.08)]"
              >
                <img
                  src={sport.image}
                  alt={sport.label}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-black/55 transition duration-300 group-hover:bg-black/45" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                <div className="absolute inset-0 flex items-end p-5">
                  <div className="w-full">
                    <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-black/30 text-white backdrop-blur-md transition group-hover:text-green-400">
                      <Icon size={25} />
                    </div>

                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white">
                          {sport.label}
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-green-400">
                          {sport.venues}
                        </p>
                      </div>

                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                        Explore
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreSports;