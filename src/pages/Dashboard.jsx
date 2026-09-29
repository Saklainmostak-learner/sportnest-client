import { useEffect, useState } from "react";
import {
  Building2,
  CalendarCheck,
  CircleDollarSign,
  Ban,
} from "lucide-react";
import toast from "react-hot-toast";

import Loading from "../components/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        setLoading(true);

        const response = await axiosSecure.get(
          "/dashboard-stats"
        );

        setStats(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardStats();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!stats) {
    return (
      <section className="min-h-screen bg-[#020806] px-4 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-slate-400">
            Dashboard data could not be loaded.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-36 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
          User Dashboard
        </p>

        <h1 className="text-4xl font-black uppercase md:text-6xl">
          Dashboard Overview
        </h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          Review your facility listings, bookings and
          booking activity in one place.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card
            icon={Building2}
            title="Total Facilities"
            value={stats.totalFacilities}
          />

          <Card
            icon={CalendarCheck}
            title="My Bookings"
            value={stats.totalBookings}
          />

          <Card
            icon={Ban}
            title="Cancelled"
            value={stats.cancelledBookings}
          />

          <Card
            icon={CircleDollarSign}
            title="Revenue"
            value={`৳${Number(stats.revenue || 0)}`}
          />
        </div>

        <div className="mt-10 rounded-[36px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-black">
            Activity Summary
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Summary
              label="Active Bookings"
              value={stats.activeBookings}
            />

            <Summary
              label="Bookings on My Facilities"
              value={stats.ownerBookings}
            />

            <Summary
              label="Facility Revenue"
              value={`৳${Number(stats.revenue || 0)}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ icon: Icon, title, value }) => (
  <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
        {title}
      </h3>

      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-500/15 text-green-400">
        <Icon />
      </div>
    </div>

    <h2 className="mt-8 text-5xl font-black text-white">
      {value}
    </h2>
  </div>
);

const Summary = ({ label, value }) => (
  <div className="rounded-3xl bg-white/5 p-6">
    <p className="text-sm text-slate-400">
      {label}
    </p>

    <h3 className="mt-3 text-3xl font-black text-green-400">
      {value}
    </h3>
  </div>
);

export default Dashboard;