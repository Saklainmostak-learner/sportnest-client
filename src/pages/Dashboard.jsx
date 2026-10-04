import { useEffect, useState } from "react";
import {
  Ban,
  Building2,
  CalendarCheck,
  CircleDollarSign,
} from "lucide-react";
import toast from "react-hot-toast";

import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        setLoading(true);

        const response = await axiosSecure.get("/dashboard-stats");

        setStats(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to load dashboard",
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardStats();
  }, [axiosSecure]);

  if (loading) {
    return <Loading />;
  }

  if (!stats) {
    return (
      <section className="min-h-screen bg-[var(--bg)] px-4 pt-24 text-[var(--text)] md:pt-28">
        <div className="mx-auto max-w-6xl">
          <BackButton fallback="/" />

          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <p className="text-[var(--muted)]">
              Dashboard data could not be loaded.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[var(--bg)] px-4 pb-12 pt-24 text-[var(--text)] sm:px-6 md:pt-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <BackButton fallback="/" />

        <div className="mt-4">
          <p className="mb-3 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-green-400">
            User Dashboard
          </p>

          <h1 className="text-3xl font-black uppercase leading-tight md:text-4xl">
            Dashboard Overview
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] md:text-base">
            Review your facility listings, bookings and booking activity in one
            place.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

        <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_16px_45px_rgba(0,0,0,0.14)] md:p-6">
          <h2 className="text-xl font-black md:text-2xl">
            Activity Summary
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
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
  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_12px_35px_rgba(0,0,0,0.1)]">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
          {title}
        </h3>

        <h2 className="mt-3 break-words text-3xl font-black text-[var(--text)] md:text-4xl">
          {value}
        </h2>
      </div>

      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-500/10 text-green-400">
        <Icon size={20} />
      </div>
    </div>
  </div>
);

const Summary = ({ label, value }) => (
  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
    <p className="text-sm text-[var(--muted)]">
      {label}
    </p>

    <h3 className="mt-2 break-words text-2xl font-black text-green-400">
      {value}
    </h3>
  </div>
);

export default Dashboard;