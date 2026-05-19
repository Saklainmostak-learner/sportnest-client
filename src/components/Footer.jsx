import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#020806] text-slate-300">
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-green-500/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-sky-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[36px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl md:grid-cols-[1.2fr_0.8fr_0.8fr] md:p-10">
          <div>
            <h2 className="text-3xl font-black text-white">
              Sport<span className="text-green-400">Nest</span>
            </h2>

            <p className="mt-4 max-w-md leading-7 text-slate-400">
              A premium sports facility booking platform for players and venue owners.
            </p>

            <Link
              to="/facilities"
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-green-500 px-6 py-3 text-sm font-black text-white transition hover:bg-green-400"
            >
              Explore Facilities <ArrowRight size={17} />
            </Link>
          </div>

          <div>
            <h3 className="mb-4 font-black text-white">Contact</h3>

            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-3">
                <Mail size={17} className="text-green-400" />
                support@sportnest.com
              </p>
              <p className="flex items-center gap-3">
                <Phone size={17} className="text-green-400" />
                +880 1700-000000
              </p>
              <p className="flex items-center gap-3">
                <MapPin size={17} className="text-green-400" />
                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-black text-white">Social Links</h3>

            <div className="flex gap-3">
              {[FaFacebook, FaInstagram, FaYoutube].map((Icon, index) => (
                <div
                  key={index}
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-green-400/50 hover:bg-green-500"
                >
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} SportNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;