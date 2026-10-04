import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  MapPin,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { IoIosFootball, IoIosTennisball } from "react-icons/io";
import { PiPersonSimpleSwimFill } from "react-icons/pi";
import { GiShuttlecock } from "react-icons/gi";

import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

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
    desc: "Explore football turfs and book your preferred match slot in just a few steps.",
    image: footballBg,
    icon: IoIosFootball,
    venues: "Explore Turfs",
    glow: "rgba(34,197,94,0.38)",
    button: "bg-green-500 hover:bg-green-400",
    text: "text-green-400",
    border: "border-green-400/50",
  },
  {
    name: "Swimming Pool",
    short: "Swimming",
    title: "Dive Into",
    highlight: "Excellence.",
    desc: "Explore swimming facilities, check available time slots and reserve your preferred session.",
    image: swimmingBg,
    icon: PiPersonSimpleSwimFill,
    venues: "Explore Pools",
    glow: "rgba(14,165,233,0.38)",
    button: "bg-sky-500 hover:bg-sky-400",
    text: "text-sky-400",
    border: "border-sky-400/50",
  },
  {
    name: "Tennis Court",
    short: "Tennis",
    title: "Serve Your",
    highlight: "Next Win.",
    desc: "Explore tennis courts, check facility details and book your preferred time slot.",
    image: tennisBg,
    icon: IoIosTennisball,
    venues: "Explore Courts",
    glow: "rgba(132,204,22,0.38)",
    button: "bg-lime-500 hover:bg-lime-400",
    text: "text-lime-400",
    border: "border-lime-400/50",
  },
  {
    name: "Badminton Court",
    short: "Badminton",
    title: "Smash The",
    highlight: "Perfect Game.",
    desc: "Explore badminton courts and reserve an available time slot for your next game.",
    image: badmintonBg,
    icon: GiShuttlecock,
    venues: "Explore Courts",
    glow: "rgba(250,204,21,0.34)",
    button: "bg-yellow-500 hover:bg-yellow-400 text-slate-950",
    text: "text-yellow-400",
    border: "border-yellow-400/50",
  },
];

const benefits = [
  {
    title: "Facility Details",
    desc: "Clear Information",
    icon: ShieldCheck,
  },
  {
    title: "Quick Booking",
    desc: "Simple & Easy",
    icon: Zap,
  },
  {
    title: "Easy Cancellation",
    desc: "Manage Anytime",
    icon: CalendarCheck,
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchName, setSearchName] = useState("");

  const current = sports[active];
  const CurrentIcon = current.icon;

  useEffect(() => {
    if (isSearching) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % sports.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isSearching]);

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#020806] text-white lg:min-h-[680px]">
      {/* BACKGROUND */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.name}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${current.image})`,
          }}
        />
      </AnimatePresence>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      {/* DYNAMIC GLOW */}
      <motion.div
        key={`glow-${current.name}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute right-[10%] top-[18%] h-[300px] w-[300px] rounded-full blur-[100px]"
        style={{
          background: current.glow,
        }}
      />

      <div className="energy-line energy-line-1" />
      <div className="energy-line energy-line-2" />
      <div className="energy-line energy-line-3" />

      <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-4 pb-8 pt-24 sm:px-6 md:pt-28 lg:min-h-[680px] lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT */}
          <motion.div
            key={`text-${current.name}`}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div
              className={`mb-4 inline-flex items-center gap-2 rounded-full border ${current.border} bg-black/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${current.text} backdrop-blur-md sm:text-xs`}
            >
              <CurrentIcon size={15} />
              {current.name}
            </div>

            <h1 className="max-w-2xl text-4xl font-black uppercase leading-[0.98] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
              {current.title}

              <span
                className={`block ${current.text} drop-shadow-[0_0_18px_currentColor]`}
              >
                {current.highlight}
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              {current.desc}
            </p>

            {/* MINI FEATURES */}
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
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

            {/* SEARCH */}
            <div
              className={`mt-5 flex max-w-3xl flex-col overflow-hidden rounded-xl border ${current.border} bg-white shadow-[0_10px_35px_rgba(0,0,0,0.2)] md:flex-row`}
            >
              <div className="flex items-center gap-3 px-4 py-3 text-slate-700 md:flex-1">
                <MapPin size={18} className="shrink-0" />

                <input
                  type="text"
                  value={searchName}
                  onFocus={() => setIsSearching(true)}
                  onBlur={() => setIsSearching(false)}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Search facility name..."
                  className="w-full min-w-0 bg-transparent text-sm outline-none"
                />
              </div>

              <div className="flex items-center gap-3 border-y border-slate-200 px-4 py-3 text-slate-700 md:flex-1 md:border-x md:border-y-0">
                <CurrentIcon size={18} className="shrink-0" />

                <select
                  value={current.short}
                  onChange={(e) => {
                    const selectedIndex = sports.findIndex(
                      (sport) => sport.short === e.target.value,
                    );

                    if (selectedIndex !== -1) {
                      setActive(selectedIndex);
                    }
                  }}
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                >
                  {sports.map((sport) => (
                    <option
                      key={sport.name}
                      value={sport.short}
                    >
                      {sport.short}
                    </option>
                  ))}
                </select>
              </div>

              <Link
                to={`/all-facilities?type=${encodeURIComponent(
                  current.short,
                )}&search=${encodeURIComponent(searchName.trim())}`}
                className={`flex items-center justify-center gap-2 px-5 py-3 text-sm font-black text-white transition ${current.button}`}
              >
                Explore
                <ArrowRight size={17} />
              </Link>
            </div>

            {/* MOBILE SPORTS */}
            <div className="mt-4 grid grid-cols-2 gap-2 lg:hidden">
              {sports.map((sport, index) => {
                const Icon = sport.icon;
                const isActive = active === index;

                return (
                  <button
                    key={sport.name}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`flex items-center gap-2 rounded-xl border p-2.5 text-left backdrop-blur-xl transition ${
                      isActive
                        ? `${current.border} bg-white/15`
                        : "border-white/10 bg-black/20"
                    }`}
                  >
                    <Icon
                      className={
                        isActive
                          ? current.text
                          : "text-slate-400"
                      }
                      size={21}
                    />

                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-white sm:text-sm">
                        {sport.short}
                      </p>

                      <p className="truncate text-[10px] text-slate-400 sm:text-xs">
                        {sport.venues}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT ORBIT */}
          <div className="hidden lg:flex lg:justify-end">
            <div className="relative h-[350px] w-[340px] xl:h-[380px] xl:w-[370px]">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-9 rounded-full border border-white/10" />

              <div className="orbit-ring">
                {sports.map((sport, index) => {
                  const Icon = sport.icon;
                  const isActive = active === index;

                  return (
                    <button
                      key={sport.name}
                      type="button"
                      onClick={() => setActive(index)}
                      className={`orbit-card orbit-card-${index} ${
                        isActive
                          ? `${current.border} bg-white/20`
                          : "border-white/10 bg-black/25 hover:bg-white/10"
                      }`}
                    >
                      <Icon
                        className={
                          isActive
                            ? current.text
                            : "text-slate-300"
                        }
                        size={25}
                      />

                      <div>
                        <h3 className="text-sm font-bold text-white">
                          {sport.short}
                        </h3>

                        <p
                          className={`text-xs ${
                            isActive
                              ? current.text
                              : "text-slate-400"
                          }`}
                        >
                          {sport.venues}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div
                className={`absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border ${current.border} bg-black/30 shadow-[0_0_30px_rgba(34,197,94,0.2)] backdrop-blur-xl`}
              >
                <div className="text-center">
                  <CurrentIcon
                    className={`mx-auto ${current.text}`}
                    size={36}
                  />

                  <p className="mt-1 text-xs font-bold text-white">
                    {current.short}
                  </p>

                  <p className="text-[10px] text-slate-300">
                    {current.venues}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INDICATORS */}
        <div className="mt-5 flex justify-center gap-2">
          {sports.map((sport, index) => (
            <button
              key={sport.name}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${sport.short}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === index
                  ? `w-8 ${current.button}`
                  : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const MiniFeature = ({
  icon: Icon,
  title,
  sub,
  color,
}) => (
  <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/20 p-2.5 backdrop-blur-xl">
    <Icon
      className={`${color} shrink-0`}
      size={21}
    />

    <div className="min-w-0">
      <h4 className="truncate text-xs font-bold text-white">
        {title}
      </h4>

      <p className="truncate text-[10px] text-slate-400">
        {sub}
      </p>
    </div>
  </div>
);

export default Hero;