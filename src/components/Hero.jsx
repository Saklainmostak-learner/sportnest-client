import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Headphones,
  MapPin,
  ShieldCheck,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { IoIosFootball, IoIosTennisball } from "react-icons/io";
import { PiPersonSimpleSwimFill } from "react-icons/pi";
import { GiShuttlecock } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";

import footballBg from "../assets/football-hero.png";
import swimmingBg from "../assets/swimming-hero.png";
import tennisBg from "../assets/tennis-hero.png";
import badmintonBg from "../assets/badminton-hero.png";

const sports = [
  {
    name: "Football Turf",
    short: "Football",
    title: "Play. Book.",
    highlight: "Dominate.",
    desc: "Find premium football turfs near you and book your perfect match slot instantly.",
    image: footballBg,
    color: "green",
    icon: IoIosFootball,
    venues: "12 Venues",
    glow: "rgba(34,197,94,0.45)",
    button: "bg-green-500 hover:bg-green-400",
    text: "text-green-400",
    border: "border-green-400/50",
  },
  {
    name: "Swimming Pool",
    short: "Swimming",
    title: "Dive Into",
    highlight: "Excellence.",
    desc: "Reserve clean swimming lanes with flexible timing and verified facilities.",
    image: swimmingBg,
    color: "sky",
    icon: PiPersonSimpleSwimFill,
    venues: "04 Venues",
    glow: "rgba(14,165,233,0.45)",
    button: "bg-sky-500 hover:bg-sky-400",
    text: "text-sky-400",
    border: "border-sky-400/50",
  },
  {
    name: "Tennis Court",
    short: "Tennis",
    title: "Serve Your",
    highlight: "Next Win.",
    desc: "Explore tennis courts with quality surfaces, lights, and quick booking.",
    image: tennisBg,
    color: "lime",
    icon: IoIosTennisball,
    venues: "06 Venues",
    glow: "rgba(132,204,22,0.45)",
    button: "bg-lime-500 hover:bg-lime-400",
    text: "text-lime-400",
    border: "border-lime-400/50",
  },
  {
    name: "Badminton Court",
    short: "Badminton",
    title: "Smash The",
    highlight: "Perfect Game.",
    desc: "Book indoor badminton courts with smooth flooring and bright lighting.",
    image: badmintonBg,
    color: "yellow",
    icon: GiShuttlecock,
    venues: "08 Venues",
    glow: "rgba(250,204,21,0.42)",
    button: "bg-yellow-500 hover:bg-yellow-400 text-slate-950",
    text: "text-yellow-400",
    border: "border-yellow-400/50",
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);

  const current = sports[active];
  const CurrentIcon = current.icon;

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % sports.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const benefits = [
    { title: "Verified Venues", desc: "100% Trusted", icon: ShieldCheck },
    { title: "Instant Booking", desc: "Quick & Easy", icon: Zap },
    { title: "Easy Cancellation", desc: "Hassle Free", icon: CalendarCheck },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020806] text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.name}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${current.image})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-[#020806] via-[#020806]/80 to-[#020806]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020806] via-transparent to-[#020806]/50" />

      <motion.div
        key={`glow-${current.name}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute right-[8%] top-[20%] h-[420px] w-[420px] rounded-full blur-[110px]"
        style={{ background: current.glow }}
      />

      <div className="energy-line energy-line-1" />
      <div className="energy-line energy-line-2" />
      <div className="energy-line energy-line-3" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-8 pt-28 sm:px-6 md:pt-32 lg:px-8 xl:pt-36">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            key={`text-${current.name}`}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div
              className={`mb-5 inline-flex items-center gap-2 rounded-full border ${current.border} bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] ${current.text} backdrop-blur-md sm:text-xs`}
            >
              <CurrentIcon size={16} />
              {current.name}
            </div>

            <h1 className="max-w-3xl text-4xl font-black uppercase leading-[1] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl">
              {current.title}
              <span
                className={`block ${current.text} drop-shadow-[0_0_24px_currentColor]`}
              >
                {current.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300 sm:text-base md:text-lg">
              {current.desc}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {benefits.map((item) => (
                <MiniFeature
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  sub={item.desc}
                  color={current.text}
                />
              ))}
            </div>

            <div
              className={`mt-6 flex max-w-3xl flex-col overflow-hidden rounded-2xl border ${current.border} bg-white/95 shadow-[0_0_20px_rgba(34,197,94,0.14)] md:flex-row`}
            >
              <div className="flex items-center gap-3 px-5 py-4 text-slate-700 md:flex-1">
                <MapPin size={20} />
                <input
                  type="text"
                  placeholder="Search location..."
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              <div className="flex items-center gap-3 border-y border-slate-200 px-5 py-4 text-slate-700 md:flex-1 md:border-x md:border-y-0">
                <CurrentIcon size={20} />
                <select className="w-full bg-transparent text-sm font-semibold outline-none">
                  <option>All Sports</option>
                  {sports.map((sport) => (
                    <option key={sport.name}>{sport.short}</option>
                  ))}
                </select>
              </div>

              <button
                className={`flex items-center justify-center gap-2 px-7 py-4 text-sm font-black text-white transition ${current.button}`}
              >
                Explore Facilities <ArrowRight size={18} />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 lg:hidden">
              {sports.map((sport, index) => {
                const Icon = sport.icon;
                const isActive = active === index;

                return (
                  <button
                    key={sport.name}
                    onClick={() => setActive(index)}
                    className={`flex items-center gap-3 rounded-2xl border p-3 text-left backdrop-blur-xl transition ${
                      isActive
                        ? `${current.border} bg-white/15`
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <Icon
                      className={isActive ? current.text : "text-slate-400"}
                      size={24}
                    />

                    <div>
                      <p className="text-sm font-bold text-white">
                        {sport.short}
                      </p>

                      <p className="text-xs text-slate-400">{sport.venues}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <div className="hidden lg:flex lg:justify-end">
            <div className="relative h-[430px] w-[390px] xl:h-[470px] xl:w-[430px]">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-10 rounded-full border border-white/10" />

              <div className="orbit-ring">
                {sports.map((sport, index) => {
                  const Icon = sport.icon;
                  const isActive = active === index;

                  return (
                    <button
                      key={sport.name}
                      onClick={() => setActive(index)}
                      className={`orbit-card orbit-card-${index} ${
                        isActive
                          ? `${current.border} bg-white/20 scale-105`
                          : "border-white/10 bg-white/10 hover:bg-white/15"
                      }`}
                    >
                      <Icon
                        className={isActive ? current.text : "text-slate-300"}
                        size={30}
                      />

                      <div>
                        <h3 className="font-bold text-white">{sport.short}</h3>
                        <p className={isActive ? current.text : "text-slate-400"}>
                          {sport.venues}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div
                className={`absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border ${current.border} bg-white/10 shadow-[0_0_35px_rgba(34,197,94,0.25)] backdrop-blur-xl xl:h-40 xl:w-40`}
              >
                <div className="text-center">
                  <CurrentIcon className={`mx-auto ${current.text}`} size={46} />
                  <p className="mt-2 text-sm font-bold">{current.short}</p>
                  <p className="text-xs text-slate-300">{current.venues}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 lg:p-5">
          <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-3">
            <div className="flex -space-x-3">
              {[12, 13, 14, 15].map((img) => (
                <img
                  key={img}
                  src={`https://i.pravatar.cc/100?img=${img}`}
                  alt="player"
                  className="h-10 w-10 rounded-full border-2 border-slate-900"
                />
              ))}
            </div>

            <div>
              <h3 className="text-xl font-black">10K+</h3>
              <p className="text-xs text-slate-400">Happy Players</p>
            </div>
          </div>

          <Stat
            icon={Trophy}
            value="500+"
            label="Top Facilities"
            color={current.text}
          />
          <Stat
            icon={Star}
            value="4.8"
            label="User Ratings"
            color="text-yellow-400"
          />
          <Stat
            icon={Headphones}
            value="24/7"
            label="Support"
            color={current.text}
          />
        </div>

        <div className="mt-6 flex justify-center gap-3">
          {sports.map((sport, index) => (
            <button
              key={sport.name}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === index ? `w-10 ${current.button}` : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const MiniFeature = ({ icon: Icon, title, sub, color }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
    <Icon className={color} size={28} />

    <div>
      <h4 className="text-xs font-bold md:text-sm">{title}</h4>
      <p className="text-[11px] text-slate-400 md:text-xs">{sub}</p>
    </div>
  </div>
);

const Stat = ({ icon: Icon, value, label, color }) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-3 lg:justify-center">
      <Icon className={color} size={34} />

      <div>
        <h3 className="text-xl font-black">{value}</h3>
        <p className="text-xs text-slate-400">{label}</p>
      </div>
    </div>
  );
};

export default Hero;