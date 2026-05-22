import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";

const UpdateFacility = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [facility, setFacility] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/facilities/${id}`)
      .then((res) => res.json())
      .then((data) => setFacility(data))
      .catch((error) => toast.error(error.message));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedFacility = {
      name: form.name.value,
      type: form.type.value,
      image: form.image.value,
      location: form.location.value,
      price: Number(form.price.value),
      capacity: form.capacity.value,
      slots: form.slots.value,
      description: form.description.value,
    };

    axiosSecure
      .patch(`/facilities/${id}`, updatedFacility)
      .then(() => {
        toast.success("Facility updated");
        navigate("/manage-facilities");
      })
      .catch((error) => toast.error(error.message));
  };

  if (!facility) return <Loading />;

  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-36 text-white">
      <div className="mx-auto max-w-4xl rounded-[36px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
        <h1 className="text-4xl font-black">Update Facility</h1>

        <form onSubmit={handleUpdate} className="mt-8 grid gap-5 md:grid-cols-2">
          <Input label="Facility Name" name="name" defaultValue={facility.name} />
          <Input label="Image URL" name="image" defaultValue={facility.image} />
          <Input label="Location" name="location" defaultValue={facility.location} />
          <Input label="Price" name="price" type="number" defaultValue={facility.price} />
          <Input label="Capacity" name="capacity" defaultValue={facility.capacity} />
          <Input label="Slots" name="slots" defaultValue={facility.slots} />

          <label>
            <span className="text-sm font-bold text-slate-300">
              Facility Type
            </span>

            <select
              name="type"
              defaultValue={facility.type}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 outline-none"
            >
              <option value="Football">Football</option>
              <option value="Swimming">Swimming</option>
              <option value="Badminton">Badminton</option>
              <option value="Tennis">Tennis</option>
              <option value="Cricket">Cricket</option>
              <option value="Gym">Gym</option>
            </select>
          </label>

          <label className="md:col-span-2">
            <span className="text-sm font-bold text-slate-300">
              Description
            </span>

            <textarea
              name="description"
              rows="5"
              defaultValue={facility.description}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none"
            />
          </label>

          <button className="rounded-2xl bg-green-500 py-4 font-black text-white md:col-span-2">
            Update Facility
          </button>
        </form>
      </div>
    </section>
  );
};

const Input = ({ label, name, defaultValue, type = "text" }) => (
  <label>
    <span className="text-sm font-bold text-slate-300">{label}</span>

    <input
      name={name}
      type={type}
      defaultValue={defaultValue}
      required
      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none"
    />
  </label>
);

export default UpdateFacility;