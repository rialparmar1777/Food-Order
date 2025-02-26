'use client';

import { useEffect } from 'react';
import { tsParticles } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

export default function ParticleBackground({ theme, themes }) {
  useEffect(() => {
    const initParticles = async () => {
      try {
        await loadFull(tsParticles);
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

    initParticles();
  }, [theme, themes]);

  return <div id="tsparticles" className="absolute inset-0" />;
}