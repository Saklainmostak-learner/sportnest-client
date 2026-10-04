import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] text-[var(--muted)]">
      <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-green-500/10 blur-[100px]" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-sky-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_16px_45px_rgba(0,0,0,0.1)] backdrop-blur-2xl md:grid-cols-[1.2fr_0.8fr_0.8fr] md:p-6">
          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-black text-[var(--text)]">
              Sport
              <span className="text-green-400">
                Nest
              </span>
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
              A sports facility booking platform where users can explore venues,
              reserve time slots and manage their own facility listings.
            </p>

            <Link
              to="/all-facilities"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-black text-white transition hover:bg-green-400"
            >
              Explore Facilities
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-3 font-black text-[var(--text)]">
              Contact
            </h3>

            <div className="space-y-2.5 text-sm">
              <p className="flex items-center gap-3">
                <Mail
                  size={16}
                  className="shrink-0 text-green-400"
                />

                <span className="break-all">
                  support@sportnest.com
                </span>
              </p>

              <p className="flex items-center gap-3">
                <Phone
                  size={16}
                  className="shrink-0 text-green-400"
                />

                +880 1700-000000
              </p>

              <p className="flex items-center gap-3">
                <MapPin
                  size={16}
                  className="shrink-0 text-green-400"
                />

                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="mb-3 font-black text-[var(--text)]">
              Social Links
            </h3>

            <div className="flex gap-2">
              <SocialIcon
                label="Facebook"
                icon={FaFacebook}
              />

              <SocialIcon
                label="Instagram"
                icon={FaInstagram}
              />

              <SocialIcon
                label="YouTube"
                icon={FaYoutube}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-[var(--border)] pt-5 text-center text-xs text-[var(--muted)] sm:text-sm">
          © {new Date().getFullYear()} SportNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ label, icon: Icon }) => (
  <button
    type="button"
    aria-label={label}
    title={`${label} link coming soon`}
    className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text)] transition hover:border-green-400/40 hover:bg-green-500/10 hover:text-green-400"
  >
    <Icon size={18} />
  </button>
);

export default Footer;