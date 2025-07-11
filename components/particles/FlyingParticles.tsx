"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";
import { useTheme } from "next-themes";

interface FlyingParticlesProps {
  className?: string;
}

export default function FlyingParticles({ className = "" }: FlyingParticlesProps) {
  const { theme } = useTheme(); 
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="flying-particles"
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
            value: 20,
          },
          shape: {
            type: "circle"
          },
          color: {
            value: theme === 'dark' 
              ? ["#87CEEB", "#B0E0E6", "#F0F8FF", "#E6E6FA", "#D3D3D3", "#C0C0C0", "#FFFFFF"] // Original light colors for dark mode
              : ["#4A4A4A", "#5A5A5A", "#6A6A6A", "#7A7A7A", "#8A8A8A", "#9A9A9A", "#AAAAAA"], // Darker grays for light mode
          },
          size: {
            value: { min: 0.5, max: 2 },
            animation: {
              enable: true,
              speed: 5,
              sync: false,
            },
          },
          rotate: {
            value: 0,
            random: false,
            direction: "clockwise",
            animation: {
              enable: true,
              speed: 0
            }
          },
          opacity: {
            value: { min: 0.1, max: theme === 'dark' ? 0.2 : 0.8 },
            animation: {
              enable: true,
              speed: 6,
              sync: false,
            },
          },
          move: {
            enable: true,
            direction: "outside",
            speed: { min: 15, max: 25 },
            straight: false,
            random: true,
            outModes: {
              default: "out"
            }
          },
        },
        detectRetina: true,
        fpsLimit: 120,
      }}
    />
  );
}
