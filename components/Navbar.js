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
  FaPhoneAlt,
  FaUserCircle
} from 'react-icons/fa';
import { useSession, signIn, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Styled components
const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: ${({ $scrolled }) =>
    $scrolled 
      ? "rgba(0, 0, 0, 0.9)"
      : "rgba(255, 255, 255, 0.1)"};
  backdrop-filter: ${({ $scrolled }) =>
    $scrolled 
      ? "blur(16px)" 
      : "blur(8px)"};
  box-shadow: ${({ $scrolled }) =>
    $scrolled 
      ? "0 8px 32px rgba(0, 0, 0, 0.3)"
      : "0 4px 16px rgba(255, 255, 255, 0.1)"};
  border: ${({ $scrolled }) =>
    $scrolled
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(255, 255, 255, 0.2)"};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: var(--font-geist-sans);
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: none;
  gap: 2.5rem;
  
  @media (min-width: 768px) {
    display: flex;
  }

  a {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    padding: 0.5rem 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    font-family: var(--font-geist-sans);
    letter-spacing: -0.02em;

    &:hover {
      color: #ffd700;
      transform: translateY(-2px);
    }

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -2px;
      width: 0;
      height: 2px;
      background: #ffd700;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 2px;
      box-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
    }

    &:hover::after {
      width: 100%;
      left: 0;
    }
  }
`;

const MobileMenuButton = styled(motion.button)`
  color: rgba(255, 255, 255, 0.9);
  @media (min-width: 768px) {
    display: none;
  }
`;

const Logo = styled(motion.div)`
  font-size: 1.75rem;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 0 2px 10px rgba(255, 215, 0, 0.4);
  letter-spacing: -0.03em;
  font-family: var(--font-geist-sans);
`;

const AuthSection = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

const CartButton = styled(motion.div)`
  position: relative;
  cursor: pointer;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;

const CartCount = styled(motion.div)`
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #ff4444, #ff0000);
  color: white;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(255, 0, 0, 0.4);
`;

const MobileMenuContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(12px);
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  font-family: var(--font-geist-sans);

  @media (min-width: 768px) {
    display: none;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-weight: 500;
  letter-spacing: -0.01em;
  
  .profile-icon {
    width: 32px;
    height: 32px;
    color: #ffd700;
    filter: drop-shadow(0 2px 4px rgba(255, 215, 0, 0.4));
  }
`;

const Navbar = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItemCount(cart.reduce((total, item) => total + item.quantity, 0));
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cart-updated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  const navLinks = [
    { href: '/', text: 'Home', icon: <FaHome /> },
    { href: '/menu', text: 'Menu', icon: <FaUtensils /> },
    { href: '/about', text: 'About', icon: <FaInfoCircle /> },
    { href: '/contact', text: 'Contact', icon: <FaPhoneAlt /> }
  ];

  return (
    <NavbarWrapper $scrolled={isScrolled}>
      <NavContent>
        <MobileMenuButton
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </MobileMenuButton>

        <Logo
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">FOOD_ORDER</Link>
        </Logo>

        <NavLinks>
          {navLinks.map(({ href, text }) => (
            <Link key={href} href={href}>{text}</Link>
          ))}
        </NavLinks>

        <div className="flex items-center gap-4">
          <AuthSection>
            {session ? (
              <UserProfile>
                <FaUserCircle className="profile-icon" />
                <span>{session.user.name}</span>
                <motion.button
                  onClick={() => signOut()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Logout
                </motion.button>
              </UserProfile>
            ) : (
              <>
                <motion.button
                  onClick={() => signIn()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Login
                </motion.button>
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Register
                  </motion.button>
                </Link>
              </>
            )}
          </AuthSection>

          <CartButton whileHover={{ scale: 1.1 }}>
            <Link href="/cart">
              <FaShoppingCart size={24} className="text-white" />
              <AnimatePresence>
                {cartItemCount > 0 && (
                  <CartCount
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {cartItemCount}
                  </CartCount>
                )}
              </AnimatePresence>
            </Link>
          </CartButton>
        </div>
      </NavContent>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenuContainer
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navLinks.map(({ href, text, icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 py-3 text-white hover:text-yellow-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {icon}
                <span className="font-semibold">{text}</span>
              </Link>
            ))}
            
            {!session ? (
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => {
                    signIn();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Login
                </button>
                <Link
                  href="/register"
                  className="block w-full py-2.5 text-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="mt-6">
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </MobileMenuContainer>
        )}
      </AnimatePresence>
    </NavbarWrapper>
  );
};

export default Navbar;