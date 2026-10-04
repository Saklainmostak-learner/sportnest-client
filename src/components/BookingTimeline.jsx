import {
  ArrowRight,
  CalendarCheck,
  Search,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Discover Your Arena",
    desc: "Search facilities by sport type and find the right venue for your next game.",
    icon: Search,
  },
  {
    number: "02",
    title: "Lock Your Time Slot",
    desc: "Choose a date, select an available time slot and confirm your booking.",
    icon: CalendarCheck,
  },
  {
    number: "03",
    title: "Step In & Play",
    desc: "Arrive at the venue and enjoy your game with a simple booking experience.",
    icon: Trophy,
  },
];

const BookingTimeline = () => {
  return (
    <section className="relative overflow-hidden bg-[var(--bg)] px-4 py-14 text-[var(--text)] sm:px-6 md:py-16 lg:px-8">
      <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-green-400">
            Booking Experience
          </p>

          <h2 className="text-3xl font-black uppercase leading-tight md:text-4xl">
            From Search To Matchday
          </h2>

          <p className="mt-3 text-sm leading-6 text-[var(--muted)] md:text-base">
            A simple booking journey for players who want to find and reserve
            sports facilities quickly.
          </p>
        </div>

        <div className="relative grid gap-4 lg:grid-cols-3">
          <div className="absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-green-400/30 to-transparent lg:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.1)] transition hover:border-green-400/30 hover:shadow-[0_16px_42px_rgba(34,197,94,0.08)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-5xl font-black text-[var(--muted)] opacity-20">
                    {step.number}
                  </span>

                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.25)]">
                    <Icon size={22} />
                  </div>
                </div>

                <h3 className="text-xl font-black">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {step.desc}
                </p>

                <Link
                  to="/all-facilities"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-black text-green-400 transition hover:text-green-300"
                >
                  Explore Facilities
                  <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BookingTimeline;