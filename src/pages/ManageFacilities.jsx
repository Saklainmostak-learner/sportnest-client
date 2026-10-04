import { Edit, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { normalizeFacilities } from "../utils/facility";

const ManageFacilities = () => {
  const axiosSecure = useAxiosSecure();

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedFacility, setSelectedFacility] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadFacilities = async () => {
    try {
      setLoading(true);

      const response = await axiosSecure.get("/my-facilities");

      setFacilities(normalizeFacilities(response.data));
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load facilities",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFacilities();
  }, []);

  const openDeleteModal = (facility) => {
    setSelectedFacility(facility);
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setSelectedFacility(null);
  };

  const handleDelete = async () => {
    if (!selectedFacility?._id) return;

    try {
      setDeleting(true);

      await axiosSecure.delete(
        `/facilities/${selectedFacility._id}`,
      );

      setFacilities((currentFacilities) =>
        currentFacilities.filter(
          (facility) =>
            facility._id !== selectedFacility._id,
        ),
      );

      toast.success("Facility deleted successfully");

      setSelectedFacility(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete facility",
      );
    } finally {
      setDeleting(false);
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
            Owner Control
          </p>

          <h1 className="text-3xl font-black uppercase leading-tight md:text-4xl">
            Manage My Facilities
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] md:text-base">
            Update your facility information or remove facilities you no longer
            want to list.
          </p>
        </div>

        <div className="mt-6">
          {facilities.length > 0 ? (
            <div className="grid gap-4">
              {facilities.map((facility) => (
                <div
                  key={facility._id}
                  className="grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.12)] md:grid-cols-[minmax(0,1.4fr)_0.8fr_1fr_0.8fr_auto] md:items-center"
                >
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-black">
                      {facility.name}
                    </h3>

                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {facility.availableSlots?.length || 0} available slots
                    </p>
                  </div>

                  <p className="text-sm font-bold text-green-400">
                    {facility.type}
                  </p>

                  <p className="truncate text-sm text-[var(--muted)]">
                    {facility.location}
                  </p>

                  <p className="text-sm font-black">
                    ৳{facility.pricePerHour}/hr
                  </p>

                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <Link
                      to={`/update-facility/${facility._id}`}
                      className="flex items-center gap-2 rounded-xl bg-green-500 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-green-400"
                    >
                      <Edit size={16} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => openDeleteModal(facility)}
                      className="flex items-center gap-2 rounded-xl bg-red-500 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-red-400"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Facilities Added"
              message="Add your first facility to manage it here."
            />
          )}
        </div>
      </div>

      {selectedFacility && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={closeDeleteModal}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeDeleteModal}
              disabled={deleting}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--muted)] transition hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={18} />
            </button>

            <div className="pr-10">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-red-400">
                Delete Facility
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Are you sure?
              </h2>

              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                You are about to delete{" "}
                <span className="font-bold text-[var(--text)]">
                  {selectedFacility.name}
                </span>
                . This action cannot be undone.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleting}
                className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 font-bold text-[var(--text)] transition hover:bg-green-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-black text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 size={17} />

                {deleting
                  ? "Deleting..."
                  : "Delete Facility"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageFacilities;