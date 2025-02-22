"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import Navbar from "./Navbar";

// Navbar Styled Components
const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: ${({ $scrolled }) =>
    $scrolled ? "rgba(255, 255, 255, 0.6)" : "transparent"};
  backdrop-filter: ${({ $scrolled }) =>
    $scrolled ? "blur(12px)" : "blur(5px)"};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 8px 32px rgba(0, 0, 0, 0.1)" : "none"};
  padding: 1rem 2rem;
  transition: all 0.3s ease-in-out;
  border-bottom: ${({ $scrolled }) =>
    $scrolled ? "1px solid rgba(255, 255, 255, 0.2)" : "none"};
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;

    &:hover {
      color: #ffd700;
    }

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -4px;
      width: 0;
      height: 2px;
      background: #ffd700;
      transition: all 0.3s ease;
    }

    &:hover::after {
      width: 100%;
      left: 0;
    }
  }
`;

const CartIcon = styled.div`
  display: flex;
  align-items: center;
`;

const OverlayText = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;

  h2 {
    font-size: 3rem;
    font-weight: bold;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  }

  p {
    margin-top: 1rem;
    font-size: 1.2rem;
  }

  .cta {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: center;

    a {
      padding: 0.75rem 1.5rem;
      border-radius: 30px;
      font-size: 1rem;
      font-weight: bold;
      transition: all 0.3s ease;
    }

    .primary {
      background: #ffd700;
      color: #000;
      &:hover {
        background: #e6c200;
      }
    }

    .secondary {
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    }
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 100vh;

  .carousel .slide img {
    height: 100vh;
    object-fit: cover;
    filter: brightness(0.8);
  }
`;

// Hero Section Component
const HeroSection = () => {
  const menuRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu'); // Make sure your menu section has this ID
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
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;