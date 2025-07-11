"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";

interface GrassParticlesProps {
  className?: string;
}

export default function GrassParticles({ className = "" }: GrassParticlesProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="grass-particles"
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
            type: "image",
            options: {
              image: {
                src: "/grass.png",
                width: 32,
                height: 32
              }
            }
          },
          rotate: {
            value: 0,
            random: true,
            animation: {
              enable: true,
              speed: 10
            }
          },
          color: {
            value: ["#228B22", "#32CD32", "#90EE90", "#ADFF2F"] // Various greens
          },
          size: {
            value: { min: 8, max: 35 },
            animation: {
              enable: true,
              speed: 2,
              sync: false,
            },
          },
          opacity: {
            value: { min: 0, max: .7 },
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
            direction: "top",
            speed: { min: 3, max: 6 },
            straight: false,
            random: true,
            gravity: {
              enable: true,
              acceleration: 0.5,
              maxSpeed: 2
            },
            outModes: {
              default: "out",
              bottom: "destroy",
              top: "out",
              left: "out",
              right: "out"
            },
          },
          wobble: {
            enable: true,
            distance: 15,
            speed: { min: -2, max: 2 }
          },
          life: {
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
              quantity: 1,
              delay: 0.3,
            },
            shape: {
              type: "square",
              options: {
                square: {
                  side: 80,
                },
              },
            },
            position: {
              x: 50,
              y: 105, // Start below frame so they float in naturally
            },
            size: {
              mode: "percent",
              height: 0,
              width: 80,
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
