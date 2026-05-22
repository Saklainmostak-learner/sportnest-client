import { Edit, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageFacilities = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFacilities = () => {
    if (!user?.email) return;

    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/facilities`)
      .then((res) => res.json())
      .then((data) => {
        const ownFacilities = data.filter(
          (facility) => facility.ownerEmail === user.email,
        );

        setFacilities(ownFacilities);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadFacilities();
  }, [user?.email]);

  const handleDelete = (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this facility?",
    );

    if (!confirmDelete) return;

    axiosSecure
      .delete(`/facilities/${id}`)
      .then(() => {
        toast.success("Facility deleted");
        loadFacilities();
      })
      .catch((error) => toast.error(error.message));
  };

  if (loading) return <Loading />;

  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-36 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
          Owner Control
        </p>

        <h1 className="text-4xl font-black uppercase md:text-6xl">
          Manage My Facilities
        </h1>

        <div className="mt-10">
          {facilities.length > 0 ? (
            <div className="grid gap-5">
              {facilities.map((facility) => (
                <div
                  key={facility._id}
                  className="grid gap-4 rounded-[30px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:grid-cols-[1.5fr_1fr_1fr_1fr_auto] md:items-center"
                >
                  <h3 className="text-xl font-black">{facility.name}</h3>
                  <p className="text-green-400">{facility.type}</p>
                  <p className="text-slate-400">{facility.location}</p>
                  <p className="font-black">৳ {facility.price}/hr</p>

                  <div className="flex gap-3">
                    <Link
                      to={`/update-facility/${facility._id}`}
                      className="flex items-center gap-2 rounded-2xl bg-green-500 px-4 py-3 text-sm font-bold text-white hover:bg-green-400"
                    >
                      <Edit size={16} />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(facility._id)}
                      className="flex items-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-bold text-white hover:bg-red-400"
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
    </section>
  );
};

export default ManageFacilities;
