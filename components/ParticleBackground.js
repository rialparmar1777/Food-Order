'use client';

import { useCallback } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

export default function ParticleBackground({ theme, themes }) {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = {
    particles: {
      number: {
        value: themes[theme].particles.number,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: themes[theme].particles.color
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5,
        random: false,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: themes[theme].particles.color,
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "out"
        },
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5
          }
        },
        push: {
          quantity: 4
        }
      }
    },
    background: {
      color: {
        value: "transparent"
      }
    },
    fullScreen: {
      enable: true,
      zIndex: 0
    },
    detectRetina: true,
    fpsLimit: 60
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      className="absolute inset-0"
    />
  );
} 