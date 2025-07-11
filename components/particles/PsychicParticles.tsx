"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

export default function PsychicParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="psychic-particles"
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
            value: 20,  // Same as FlyingParticles
          },
          shadow: {
            enable: true,
            color: "#b892ff",
            blur: 5,
            offset: { x: 0, y: 0 }
          },
          color: {
            value: [
              "#f8e1f4", // pale psychic haze
              "#e6b0dc", // soft psychic lavender
              "#d084c1", // medium orchid pink
              "#b64aa7", // strong psychic magenta
              "#a23e94", // vivid mystic violet
              "#8e2f7e", // deep mental purple
              "#7a1c6c", // plum core
              "#d13679", // astral rose
              "#bd1e6e", // psychic crimson
              "#a01357", // dark magenta red
              "#ff77ff", // neon mental flash
              "#fce3ff"  // pale ethereal pink-lavender
            ]
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 2 },  // Same as FlyingParticles
            animation: {
              enable: true,
              speed: 5,  // Same as FlyingParticles
              sync: false,
            },
          },
          opacity: {
            value: { min: 0.1, max: 0.8 },  // Same as FlyingParticles
            animation: {
              enable: true,
              speed: 6,  // Same as FlyingParticles
              sync: false,
            },
          },
          move: {
            enable: true,
            direction: "inside",  // REVERSED from "outside"
            speed: { min: 5, max: 10 },  // Same as FlyingParticles
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
