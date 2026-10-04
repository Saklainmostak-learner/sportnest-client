import { useContext, useState } from "react";
import { PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
import BackButton from "../components/BackButton";

const fields = [
  {
    label: "Facility Name",
    name: "name",
    type: "text",
    placeholder: "Green Field Turf",
  },
  {
    label: "Image URL",
    name: "image",
    type: "url",
    placeholder: "https://example.com/image.jpg",
  },
  {
    label: "Location",
    name: "location",
    type: "text",
    placeholder: "Bashundhara, Dhaka",
  },
  {
    label: "Price Per Hour",
    name: "pricePerHour",
    type: "number",
    placeholder: "Enter hourly price",
  },
  {
    label: "Capacity",
    name: "capacity",
    type: "number",
    placeholder: "Number of players",
  },
  {
    label: "Available Time Slots",
    name: "availableSlots",
    type: "text",
    placeholder: "6 PM - 8 PM, 8 PM - 10 PM",
  },
];

const AddFacility = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [submitting, setSubmitting] = useState(false);

  const handleAddFacility = async (e) => {
    e.preventDefault();

    const form = e.target;

    const facility = {
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

    if (facility.pricePerHour <= 0) {
      toast.error("Price per hour must be greater than 0");
      return;
    }

    if (facility.capacity <= 0) {
      toast.error("Capacity must be greater than 0");
      return;
    }

    if (facility.availableSlots.length === 0) {
      toast.error("Please add at least one available time slot");
      return;
    }

    try {
      setSubmitting(true);

      await axiosSecure.post("/facilities", facility);

      toast.success("Facility added successfully");

      form.reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add facility",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[var(--bg)] px-4 pb-12 pt-24 text-[var(--text)] sm:px-6 md:pt-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <BackButton fallback="/" />

        <div className="mt-4">
          <p className="mb-3 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-green-400">
            Owner Dashboard
          </p>

          <h1 className="text-3xl font-black uppercase leading-tight md:text-4xl">
            Add New Facility
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] md:text-base">
            Add your sports venue with pricing, capacity, available slots and
            booking details.
          </p>
        </div>

        <form
          onSubmit={handleAddFacility}
          className="mt-6 grid gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-2xl md:grid-cols-2 md:p-6"
        >
          <label className="block">
            <span className="text-sm font-bold text-[var(--text)]">
              Owner Email
            </span>

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="mt-2 w-full cursor-not-allowed rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--muted)] outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-[var(--text)]">
              Facility Type
            </span>

            <select
              name="type"
              required
              defaultValue=""
              className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-green-400/50"
            >
              <option value="" disabled>
                Select facility type
              </option>

              <option value="Football">Football</option>
              <option value="Swimming">Swimming</option>
              <option value="Badminton">Badminton</option>
              <option value="Tennis">Tennis</option>
              <option value="Cricket">Cricket</option>
              <option value="Gym">Gym</option>
            </select>
          </label>

          {fields.map((field) => (
            <label key={field.name} className="block">
              <span className="text-sm font-bold text-[var(--text)]">
                {field.label}
              </span>

              <input
                name={field.name}
                type={field.type}
                required
                min={field.type === "number" ? 1 : undefined}
                placeholder={field.placeholder}
                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-green-400/50"
              />
            </label>
          ))}

          <label className="block md:col-span-2">
            <span className="text-sm font-bold text-[var(--text)]">
              Description
            </span>

            <textarea
              name="description"
              required
              rows="4"
              placeholder="Write facility description..."
              className="mt-2 w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-green-400/50"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 font-black text-white transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          >
            <PlusCircle size={19} />

            {submitting
              ? "Adding Facility..."
              : "Add Facility"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddFacility;