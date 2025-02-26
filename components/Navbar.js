'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaShoppingCart, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaHome,
  FaUtensils,
  FaInfoCircle,
  FaPhoneAlt
} from 'react-icons/fa';
import { useSession, signIn, signOut } from 'next-auth/react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const Navbar = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cart icon animation values
  const cartIconRotation = useMotionValue(0);
  const cartIconScale = useTransform(cartIconRotation, [0, 1], [1, 1.2]);

  // Update cart count from localStorage
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItemCount(cart.reduce((total, item) => total + item.quantity, 0));
  };

  useEffect(() => {
    updateCartCount();

    const handleStorageChange = () => updateCartCount();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cart-updated', handleStorageChange);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cart-updated', handleStorageChange);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const MobileMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 25 }
      }}
      exit={{ 
        opacity: 0, 
        y: -20,
        transition: { duration: 0.2 }
      }}
      className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg py-4 px-6 space-y-4 mobile-menu"
    >
      <NavLink href="/" icon={<FaHome />} text="Home" />
      <NavLink href="/menu" icon={<FaUtensils />} text="Menu" />
      <NavLink href="/about" icon={<FaInfoCircle />} text="About" />
      <NavLink href="/contact" icon={<FaPhoneAlt />} text="Contact" />
      
      <div className="pt-4 border-t border-gray-200">
        {session ? (
          <div className="space-y-4">
            <motion.div 
              className="flex items-center gap-2 text-gray-700"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <FaUser className="text-yellow-500" />
              <span>{session.user.name}</span>
            </motion.div>
            <motion.button
              onClick={() => signOut()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </motion.button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <motion.button
              onClick={() => {
                signIn();
                setIsMenuOpen(false);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 px-4 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Login
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/register"
                className="block text-center py-2 px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const NavLink = ({ href, icon, text }) => (
    <motion.div
      whileHover={{ x: 5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link
        href={href}
        className="flex items-center gap-3 text-gray-700 hover:text-yellow-500 py-2"
        onClick={() => setIsMenuOpen(false)}
      >
        <motion.span whileHover={{ scale: 1.1 }}>
          {icon}
        </motion.span>
        <span className="font-medium">{text}</span>
      </Link>
    </motion.div>
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-lg border-b border-white/20 bg-white/10 ${isScrolled ? 'shadow-md' : 'shadow-none'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-yellow-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? (
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ type: 'spring' }}
              >
                <FaTimes className="h-6 w-6" />
              </motion.div>
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </motion.button>

          {/* Logo with shine effect */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-2xl font-bold text-yellow-400 drop-shadow-lg relative overflow-hidden">
              <motion.span
                className="block relative z-10"
                whileHover={{
                  background: [
                    'linear-gradient(90deg, #facc15 0%, #fde047 50%, #facc15 100%)',
                    'linear-gradient(90deg, #facc15 0%, #fde047 100%)'
                  ],
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  transition: { duration: 0.5, repeat: Infinity }
                }}
              >
                FOOD_ORDER
              </motion.span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {['/', '/menu', '/about', '/contact'].map((path, index) => (
              <motion.div
                key={path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={path}
                  className="text-white hover:text-yellow-400 font-medium transition-colors duration-200 relative group"
                >
                  {path === '/' ? 'Home' : 
                   path === '/menu' ? 'Menu' : 
                   path === '/about' ? 'About' : 'Contact'}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Authentication & Cart */}
          <div className="flex items-center gap-6">
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {session ? (
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-center gap-2 text-white">
                    <motion.span
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaUser className="text-yellow-400" />
                    </motion.span>
                    <span className="hidden sm:inline">{session.user.name}</span>
                  </div>
                  <motion.button
                    onClick={() => signOut()}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 4px 14px rgba(239, 68, 68, 0.25)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg transition-colors"
                  >
                    Logout
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <motion.button
                    onClick={() => signIn()}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 4px 14px rgba(250, 204, 21, 0.25)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-yellow-400 text-black rounded-lg transition-colors"
                  >
                    Login
                  </motion.button>
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/register"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg transition-colors block"
                    >
                      Register
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Cart Icon */}
            <motion.div 
              className="flex items-center relative"
              onHoverStart={() => cartIconRotation.set(1)}
              onHoverEnd={() => cartIconRotation.set(0)}
              style={{ scale: cartIconScale }}
            >
              <Link href="/cart" className="p-2 hover:bg-white/20 rounded-full transition-all duration-200">
                <motion.span
                  animate={{ rotate: cartIconRotation.get() * 15 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaShoppingCart className="h-6 w-6 text-white hover:text-yellow-400 transition-colors duration-200" />
                </motion.span>
              </Link>
              <AnimatePresence>
                {cartItemCount > 0 && (
                  <motion.div
                    key="cart-count"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full"
                  >
                    {cartItemCount}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && <MobileMenu />}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;