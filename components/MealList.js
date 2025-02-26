'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Star, Snowflake, Sun, Moon } from 'lucide-react';
import { tsParticles } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

// Sample advertisement data
const advertisements = [
  {
    id: 1,
    title: "Deluxe Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3",
    description: "A juicy beef patty with fresh vegetables and special sauce",
    rating: 4,
    discount: "20% OFF",
    originalPrice: 15.99,
    discountedPrice: 12.79
  },
  {
    id: 2, 
    title: "Supreme Pizza",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-4.0.3",
    description: "Hand-tossed pizza with premium toppings and melted cheese",
    rating: 5,
    discount: "15% OFF", 
    originalPrice: 19.99,
    discountedPrice: 16.99
  },
  {
    id: 3,
    title: "Fresh Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3",
    description: "Crisp garden vegetables with house-made dressing",
    rating: 4,
    discount: "10% OFF",
    originalPrice: 12.99,
    discountedPrice: 11.69
  },
  {
    id: 4,
    title: "BBQ Ribs",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3",
    description: "Slow-cooked ribs with tangy BBQ sauce",
    rating: 5,
    discount: "25% OFF",
    originalPrice: 22.99,
    discountedPrice: 17.24
  },
  {
    id: 5,
    title: "Grilled Chicken",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3",
    description: "Tender grilled chicken with fresh herbs",
    rating: 4,
    discount: "15% OFF",
    originalPrice: 14.99,
    discountedPrice: 12.74
  },
  {
    id: 6,
    title: "Vegetarian Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3",
    description: "Loaded with fresh vegetables and cheese",
    rating: 4,
    discount: "10% OFF",
    originalPrice: 18.99,
    discountedPrice: 17.09
  },
  {
    id: 7,
    title: "Pasta Alfredo",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?ixlib=rb-4.0.3",
    description: "Creamy Alfredo pasta with a rich cheese sauce",
    rating: 5,
    discount: "20% OFF",
    originalPrice: 16.99,
    discountedPrice: 13.59
  },
  {
    id: 8,
    title: "Fish Tacos",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3",
    description: "Crispy fish with tangy salsa in soft tacos",
    rating: 5,
    discount: "15% OFF",
    originalPrice: 13.99,
    discountedPrice: 11.89
  },
  {
    id: 9,
    title: "Veggie Wrap",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3",
    description: "Healthy wrap with fresh vegetables and a zesty dressing",
    rating: 4,
    discount: "5% OFF",
    originalPrice: 10.99,
    discountedPrice: 10.44
  }
];

const MealList = () => {
  const [theme, setTheme] = useState('summer');
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Enhanced scroll-based animations
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '25%', '0%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 360]);
  
  // Particle configuration with dynamic movement
  const particlesInit = async (engine) => {
    try {
      await loadFull(engine);
      await tsParticles.load("tsparticles", {
        particles: {
          number: { value: themes[theme].particles.number },
          color: { value: themes[theme].particles.color },
          opacity: { value: 0.5 },
          size: { value: 3 },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            outModes: "bounce"
          }
        }
      });
    } catch (error) {
      console.error("Failed to initialize particles:", error);
    }
  };
  
  // Dynamic theme configuration with enhanced animations
  const themes = {
    summer: {
      bg: 'from-amber-900 via-rose-900 to-slate-900',
      particles: { color: '#f59e0b', number: 50 },
      button: 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-rose-500 hover:to-amber-500',
      text: 'text-amber-400',
      icon: <Sun className="w-8 h-8 text-amber-400" />
    },
    winter: {
      bg: 'from-blue-900 via-indigo-900 to-slate-900',
      particles: { color: '#3b82f6', number: 100 },
      button: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500',
      text: 'text-blue-400',
      icon: <Snowflake className="w-8 h-8 text-blue-400" />
    }
  };

  useEffect(() => {
    // Set initial ads data with staggered loading
    const loadAdsWithDelay = async () => {
      setIsLoading(true);
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      
      for (let i = 0; i < advertisements.length; i++) {
        await delay(100);
        setAds(prev => [...prev, advertisements[i]]);
      }
      
      setIsLoading(false);
    };
    
    loadAdsWithDelay();
  }, []);

  const RatingStars = ({ rating }) => (
    <motion.div 
      className="flex gap-1"
      whileHover={{ scale: 1.1 }}
    >
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? 'fill-current' : ''} ${themes[theme].text}`}
        />
      ))}
    </motion.div>
  );

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-screen"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={`w-16 h-16 border-4 border-t-transparent rounded-full ${themes[theme].text}`}
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`min-h-screen bg-gradient-to-b ${themes[theme].bg}`}
      style={{ opacity }}
    >
      {/* Animated Particles Background */}
      <div id="tsparticles" className="absolute inset-0" />

      {/* Enhanced Parallax Hero Section */}
      <motion.section 
        style={{ y, rotate }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          style={{ scale }}
          className="text-center space-y-8 backdrop-blur-lg bg-black/30 p-12 rounded-3xl"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0%', '100%'],
              filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)']
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            Culinary Excellence
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
            whileTap={{ scale: 0.9 }}
            className={`${themes[theme].button} text-white px-8 py-4 rounded-full text-xl`}
          >
            Explore Offers
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Dynamic Meal Cards with Enhanced Animations */}
      <section className="relative z-10 container mx-auto py-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          {ads.map((ad, i) => (
            <motion.article
              key={ad.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  type: 'spring',
                  bounce: 0.4,
                  duration: 0.8,
                  delay: i * 0.2
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                scale: 1.05,
                transition: { type: 'spring', stiffness: 300 }
              }}
              className="group relative bg-black/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all"
            >
              <div className="relative h-96 overflow-hidden">
                <motion.img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ 
                    scale: 1.2,
                    transition: { duration: 0.8, ease: "easeOut" }
                  }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 0.8 }}
                />
              </div>

              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <motion.h2 
                    className="text-2xl font-bold text-white"
                    whileHover={{ scale: 1.05, x: 10 }}
                  >
                    {ad.title}
                  </motion.h2>
                  <motion.span 
                    className={`${themes[theme].button} px-4 py-2 rounded-full text-sm text-white`}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  >
                    {ad.discount}
                  </motion.span>
                </div>

                <RatingStars rating={ad.rating} />

                <div className="space-y-4">
                  <motion.p 
                    className="text-gray-300 leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {ad.description}
                  </motion.p>
                  <div className="flex justify-between items-center">
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <span className="line-through text-gray-500">${ad.originalPrice}</span>
                      <span className={`ml-4 text-2xl ${themes[theme].text}`}>
                        ${ad.discountedPrice}
                      </span>
                    </motion.div>
                    <motion.button
                      whileHover={{ 
                        scale: 1.1,
                        transition: { type: 'spring', stiffness: 400 }
                      }}
                      whileTap={{ scale: 0.9 }}
                      className={`${themes[theme].button} px-6 py-3 rounded-xl text-white`}
                    >
                      Order Now
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Enhanced Theme Toggle with Dynamic Effects */}
      <motion.button
        onClick={() => setTheme(t => t === 'summer' ? 'winter' : 'summer')}
        className={`fixed bottom-8 right-8 p-4 backdrop-blur-lg bg-black/30 rounded-full border border-white/10 hover:border-white/30 transition-all ${themes[theme].text}`}
        whileHover={{ 
          scale: 1.2,
          rotate: 180,
          boxShadow: '0 0 20px rgba(255,255,255,0.3)'
        }}
        whileTap={{ scale: 0.9 }}
        initial={{ rotate: 0 }}
        animate={{ 
          rotate: theme === 'summer' ? 0 : 180,
          transition: { type: 'spring', stiffness: 200 }
        }}
      >
        {themes[theme].icon}
      </motion.button>
    </motion.div>
  );
};

export default MealList;
