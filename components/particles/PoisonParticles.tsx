"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";

interface PoisonParticlesProps {
  className?: string;
}

export default function PoisonParticles({ className = "" }: PoisonParticlesProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="poison-particles"
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
                src: "/bubble.png",
                width: 32,
                height: 32
              }
            }
          },
          wobble: {
            enable: true,
            distance: 8,
            speed: { min: -3, max: 3 }
          },
          color: {
            value: ["#FFFFFF"],
          },
          size: {
            value: { min: 10, max: 50 },
            animation: {
              enable: true,
              speed: 2,
              sync: false,
              startValue: "min"
              // Remove destroy: "max" so they don't pop when reaching max size
            },
          },
          opacity: {
            value: { min: 0.2, max: .7 },
            animation: {
              enable: true,
              speed: 1,
              sync: false,
              startValue: "max",
              destroy: "min"  // Keep this - they fade out naturally
            },
          },
          move: {
            enable: true,
            direction: "top",
            speed: { min: 2, max: 4 },
            straight: false,
            random: true,
          },
          life: {
            duration: {
              value: { min: 8, max: 12 },  // Much longer life to travel higher
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
              quantity: 2,
              delay: 0.8,
            },
            shape: {
              type: "square",
              options: {
                square: {
                  side: 60,
                },
              },
            },
            position: {
              x: 50,
              y: 100,
            },
            size: {
              mode: "percent",
              height: 5,
              width: 60,
            },
            direction: "top",
          },
        ],
        detectRetina: true,
        fpsLimit: 120,
      }}
    />
  );
}
