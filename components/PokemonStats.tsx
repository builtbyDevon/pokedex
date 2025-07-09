"use client";

import { useState } from 'react';
import InView from './InView';

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

  interface Stats {
    stats: Array<{
      base_stat: number;
      stat: {
        name: string;
      }
    }>;
  }

  interface Stat {
    base_stat: number;
    stat: {
      name: string;
    }
  }


interface PokemonStatColors {
    hp: string;
    attack: string;
    defense: string;
    special_attack: string;
    special_defense: string;
    speed: string;
  }

export default function PokemonStats(stats: Stats) {
    const [progbarGrow, setProgBarGrow] = useState(false);

    function convertStatsProgressPercent(number: number) {
        const percent = Math.round(Math.min((number / 180) * 100, 100));
        return percent;
    }

    
    const statColors: PokemonStatColors = {
        hp: "var(--hp)",
        attack: "var(--attack)",
        defense: "var(--defense)",
        special_attack: "var(--special-attack)",
        special_defense: "var(--special-defense)",
        speed: "var(--speed)",
    }

    return (
        <div>
            <InView onEnter={() => setProgBarGrow(true)}>
            {stats.stats.map((stat: Stat, index: number) => {
            return (
                
                <Tooltip key={index} >
                    <TooltipTrigger asChild>
                    <div className="mb-2 flex gap-3 items-left justify-left">
                        <span className="capitalize shrink-0 min-w-18 text-left inline">{stat.stat.name === "special-attack" ? "Sp. Attk" : stat.stat.name === "special-defense" ? "Sp. Def" : stat.stat.name}</span>
                        <div className="relative w-full h-5 rounded-lg bg-muted mt-1 mb-1">
                            <div
                                className="w-full transition-all duration-[2000ms] h-5 rounded-lg w-0"
                                style={{ 
                                    width: progbarGrow ? `${convertStatsProgressPercent(stat.base_stat)}%` : '0%', 
                                    backgroundColor: statColors[stat.stat.name.replace("-", "_") as keyof PokemonStatColors],
                                }}
                            ></div>
                            
                        </div>
                    </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="capitalize">{stat.stat.name.replace("-", " ")}: <strong>{stat.base_stat}</strong></p>
                    </TooltipContent>
                </Tooltip>
            )
            })}
        </InView>
     </div>)
}