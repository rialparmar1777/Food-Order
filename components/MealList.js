'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Star, Snowflake, Sun, Moon, ShoppingCart, ChevronDown, Clock, Award, Truck, Heart, Share2, Info } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import ClientWrapper from './ClientWrapper';
import ParticleBackground from './ParticleBackground';
import { themes } from '../app/themes';

// Enhanced features animation
const features = [
  {
    icon: <Clock className="w-12 h-12" />,
    title: "24/7 Delivery",
    description: "Order anytime, we deliver round the clock",
    animation: {
      y: [-10, 10],
      scale: [1, 1.1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  },
  {
    icon: <Award className="w-12 h-12" />,
    title: "Premium Quality", 
    description: "Only the finest ingredients make it to your plate",
    animation: {
      y: [10, -10],
      scale: [1, 1.2],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
    }
  },
  {
    icon: <Truck className="w-12 h-12" />,
    title: "Express Delivery",
    description: "Hot and fresh, delivered in 30 minutes",
    animation: {
      y: [-10, 10],
      x: [-20, 20],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
    }
  }
];

export default function MealList() {
  const [theme, setTheme] = useState('summer');
  const [meals, setMeals] = useState([
    {
      id: 1,
      title: "Spicy Chicken Burger",
      description: "Crispy chicken with special sauce",
      image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
      originalPrice: 19.99,
      discountedPrice: 14.99,
      discount: 25,
      rating: 4.5
    },
    {
      id: 2,
      title: "Margherita Pizza",
      description: "Classic Italian pizza with fresh basil", 
      image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
      originalPrice: 24.99,
      discountedPrice: 18.99,
      discount: 25,
      rating: 5
    },
    {
      id: 3,
      title: "Caesar Salad",
      description: "Fresh romaine lettuce with parmesan",
      image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg",
      originalPrice: 14.99,
      discountedPrice: 11.99,
      discount: 25,
      rating: 4
    },
    {
      id: 4,
      title: "Grilled Salmon",
      description: "Fresh Atlantic salmon with herbs",
      image: "https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg",
      originalPrice: 29.99,
      discountedPrice: 22.99,
      discount: 25,
      rating: 4.8
    },
    {
      id: 5,
      title: "Beef Steak",
      description: "Premium cut with garlic butter",
      image: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg",
      originalPrice: 34.99,
      discountedPrice: 26.99,
      discount: 25,
      rating: 4.9
    },
    {
      id: 6,
      title: "Sushi Platter",
      description: "Assorted fresh sushi rolls",
      image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg",
      originalPrice: 39.99,
      discountedPrice: 29.99,
      discount: 25,
      rating: 4.7
    },
    {
      id: 7,
      title: "Pasta Carbonara",
      description: "Creamy pasta with bacon",
      image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
      originalPrice: 18.99,
      discountedPrice: 14.99,
      discount: 25,
      rating: 4.6
    },
    {
      id: 8,
      title: "Fish & Chips",
      description: "Crispy battered fish with fries",
      image: "https://images.pexels.com/photos/4977522/pexels-photo-4977522.jpeg",
      originalPrice: 21.99,
      discountedPrice: 16.99,
      discount: 25,
      rating: 4.4
    },
    {
      id: 9,
      title: "Vegetable Curry",
      description: "Aromatic Indian curry with rice",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
      originalPrice: 17.99,
      discountedPrice: 13.99,
      discount: 25,
      rating: 4.3
    }
  ]);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1]);

  return (
    <ClientWrapper>
      <div className={`relative min-h-screen bg-gradient-to-b ${themes[theme].bg} transition-colors duration-700`}>
        <ParticleBackground theme={theme} themes={themes} />
        
        {/* Theme Toggle - Enhanced Animation */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
          {Object.entries(themes).map(([key, value]) => (
            <motion.button
              key={key}
              onClick={() => setTheme(key)}
              className={`p-4 rounded-full ${theme === key ? value.button : 'bg-black/30'} 
                backdrop-blur-lg border-2 ${theme === key ? 'border-white' : 'border-white/20'}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                y: theme === key ? [0, -8] : 0,
                scale: theme === key ? [1, 1.1] : 1,
              }}
              transition={{ 
                duration: 2, 
                repeat: theme === key ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              {value.icon}
              {theme === key && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/20"
                  animate={{
                    scale: [1, 1.4],
                    opacity: [0.5, 0],
                    rotate: [0, 180],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Hero Section - Enhanced Animation */}
        <section className="relative h-screen flex items-center justify-center text-white px-4">
          <motion.div 
            style={{ y, scale, opacity }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="text-center"
          >
            <motion.h1 
              className="text-6xl font-bold mb-6"
              animate={{ 
                y: [0, -20],
                scale: [1, 1.05]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Delicious Food Delivered
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
              animate={{
                y: [0, -15],
                opacity: [1, 0.8]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              Experience the finest cuisine from the comfort of your home
            </motion.p>
            <motion.button
              whileHover={{ 
                scale: 1.1
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-white text-black px-8 py-3 rounded-full font-semibold"
            >
              Order Now
            </motion.button>
          </motion.div>
        </section>

        {/* Features Section - Enhanced Animation */}
        <section ref={ref} className="py-20 px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.3
                  }
                } : {}}
                whileHover={{
                  scale: 1.05
                }}
              >
                <motion.div 
                  animate={feature.animation}
                  whileHover={{
                    rotate: 360,
                    transition: { duration: 0.5 }
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
                <p className="mt-2 text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Menu Section - Enhanced Animation */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl font-bold text-white mb-12 text-center"
              animate={{
                y: [0, -10],
                scale: [1, 1.05]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Our Menu
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {meals.map((meal, index) => {
                const [cardRef, cardInView] = useInView({
                  threshold: 0.2,
                  triggerOnce: true
                });

                return (
                  <motion.div
                    ref={cardRef}
                    key={meal.id}
                    initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 }}
                    animate={cardInView ? { 
                      opacity: 1, 
                      y: 0,
                      x: 0,
                      transition: {
                        type: "spring",
                        damping: 20,
                        stiffness: 100,
                        delay: index * 0.1
                      }
                    } : {}}
                    whileHover={{ 
                      scale: 1.05
                    }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden transform-gpu"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img 
                        src={meal.image} 
                        alt={meal.title} 
                        className="w-full h-full object-cover"
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 3,
                          transition: { duration: 0.5 }
                        }}
                      />
                      <motion.div 
                        className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm"
                        initial={{ rotate: -15, scale: 0 }}
                        animate={{ 
                          rotate: 0,
                          scale: [1, 1.2],
                        }}
                        transition={{ 
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      >
                        -{meal.discount}%
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white">{meal.title}</h3>
                      <p className="text-gray-300 mt-2">{meal.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <span className="text-gray-400 line-through">${meal.originalPrice}</span>
                          <span className="text-white font-bold ml-2">${meal.discountedPrice}</span>
                        </div>
                        <div className="flex items-center">
                          <motion.div
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.2]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.2
                            }}
                          >
                            <Star className="w-5 h-5 text-yellow-400" />
                          </motion.div>
                          <span className="text-white ml-1">{meal.rating}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ 
                          scale: 1.05
                        }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full mt-4 ${themes[theme].button} text-white py-2 rounded-full font-semibold flex items-center justify-center gap-2`}
                        onClick={() => {
                          setCart([...cart, meal]);
                          setIsCartOpen(true);
                        }}
                      >
                        <motion.div
                          animate={{
                            y: [0, -4],
                            rotate: [0, -10]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </motion.div>
                        Add to Cart
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Shopping Cart - Enhanced Animation */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 100
                }
              }}
              exit={{ 
                x: '100%', 
                opacity: 0,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 100
                }
              }}
              className="fixed top-0 right-0 h-full w-96 bg-white/10 backdrop-blur-lg p-6 shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <motion.h3 
                  className="text-2xl font-bold text-white"
                  animate={{
                    y: [0, -5],
                    scale: [1, 1.05]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Your Cart
                </motion.h3>
                <motion.button 
                  onClick={() => setIsCartOpen(false)} 
                  className="text-white"
                  whileHover={{
                    rotate: [0, 180],
                    scale: 1.2,
                    transition: { duration: 0.3 }
                  }}
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.button>
              </div>
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: {
                      delay: index * 0.1
                    }
                  }}
                  whileHover={{
                    scale: 1.02,
                    x: 10,
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-center gap-4 mb-4 bg-white/5 p-4 rounded-lg"
                >
                  <motion.img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-20 h-20 object-cover rounded"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                  />
                  <div>
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="text-gray-300">${item.discountedPrice}</p>
                  </div>
                </motion.div>
              ))}
              <div className="mt-auto">
                <div className="flex justify-between text-white mb-4">
                  <span>Total:</span>
                  <motion.span
                    animate={{
                      scale: [1, 1.1],
                      color: ['#fff', themes[theme].particles.color]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ${cart.reduce((sum, item) => sum + item.discountedPrice, 0).toFixed(2)}
                  </motion.span>
                </div>
                <motion.button
                  whileHover={{ 
                    scale: 1.05
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full ${themes[theme].button} text-white py-3 rounded-full font-semibold`}
                >
                  Checkout
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClientWrapper>
  );
}