"use client";
import { motion } from "framer-motion";
import { FaUtensils, FaTruck, FaUsers, FaAward } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#09122c] to-[#872341]">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('/restaurant-bg.jpg')] bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/restaurant-bg.jpg')"
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-4">Our Story</h1>
            <p className="text-xl text-white max-w-2xl mx-auto px-6">
              Delivering exceptional dining experiences since 2010
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-yellow-400 mb-6">Our Mission</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            At FOOD_ORDER, we're passionate about delivering not just meals, but moments of joy. 
            Our mission is to connect food lovers with the finest cuisines while ensuring 
            quality, convenience, and satisfaction in every order.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          {[
            { icon: FaUtensils, stat: "50K+", text: "Orders Delivered" },
            { icon: FaTruck, stat: "100+", text: "Delivery Partners" },
            { icon: FaUsers, stat: "30K+", text: "Happy Customers" },
            { icon: FaAward, stat: "15+", text: "Awards Won" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <item.icon className="text-yellow-400 text-4xl mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">{item.stat}</h3>
              <p className="text-gray-300">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Our Values</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 bg-yellow-400 rounded-full" />
                Quality and freshness in every meal
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 bg-yellow-400 rounded-full" />
                Timely and reliable delivery service
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 bg-yellow-400 rounded-full" />
                Customer satisfaction is our priority
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 bg-yellow-400 rounded-full" />
                Supporting local restaurants and communities
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Why Choose Us</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 bg-yellow-400 rounded-full" />
                Wide selection of cuisines
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 bg-yellow-400 rounded-full" />
                Easy ordering process
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 bg-yellow-400 rounded-full" />
                Real-time order tracking
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 bg-yellow-400 rounded-full" />
                24/7 customer support
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
