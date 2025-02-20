import Image from "next/image";
import Navbar from "../components/Navbar";
import '../app/globals.css';
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div>

      <Navbar />
      <HeroSection />
    </div>
  );
}
