"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/70 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-yellow-500">
              FOOD_ORDER
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-800 hover:text-yellow-500 font-medium">
              Home
            </Link>
            <Link href="/menu" className="text-gray-800 hover:text-yellow-500 font-medium">
              Menu
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-yellow-500 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-yellow-500 font-medium">
              Contact
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full">
              <FaShoppingCart className="h-6 w-6 text-gray-800 hover:text-yellow-500" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
