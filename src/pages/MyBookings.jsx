import { CalendarCheck, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import BackButton from "../components/BackButton";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const loadBookings = async () => {
    try {
      setLoading(true);

      const response = await axiosSecure.get("/bookings");

      setBookings(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      setCancellingId(id);

      await axiosSecure.patch(`/bookings/${id}/cancel`);

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking._id === id
            ? {
                ...booking,
                status: "cancelled",
              }
            : booking
        )
      );

      toast.success("Booking cancelled successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to cancel booking"
      );
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-36 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <BackButton fallback="/" />
        <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
          Booking Dashboard
        </p>

        <h1 className="text-4xl font-black uppercase md:text-6xl">
          My Bookings
        </h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          View your facility reservations and cancel any active booking when
          needed.
        </p>

        <div className="mt-10">
          {bookings.length > 0 ? (
            <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
              {bookings.map((booking) => {
                const isCancelled = booking.status === "cancelled";
                const isCancelling = cancellingId === booking._id;

                return (
                  <div
                    key={booking._id}
                    className="grid gap-4 border-b border-white/10 p-5 last:border-b-0 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto_auto] md:items-center"
                  >
                    <div className="flex items-center gap-3">
                      <CalendarCheck className="text-green-400" />

                      <div>
                        <h3 className="font-black">
                          {booking.facilityName}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {booking.hours} hour
                          {Number(booking.hours) > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-400">
                      {booking.bookingDate}
                    </p>

                    <p className="text-slate-400">
                      {booking.timeSlot}
                      {booking.bookingTime ? ` • ${booking.bookingTime}` : ""}
                    </p>

                    <p className="font-black text-green-400">
                      ৳ {booking.totalPrice}
                    </p>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-black uppercase ${
                        booking.status === "cancelled"
                          ? "bg-red-500/15 text-red-400"
                          : booking.status === "confirmed"
                          ? "bg-green-500/15 text-green-400"
                          : "bg-yellow-500/15 text-yellow-400"
                      }`}
                    >
                      {booking.status}
                    </span>

                    <button
                      type="button"
                      disabled={isCancelled || isCancelling}
                      onClick={() => handleCancel(booking._id)}
                      className="flex w-fit items-center gap-2 rounded-2xl bg-red-500/15 px-4 py-3 font-bold text-red-400 transition hover:bg-red-500/25 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <XCircle size={18} />

                      {isCancelling
                        ? "Cancelling..."
                        : isCancelled
                        ? "Cancelled"
                        : "Cancel"}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No Bookings Yet"
              message="Book a facility first. Your bookings will appear here."
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default MyBookings;