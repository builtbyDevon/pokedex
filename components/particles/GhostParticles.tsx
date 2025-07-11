"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";
import { useTheme } from "next-themes";

interface GhostParticlesProps {
  className?: string;
}

export default function GhostParticles({ className = "" }: GhostParticlesProps) {
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
      id="ghost-particles"
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
                src: "/ghost.png",
                width: 36,
                height: 32
              }
            }
          },
          shadow: {
            enable: true,
            color: theme === 'dark' ? "#b19cd9" : "#9370db",
            blur: 7,
            offset: { x: 0, y: 0 }
          },
          color: {
            value: ["#FFFFFF"],
          },
          size: {
            value: { min: 20, max: 35 },
            animation: {
              enable: true,
              speed: 15,  // Slower growth for floaty effect
              sync: false,
              startValue: "min",
              destroy: "max"
            },
          },
          opacity: {
            value: { min: 0, max: 0.4 },
            animation: {
              enable: true,
              speed: 1.5,  // Slower fade for longer visibility
              sync: false,
              startValue: "min"
            },
          },
          move: {
            enable: true,  // Enable movement for floaty effect
            speed: { min: 1, max: 3 },
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out"
            }
          },
          wobble: {
            enable: true,
            distance: 20,
            speed: { min: -5, max: 5 }
          },
          life: {
            duration: {
              value: { min: 8, max: 12 },  // Much longer life - ghosts linger
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
              delay: 0.2,
            },
            rate: {
              quantity: 1,  // Less frequent
              delay: 1.5,   // Slower spawn rate
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