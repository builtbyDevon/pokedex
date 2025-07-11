"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";

interface GroundParticlesProps {
  className?: string;
}

export default function GroundParticles({ className = "" }: GroundParticlesProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="dirt-particles"
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
            value: 0, // Let emitters control particle creation
          },
          shape: {
            type: "circle",
          },
          color: {
            value: [
              "#3B1F0B", // rich espresso
              "#4B2E2B", // dark chocolate brown
              "#362417", // deep mocha
              "#2C1608", // black coffee
              "#381819", // almost black reddish-brown
              "#1B0C07", // nearly black with a hint of brown
            ]
          },
          size: {
            value: { min: 0.2, max: 2 },
            animation: {
              enable: true,
              speed: 2,
              sync: false,
            },
          },
          opacity: {
            value: { min: 0, max: 0.8 },
            animation: {
              enable: true,
              speed: 1,
              sync: false,
              startValue: "max",
              destroy: "min"
            },
          },
          move: {
            enable: true,
            direction: "bottom",  // Fall down instead of float up
            speed: { min: 8, max: 12 },  // Faster falling
            straight: false,
            random: true,
            gravity: {
              enable: true,
              acceleration: 1.5,  // Stronger gravity
              maxSpeed: 15  // Higher max speed
            },
            outModes: {
              default: "out",
              bottom: "bounce",
              top: "out",
              left: "out",
              right: "out"
            },
          },
          wobble: {
            enable: true,
            distance: 5,  // Less wobble
            speed: { min: -1, max: 1 }  // Slower wobble
          },
          collisions: {
            enable: true,
            maxSpeed: 3  // Small bounces
          },
          life: {
            duration: {
              value: { min: 4, max: 6 },
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
              quantity: 3,  // More particles
              delay: 0.3,
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
              y: -5,  // Start above frame to fall down
            },
            size: {
              mode: "percent",
              height: 0,
              width: 60,
            },
            direction: "bottom",  // Fall down
          },
        ],
        detectRetina: true,
        fpsLimit: 120,
      }}
    />
  );
} 