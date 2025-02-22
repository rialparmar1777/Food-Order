'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, ShoppingCartIcon, ArrowsPointingOutIcon, ClockIcon } from '@heroicons/react/24/solid';

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
    fetchMeals();
  }, [page, searchQuery]);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      let mealsData;

      if (searchQuery) {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
        const data = await res.json();
        mealsData = data.meals || [];
      } else {
        mealsData = await Promise.all(
          Array(6).fill().map(async () => {
            const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await res.json();
            return data.meals[0];
          })
        );
      }

      setMeals(prev => (page === 1 ? mealsData : [...prev, ...mealsData]));
      setHasMore(!searchQuery && page < 3);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (meal) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find(item => item.id === meal.idMeal);
    
    let updatedCart = existingItem
      ? existingCart.map(item => (item.id === meal.idMeal ? { ...item, quantity: item.quantity + 1 } : item))
      : [...existingCart, { 
          id: meal.idMeal, 
          name: meal.strMeal, 
          price: (Math.random() * (25 - 8) + 8).toFixed(2), 
          image: meal.strMealThumb, 
          quantity: 1 
        }];

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);
  };

  const generateRating = () => (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
  const cookingTime = () => Math.floor(Math.random() * (60 - 20) + 20);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="sticky top-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <input 
            type="text" 
            placeholder="Search meals..." 
            className="flex-1 px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={() => router.push('/cart')}
            className="relative p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center text-5xl font-bold bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent mb-12"
        >
          Culinary Explorer
        </motion.h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-full h-64 bg-slate-200 animate-pulse" />
                <div className="p-6">
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-4 animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded w-1/2 mb-4 animate-pulse" />
                  <div className="h-10 bg-slate-200 rounded-xl animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {meals.map((meal) => {
                  const rating = generateRating();
                  return (
                    <motion.div 
                      key={meal.idMeal} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ scale: 1.03 }}
                      className="relative bg-white rounded-3xl shadow-lg overflow-hidden group"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={meal.strMealThumb} 
                          alt={meal.strMeal} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <button
                          onClick={() => setSelectedMeal(meal)}
                          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                        >
                          <ArrowsPointingOutIcon className="w-6 h-6 text-indigo-600" />
                        </button>
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-slate-800">{meal.strMeal}</h3>
                          <span className="text-lg font-bold text-indigo-600">
                            ${(Math.random() * (25 - 8) + 8).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            {cookingTime()} mins
                          </span>
                          <span>•</span>
                          <span>{meal.strCategory}</span>
                          <span>•</span>
                          <span>{meal.strArea}</span>
                        </div>

                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i} 
                              className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-slate-300'}`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-slate-600">{rating}</span>
                        </div>

                        {meal.strTags && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {meal.strTags.split(',').map(tag => (
                              <span 
                                key={tag} 
                                className="px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-medium"
                              >
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}

                        <motion.button 
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(meal)}
                          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingCartIcon className="w-5 h-5" />
                          Add to Cart
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {hasMore && (
              <motion.button 
                onClick={() => setPage(prev => prev + 1)} 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="mt-12 block mx-auto bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold shadow-md hover:bg-indigo-700 transition-colors"
              >
                Load More Delights
              </motion.button>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedMeal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMeal(null)}
          >
            <motion.div 
              initial={{ scale: 0.9 }} 
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedMeal.strMealThumb} 
                alt={selectedMeal.strMeal} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{selectedMeal.strMeal}</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-3">Ingredients</h4>
                    <ul className="space-y-2">
                      {[...Array(20)].map((_, i) => {
                        const ingredient = selectedMeal[`strIngredient${i + 1}`];
                        const measure = selectedMeal[`strMeasure${i + 1}`];
                        return ingredient && (
                          <li key={i} className="text-sm text-slate-600 flex justify-between">
                            <span>{ingredient}</span>
                            <span className="text-slate-400">{measure}</span>
                          </li>
                        );
                      }).filter(Boolean)}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-700 mb-3">Instructions</h4>
                    <div className="text-sm text-slate-600 whitespace-pre-wrap">
                      {selectedMeal.strInstructions}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      addToCart(selectedMeal);
                      setSelectedMeal(null);
                    }}
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Add to Cart - ${(Math.random() * (25 - 8) + 8).toFixed(2)}
                  </motion.button>
                  <button
                    onClick={() => setSelectedMeal(null)}
                    className="px-6 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MealList;