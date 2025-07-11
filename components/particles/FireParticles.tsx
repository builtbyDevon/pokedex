"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

export default function FireParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="fire-particles"
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
            color: "#ff5500",   // glow color (reddish-orange)
            blur: 5,           // softness of the glow
            offset: { x: 0, y: 0 } // centered shadow
          },
          color: {
            value: [
              "#fff3b0", // soft firelight yellow
              "#ffd580", // light golden orange
              "#ffae42", // lighter ember orange
              "#ff7f50", // coral fire orange
              "#ff6347", // soft flame red (tomato)
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
            speed: { min: 2, max: 4 },
            random: true,
            straight: false,
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
