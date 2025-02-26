'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Snowflake, Sun } from 'lucide-react';
import ClientWrapper from './ClientWrapper';

// Sample advertisement data
const advertisements = [
  {
    id: 1,
    title: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, and basil on a crispy crust",
    rating: 4.5,
    originalPrice: 14.99,
    discountedPrice: 11.99,
    image: "/margherita-pizza.jpg"
  },
  {
    id: 2,
    title: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, and special sauce",
    rating: 4.8,
    originalPrice: 12.99,
    discountedPrice: 9.99,
    image: "/chicken-burger.jpg"
  },
  {
    id: 3,
    title: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan and croutons",
    rating: 4.2,
    originalPrice: 9.99,
    discountedPrice: 7.99,
    image: "/caesar-salad.jpg"
  }
];

// Theme configuration
const themes = {
  summer: {
    bg: 'from-amber-900 via-rose-900 to-slate-900',
    button: 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-rose-500 hover:to-amber-500',
    text: 'text-amber-400',
    icon: <Sun className="w-8 h-8 text-amber-400" />
  },
  winter: {
    bg: 'from-blue-900 via-indigo-900 to-slate-900',
    button: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500',
    text: 'text-blue-400',
    icon: <Snowflake className="w-8 h-8 text-blue-400" />
  }
};

function RatingStars({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? 'fill-current' : ''} text-amber-400`}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Rating: {rating} out of 5 stars</span>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin h-12 w-12 border-4 border-emerald-500 border-t-transparent rounded-full" />
    </div>
  );
}

export default function MealList() {
  const [theme, setTheme] = useState('summer');
  const [ads, setAds] = useState([]);

  useEffect(() => {
    setAds(advertisements);
  }, []);

  return (
    <ClientWrapper
      fallback={
        <div className={`min-h-screen bg-gradient-to-b ${themes.summer.bg}`}>
          <LoadingSpinner />
        </div>
      }
    >
      <div className={`relative min-h-screen bg-gradient-to-b ${themes[theme].bg}`}>
        {/* Hero Section */}
        <section className="relative z-10 h-screen flex items-center justify-center overflow-hidden">
          <div className="text-center space-y-8 backdrop-blur-lg bg-black/30 p-12 rounded-3xl">
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Culinary Excellence
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${themes[theme].button} text-white px-8 py-4 rounded-full text-xl`}
            >
              Explore Offers
            </motion.button>
          </div>
        </section>

        {/* Meal Cards */}
        <section className="relative z-10 container mx-auto py-24 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            <AnimatePresence>
              {ads.map((ad, i) => (
                <motion.article
                  key={ad.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative bg-black/40 backdrop-blur-lg rounded-3xl overflow-hidden"
                >
                  <div className="relative h-64">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{ad.title}</h3>
                    <RatingStars rating={ad.rating} />
                    <p className="text-gray-300 mt-2">{ad.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <span className="text-gray-400 line-through">${ad.originalPrice}</span>
                        <span className="ml-2 text-xl text-white">${ad.discountedPrice}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${themes[theme].button} px-4 py-2 rounded-lg text-white`}
                      >
                        Order Now
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Theme Toggle */}
        <motion.button
          onClick={() => setTheme(t => t === 'summer' ? 'winter' : 'summer')}
          className={`fixed bottom-8 right-8 p-4 rounded-full ${themes[theme].button} z-50`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Switch to ${theme === 'summer' ? 'winter' : 'summer'} theme`}
        >
          {themes[theme].icon}
        </motion.button>
      </div>
    </ClientWrapper>
  );
} 