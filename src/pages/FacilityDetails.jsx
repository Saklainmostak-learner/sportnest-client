import { Calendar, Clock, MapPin, ShieldCheck, Users } from "lucide-react";

const FacilityDetails = () => {
  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-44 text-white sm:px-6 md:pt-48 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <img
            src="https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1400&auto=format&fit=crop"
            alt="Green Field Turf"
            className="h-[320px] w-full rounded-[36px] object-cover sm:h-[380px] md:h-[460px]"
          />

          <div className="mt-8">
            <p className="mb-3 inline-flex rounded-full bg-green-500/15 px-4 py-2 text-xs font-black uppercase text-green-400">
              Football Turf
            </p>

            <h1 className="text-4xl font-black uppercase md:text-6xl">
              Green Field Turf
            </h1>

            <p className="mt-5 max-w-3xl leading-8 text-slate-400">
              Premium football turf with professional lighting, clean surface,
              safe environment and flexible time slots.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Info icon={MapPin} label="Location" value="Bashundhara, Dhaka" />
              <Info icon={Users} label="Capacity" value="12 Players" />
              <Info icon={Clock} label="Price" value="৳1500/hr" />
              <Info icon={ShieldCheck} label="Status" value="Verified" />
            </div>
          </div>
        </div>

        <div className="h-fit rounded-[36px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl md:p-8">
          <h2 className="text-3xl font-black">Book This Facility</h2>

          <form className="mt-7 space-y-5">
            <Input
              label="Facility Name"
              name="facilityName"
              value="Green Field Turf"
              readOnly
            />

            <Input label="Booking Date" name="bookingDate" type="date" />

            <Input
              label="Time Slot"
              name="timeSlot"
              placeholder="6 PM - 8 PM"
            />

            <Input
              label="Hours"
              name="hours"
              type="number"
              placeholder="2"
            />

            <Input
              label="Total Price"
              name="totalPrice"
              value="৳3000"
              readOnly
            />

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 py-4 font-black text-white transition hover:bg-green-400"
            >
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

const Input = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  readOnly = false,
}) => (
  <label className="block">
    <span className="text-sm font-bold text-slate-300">{label}</span>

    <input
      name={name}
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      readOnly={readOnly}
      required={!readOnly}
      min={type === "number" ? 1 : undefined}
      className={`mt-2 w-full rounded-2xl border border-white/10 px-4 py-4 outline-none transition focus:border-green-400/50 ${
        readOnly
          ? "cursor-not-allowed bg-white/[0.03] text-slate-400"
          : "bg-white/5 focus:bg-white/[0.07]"
      }`}
    />
  </label>
);

export default FacilityDetails;