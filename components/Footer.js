"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaHeart } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail, MdRestaurantMenu } from "react-icons/md";
import { motion } from "framer-motion";

const Footer = () => {
  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <footer className="relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#09122c] to-[#872341]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      {/* Floating Food Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.1
            }}
          >
            <MdRestaurantMenu className="text-4xl text-yellow-400" />
          </div>
        ))}
      </div>

      <div className="relative z-10 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {/* Brand Section */}
            <motion.div {...fadeInUp} className="space-y-6">
              <Link href="/" className="block group">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                  FOOD_ORDER
                </h2>
              </Link>
              <p className="text-gray-300">
                Experience culinary excellence at your doorstep. Fresh, delicious, and crafted with passion.
              </p>
              <div className="flex gap-4">
                {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, idx) => (
                  <Link
                    key={idx}
                    href="#"
                    className="group relative"
                  >
                    <span className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity"></span>
                    <Icon className="relative text-2xl text-white group-hover:text-yellow-400 transition-colors z-10" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div {...fadeInUp} className="space-y-6">
              <h3 className="text-xl font-semibold text-yellow-400">Contact Us</h3>
              <div className="space-y-4">
                {[
                  { icon: MdLocationOn, text: "123 Gourmet Street, Foodie City, FC 12345" },
                  { icon: MdPhone, text: "+1 (555) 123-4567" },
                  { icon: MdEmail, text: "info@foodorder.com" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <item.icon className="text-yellow-400 text-xl" />
                    <p className="text-gray-200">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div {...fadeInUp} className="space-y-6">
              <h3 className="text-xl font-semibold text-yellow-400">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { path: "/menu", label: "Menu" },
                  { path: "/about", label: "About" },
                  { path: "/contact", label: "Contact" },
                  { path: "/privacy", label: "Privacy" },
                  { path: "/terms", label: "Terms" }
                ].map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.path}
                    className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full transform group-hover:scale-150 transition-transform" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Footer Bottom */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} FOOD_ORDER. All rights reserved.
              </p>
              <p className="flex items-center gap-2">
                Made with <FaHeart className="text-red-500 animate-pulse" /> by
                <span className="text-yellow-400">Rial</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;