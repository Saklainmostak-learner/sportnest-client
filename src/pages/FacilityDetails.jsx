import { useContext, useEffect, useState } from "react";
import { Calendar, Clock, MapPin, ShieldCheck, Users } from "lucide-react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";

const FacilityDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hours, setHours] = useState(1);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/facilities/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFacility(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = (e) => {
    e.preventDefault();

    const form = e.target;
    const hours = Number(form.hours.value);

    const booking = {
      facilityId: facility._id,
      facilityName: facility.name,
      facilityType: facility.type,
      facilityImage: facility.image,
      location: facility.location,
      userEmail: user?.email,
      bookingDate: form.bookingDate.value,
      timeSlot: form.timeSlot.value,
      hours,
      totalPrice: Number(facility.price) * hours,
    };

    axiosSecure
      .post("/bookings", booking)
      .then(() => {
        toast.success("Booking confirmed successfully");
        form.reset();
      })
      .catch((error) => toast.error(error.message));
  };

  if (loading) return <Loading />;
  if (!facility)
    return <p className="pt-40 text-center text-white">No facility found</p>;

  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-44 text-white sm:px-6 md:pt-48 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <img
            src={facility.image}
            alt={facility.name}
            className="h-[320px] w-full rounded-[36px] object-cover sm:h-[380px] md:h-[460px]"
          />

          <div className="mt-8">
            <p className="mb-3 inline-flex rounded-full bg-green-500/15 px-4 py-2 text-xs font-black uppercase text-green-400">
              {facility.type}
            </p>

            <h1 className="text-4xl font-black uppercase md:text-6xl">
              {facility.name}
            </h1>

            <p className="mt-5 max-w-3xl leading-8 text-slate-400">
              {facility.description}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Info icon={MapPin} label="Location" value={facility.location} />
              <Info icon={Users} label="Capacity" value={facility.capacity} />
              <Info
                icon={Clock}
                label="Price"
                value={`৳${facility.price}/hr`}
              />
              <Info icon={ShieldCheck} label="Status" value="Verified" />
            </div>
          </div>
        </div>

        <div className="h-fit rounded-[36px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl md:p-8">
          <h2 className="text-3xl font-black">Book This Facility</h2>

          <form onSubmit={handleBooking} className="mt-7 space-y-5">
            <Input label="Facility Name" value={facility.name} readOnly />
            <Input label="Booking Date" name="bookingDate" type="date" />
            <label className="block">
              <span className="text-sm font-bold text-slate-300">
                Time Slot
              </span>

              <select
                name="timeSlot"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none"
              >
                {facility.slots.split(",").map((slot, index) => (
                  <option key={index} value={slot.trim()}>
                    {slot.trim()}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-bold text-slate-300">Hours</span>

              <input
                name="hours"
                type="number"
                min="1"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none"
              />
            </label>
            <Input
              label="Price Per Hour"
              value={`৳${facility.price}`}
              readOnly
            />
            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
              <p className="text-sm text-slate-300">Total Booking Price</p>

              <h3 className="mt-2 text-4xl font-black text-green-400">
                ৳{Number(facility.price) * hours}
              </h3>
            </div>

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
      className={`mt-2 w-full rounded-2xl border border-white/10 px-4 py-4 outline-none ${
        readOnly ? "bg-white/[0.03] text-slate-400" : "bg-white/5"
      }`}
    />
  </label>
);

export default FacilityDetails;
