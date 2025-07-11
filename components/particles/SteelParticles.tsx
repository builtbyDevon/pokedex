"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

export default function SteelParticles() {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="steel-particles"
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
            color: theme === 'dark' ? "#2f2f2f" : "#c0c0c0",   // Dark gray in dark mode, silver in light mode
            blur: 5,           // softness of the glow
            offset: { x: 0, y: 0 } // centered shadow
          },
          color: {
            value: "transparent"  // Make fill completely transparent
          },
          shape: {
            type: "polygon",
          },
          size: {
            value: { min: 4, max: 12 },  // Bigger than fire particles
            animation: {
              enable: true,
              speed: 3,
              sync: true,
            },
          },
          stroke: {
            width: 2,
            color: {
              value: theme === 'dark' 
                ? ["#404040", "#2f2f2f", "#4a4a4a", "#1a1a1a", "#363636"] // Darker steel colors for dark mode
                : ["#808080", "#696969", "#778899", "#2f4f4f", "#708090"] // Original steel colors for light mode
            }
          },
          opacity: {
            value: { min: 0.4, max: 0.6 },  // Softer opacity for gentler outlines
            animation: {
              enable: true,
              speed: 2,
              sync: false,
            },
          },
          rotate: {
            value: { min: 0, max: 360 },
            animation: {
              enable: true,
              speed: 3,  // Slow rotation speed
              sync: false,
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
      
        },
        detectRetina: true,
        fpsLimit: 120,
      }}
    />
  );
} 