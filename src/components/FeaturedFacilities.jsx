import { Link } from "react-router-dom";
import FacilityCard from "./FacilityCard";

const facilities = [
  {
    id: 1,
    name: "Green Field Turf",
    type: "Football",
    location: "Bashundhara, Dhaka",
    capacity: "12 Players",
    slots: "6 Slots",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Aqua Swim Arena",
    type: "Swimming",
    location: "Mirpur, Dhaka",
    capacity: "20 Swimmers",
    slots: "4 Slots",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Smash Zone Court",
    type: "Badminton",
    location: "Dhanmondi, Dhaka",
    capacity: "4 Players",
    slots: "8 Slots",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Tennis World Court",
    type: "Tennis",
    location: "Gulshan, Dhaka",
    capacity: "4 Players",
    slots: "5 Slots",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Futsal Prime Arena",
    type: "Futsal",
    location: "Uttara, Dhaka",
    capacity: "10 Players",
    slots: "7 Slots",
    price: 1300,
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Cricket Net Zone",
    type: "Cricket",
    location: "Khilgaon, Dhaka",
    capacity: "8 Players",
    slots: "9 Slots",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop",
  },
];

const FeaturedFacilities = () => {
  return (
    <section className="relative overflow-hidden bg-[#020806] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-green-500/10 blur-[100px]" />
      <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-green-400/30 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
              Popular Choices
            </p>

            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Featured Facilities
            </h2>

            <p className="mt-4 max-w-2xl text-slate-400">
              Handpicked premium sports venues for your next match, practice, or
              weekend game.
            </p>
          </div>

          <Link
            to="/facilities"
            className="flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-green-400/50 hover:bg-green-500/10"
          >
            View All Facilities
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {facilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFacilities;
