import { Edit, Trash2 } from "lucide-react";

const facilities = [
  { id: 1, name: "Green Field Turf", type: "Football", location: "Bashundhara", price: 1500 },
  { id: 2, name: "Smash Zone Court", type: "Badminton", location: "Dhanmondi", price: 800 },
];

const ManageFacilities = () => {
  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-36 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
          Owner Control
        </p>

        <h1 className="text-4xl font-black uppercase md:text-6xl">
          Manage My Facilities
        </h1>

        <div className="mt-10 grid gap-5">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="grid gap-4 rounded-[30px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:grid-cols-[1.5fr_1fr_1fr_1fr_auto] md:items-center"
            >
              <h3 className="text-xl font-black">{facility.name}</h3>
              <p className="text-green-400">{facility.type}</p>
              <p className="text-slate-400">{facility.location}</p>
              <p className="font-black">৳ {facility.price}/hr</p>

              <div className="flex gap-3">
                <button className="rounded-2xl bg-green-500 px-4 py-3 text-white">
                  <Edit size={18} />
                </button>
                <button className="rounded-2xl bg-red-500 px-4 py-3 text-white">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManageFacilities;