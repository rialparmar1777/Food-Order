import Image from "next/image";
import Navbar from "../components/Navbar";
import '../app/globals.css';
import HeroSection from "../components/HeroSection";
import MealList from "../components/MealList";
export default function Home() {
  return (
    <div>

      <Navbar />
      <HeroSection />
      <MealList />
    </div>
  );
}
