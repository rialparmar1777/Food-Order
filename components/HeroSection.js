'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import Navbar from "./Navbar";

// Pre-calculate particle positions with rounded values
const particlePositions = [...Array(30)].map((_, i) => {
  const angle = Math.round((i / 30) * 360); // Use degrees instead of radians
  const radius = 40 + (i % 3) * 20;
  const x = Math.round(50 + radius * Math.cos(angle * Math.PI / 180));
  const y = Math.round(50 + radius * Math.sin(angle * Math.PI / 180));
  return { x, y };
});

// Hero Section Component
const HeroSection = () => {
  const menuRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const carouselContent = {
    0: {
      title: "Premium Dining Experience",
      subtitle: "Discover culinary excellence with our award-winning chefs",
    },
    1: {
      title: "Fresh Ingredients Daily",
      subtitle: "Locally sourced, sustainably produced",
    },
    2: {
      title: "Fast & Reliable Delivery",
      subtitle: "Enjoy restaurant-quality meals at home",
    },
  };

  return (
    <section className="relative h-screen">
      <Navbar />
      
      <Carousel
        infiniteLoop
        autoPlay
        showStatus={false}
        showThumbs={false}
        interval={6000}
        onChange={(index) => setCurrentSlide(index)}
        className="h-full"
      >
        {['/slide1.jpg', '/slide2.jpg', '/slide3.jpg'].map((img, index) => (
          <div key={index} className="h-screen relative">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </div>
        ))}
      </Carousel>

      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            {carouselContent[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            {carouselContent[currentSlide].subtitle}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToMenu}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Order Now
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all"
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white cursor-pointer"
        onClick={scrollToMenu}
      >
        <svg className="w-12 h-12 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>

      {/* Subtle Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection; 