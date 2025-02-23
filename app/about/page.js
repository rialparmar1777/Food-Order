"use client";
import { motion } from "framer-motion";
import { FaUtensils, FaTruck, FaUsers, FaAward, FaStar, FaHeart, FaLeaf, FaClock } from "react-icons/fa";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#09122c] to-[#872341] text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('/restaurant-bg.jpg')] bg-cover bg-center opacity-30"
          style={{ filter: "brightness(0.7)" }}
        />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center relative z-10"
        >
          <h1 className="text-6xl font-extrabold text-yellow-400 drop-shadow-lg mb-6">Our Story</h1>
          <p className="text-2xl mt-4 max-w-3xl mx-auto px-6 drop-shadow-md text-gray-200">
            Delivering exceptional dining experiences since 2010, with a passion for culinary excellence
          </p>
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-yellow-400 mb-12"
        >
          Our Mission
        </motion.h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          At FOOD_ORDER, we're driven by a singular passion: delivering not just meals, but unforgettable moments of culinary joy. 
          Our mission is to bridge the gap between food lovers and exceptional cuisines, ensuring unparalleled 
          quality, seamless convenience, and complete satisfaction with every single order.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-20 px-6">
        {[ 
          { icon: FaUtensils, stat: "100K+", text: "Orders Delivered" },
          { icon: FaTruck, stat: "150+", text: "Delivery Partners" },
          { icon: FaUsers, stat: "50K+", text: "Happy Customers" },
          { icon: FaAward, stat: "25+", text: "Awards Won" }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-white/15"
          >
            <item.icon className="text-yellow-400 text-6xl mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-3">{item.stat}</h3>
            <p className="text-gray-300 text-xl">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Values & Why Choose Us Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 pb-20">
        {[ 
          { 
            title: "Our Values", 
            items: [
              "Exceptional quality and freshness guaranteed", 
              "Swift and reliable delivery service", 
              "Customer satisfaction is our top priority", 
              "Strong support for local restaurants and communities"
            ]
          },
          { 
            title: "Why Choose Us", 
            items: [
              "Extensive selection of global cuisines", 
              "Intuitive and seamless ordering process", 
              "Advanced real-time order tracking", 
              "Round-the-clock dedicated customer support"
            ]
          }
        ].map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-10 shadow-xl hover:bg-white/15 transition-colors duration-300"
          >
            <h3 className="text-4xl font-bold text-yellow-400 mb-8 text-center">{section.title}</h3>
            <ul className="space-y-6 text-gray-300 text-xl">
              {section.items.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <span className="h-4 w-4 bg-yellow-400 rounded-full" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-yellow-400 mb-12 text-center"
        >
          What Our Customers Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "John Doe",
              review: "Absolutely outstanding service! The food arrives hot and fresh every time. Their attention to detail is remarkable.",
              rating: 5
            },
            {
              name: "Jane Smith",
              review: "Incredible variety and exceptional customer support. They've made ordering food a delightful experience!",
              rating: 5
            },
            {
              name: "Mike Johnson",
              review: "The personalization and care they put into each order is unmatched. Simply the best in the business!",
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg hover:bg-white/15 transition-colors duration-300"
            >
              <div className="flex items-center gap-2 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>
              <p className="text-gray-300 text-lg mb-6 italic">&quot;{testimonial.review}&quot;</p>
              <p className="text-yellow-400 font-semibold text-xl">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sustainability Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-yellow-400 mb-12 text-center"
        >
          Our Commitment to Sustainability
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: FaLeaf,
              title: "Eco-Friendly Packaging",
              description: "Leading the industry with 100% biodegradable and recyclable packaging materials."
            },
            {
              icon: FaHeart,
              title: "Supporting Local Farmers",
              description: "Direct partnerships with local farmers ensuring fresh, sustainable ingredients."
            },
            {
              icon: FaClock,
              title: "Zero Food Waste",
              description: "Strategic partnerships with food banks and innovative waste reduction programs."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center shadow-lg hover:bg-white/15 transition-colors duration-300"
            >
              <item.icon className="text-yellow-400 text-6xl mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-300 text-lg">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center opacity-30"
          style={{ filter: "brightness(0.6)" }}
        />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center relative z-10"
        >
          <h2 className="text-6xl font-extrabold text-yellow-400 drop-shadow-lg mb-8">Ready to Join Us?</h2>
          <p className="text-2xl text-gray-200 max-w-3xl mx-auto px-6 drop-shadow-md mb-10">
            Begin your culinary journey today! New members receive an exclusive 25% discount on their first order.
          </p>
          <Link href="/contact">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-[#09122c] font-bold text-xl py-4 px-10 rounded-full hover:bg-yellow-500 transition-colors duration-300 shadow-lg"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;