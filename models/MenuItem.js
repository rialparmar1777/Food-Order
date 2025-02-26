'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Star, Snowflake, Sun, Moon, ShoppingCart, ChevronDown, Clock, Award, Truck, Heart, Share2, Info } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import ClientWrapper from './ClientWrapper';
import ParticleBackground from './ParticleBackground';

// Enhanced theme configuration
const themes = {
  summer: {
    bg: 'from-amber-900 via-rose-900 to-slate-900',
    button: 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-rose-500 hover:to-amber-500',
    text: 'text-amber-400',
    accent: 'amber',
    icon: <Sun className="w-8 h-8 text-amber-400" />,
    particles: {
      color: '#f59e0b',
      number: 50
    }
  },
  winter: {
    bg: 'from-blue-900 via-indigo-900 to-slate-900',
    button: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500',
    text: 'text-blue-400',
    accent: 'blue',
    icon: <Snowflake className="w-8 h-8 text-blue-400" />,
    particles: {
      color: '#3b82f6',
      number: 30
    }
  },
  night: {
    bg: 'from-purple-900 via-violet-900 to-slate-900',
    button: 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-violet-500 hover:to-purple-500',
    text: 'text-purple-400',
    accent: 'purple',
    icon: <Moon className="w-8 h-8 text-purple-400" />,
    particles: {
      color: '#a855f7',
      number: 40
    }
  }
};


// Enhanced features data with animations
const features = [
  {
    icon: <Clock className="w-12 h-12" />,
    title: "24/7 Delivery",
    description: "Order anytime, we deliver round the clock",
    animation: {
      rotate: [0, 360],
      transition: { duration: 20, repeat: Infinity, ease: "linear" }
    }
  },
  {
    icon: <Award className="w-12 h-12" />,
    title: "Premium Quality",
    description: "Only the finest ingredients make it to your plate",
    animation: {
      scale: [1, 1.2, 1],
      transition: { duration: 2, repeat: Infinity }
    }
  },
  {
    icon: <Truck className="w-12 h-12" />,
    title: "Express Delivery",
    description: "Hot and fresh, delivered in 30 minutes",
    animation: {
      x: [-20, 20, -20],
      transition: { duration: 3, repeat: Infinity }
    }
  }
];

// Interactive 3D Card component
function Card3D({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = (e.clientY - rect.top - rect.height / 2) / 10;
    setPosition({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovered ? `perspective(1000px) rotateX(${position.y}deg) rotateY(${position.x}deg)` : 'none',
        transition: 'transform 0.3s ease',
      }}
    >
      {children}
    </motion.div>
  );
}

// Enhanced Countdown Timer with pulsing effect
function CountdownTimer() {
  const [time, setTime] = useState(3600);
  const pulseScale = useMotionValue(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 0) return 3600;
        if (prev <= 300) pulseScale.set(1.2); // Pulse effect in last 5 minutes
        setTimeout(() => pulseScale.set(1), 200);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <motion.div 
      className="flex items-center gap-4 text-3xl font-mono"
      style={{ scale: pulseScale }}
    >
      <div className="flex flex-col items-center">
        <span className="bg-white/20 px-6 py-3 rounded-lg">{minutes.toString().padStart(2, '0')}</span>
        <span className="text-sm mt-1">MINUTES</span>
      </div>
      <span className="text-4xl">:</span>
      <div className="flex flex-col items-center">
        <span className="bg-white/20 px-6 py-3 rounded-lg">{seconds.toString().padStart(2, '0')}</span>
        <span className="text-sm mt-1">SECONDS</span>
      </div>
    </motion.div>
  );
}

// Enhanced meal card with 3D effect and more interactions
function MealCard({ meal, theme, inView, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50 * (index + 1)]);
  const springConfig = { stiffness: 100, damping: 5 };
  const scaleSpring = useSpring(1, springConfig);

  useEffect(() => {
    scaleSpring.set(isHovered ? 1.05 : 1);
  }, [isHovered, scaleSpring]);

  return (
    <Card3D>
      <motion.article
        style={{ y, scale: scaleSpring }}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.2 }}
        className="group relative bg-black/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.8 }}
        />

        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={meal.image}
            alt={meal.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            animate={{ opacity: isHovered ? 0.9 : 0.7 }}
          />
          
          {/* Interactive buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute top-4 right-4 flex gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full ${isLiked ? 'bg-red-500' : 'bg-white/20'}`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/20"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/20"
            >
              <Info className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <motion.div
            className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5 }}
          >
            {meal.discount}% OFF
          </motion.div>
        </div>

        <motion.div 
          className="p-6 space-y-4"
          animate={{ y: isHovered ? -5 : 0 }}
        >
          <h3 className="text-2xl font-bold text-white">{meal.title}</h3>
          <p className="text-gray-300">{meal.description}</p>
          
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through text-lg">${meal.originalPrice}</span>
                <motion.span 
                  className="text-3xl font-bold text-white"
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                >
                  ${meal.discountedPrice}
                </motion.span>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: i < meal.rating ? 1.2 : 1,
                      rotate: isHovered ? [0, 360] : 0 
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Star
                      className={`w-5 h-5 ${i < meal.rating ? 'fill-yellow-400' : 'text-gray-400'}`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${themes[theme].button} px-6 py-3 rounded-lg text-white flex items-center gap-2 relative overflow-hidden`}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                animate={{ x: isHovered ? '100%' : '-100%' }}
                transition={{ duration: 0.5 }}
              />
              <ShoppingCart className="w-5 h-5" />
              Order Now
            </motion.button>
          </div>
        </motion.div>
      </motion.article>
    </Card3D>
  );
}

export default function MealList() {
  const [theme, setTheme] = useState('summer');
  const [meals, setMeals] = useState([
    {
      id: 1,
      title: "Spicy Chicken Burger",
      description: "Crispy chicken with special sauce",
      image: "/chicken-burger.jpg",
      originalPrice: 19.99,
      discountedPrice: 14.99,
      discount: 25,
      rating: 4
    },
    {
      id: 2, 
      title: "Margherita Pizza",
      description: "Classic Italian pizza with fresh basil",
      image: "/margherita-pizza.jpg",
      originalPrice: 24.99,
      discountedPrice: 18.99,
      discount: 25,
      rating: 5
    },
    {
      id: 3,
      title: "Caesar Salad",
      description: "Fresh romaine lettuce with parmesan",
      image: "/caesar-salad.jpg", 
      originalPrice: 14.99,
      discountedPrice: 11.99,
      discount: 25,
      rating: 4
    }
  ]);
  const [activeFeature, setActiveFeature] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ClientWrapper>
      <div className={`relative min-h-screen bg-gradient-to-b ${themes[theme].bg} transition-colors duration-700`}>
        <ParticleBackground theme={theme} themes={themes} />

        {/* Hero Section with enhanced animations */}
        <motion.section 
          className="relative z-10 h-screen flex flex-col items-center justify-center overflow-hidden px-4"
          style={{ opacity }}
        >
          <motion.div 
            className="text-center space-y-12 backdrop-blur-lg bg-black/30 p-16 rounded-3xl max-w-5xl relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="absolute inset-0 rounded-3xl"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-9xl font-bold relative"
              animate={{ 
                backgroundImage: [
                  'linear-gradient(45deg, #fff, #ccc)',
                  'linear-gradient(45deg, #ccc, #fff)',
                  'linear-gradient(45deg, #fff, #ccc)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Limited Time Offer
              <motion.div
                className="absolute -inset-4 border border-white/20 rounded-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.h1>
            
            <div className="space-y-8">
              <motion.p 
                className="text-3xl text-white/90"
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  y: [0, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Special Discount Ends In
              </motion.p>
              <CountdownTimer />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${themes[theme].button} text-white px-12 py-6 rounded-full text-2xl font-bold relative overflow-hidden group`}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Order Now & Save 25%
              <motion.div
                className="absolute inset-0 border-2 border-white/20 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8"
          >
            <ChevronDown className="w-12 h-12 text-white" />
          </motion.div>
        </motion.section>

        {/* Enhanced Features Section */}
        <section className="relative z-10 py-24 bg-black/30 backdrop-blur-lg">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-8 relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: activeFeature === index ? 1 : 0.7,
                    y: 0,
                    scale: activeFeature === index ? 1.05 : 1
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-xl"
                    animate={{
                      scale: activeFeature === index ? [1, 1.05, 1] : 1,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className={`text-${themes[theme].accent}-400 mb-4 relative`}
                    animate={feature.animation}
                  >
                    {feature.icon}
                    <motion.div
                      className="absolute inset-0 bg-current rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0, 0.2],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Menu Preview Section */}
        <section ref={ref} className="relative z-10 container mx-auto py-24 px-4">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-center text-white mb-16 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Featured Specials
            <motion.div
              className="absolute -inset-8 border border-white/20 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.1, 0.3],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            <AnimatePresence>
              {meals.map((meal, index) => (
                <MealCard 
                  key={meal.id} 
                  meal={meal} 
                  theme={theme}
                  inView={inView}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Enhanced Theme Toggle */}
        <motion.button
          onClick={() => setTheme(t => t === 'summer' ? 'winter' : t === 'winter' ? 'night' : 'summer')}
          className={`fixed bottom-8 right-8 p-4 rounded-full ${themes[theme].button} z-50 relative group`}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          aria-label="Change theme"
        >
          {themes[theme].icon}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.button>
      </div>
    </ClientWrapper>
  );
} 