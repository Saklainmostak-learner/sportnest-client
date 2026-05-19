import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Rasel Ahmed",
    role: "Football Player",
    quote:
      "SportNest feels like a real product. I can find turfs, compare venues and book faster than calling owners one by one.",
    image: "https://i.pravatar.cc/300?img=12",
  },
  {
    name: "Nafi Islam",
    role: "Swimmer",
    quote:
      "The experience is clean and premium. Finding available swimming slots became simple and stress free.",
    image: "https://i.pravatar.cc/300?img=32",
  },
  {
    name: "Saif Rahman",
    role: "Badminton Player",
    quote:
      "I like how the platform shows venues clearly. It saves time and makes booking feel modern.",
    image: "https://i.pravatar.cc/300?img=15",
  },
];

const PlayerSpotlight = () => {
  return (
    <section className="relative overflow-hidden bg-[#04110a] px-4 py-20 md:py-28 text-white sm:px-6 lg:px-8">
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-green-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-green-400">
            Player Spotlight
          </p>

          <h2 className="text-4xl font-black uppercase md:text-6xl">
            Trusted By Players
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Real players. Real bookings. Real sports experience.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={review.name}
              className={`relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-2xl transition hover:-translate-y-2 hover:border-green-400/40 ${
                index === 1 ? "lg:-mt-8" : ""
              }`}
            >
              <Quote className="absolute right-6 top-6 text-green-400/20" size={80} />

              <div className="relative">
                <div className="mb-7 flex items-center gap-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="h-16 w-16 rounded-2xl border border-white/20 object-cover"
                  />

                  <div>
                    <h3 className="font-black">{review.name}</h3>
                    <p className="text-sm text-green-400">{review.role}</p>
                  </div>
                </div>

                <div className="mb-5 flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} fill="currentColor" />
                  ))}
                </div>

                <p className="leading-8 text-slate-300">“{review.quote}”</p>

                <div className="mt-8 h-1 w-20 rounded-full bg-green-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlayerSpotlight;