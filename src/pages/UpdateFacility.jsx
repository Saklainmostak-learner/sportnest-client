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
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadFacility = async () => {
      try {
        setLoading(true);

        const response = await axiosSecure.get(`/facilities/${id}`);

        setFacility(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to load facility",
        );
      } finally {
        setLoading(false);
      }
    };

    loadFacility();
  }, [id, axiosSecure]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedFacility = {
      name: form.name.value.trim(),
      type: form.type.value,
      image: form.image.value.trim(),
      location: form.location.value.trim(),
      pricePerHour: Number(form.pricePerHour.value),
      capacity: Number(form.capacity.value),
      availableSlots: form.availableSlots.value
        .split(",")
        .map((slot) => slot.trim())
        .filter(Boolean),
      description: form.description.value.trim(),
    };

    if (updatedFacility.pricePerHour <= 0) {
      toast.error("Price per hour must be greater than 0");
      return;
    }

    if (updatedFacility.capacity <= 0) {
      toast.error("Capacity must be greater than 0");
      return;
    }

    if (updatedFacility.availableSlots.length === 0) {
      toast.error("Please add at least one available time slot");
      return;
    }

    try {
      setUpdating(true);

      await axiosSecure.patch(
        `/facilities/${id}`,
        updatedFacility,
      );

      toast.success("Facility updated successfully");

      navigate("/manage-facilities");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update facility",
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!facility) {
    return (
      <section className="min-h-screen bg-[#020806] px-4 pt-36 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-slate-400">
            Facility not found.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-36 text-white">
      <div className="mx-auto max-w-4xl rounded-[36px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8">
        <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
          Owner Control
        </p>

        <h1 className="text-4xl font-black">
          Update Facility
        </h1>

        <p className="mt-3 text-slate-400">
          Update your facility information, pricing and available time slots.
        </p>

        <form
          onSubmit={handleUpdate}
          className="mt-8 grid gap-5 md:grid-cols-2"
        >
          <Input
            label="Facility Name"
            name="name"
            defaultValue={facility.name}
          />

          <Input
            label="Image URL"
            name="image"
            type="url"
            defaultValue={facility.image}
          />

          <Input
            label="Location"
            name="location"
            defaultValue={facility.location}
          />

          <Input
            label="Price Per Hour"
            name="pricePerHour"
            type="number"
            min="1"
            defaultValue={facility.pricePerHour}
          />

          <Input
            label="Capacity"
            name="capacity"
            type="number"
            min="1"
            defaultValue={facility.capacity}
          />

          <Input
            label="Available Time Slots"
            name="availableSlots"
            defaultValue={
              Array.isArray(facility.availableSlots)
                ? facility.availableSlots.join(", ")
                : ""
            }
          />

          <label>
            <span className="text-sm font-bold text-slate-300">
              Facility Type
            </span>

            <select
              name="type"
              required
              defaultValue={facility.type}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-slate-300 outline-none transition focus:border-green-400/50"
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
              required
              defaultValue={facility.description}
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-green-400/50 focus:bg-white/[0.07]"
            />
          </label>

          <button
            type="submit"
            disabled={updating}
            className="rounded-2xl bg-green-500 py-4 font-black text-white transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          >
            {updating
              ? "Updating..."
              : "Update Facility"}
          </button>
        </form>
      </div>
    </section>
  );
};

const Input = ({
  label,
  name,
  defaultValue,
  type = "text",
  min,
}) => (
  <label>
    <span className="text-sm font-bold text-slate-300">
      {label}
    </span>

    <input
      name={name}
      type={type}
      min={min}
      defaultValue={defaultValue}
      required
      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-green-400/50 focus:bg-white/[0.07]"
    />
  </label>
);

export default UpdateFacility;