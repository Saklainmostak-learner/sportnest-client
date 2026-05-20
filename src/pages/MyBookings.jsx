import { CalendarCheck, XCircle } from "lucide-react";

const bookings = [
  { id: 1, name: "Green Field Turf", date: "2026-06-12", slot: "6 PM - 8 PM", price: 3000, status: "pending" },
  { id: 2, name: "Aqua Swim Arena", date: "2026-06-14", slot: "9 AM - 10 AM", price: 1200, status: "confirmed" },
];

const MyBookings = () => {
  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-36 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
          Booking Dashboard
        </p>

        <h1 className="text-4xl font-black uppercase md:text-6xl">
          My Bookings
        </h1>

        <div className="mt-10 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="grid gap-4 border-b border-white/10 p-5 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto] md:items-center"
            >
              <div className="flex items-center gap-3">
                <CalendarCheck className="text-green-400" />
                <h3 className="font-black">{booking.name}</h3>
              </div>

              <p className="text-slate-400">{booking.date}</p>
              <p className="text-slate-400">{booking.slot}</p>
              <p className="font-black text-green-400">৳ {booking.price}</p>

              <button className="flex w-fit items-center gap-2 rounded-2xl bg-red-500/15 px-4 py-3 font-bold text-red-400">
                <XCircle size={18} /> Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyBookings;