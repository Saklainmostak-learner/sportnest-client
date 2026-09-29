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
    placeholder: "৳",
  },
  {
    label: "Capacity",
    name: "capacity",
    type: "number",
    placeholder: "Number of Players",
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
          "Failed to add facility"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-36 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <BackButton fallback="/" />
        <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-green-400">
          Owner Dashboard
        </p>

        <h1 className="text-4xl font-black uppercase md:text-6xl">
          Add New Facility
        </h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          Add your sports venue with pricing, capacity, available slots and
          booking details.
        </p>

        <form
          onSubmit={handleAddFacility}
          className="mt-10 grid gap-5 rounded-[36px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl md:grid-cols-2 md:p-8"
        >
          <label>
            <span className="text-sm font-bold text-slate-300">
              Owner Email
            </span>

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="mt-2 w-full cursor-not-allowed rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-slate-400 outline-none"
            />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-300">
              Facility Type
            </span>

            <select
              name="type"
              required
              defaultValue=""
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-slate-300 outline-none transition focus:border-green-400/50"
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
            <label key={field.name}>
              <span className="text-sm font-bold text-slate-300">
                {field.label}
              </span>

              <input
                name={field.name}
                type={field.type}
                required
                min={field.type === "number" ? 1 : undefined}
                placeholder={field.placeholder}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-green-400/50 focus:bg-white/[0.07]"
              />
            </label>
          ))}

          <label className="md:col-span-2">
            <span className="text-sm font-bold text-slate-300">
              Description
            </span>

            <textarea
              name="description"
              required
              rows="5"
              placeholder="Write facility description..."
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-green-400/50 focus:bg-white/[0.07]"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-7 py-4 font-black text-white transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          >
            <PlusCircle size={20} />

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