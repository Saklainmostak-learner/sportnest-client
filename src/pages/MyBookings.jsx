import { CalendarCheck, Clock3, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import useAxiosSecure from "../hooks/useAxiosSecure";

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
          "Failed to load bookings",
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
            : booking,
        ),
      );

      toast.success("Booking cancelled successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to cancel booking",
      );
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="min-h-screen bg-[var(--bg)] px-4 pb-12 pt-24 text-[var(--text)] sm:px-6 md:pt-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <BackButton fallback="/" />

        <div className="mt-4">
          <p className="mb-3 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-green-400">
            Booking Dashboard
          </p>

          <h1 className="text-3xl font-black uppercase leading-tight md:text-4xl">
            My Bookings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] md:text-base">
            View your facility reservations and cancel any active booking when
            needed.
          </p>
        </div>

        <div className="mt-6">
          {bookings.length > 0 ? (
            <div className="grid gap-4">
              {bookings.map((booking) => {
                const isCancelled = booking.status === "cancelled";
                const isCancelling = cancellingId === booking._id;

                return (
                  <article
                    key={booking._id}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.12)]"
                  >
                    <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_1fr_1fr_0.7fr_auto] md:items-center">
                      <div className="min-w-0">
                        <div className="flex items-start gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-500/10 text-green-400">
                            <CalendarCheck size={19} />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-base font-black md:text-lg">
                              {booking.facilityName}
                            </h3>

                            <p className="mt-1 text-xs text-[var(--muted)]">
                              {booking.hours} hour
                              {Number(booking.hours) > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                          Date
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {booking.bookingDate}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                          Time
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-sm text-[var(--text)]">
                          <Clock3 size={15} className="text-green-400" />

                          <span>
                            {booking.timeSlot}
                            {booking.bookingTime
                              ? ` • ${booking.bookingTime}`
                              : ""}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                          Total
                        </p>

                        <p className="mt-1 font-black text-green-400">
                          ৳{booking.totalPrice}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 md:justify-end">
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
                          className="flex items-center gap-2 rounded-xl bg-red-500/10 px-3 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <XCircle size={16} />

                          {isCancelling
                            ? "Cancelling..."
                            : isCancelled
                              ? "Cancelled"
                              : "Cancel"}
                        </button>
                      </div>
                    </div>
                  </article>
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