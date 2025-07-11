"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

export default function DragonParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="dragon-particles"
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
            color: "#6a4c93",   // purple dragon glow
            blur: 5,           // softness of the glow
            offset: { x: 0, y: 0 } // centered shadow
          },
          color: {
            value: [
              "#e0c3fc", // soft dragon lavender
              "#c3a3f7", // light mystical purple
              "#9bb5ff", // dragon blue
              "#6a4c93", // deep dragon purple
              "#4a90e2", // royal dragon blue
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
            speed: { min: 4, max: 6 },
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