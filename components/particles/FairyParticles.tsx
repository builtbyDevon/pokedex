"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

export default function FairyParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="fairy-particles"
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
            color: "#c44582",   // glow color (reddish-orange)
            blur: 5,           // softness of the glow
            offset: { x: 0, y: 0 } // centered shadow
          },
          color: {
            value: [
                "#ffe6f0", // blush pink-white
                "#fdd7fa", // cotton candy pink
                "#f9c9ff", // fairy lavender
                "#eebdfd", // pastel violet
                "#d7aefb", // soft orchid
                "#c39bff", // light magical purple
                "#f4c2c2", // light rosy pink
                "#ffd9ec", // peony pink
                "#c44582", // deep berry pink (darker)
                "#a83f6f", // muted magenta rose (darker)
                "#ffb6c1", // light pink (classic)
                "#f6f0ff", // dreamy white-lavender
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
