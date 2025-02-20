"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/20 backdrop-blur-lg shadow-md border-b border-white/30' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-yellow-400 drop-shadow-lg">
              FOOD_ORDER
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-yellow-400 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link href="/menu" className="text-white hover:text-yellow-400 font-medium transition-colors duration-200">
              Menu
            </Link>
            <Link href="/about" className="text-white hover:text-yellow-400 font-medium transition-colors duration-200">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-yellow-400 font-medium transition-colors duration-200">
              Contact
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <Link href="/cart" className="p-2 hover:bg-white/20 rounded-full transition-all duration-200">
              <FaShoppingCart className="h-6 w-6 text-white hover:text-yellow-400 transition-colors duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
