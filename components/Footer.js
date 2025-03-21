"use client";

import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaHeart, FaArrowUp } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail, MdRestaurantMenu, MdLocalOffer } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setShowNewsletter(false), 2000); 
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative">
      {/* Newsletter Popup */}
      <AnimatePresence>
        {showNewsletter && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-8 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20 z-50 w-80"
          >
            <button
              onClick={() => setShowNewsletter(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ×
            </button>
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <h4 className="text-yellow-400 font-semibold">Get Special Offers!</h4>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-red-500 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="text-center text-green-400">
                Thanks for subscribing! 🎉
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-yellow-400 to-red-500 p-3 rounded-full shadow-lg hover:shadow-yellow-400/20 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowUp className="text-white" />
      </motion.button>

      {/* Special Offers Button */}
      <motion.button
        onClick={() => setShowNewsletter(true)}
        className="fixed bottom-8 left-8 z-50 bg-gradient-to-r from-yellow-400 to-red-500 p-3 rounded-full shadow-lg hover:shadow-yellow-400/20 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MdLocalOffer className="text-white text-xl" />
      </motion.button>

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#09122c] to-[#872341]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      {/* Floating Food Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { left: '20%', delay: '0s' },
          { left: '40%', delay: '1s' },
          { left: '60%', delay: '2s' },
          { left: '80%', delay: '3s' },
          { left: '90%', delay: '4s' }
        ].map((position, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: position.left,
              animationDelay: position.delay,
              opacity: '0.1'
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

          {/* New Features Section */}
          <motion.div 
            {...fadeInUp} 
            className="mt-12 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { title: "Free Delivery", desc: "On orders over $50" },
                { title: "24/7 Support", desc: "Always here to help" },
                { title: "Fresh & Healthy", desc: "100% Organic ingredients" }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <h4 className="text-yellow-400 font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-300">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
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