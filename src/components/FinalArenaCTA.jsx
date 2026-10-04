import {
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const FinalArenaCTA = () => {
  return (
    <section className="relative overflow-hidden bg-[var(--bg)] px-4 py-14 text-[var(--text)] sm:px-6 md:py-16 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.14),transparent_38%)]" />

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-green-400/20 bg-[var(--surface)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-2xl md:p-7 lg:p-8">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-green-500/15 blur-[90px]" />

        <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-green-400">
              Ready To Play?
            </p>

            <h2 className="text-3xl font-black uppercase leading-tight md:text-4xl">
              Enter The Arena.
              <span className="block text-green-400">
                Own Your Game.
              </span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] md:text-base">
              Explore sports facilities, compare available slots and book your
              next session in just a few steps.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/all-facilities"
                className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-black text-white transition hover:bg-green-400"
              >
                Explore Facilities
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/add-facility"
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-3 text-center text-sm font-black text-[var(--text)] transition hover:border-green-400/40 hover:bg-green-500/10"
              >
                Add Your Facility
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
              <ShieldCheck
                className="mb-3 text-green-400"
                size={28}
              />

              <h3 className="text-lg font-black">
                Detailed Facility Listings
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Explore facility details including sport type, location,
                pricing, capacity and available time slots.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
              <Zap
                className="mb-3 text-green-400"
                size={28}
              />

              <h3 className="text-lg font-black">
                Fast Booking Flow
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Choose a date, select an available time slot and confirm your
                booking directly from the facility details page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalArenaCTA;