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
}'use client';

import { useEffect, useRef } from 'react';
import { tsParticles } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

const defaultConfig = {
  fullScreen: {
    enable: false,
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 30,
      density: {
        enable: false
      }
    },
    shape: {
      type: "circle"
    },
    size: {
      value: 3,
      random: false
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        default: "bounce"
      }
    },
    // Fixed positions to prevent hydration mismatch
    reduceDuplicates: false,
    fixed: {
      enable: true,
      positions: Array(30).fill(null).map((_, i) => ({
        x: (i * 100 / 30), // Evenly distribute x positions
        y: 50 + Math.sin(i * Math.PI / 15) * 30 // Sinusoidal y positions
      }))
    }
  },
  detectRetina: false,
  background: {
    color: "transparent"
  }
};

export default function ParticleBackground({ theme, themes }) {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const initParticles = async () => {
      try {
        await loadFull(tsParticles);

        if (instanceRef.current) {
          await instanceRef.current.destroy();
        }

        const container = containerRef.current;
        if (!container) return;

        instanceRef.current = await tsParticles.load("tsparticles", {
          ...defaultConfig,
          particles: {
            ...defaultConfig.particles,
            color: {
              value: themes[theme].particles.color
            }
          }
        });
      } catch (error) {
        console.error("Failed to initialize particles:", error);
      }
    };

    initParticles();

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }
    };
  }, [theme, themes]);

  return (
    <div
      ref={containerRef}
      id="tsparticles"
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    />
  );
} 