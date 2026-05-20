import { PlusCircle } from "lucide-react";

const fields = [
  "Facility Name",
  "Facility Type",
  "Image URL",
  "Location",
  "Price Per Hour",
  "Capacity",
  "Available Time Slots",
  "Owner Email",
];

const AddFacility = () => {
  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-36 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
          Owner Dashboard
        </p>

        <h1 className="text-4xl font-black uppercase md:text-6xl">
          Add New Facility
        </h1>

        <form className="mt-10 grid gap-5 rounded-[36px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl md:grid-cols-2 md:p-8">
          {fields.map((field) => (
            <label key={field}>
              <span className="text-sm font-bold text-slate-300">{field}</span>
              <input
                placeholder={field}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none"
              />
            </label>
          ))}

          <label className="md:col-span-2">
            <span className="text-sm font-bold text-slate-300">Description</span>
            <textarea
              rows="5"
              placeholder="Write facility description..."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none"
            />
          </label>

          <button className="flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-7 py-4 font-black text-white transition hover:bg-green-400 md:col-span-2">
            <PlusCircle size={20} /> Add Facility
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddFacility;