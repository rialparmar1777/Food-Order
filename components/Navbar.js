'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();

  // Read cart from localStorage and update count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItemCount(cart.reduce((total, item) => total + item.quantity, 0));
  };

  useEffect(() => {
    // Check login status
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    // Initial cart count
    updateCartCount();

    // Listen to storage events
    const handleStorageChange = () => {
      updateCartCount();
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cart-updated', handleStorageChange);
    window.addEventListener('auth-changed', checkLoginStatus);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cart-updated', handleStorageChange);
      window.removeEventListener('auth-changed', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    window.dispatchEvent(new Event('auth-changed'));
    router.push('/');
  };

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

          {/* Auth and Cart Section */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link href="/cart" className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 relative">
              <FaShoppingCart className="h-6 w-6 text-white hover:text-yellow-400 transition-colors duration-200" />
              {cartItemCount > 0 && (
                <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                  {cartItemCount}
                </div>
              )}
            </Link>

            {/* Auth Section */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  <FaUserCircle className="h-6 w-6" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-white hover:text-yellow-400 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
