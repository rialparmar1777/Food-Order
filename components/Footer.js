"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#09122c] to-[#872341] text-white py-12 relative overflow-hidden">
      {/* Glowing Effect */}
      <div className="absolute inset-0 opacity-30 blur-3xl">
        <div className="w-80 h-80 bg-yellow-400 rounded-full absolute top-20 left-20"></div>
        <div className="w-60 h-60 bg-red-500 rounded-full absolute bottom-20 right-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold text-yellow-400">FOOD_ORDER</h2>
          <p className="text-gray-300 mt-4">
            Enjoy the best gourmet meals delivered to your doorstep with freshness & taste guaranteed.
          </p>
          <div className="flex gap-4 mt-6">
            {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, idx) => (
              <Link
                key={idx}
                href="#"
                className="bg-white/10 p-3 rounded-full transition-transform transform hover:scale-110 hover:bg-yellow-400"
              >
                <Icon className="text-yellow-400 text-xl hover:text-[#09122c]" />
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400">Contact Us</h3>
          <div className="mt-4 space-y-3">
            {[{ icon: MdLocationOn, text: "123 Gourmet Street, Foodie City, FC 12345" },
              { icon: MdPhone, text: "+1 (555) 123-4567" },
              { icon: MdEmail, text: "info@foodorder.com" }].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/10 p-3 rounded-lg hover:bg-yellow-400 transition">
                <item.icon className="text-yellow-400 text-xl" />
                <p className="text-gray-200 hover:text-[#09122c]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400">Quick Links</h3>
          <div className="mt-4 space-y-3">
            {["/menu", "/about", "/contact", "/privacy", "/terms"].map((link, idx) => (
              <Link
                key={idx}
                href={link}
                className="text-gray-300 hover:text-yellow-400 flex items-center gap-2 transition-transform transform hover:translate-x-2"
              >
                ➝ {link.replace("/", "").toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-12 border-t border-gray-600 pt-6 text-gray-400">
        &copy; {new Date().getFullYear()} FOOD_ORDER. All rights reserved.
      </div>
      <p className="text-gray-400 text-center">Powered by</p> <p className="text-yellow-400 text-center">Rial</p>
    </footer>
  );
};

export default Footer;
