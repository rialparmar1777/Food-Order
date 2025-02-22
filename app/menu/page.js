'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MenuPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      // Fetch 9 random meals from TheMealDB API
      const mealsData = await Promise.all(
        Array(9).fill().map(async () => {
          const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
          const data = await res.json();
          return data.meals[0];
        })
      );
      setMeals(mealsData);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (meal) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find(item => item.id === meal.idMeal);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map(item => 
        item.id === meal.idMeal 
          ? {...item, quantity: item.quantity + 1}
          : item
      );
    } else {
      updatedCart = [...existingCart, {
        id: meal.idMeal,
        name: meal.strMeal,
        price: (Math.random() * (25 - 8) + 8).toFixed(2),
        image: meal.strMealThumb,
        quantity: 1
      }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    const element = document.getElementById(`meal-${meal.idMeal}`);
    element.classList.add('scale-105');
    setTimeout(() => element.classList.remove('scale-105'), 200);
    
    router.push('/cart');
  };  // ... existing state and logic ...

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
      {/* Parallax Header */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920')] 
                   bg-cover bg-center animate-parallax"
        ></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent 
                          animate-fade-in-up">
            Epicurean Odyssey
          </h1>
          <p className="text-slate-100 text-2xl max-w-4xl mx-auto leading-relaxed opacity-90 animate-fade-in-up delay-100">
            Journey through a universe of flavors, where each dish is a constellation of culinary artistry
          </p>
        </div>
      </div>

      {/* Floating Grid */}
      <div className="container mx-auto px-4 py-24 -mt-40 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 hover:[&>*]:opacity-50 
                        [&>*:hover]:opacity-100 [&>*:hover]:scale-105 transition-all duration-300">
          {meals.map((meal) => (
            <div 
              id={`meal-${meal.idMeal}`}
              key={meal.idMeal} 
              className="group bg-slate-800/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-slate-700/50 
                        transition-all duration-500 hover:border-emerald-400/30 hover:shadow-emerald-400/10"
            >
              <div className="relative h-96 overflow-hidden rounded-t-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent z-10"></div>
                <img 
                  src={meal.strMealThumb} 
                  alt={meal.strMeal}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="bg-emerald-400/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <span className="text-emerald-400 font-bold text-xl">
                      ${(Math.random() * (25 - 8) + 8).toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-cyan-400/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-cyan-400 text-sm font-medium">
                      ★ {(Math.random() * 2 + 3).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <span className="bg-slate-700/50 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium">
                    {meal.strArea} Heritage
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                  {meal.strMeal}
                </h3>
                <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed text-sm">
                  {meal.strInstructions?.slice(0, 200)}...
                </p>
                <button 
                  onClick={() => addToCart(meal)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 py-4 rounded-xl
                           hover:from-emerald-400 hover:to-cyan-400 transform transition-all duration-300
                           flex items-center justify-center space-x-3 font-bold tracking-wide shadow-lg
                           hover:shadow-emerald-400/20 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add to Experience</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button 
            onClick={fetchMeals}
            className="group bg-gradient-to-r from-emerald-500 to-cyan-500 p-6 rounded-full shadow-2xl
                     hover:shadow-emerald-400/20 transition-all duration-500 hover:rotate-180 flex items-center
                     justify-center aspect-square"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          ></div>
        ))}
      </div>
    </main>
  );
}
