"use client";
import { motion } from "framer-motion";
import { FaUtensils, FaTruck, FaUsers, FaAward, FaStar, FaHeart, FaLeaf, FaClock } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#09122c] to-[#872341] text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('/restaurant-bg.jpg')] bg-cover bg-center opacity-30"
        />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center relative z-10"
        >
          <h1 className="text-6xl font-extrabold text-yellow-400 drop-shadow-lg">Our Story</h1>
          <p className="text-xl mt-4 max-w-2xl mx-auto px-6 drop-shadow-md">
            Delivering exceptional dining experiences since 2010
          </p>
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-yellow-400 mb-8"
        >
          Our Mission
        </motion.h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          At FOOD_ORDER, we're passionate about delivering not just meals, but moments of joy. 
          Our mission is to connect food lovers with the finest cuisines while ensuring 
          quality, convenience, and satisfaction in every order.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-20 px-6">
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
            className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <item.icon className="text-yellow-400 text-5xl mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-white mb-2">{item.stat}</h3>
            <p className="text-gray-300 text-lg">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Values & Why Choose Us Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 pb-20">
        {[ 
          { 
            title: "Our Values", 
            items: [
              "Quality and freshness in every meal", 
              "Timely and reliable delivery service", 
              "Customer satisfaction is our priority", 
              "Supporting local restaurants and communities"
            ]
          },
          { 
            title: "Why Choose Us", 
            items: [
              "Wide selection of cuisines", 
              "Easy ordering process", 
              "Real-time order tracking", 
              "24/7 customer support"
            ]
          }
        ].map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl"
          >
            <h3 className="text-3xl font-bold text-yellow-400 mb-6 text-center">{section.title}</h3>
            <ul className="space-y-4 text-gray-300 text-lg">
              {section.items.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="h-3 w-3 bg-yellow-400 rounded-full" /> {item}
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
          className="text-5xl font-bold text-yellow-400 mb-8 text-center"
        >
          What Our Customers Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "John Doe",
              review: "The best food delivery service I've ever used! Fast, reliable, and delicious.",
              rating: 5
            },
            {
              name: "Jane Smith",
              review: "Amazing variety and great customer support. Highly recommend!",
              rating: 5
            },
            {
              name: "Mike Johnson",
              review: "Every meal feels like it's made just for me. Love it!",
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-lg mb-4">{testimonial.review}</p>
              <p className="text-yellow-400 font-semibold">{testimonial.name}</p>
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
          className="text-5xl font-bold text-yellow-400 mb-8 text-center"
        >
          Our Commitment to Sustainability
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: FaLeaf,
              title: "Eco-Friendly Packaging",
              description: "We use biodegradable and recyclable materials to reduce our environmental footprint."
            },
            {
              icon: FaHeart,
              title: "Supporting Local Farmers",
              description: "We source ingredients from local farms to promote sustainable agriculture."
            },
            {
              icon: FaClock,
              title: "Reducing Food Waste",
              description: "We partner with food banks to donate excess food and minimize waste."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center shadow-lg"
            >
              <item.icon className="text-yellow-400 text-5xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-300 text-lg">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center opacity-30"
        />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center relative z-10"
        >
          <h2 className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg mb-6">Join Us Today!</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto px-6 drop-shadow-md mb-8">
            Experience the best in food delivery. Sign up now and get 20% off your first order!
          </p>
          <button className="bg-yellow-400 text-[#09122c] font-semibold py-3 px-8 rounded-full hover:bg-yellow-500 transition-colors duration-300">
            Get Started
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;