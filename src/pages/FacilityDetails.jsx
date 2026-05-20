import { Calendar, Clock, MapPin, Users, ShieldCheck } from "lucide-react";

const FacilityDetails = () => {
  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-36 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <img
            src="https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1400&auto=format&fit=crop"
            alt="facility"
            className="h-[360px] w-full rounded-[36px] object-cover md:h-[460px]"
          />

          <div className="mt-8">
            <p className="mb-3 inline-flex rounded-full bg-green-500/15 px-4 py-2 text-xs font-black uppercase text-green-400">
              Football Turf
            </p>

            <h1 className="text-4xl font-black uppercase md:text-6xl">
              Green Field Turf
            </h1>

            <p className="mt-5 max-w-3xl leading-8 text-slate-400">
              Premium football turf with professional lighting, clean surface, safe environment and flexible time slots.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Info icon={MapPin} label="Location" value="Bashundhara" />
              <Info icon={Users} label="Capacity" value="12 Players" />
              <Info icon={Clock} label="Price" value="৳1500/hr" />
              <Info icon={ShieldCheck} label="Status" value="Verified" />
            </div>
          </div>
        </div>

        <div className="h-fit rounded-[36px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl md:p-8">
          <h2 className="text-3xl font-black">Book This Facility</h2>

          <form className="mt-7 space-y-5">
            <Input label="Facility Name" value="Green Field Turf" />
            <Input label="Booking Date" type="date" />
            <Input label="Time Slot" placeholder="6 PM - 8 PM" />
            <Input label="Hours" type="number" placeholder="2" />
            <Input label="Total Price" placeholder="৳3000" />

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 py-4 font-black text-white transition hover:bg-green-400">
              <Calendar size={20} /> Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Info = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <Icon className="mb-3 text-green-400" />
    <p className="text-sm text-slate-400">{label}</p>
    <h4 className="font-black">{value}</h4>
  </div>
);

const Input = ({ label, type = "text", value, placeholder }) => (
  <label className="block">
    <span className="text-sm font-bold text-slate-300">{label}</span>
    <input
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none"
    />
  </label>
);

export default FacilityDetails;