"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";
import { useTheme } from "next-themes";

interface WaterParticlesProps {
  className?: string;
}

export default function WaterParticles({ className = "" }: WaterParticlesProps) {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  // Define colors based on theme
  const rainColors = theme === 'dark' 
    ? ["#B0E0E6", "#87CEEB", "#ADD8E6", "#E0F6FF", "#F0F8FF"] // Lighter blues for dark mode
    : ["#626262", "#4F4F4F", "#6B6B6B", "#5A5A5A", "#707070"]; // Darker grays for light mode

  return (
    <Particles
      id="water-particles"
      className={`absolute inset-0 rounded-4xl overflow-hidden pointer-events-none z-0 ${className}`}
      options={{
        background: {
          opacity: 0,
        },
        fullScreen: {
          enable: false,
        },
        particles: {
          shape: {
            type: "text",
            options: {
              text: {
                value: "|"
              }
            }
          },
          rotate: {
            value: 45,
            random: false,
            direction: "clockwise",
            animation: {
              enable: false
            }
          },
          number: {
            value: 75,
          },
          color: {
            value: rainColors
          },
          size: {
            value: { min: 1, max: 12 },
            animation: {
              enable: true,
              speed: 1,
              sync: true,
            },
          },
          opacity: {
            value: { min: 0.3, max: 0.5 },
            animation: {
              enable: true,
              speed: 0,
              sync: false,
            },
          },
          move: {
            enable: true,
            direction: "bottom-left",
            speed: { min: 35, max: 40 },
            straight: true,
          },
        },
        detectRetina: true,
        fpsLimit: 120,
      }}
    />
  );
}
