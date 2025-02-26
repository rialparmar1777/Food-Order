'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParticleBackground = ({ theme, themes }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Generate fixed particle positions in a grid pattern
  const particles = Array.from({ length: themes[theme].particles.number }, (_, i) => {
    const row = Math.floor(i / 10);
    const col = i % 10;
    return {
      id: i,
      baseX: (col / 10) * 100,
      baseY: (row / (themes[theme].particles.number / 10)) * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1,
    };
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const particleOpacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 0.3]);
  const particleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {particles.map((particle) => {
        const distanceFromMouse = Math.sqrt(
          Math.pow(particle.baseX - mousePosition.x, 2) +
          Math.pow(particle.baseY - mousePosition.y, 2)
        );

        const maxDistance = 30;
        const influence = Math.max(0, 1 - distanceFromMouse / maxDistance);
        
        const xOffset = (particle.baseX - mousePosition.x) * influence * -0.5;
        const yOffset = (particle.baseY - mousePosition.y) * influence * -0.5;

        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.baseX + xOffset}%`,
              top: `${particle.baseY + yOffset}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: themes[theme].particles.color,
              opacity: particleOpacity,
              scale: particleScale,
              filter: `blur(${Math.random()}px)`,
              boxShadow: `0 0 ${particle.size * 2}px ${themes[theme].particles.color}`,
            }}
            animate={{
              x: [0, Math.sin(particle.id) * 20, 0],
              y: [0, Math.cos(particle.id) * 20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: particle.speed * 3,
              repeat: Infinity,
              ease: "linear",
            }}
            whileHover={{
              scale: 2,
              opacity: 1,
            }}
          />
        );
      })}

      {/* Ambient Light Effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            ${themes[theme].particles.color}33 0%, 
            transparent 50%)`
        }}
      />

      {/* Dynamic Wave Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${scrollYProgress.get() * 360}deg, 
            transparent 0%, 
            ${themes[theme].particles.color}11 50%, 
            transparent 100%)`,
          transform: `rotate(${scrollYProgress.get() * 360}deg)`,
        }}
      />
    </div>
  );
};

export default ParticleBackground; 