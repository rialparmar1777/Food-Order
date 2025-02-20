"use client";
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import styled from 'styled-components';

const FooterContainer = styled.footer.withConfig({
  shouldForwardProp: (prop) => prop !== 'scrolled', // Exclude 'scrolled' prop
})`
  background: linear-gradient(to right, #09122c, #1a237e);
  color: #fff;
  padding: 4rem 0 2rem 0;
`;

const FooterWrapper = styled.div`
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ffd700, #ff6b6b, #4ecdc4, #ffd700);
    animation: gradient 15s ease infinite;
    background-size: 300% 300%;
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;
  padding: 4rem 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #ffd700;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 40px;
      height: 3px;
      background: #ffd700;
    }
  }

  p {
    color: #e0e0e0;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 2rem;

  a {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.8rem;
    border-radius: 50%;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 1.5rem;
      color: #ffd700;
    }

    &:hover {
      background: #ffd700;
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);

      svg {
        color: #09122c;
      }
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;

  svg {
    font-size: 1.5rem;
    color: #ffd700;
  }

  &:hover {
    background: rgba(255, 215, 0, 0.1);
    transform: translateX(10px);
  }
`;

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  a {
    color: #e0e0e0;
    text-decoration: none;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:before {
      content: '→';
      color: #ffd700;
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.3s ease;
    }

    &:hover {
      color: #ffd700;
      transform: translateX(10px);

      &:before {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #888;
  font-size: 0.9rem;

  a {
    color: #ffd700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const OpeningHours = styled.div`
  display: grid;
  gap: 1rem;

  .day {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 215, 0, 0.1);
      transform: translateX(10px);
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>FOOD_ORDER</h3>
          <p>Experience the finest culinary delights delivered right to your doorstep. Our commitment to quality and taste makes every meal special.</p>
          <SocialLinks>
            <Link href="https://facebook.com" aria-label="Facebook">
              <FaFacebook size={20} />
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter">
              <FaTwitter size={20} />
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram">
              <FaInstagram size={20} />
            </Link>
            <Link href="https://youtube.com" aria-label="YouTube">
              <FaYoutube size={20} />
            </Link>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Contact Us</h3>
          <ContactInfo>
            <MdLocationOn size={20} />
            <p>123 Gourmet Street, Foodie City, FC 12345</p>
          </ContactInfo>
          <ContactInfo>
            <MdPhone size={20} />
            <p>+1 (555) 123-4567</p>
          </ContactInfo>
          <ContactInfo>
            <MdEmail size={20} />
            <p>info@foodorder.com</p>
          </ContactInfo>
        </FooterSection>

        <FooterSection>
          <h3>Opening Hours</h3>
          <OpeningHours>
            <span>
              <strong>Monday - Friday</strong>
              <span>9:00 AM - 10:00 PM</span>
            </span>
            <span>
              <strong>Saturday</strong>
              <span>10:00 AM - 11:00 PM</span>
            </span>
            <span>
              <strong>Sunday</strong>
              <span>10:00 AM - 9:00 PM</span>
            </span>
          </OpeningHours>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <p><Link href="/menu">Our Menu</Link></p>
          <p><Link href="/about">About Us</Link></p>
          <p><Link href="/contact">Contact</Link></p>
          <p><Link href="/privacy">Privacy Policy</Link></p>
          <p><Link href="/terms">Terms & Conditions</Link></p>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>&copy; {new Date().getFullYear()} FOOD_ORDER. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
