"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

export default function BugParticles() {
  const { theme } = useTheme(); 
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
            value: 10, // Continuous particles
          },
          shadow: {
            enable: true,
            color: theme === 'dark' ? "#e6ff00" : "#006400",   // glow color (bright yellow for dark, dark green for light)
            blur: 5,           // softness of the glow
            offset: { x: 0, y: 0 } // centered shadow
          },
          color: {
            value: [
                "#e6ff00", // neon yellow-green
                "#ccff33", // soft lime
                "#b6ff00", // bright chartreuse
                "#a1ff0a", // juicy bug green
                "#7fff00", // vivid grass green
                "#4cff00", // glow stick green
                "#dfff00", // firefly yellow
              ]
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 0, max: 3 },
            animation: {
              enable: true,
              speed: 3,
              sync: false,
            },
          },
          opacity: {
            value: { min: .5, max: 0.9 },
            animation: {
              enable: true,
              speed: 20,
              sync: false,
              startValue: "max",
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
            speed: { min: 90, max: 120 },
          },
      
        },
        detectRetina: true,
        fpsLimit: 120,
      }}
    />
  );
}
