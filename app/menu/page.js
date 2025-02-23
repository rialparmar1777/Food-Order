'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MenuPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [addedToCart, setAddedToCart] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetchMeals(page);
  }, [page]);

  const fetchMeals = async (pageNumber) => {
    try {
      setLoading(true);
      const mealsData = await Promise.all(
        Array(9).fill().map(async () => {
          const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
          const data = await res.json();
          return {
            ...data.meals[0],
            price: (Math.random() * (25 - 8) + 8).toFixed(2),
            quantity: 1
          };
        })
      );
      setMeals(prevMeals => [...prevMeals, ...mealsData]);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (meal) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.idMeal === meal.idMeal);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({
        ...meal,
        quantity: 1,
        imageUrl: meal.strMealThumb // Save image URL
      });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show "Added to Cart" message
    setAddedToCart(prev => ({
      ...prev,
      [meal.idMeal]: true
    }));

    // Reset message after 2 seconds
    setTimeout(() => {
      setAddedToCart(prev => ({
        ...prev,
        [meal.idMeal]: false
      }));
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-24 w-24">
            <div className="absolute inset-0 border-4 border-emerald-500/30 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="text-emerald-400 font-medium text-lg tracking-wide">
            Crafting your gourmet experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920')] 
                   bg-cover bg-center animate-parallax"
        ></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Epicurean Odyssey
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-100 text-2xl max-w-4xl mx-auto leading-relaxed opacity-90"
          >
            Journey through a universe of flavors, where each dish is a constellation of culinary artistry
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 -mt-40 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              id={`meal-${meal.idMeal}`}
              key={meal.idMeal} 
              className="group bg-slate-800/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-slate-700/50 
                        hover:border-emerald-400/30 hover:shadow-emerald-400/10"
            >
              <div className="relative h-96 overflow-hidden rounded-t-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent z-10"></div>
                <img 
                  src={meal.strMealThumb} 
                  alt={meal.strMeal}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700"
                />
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-100 mb-4 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                  {meal.strMeal}
                </h3>
                <p className="text-slate-400 mb-4 line-clamp-3 leading-relaxed text-sm">
                  {meal.strInstructions?.slice(0, 200)}...
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-emerald-400 font-bold text-xl">
                    ${meal.price}
                  </span>
                  <span className="text-slate-400 text-sm">
                    {meal.strArea} Cuisine
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(meal)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 
                    ${addedToCart[meal.idMeal] 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/20'}`}
                >
                  {addedToCart[meal.idMeal] ? 'Added to Cart!' : 'Add to Cart'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="fixed bottom-8 right-8 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button 
            onClick={() => setPage(prevPage => prevPage + 1)}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-6 rounded-full shadow-2xl
                     hover:shadow-emerald-400/20 transition-all duration-500 hover:rotate-180 flex items-center
                     justify-center aspect-square"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </motion.div>
      </div>
    </main>
  );
}
