import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import { normalizeFacility } from "../utils/facility";

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

        setFacility(normalizeFacility(response.data));
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
      <section className="min-h-screen bg-[var(--bg)] px-4 pt-24 text-[var(--text)] md:pt-28">
        <div className="mx-auto max-w-5xl">
          <BackButton
            fallback="/manage-facilities"
            label="Back to Manage Facilities"
          />

          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <p className="text-[var(--muted)]">
              Facility not found.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[var(--bg)] px-4 pb-12 pt-24 text-[var(--text)] sm:px-6 md:pt-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <BackButton
          fallback="/manage-facilities"
          label="Back to Manage Facilities"
        />

        <div className="mt-4">
          <p className="mb-3 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-green-400">
            Owner Control
          </p>

          <h1 className="text-3xl font-black uppercase leading-tight md:text-4xl">
            Update Facility
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] md:text-base">
            Update your facility information, pricing and available time slots.
          </p>
        </div>

        <form
          onSubmit={handleUpdate}
          className="mt-6 grid gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-2xl md:grid-cols-2 md:p-6"
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
            placeholder="6 PM - 8 PM, 8 PM - 10 PM"
          />

          <label className="block">
            <span className="text-sm font-bold text-[var(--text)]">
              Facility Type
            </span>

            <select
              name="type"
              required
              defaultValue={facility.type}
              className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-green-400/50"
            >
              <option value="Football">Football</option>
              <option value="Swimming">Swimming</option>
              <option value="Badminton">Badminton</option>
              <option value="Tennis">Tennis</option>
              <option value="Cricket">Cricket</option>
              <option value="Gym">Gym</option>
            </select>
          </label>

          <div className="hidden md:block" />

          <label className="block md:col-span-2">
            <span className="text-sm font-bold text-[var(--text)]">
              Description
            </span>

            <textarea
              name="description"
              rows="4"
              required
              defaultValue={facility.description}
              className="mt-2 w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-green-400/50"
            />
          </label>

          <button
            type="submit"
            disabled={updating}
            className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 font-black text-white transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          >
            <Save size={19} />

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
  placeholder,
}) => (
  <label className="block">
    <span className="text-sm font-bold text-[var(--text)]">
      {label}
    </span>

    <input
      name={name}
      type={type}
      min={min}
      defaultValue={defaultValue}
      required
      placeholder={placeholder}
      className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-green-400/50"
    />
  </label>
);

export default UpdateFacility;