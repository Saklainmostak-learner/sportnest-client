import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";

const FacilityDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [hours, setHours] = useState(1);

  useEffect(() => {
    const loadFacility = async () => {
      try {
        setLoading(true);

        const response = await axiosSecure.get(
          `/facilities/${id}`
        );

        setFacility(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to load facility"
        );
      } finally {
        setLoading(false);
      }
    };

    loadFacility();
  }, [id, axiosSecure]);

  const handleBooking = async (e) => {
    e.preventDefault();

    const form = e.target;

    const bookingData = {
      facilityId: facility._id,
      bookingDate: form.bookingDate.value,
      timeSlot: form.timeSlot.value,
      hours: Number(form.hours.value),
    };

    if (!bookingData.bookingDate) {
      toast.error("Please select a booking date");
      return;
    }

    if (!bookingData.timeSlot) {
      toast.error("Please select a time slot");
      return;
    }

    if (bookingData.hours < 1) {
      toast.error("Booking hours must be at least 1");
      return;
    }

    try {
      setBooking(true);

      await axiosSecure.post(
        "/bookings",
        bookingData
      );

      toast.success(
        "Booking confirmed successfully"
      );

      form.reset();
      setHours(1);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create booking"
      );
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!facility) {
    return (
      <p className="pt-40 text-center text-white">
        No facility found
      </p>
    );
  }

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const availableSlots = Array.isArray(
    facility.availableSlots
  )
    ? facility.availableSlots
    : [];

  const totalPrice =
    Number(facility.pricePerHour || 0) *
    Number(hours || 0);

  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-44 text-white sm:px-6 md:pt-48 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT SIDE */}
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
              <Info
                icon={MapPin}
                label="Location"
                value={facility.location}
              />

              <Info
                icon={Users}
                label="Capacity"
                value={`${facility.capacity} Players`}
              />

              <Info
                icon={Clock}
                label="Price"
                value={`৳${facility.pricePerHour}/hr`}
              />

              <Info
                icon={ShieldCheck}
                label="Status"
                value="Verified"
              />
            </div>
          </div>
        </div>

        {/* BOOKING CARD */}
        <div className="h-fit rounded-[36px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl md:p-8">
          <h2 className="text-3xl font-black">
            Book This Facility
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Select your preferred date, time slot and
            booking duration.
          </p>

          <form
            onSubmit={handleBooking}
            className="mt-7 space-y-5"
          >
            <Input
              label="Facility Name"
              value={facility.name}
              readOnly
            />

            <Input
              label="Booking Date"
              name="bookingDate"
              type="date"
              min={today}
            />

            <label className="block">
              <span className="text-sm font-bold text-slate-300">
                Time Slot
              </span>

              <select
                name="timeSlot"
                required
                defaultValue=""
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-slate-300 outline-none transition focus:border-green-400/50"
              >
                <option value="" disabled>
                  Select a time slot
                </option>

                {availableSlots.map(
                  (slot, index) => (
                    <option
                      key={`${slot}-${index}`}
                      value={slot}
                    >
                      {slot}
                    </option>
                  )
                )}
              </select>

              {availableSlots.length === 0 && (
                <p className="mt-2 text-xs text-red-400">
                  No time slots are currently
                  available.
                </p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-bold text-slate-300">
                Hours
              </span>

              <input
                name="hours"
                type="number"
                min="1"
                required
                value={hours}
                onChange={(e) =>
                  setHours(
                    Math.max(
                      1,
                      Number(e.target.value)
                    )
                  )
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-green-400/50"
              />
            </label>

            <Input
              label="Price Per Hour"
              value={`৳${facility.pricePerHour}`}
              readOnly
            />

            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
              <p className="text-sm text-slate-300">
                Total Booking Price
              </p>

              <h3 className="mt-2 text-4xl font-black text-green-400">
                ৳{totalPrice}
              </h3>

              <p className="mt-2 text-xs text-slate-400">
                Final price will be verified by the
                server before booking.
              </p>
            </div>

            <button
              type="submit"
              disabled={
                booking ||
                availableSlots.length === 0
              }
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 py-4 font-black text-white transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Calendar size={20} />

              {booking
                ? "Booking..."
                : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Info = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <Icon className="mb-3 text-green-400" />

    <p className="text-sm text-slate-400">
      {label}
    </p>

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
  min,
}) => (
  <label className="block">
    <span className="text-sm font-bold text-slate-300">
      {label}
    </span>

    <input
      name={name}
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      readOnly={readOnly}
      required={!readOnly}
      min={min}
      className={`mt-2 w-full rounded-2xl border border-white/10 px-4 py-4 outline-none transition ${
        readOnly
          ? "bg-white/[0.03] text-slate-400"
          : "bg-white/5 focus:border-green-400/50"
      }`}
    />
  </label>
);

export default FacilityDetails;