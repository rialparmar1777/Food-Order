"use client";
import Image from "next/image";
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import '../app/globals.css';
import HeroSection from "../components/HeroSection";
import MealList from "../components/MealList";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>

      <Navbar />
      <HeroSection />
      <MealList />
      <Footer />
    </div>
  );
}
