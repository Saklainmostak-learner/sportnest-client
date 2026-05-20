import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const FinalArenaCTA = () => {
  return (
    <section className="relative overflow-hidden bg-[#020806] px-4 py-20 md:py-28 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.18),transparent_35%)]" />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-[#020806] via-transparent to-[#020806]" />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] border border-green-400/20 bg-white/[0.04] p-8 backdrop-blur-2xl md:p-16">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-green-500/20 blur-[110px]" />

        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-green-400">
              Ready To Play?
            </p>

            <h2 className="text-4xl font-black uppercase leading-tight md:text-6xl">
              Enter The Arena.
              <span className="block text-green-400">Own Your Game.</span>
            </h2>

            <p className="mt-6 max-w-2xl leading-8 text-slate-300">
              Explore verified facilities, compare available slots and book your
              next sports session in minutes.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/facilities"
                className="flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-7 py-4 font-black text-white transition hover:bg-green-400"
              >
                Explore Facilities <ArrowRight size={20} />
              </Link>
              <Link
                to="/add-facility"
                className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-black text-white transition hover:border-green-400/40 hover:bg-green-500/10"
              >
                Add Your Facility
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
              <ShieldCheck className="mb-5 text-green-400" size={42} />
              <h3 className="text-2xl font-black">Verified Venues</h3>
              <p className="mt-3 text-slate-400">
                Every facility can be listed with details, pricing, capacity and
                available slots.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
              <Zap className="mb-5 text-green-400" size={42} />
              <h3 className="text-2xl font-black">Fast Booking Flow</h3>
              <p className="mt-3 text-slate-400">
                Users can quickly choose date, time slot and confirm booking
                from the details page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalArenaCTA;
