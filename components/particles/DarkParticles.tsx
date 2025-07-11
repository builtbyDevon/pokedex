"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

export default function DarkParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="dark-particles"
      className="absolute inset-0 rounded-4xl overflow-hidden pointer-events-none z-0"
      options={{
        background: {
          opacity: 0,
        },
        fullScreen: {
          enable: false,
        },
        particles: {
          number: {
            value: 5, // Continuous particles
          },
          shadow: {
            enable: true,
            color: "#2c1810",   // dark brown glow with hint of shadow
            blur: 5,           // softness of the glow
            offset: { x: 0, y: 0 } // centered shadow
          },
          color: {
            value: [
              "#3d2914", // dark chocolate brown
              "#2c1810", // deep espresso
              "#1a0f08", // almost black coffee
              "#4a3426", // dark walnut
              "#614a3b", // shadowy brown
            ]
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 2, max: 5 },
            animation: {
              enable: true,
              speed: 3,
              sync: true,
            },
          },
          move: {
            enable: true,
            direction: "top",
            speed: { min: 6, max: 8 },
            random: true,
            straight: true,
            outModes: {
              default: "out",
            },
          },
          wobble: {
            enable: true,
            distance: 5,
            speed: { min: 52, max: 78 },
          },
      
        },
        detectRetina: true,
        fpsLimit: 120,
      }}
    />
  );
} 