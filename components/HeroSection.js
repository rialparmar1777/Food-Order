"use client";
import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  padding: 1rem 2rem;
  transition: all 0.3s ease;
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
    
    &:hover {
      color: #ffd700;
    }
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 100vh;
  
  .carousel .slide img {
    height: 100vh;
    object-fit: cover;
  }
`;

const MealList = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <NavbarContainer style={{ 
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.15)',
        boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none'
      }}>
        <Nav>
          <h1 style={{ color: '#fff' }}>Logo</h1>
          <NavLinks>
            <a href="#home">Home</a>
            <a href="#menu">Menu</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </NavLinks>
        </Nav>
      </NavbarContainer>

      <CarouselContainer>
        <Carousel
          infiniteLoop
          autoPlay
          showStatus={false}
          showThumbs={false}
          interval={5000}
        >
          <div>
            <img src="/images/slide1.jpg" alt="Food 1" />
          </div>
          <div>
            <img src="/images/slide2.jpg" alt="Food 2" />
          </div>
          <div>
            <img src="/images/slide3.jpg" alt="Food 3" />
          </div>
        </Carousel>
      </CarouselContainer>
    </>
  );
};

export default MealList;
