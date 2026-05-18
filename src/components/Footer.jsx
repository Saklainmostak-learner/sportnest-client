import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook,FaInstagram,FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-black text-white">
            Sport<span className="text-green-500">Nest</span>
          </h2>
          <p className="mt-3 text-slate-400">
            A modern sports facility booking platform for players and facility
            owners.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-3">Contact</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Mail size={16} /> support@sportnest.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> +880 1700-000000
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> Dhaka, Bangladesh
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold mb-3">Social Links</h3>
          <div className="flex gap-4">
            <FaFacebook  size={20} />
            <FaInstagram size={20} />
            <FaYoutube size={20} />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-sm">
        © {new Date().getFullYear()} SportNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
