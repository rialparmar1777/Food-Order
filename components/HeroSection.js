"use client";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import { motion } from "framer-motion";

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ scrolled }) => (scrolled ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)')};
  backdrop-filter: ${({ scrolled }) => (scrolled ? 'blur(12px) saturate(180%)' : 'blur(5px)')};
  box-shadow: ${({ scrolled }) => (scrolled ? '0 8px 32px rgba(0, 0, 0, 0.15)' : 'none')};
  border-bottom: ${({ scrolled }) => (scrolled ? '1px solid rgba(255, 255, 255, 0.3)' : 'none')};
  padding: 1rem 2rem;
  transition: all 0.4s ease-in-out;
`;


const Nav = styled.div`
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

const CarouselContainer = styled.div`
  width: 100%;
  height: 100vh;

  .carousel .slide img {
    height: 100vh;
    object-fit: cover;
    filter: brightness(0.8);
  }
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

const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
<NavbarContainer scrolled={scrolled ? 'true' : undefined}>
<Nav>
          <h1 style={{ color: "#fff" }}>FOOD_ORDER</h1>
          <NavLinks>
            <a href="#home">Home</a>
            <a href="#menu">Menu</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </NavLinks>
        </Nav>
      </NavbarContainer>

      <CarouselContainer>
        <Carousel infiniteLoop autoPlay showStatus={false} showThumbs={false} interval={5000}>
          {["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"].map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Carousel>

        {/* Animated Overlay Text */}
        <OverlayText initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h2>Fresh & Delicious Food</h2>
          <p>Order your favorite meals and enjoy fast delivery.</p>
          <div className="cta">
            <a href="#menu" className="primary">Order Now</a>
            <a href="#about" className="secondary">Learn More</a>
          </div>
        </OverlayText>
      </CarouselContainer>
    </>
  );
};

export default HeroSection;
