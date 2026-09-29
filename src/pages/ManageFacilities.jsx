import { Edit, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
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
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-36 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <BackButton fallback="/" />
        <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
          Owner Control
        </p>

        <h1 className="text-4xl font-black uppercase md:text-6xl">
          Manage My Facilities
        </h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          Update your facility information or remove facilities you no longer
          want to list.
        </p>

        <div className="mt-10">
          {facilities.length > 0 ? (
            <div className="grid gap-5">
              {facilities.map((facility) => (
                <div
                  key={facility._id}
                  className="grid gap-4 rounded-[30px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:grid-cols-[1.5fr_1fr_1fr_1fr_auto] md:items-center"
                >
                  <div>
                    <h3 className="text-xl font-black">
                      {facility.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {facility.availableSlots?.length || 0} available slots
                    </p>
                  </div>

                  <p className="text-green-400">
                    {facility.type}
                  </p>

                  <p className="text-slate-400">
                    {facility.location}
                  </p>

                  <p className="font-black">
                    ৳ {facility.pricePerHour}/hr
                  </p>

                  <div className="flex gap-3">
                    <Link
                      to={`/update-facility/${facility._id}`}
                      className="flex items-center gap-2 rounded-2xl bg-green-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-400"
                    >
                      <Edit size={16} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        openDeleteModal(facility)
                      }
                      className="flex items-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-400"
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-[30px] border border-white/10 bg-[#07110b] p-6 shadow-2xl">
            <button
              type="button"
              onClick={closeDeleteModal}
              disabled={deleting}
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={20} />
            </button>

            <div className="pr-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-400">
                Delete Facility
              </p>

              <h2 className="mt-3 text-2xl font-black text-white">
                Are you sure?
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                You are about to delete{" "}
                <span className="font-bold text-white">
                  {selectedFacility.name}
                </span>
                . This action cannot be undone.
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleting}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-bold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 font-black text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
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