"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";

interface RockParticlesProps {
  className?: string;
}

export default function RockParticles({ className = "" }: RockParticlesProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="rock-particles"
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
                src: "/rock.png",
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
              speed: 8
            }
          },
          color: {
            value: ["#8B4513", "#A0522D", "#D2691E", "#CD853F", "#DEB887"] // Various browns/tans
          },
          size: {
            value: { min: 6, max: 25 },
            animation: {
              enable: true,
              speed: 1,
              sync: false,
            },
          },
          opacity: {
            value: { min: 0, max: .8 },
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
              startValue: "max",
              destroy: "min"
            },
          },
          move: {
            enable: true,
            direction: "bottom-left",
            speed: { min: 10, max: 15 },
            straight: true,
            random: false,
            gravity: {
              enable: true,
              acceleration: 2,
              maxSpeed: 1
            },
            outModes: {
              default: "bounce",
              bottom: "bounce",
              top: "out",
              left: "bounce",
              right: "bounce"
            },
          },
          collisions: {
            enable: true,
            maxSpeed: 25
          },
          wobble: {
            enable: true,
            distance: 8,
            speed: { min: -3, max: 3 }
          },
          life: {
            duration: {
              value: { min: 25, max: 30 },
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
              delay: 2,
            },
            rate: {
              quantity: 1,
              delay: 0.8,
            },
            shape: {
              type: "square",
              options: {
                square: {
                  side: 70,
                },
              },
            },
            position: {
              x: 50,
              y: -5, // Start above frame so they fall in naturally
            },
            size: {
              mode: "percent",
              height: 0,
              width: 70,
            },
            direction: "bottom",
          },
        ],
        detectRetina: true,
        fpsLimit: 120,
      }}
    />
  );
} 