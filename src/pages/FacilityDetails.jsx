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
import BackButton from "../components/BackButton";
import { normalizeFacility } from "../utils/facility";

const FacilityDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const [hours, setHours] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  useEffect(() => {
    const loadFacility = async () => {
      try {
        setLoading(true);

        const response = await axiosSecure.get(`/facilities/${id}`);

        setFacility(normalizeFacility(response.data));
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to load facility",
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
      timeSlot: selectedSlot,
      bookingTime,
      hours: Number(form.hours.value),
    };

    if (!bookingData.bookingDate) {
      toast.error("Please select a booking date");
      return;
    }

    if (!bookingData.timeSlot) {
      toast.error("Please select an available time slot");
      return;
    }

    if (!bookingData.bookingTime) {
      toast.error("Please select a preferred start time");
      return;
    }

    if (bookingData.hours < 1) {
      toast.error("Booking hours must be at least 1");
      return;
    }

    try {
      setBooking(true);

      await axiosSecure.post("/bookings", bookingData);

      toast.success("Booking confirmed successfully");

      form.reset();
      setHours(1);
      setSelectedSlot("");
      setBookingTime("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create booking",
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
      <section className="min-h-screen bg-[var(--bg)] px-4 pt-24 text-[var(--text)] md:pt-28">
        <div className="mx-auto max-w-6xl">
          <BackButton fallback="/all-facilities" label="Back to Facilities" />

          <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <p className="text-[var(--muted)]">
              No facility found.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  const availableSlots = facility.availableSlots || [];

  const totalPrice =
    Number(facility.pricePerHour || 0) *
    Number(hours || 0);

  const hasPrice = Number(facility.pricePerHour) > 0;

  return (
    <section className="min-h-screen bg-[var(--bg)] px-4 pb-12 pt-24 text-[var(--text)] sm:px-6 md:pt-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <BackButton
          fallback="/all-facilities"
          label="Back to Facilities"
        />

        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          {/* LEFT SIDE */}
          <div className="min-w-0">
            <img
              src={facility.image}
              alt={facility.name}
              className="h-[220px] w-full rounded-2xl object-cover sm:h-[280px] md:h-[330px] lg:h-[360px]"
            />

            <div className="mt-5">
              <p className="mb-2 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-green-400">
                {facility.type}
              </p>

              <h1 className="text-3xl font-black uppercase leading-tight md:text-4xl">
                {facility.name}
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)] md:text-base">
                {facility.description}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <Info
                  icon={MapPin}
                  label="Location"
                  value={facility.location}
                />

                <Info
                  icon={Users}
                  label="Capacity"
                  value={`${facility.capacity || 0} Players`}
                />

                <Info
                  icon={Clock}
                  label="Price"
                  value={
                    hasPrice
                      ? `৳${facility.pricePerHour}/hr`
                      : "Not set"
                  }
                />

                <Info
                  icon={ShieldCheck}
                  label="Slots"
                  value={`${availableSlots.length} Available`}
                />
              </div>
            </div>
          </div>

          {/* BOOKING CARD */}
          <div className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-2xl lg:sticky lg:top-24">
            <div className="mb-5">
              <h2 className="text-2xl font-black">
                Book This Facility
              </h2>

              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                Choose your date, slot, preferred start time and
                booking duration.
              </p>
            </div>

            {!hasPrice && (
              <div className="mb-4 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm leading-5 text-amber-300">
                This facility does not have a valid hourly price yet.
                Update the facility before accepting bookings.
              </div>
            )}

            <form
              onSubmit={handleBooking}
              className="space-y-3"
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
                <span className="text-sm font-bold text-[var(--text)]">
                  Available Time Slot
                </span>

                <select
                  name="timeSlot"
                  required
                  value={selectedSlot}
                  onChange={(e) =>
                    setSelectedSlot(e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-green-400/50"
                >
                  <option value="" disabled>
                    Select a time slot
                  </option>

                  {availableSlots.map((slot, index) => (
                    <option
                      key={`${slot}-${index}`}
                      value={slot}
                    >
                      {slot}
                    </option>
                  ))}
                </select>

                {availableSlots.length === 0 && (
                  <p className="mt-2 text-xs leading-5 text-red-400">
                    No time slots are available. The facility owner
                    needs to add slots first.
                  </p>
                )}
              </label>

              <label className="block">
                <span className="text-sm font-bold text-[var(--text)]">
                  Preferred Start Time
                </span>

                <input
                  type="time"
                  name="bookingTime"
                  required
                  value={bookingTime}
                  onChange={(e) =>
                    setBookingTime(e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-green-400/50"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-[var(--text)]">
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
                        Number(e.target.value) || 1,
                      ),
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-green-400/50"
                />
              </label>

              <Input
                label="Price Per Hour"
                value={
                  hasPrice
                    ? `৳${facility.pricePerHour}`
                    : "Not set"
                }
                readOnly
              />

              <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                      Total Booking Price
                    </p>

                    <h3 className="mt-1 text-3xl font-black text-green-400">
                      ৳{hasPrice ? totalPrice : 0}
                    </h3>
                  </div>

                  {hasPrice && (
                    <p className="text-right text-xs text-[var(--muted)]">
                      {hours} hour{hours > 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                  Final price is verified by the server before the
                  booking is saved.
                </p>
              </div>

              <button
                type="submit"
                disabled={
                  booking ||
                  availableSlots.length === 0 ||
                  !hasPrice
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-3.5 font-black text-white transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Calendar size={18} />

                {booking
                  ? "Booking..."
                  : "Confirm Booking"}
              </button>
            </form>
          </div>
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
  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3.5">
    <Icon
      size={19}
      className="mb-2 text-green-400"
    />

    <p className="text-xs text-[var(--muted)]">
      {label}
    </p>

    <h4 className="mt-0.5 break-words text-sm font-black text-[var(--text)]">
      {value}
    </h4>
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
    <span className="text-sm font-bold text-[var(--text)]">
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
      className={`mt-2 w-full rounded-xl border border-[var(--border)] px-4 py-3 outline-none transition ${
        readOnly
          ? "cursor-default bg-[var(--surface-soft)] text-[var(--muted)]"
          : "bg-[var(--surface-soft)] text-[var(--text)] focus:border-green-400/50"
      }`}
    />
  </label>
);

export default FacilityDetails;