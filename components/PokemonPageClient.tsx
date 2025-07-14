"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PokemonCry from "@/components/PokemonCry";
import AnimationToggle from "@/components/AnimationToggle";
import FireParticles from "@/components/particles/FireParticles";
import FlyingParticles from "@/components/particles/FlyingParticles";
import WaterParticles from "@/components/particles/WaterParticles";
import PoisonParticles from "@/components/particles/PoisonParticles";
import GrassParticles from "@/components/particles/GrassParticles";
import BugParticles from "@/components/particles/BugParticles";
import IceParticles from "@/components/particles/IceParticles";
import FightingParticles from "@/components/particles/FightingParticles";
import ElectricParticles from "@/components/particles/ElectricParticles";
import FairyParticles from "@/components/particles/FairyParticles";
import PsychicParticles from "@/components/particles/PsychicParticles";
import RockParticles from "@/components/particles/RockParticles";
import GroundParticles from "@/components/particles/GroundParticles";
import DragonParticles from "@/components/particles/DragonParticles";
import DarkParticles from "@/components/particles/DarkParticles";
import GhostParticles from "@/components/particles/GhostParticles";
import SteelParticles from "@/components/particles/SteelParticles";

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonDetails {
  name: string;
  image: string;
  cries: {
    latest: string;
  };
}

interface PokemonObject {
  types: PokemonType[];
}

interface PokemonPageClientProps {
  pokemonObject: PokemonObject;
  pokemonDetails: PokemonDetails;
  gradientStyle: React.CSSProperties;
}

export default function PokemonPageClient({ pokemonObject, pokemonDetails, gradientStyle }: PokemonPageClientProps) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Load initial state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pokemon-animations-enabled');
    if (saved !== null) {
      setAnimationsEnabled(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="relative p-2 flex border-1 border-input items-center justify-center rounded-4xl mb-10">
      {/* Gradient background layers */}
      <div
        style={gradientStyle} 
        className="rounded-4xl absolute w-full h-full bg-background"
      />
      
      {/* Animation Toggle */}
      <AnimationToggle onToggle={setAnimationsEnabled} />
      
      {/* Particle Effects - only render when animations are enabled */}
      {animationsEnabled && (
        <>
          {pokemonObject.types.some((t) => t.type.name === 'fire') && (
            <FireParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'flying') && (
            <FlyingParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'water') && (
            <WaterParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'poison') && (
            <PoisonParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'grass') && (
            <GrassParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'bug') && (
            <BugParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'ice') && (
            <IceParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'fighting') && (
            <FightingParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'electric') && (
            <ElectricParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'fairy') && (
            <FairyParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'psychic') && (
            <PsychicParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'rock') && (
            <RockParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'ground') && (
            <GroundParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'dragon') && (
            <DragonParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'dark') && (
            <DarkParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'ghost') && (
            <GhostParticles />
          )}
          {pokemonObject.types.some((t) => t.type.name === 'steel') && (
            <SteelParticles />
          )}
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10 w-full min-h-100 items-center flex">
        <PokemonCry src={pokemonDetails.cries.latest} />
        {pokemonDetails.image && pokemonDetails.name && (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image 
              alt={pokemonDetails.name} 
              width={256} 
              height={256} 
              quality={100} 
              src={pokemonDetails.image}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
} 