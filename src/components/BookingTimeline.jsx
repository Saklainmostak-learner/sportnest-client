import { Search, CalendarCheck, Trophy, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Your Arena",
    desc: "Search nearby facilities by sport, location, price and availability.",
    icon: Search,
  },
  {
    number: "02",
    title: "Lock Your Time Slot",
    desc: "Pick your preferred date, choose a slot and confirm the booking.",
    icon: CalendarCheck,
  },
  {
    number: "03",
    title: "Step In & Play",
    desc: "Arrive at the venue, check in and enjoy your game without hassle.",
    icon: Trophy,
  },
];

const BookingTimeline = () => {
  return (
    <section className="relative overflow-hidden bg-[#020806] px-4 py-20 md:py-28 text-white sm:px-6 lg:px-8">
      <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-green-400">
            Booking Experience
          </p>

          <h2 className="text-4xl font-black uppercase leading-tight md:text-6xl">
            From Search To Matchday
          </h2>

          <p className="mt-5 text-slate-400">
            A smooth booking journey designed for players, teams and facility owners.
          </p>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-3">
          <div className="absolute left-0 top-1/2 hidden h-[2px] w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-green-400/40 to-transparent lg:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-[32px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-2xl transition hover:-translate-y-2 hover:border-green-400/40 hover:bg-green-500/10"
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="text-7xl font-black text-white/10">
                    {step.number}
                  </span>

                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.35)]">
                    <Icon size={32} />
                  </div>
                </div>

                <h3 className="text-2xl font-black">{step.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{step.desc}</p>

                <button className="mt-8 flex items-center gap-2 text-sm font-black text-green-400">
                  Learn More <ArrowRight size={17} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BookingTimeline;