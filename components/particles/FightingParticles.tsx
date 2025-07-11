"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";
import { useTheme } from "next-themes";


interface FightingParticlesProps {
  className?: string;
}

export default function FightingParticles({ className = "" }: FightingParticlesProps) {
  const { theme } = useTheme(); 
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="fighting-particles"
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
                src: "/fighting.png",
                width: 36,
                height: 32
              }
            }
          },
          shadow: {
            enable: true,
            color: theme === 'dark' ? "#ff8533" : "#ff944d",
            blur: 7,
            offset: { x: 0, y: 0 }
          },
          color: {
            value: ["#FFFFFF"],
          },
          size: {
            value: { min: 25, max: 40 },
            animation: {
              enable: true,
              speed: 30,  // Much slower growth
              sync: false,
              startValue: "min",
              destroy: "max"
            },
          },
          opacity: {
            value: { min: 0, max: .3 },
            animation: {
              enable: true,
              speed: 3,  // Slower, smoother fade
              sync: false,
              startValue: "min"
            },
          },
          move: {
            enable: false,
          },
          life: {
            duration: {
              value: { min: 2, max: 3 },  // Longer life for smoother effect
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
              quantity: 2,  // Less fists
              delay: 0.8,   // Slower frequency
            },
            shape: {
              type: "square",
              options: {
                square: {
                  side: 100,
                },
              },
            },
            position: {
              x: 50,
              y: 50,
            },
            size: {
              mode: "percent",
              height: 80,
              width: 80,
            },
          },
        ],
        detectRetina: true,
        fpsLimit: 120,
      }}
    />
  );
}

