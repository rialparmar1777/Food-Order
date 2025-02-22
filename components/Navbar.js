'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Read cart from localStorage and update count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItemCount(cart.reduce((total, item) => total + item.quantity, 0));
  };

  useEffect(() => {
    // Initial cart count
    updateCartCount();

    // Listen to storage events
    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cart-updated', handleStorageChange);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cart-updated', handleStorageChange);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-lg border-b border-white/20 bg-white/10 ${isScrolled ? 'shadow-md' : 'shadow-none'}`}>
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
          <div className="flex items-center relative">
            <Link href="/cart" className="p-2 hover:bg-white/20 rounded-full transition-all duration-200">
              <FaShoppingCart className="h-6 w-6 text-white hover:text-yellow-400 transition-colors duration-200" />
            </Link>
            {cartItemCount > 0 && (
              <div className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                {cartItemCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
