import { CalendarCheck, XCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = () => {
    if (!user?.email) return;

    setLoading(true);

    axiosSecure
      .get(`/bookings?email=${user.email}`)
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadBookings();
  }, [user?.email]);

  const handleCancel = (id) => {
    axiosSecure
      .patch(`/bookings/${id}/cancel`)
      .then(() => {
        toast.success("Booking cancelled");
        loadBookings();
      })
      .catch((error) => toast.error(error.message));
  };

  if (loading) return <Loading />;

  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-36 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
          Booking Dashboard
        </p>

        <h1 className="text-4xl font-black uppercase md:text-6xl">
          My Bookings
        </h1>

        <div className="mt-10">
          {bookings.length > 0 ? (
            <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="grid gap-4 border-b border-white/10 p-5 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto_auto] md:items-center"
                >
                  <div className="flex items-center gap-3">
                    <CalendarCheck className="text-green-400" />
                    <h3 className="font-black">{booking.facilityName}</h3>
                  </div>

                  <p className="text-slate-400">{booking.bookingDate}</p>
                  <p className="text-slate-400">{booking.timeSlot}</p>
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
                    disabled={booking.status === "cancelled"}
                    onClick={() => handleCancel(booking._id)}
                    className="flex w-fit items-center gap-2 rounded-2xl bg-red-500/15 px-4 py-3 font-bold text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <XCircle size={18} /> Cancel
                  </button>
                </div>
              ))}
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