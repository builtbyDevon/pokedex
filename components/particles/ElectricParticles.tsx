"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";

interface ElectricParticlesProps {
  className?: string;
}

export default function ElectricParticles({ className = "" }: ElectricParticlesProps) {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  const lightningColors = theme === 'dark' 
    ? ["#FFFF00", "#FFD700", "#FFFFFF", "#E6E6FA", "#F0F8FF"] // Bright yellows/whites for dark mode
    : ["#FFD700", "#FFA500", "#FFFF00", "#F0E68C", "#FFFACD"]; // Golden yellows for light mode

  const maxOpacity = theme === 'dark' ? 0.05 : 0.2;

  return (
    <Particles
      id="electric-particles"
      className={`absolute inset-0 rounded-4xl overflow-hidden pointer-events-none z-0 ${className}`}
      options={{
        background: {
          opacity: 0,
        },
        fullScreen: {
          enable: false,
        },
        particles: {
          number: {
            value: 0, // Let emitters control creation
          },
          shape: {
            type: "image",
            options: {
              image: {
                src: "/electric.png",
                width: 100,
                height: 50
              }
            }
          },
          shadow: {
            enable: true,
            color: theme === 'dark' ? "#FFFF00" : "#FFD700",   // Electric yellow glow
            blur: 8,           // Softness of the glow
            offset: { x: 0, y: 0 } // Centered shadow for glow effect
          },
          color: {
            value: lightningColors
          },
          size: {
            value: { min: 25, max: 70 },
            animation: {
              enable: false,
            },
          },
          opacity: {
            value: { min: 0, max: maxOpacity },
            animation: {
              enable: true,
              speed: 2,
              sync: false,
            },
          },
          stroke: {
            width: 4,
            color: {
              value: lightningColors
            }
          },
          move: {
            enable: true,
            direction: "right",
            speed: { min: 35, max: 60 },
            straight: true,
            angle: {
              value: 0,
              offset: 45
            },
            outModes: {
              default: "destroy"
            },
          },
          rotate: {
            value: { min: 10, max: 20 },
            random: true,
            direction: "random",
            animation: {
              enable: true,
              speed: 2
            }
          },
          life: {
            duration: {
              value: { min: 0.5, max: 5 },
              sync: false
            },
            count: 1
          },
    
        },
        emitters: [
          {
            autoPlay: true,
            fill: true,
            life: {
              wait: false,
              delay: 0.1,
            },
            rate: {
              quantity: 3,
              delay: 0.2,
            },
            shape: {
              type: "square",
              options: {
                square: {
                  side: 20,
                },
              },
            },
            position: {
              x: 0,
              y: 50,
            },
            size: {
              mode: "percent",
              height: 60,
              width: 5,
            },
            direction: "right",
          },
        ],
        detectRetina: true,
        fpsLimit: 120,
      }}
    />
  );
}