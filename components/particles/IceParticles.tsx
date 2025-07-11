"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";
import { useTheme } from "next-themes";


interface IceParticlesProps {
  className?: string;
}

export default function IceParticles({ className = "" }: IceParticlesProps) {
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
      id="ice-particles"
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
            type: "image",
            options: {
              image: {
                src: "/ice.png",
                width: 36,
                height: 32
              }
            }
            
          },
          shadow: {
            enable: true,
            color: theme === 'dark' ? "rgb(78, 223, 255)" : "#c0e8ff",   // light blue glow
            blur: 2,           // softness of the glow
            offset: { x: 0, y: 0 } // centered shadow
          },
          wobble: {
            enable: true,
            distance: 5,
            speed: { min: -2, max: 2 }
          },
          
          rotate: {
            value: 50,
            random: false,
            direction: "clockwise",
            animation: {
              enable: true,
              speed: 2
            }
          },
          number: {
            value: 25,
          },
          color: {
            value: [
              "#FFFFFF", // Sky Blue
            ]
          },
          size: {
            value: { min: 3, max: 30 },
            animation: {
              enable: true,
              speed: 1,
              sync: true,
            },
          },
          opacity: {
            value: theme === 'dark' ? { min: 0.1, max: 0.2 } : { min: 0.3, max: 0.5 },
            animation: {
              enable: true,
              speed: .1,
              sync: false,
            },
          },
          move: {
            enable: true,
            direction: "bottom", // or "out"
            speed: { min: 1, max: 2 },
            straight: true,
          },
        },
        detectRetina: true,
        fpsLimit: 120,
      }}
    />
  );
}
