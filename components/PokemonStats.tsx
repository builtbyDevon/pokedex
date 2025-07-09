"use client";

import { useState } from 'react';
import InView from './InView';
import Image from 'next/image';


import { TooltipOrPopover } from "@/components/ui/tooltip-or-popover";

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
                <TooltipOrPopover
                    key={index}
                    content={<p className="capitalize">{stat.stat.name.replace("-", " ")}: <strong>{stat.base_stat}</strong></p>}
                >
                    <div className="mb-2 group flex items-center gap-3 justify-center mb-4 max-w-100">
                        <span className="capitalize flex items-center shrink-0 min-w-30 text-left font-bold gap-3"><Image alt={stat.stat.name} width={30} height={30} src={`/stats/`+stat.stat.name+".svg"} />{stat.stat.name === "special-attack" ? "Sp. Attk" : stat.stat.name === "special-defense" ? "Sp. Def" : stat.stat.name}</span>
                        <div className="relative w-full h-2 rounded-lg bg-muted mt-1 mb-1">
                            <div
                                className="w-full group-hover:opacity-80 group-hover:duration-[200ms] transition-all duration-[2000ms] h-2 rounded-lg w-0"
                                style={{ 
                                    width: progbarGrow ? `${convertStatsProgressPercent(stat.base_stat)}%` : '0%', 
                                    backgroundColor: statColors[stat.stat.name.replace("-", "_") as keyof PokemonStatColors],
                                }}
                            ></div>
                        </div>
                    </div>
                </TooltipOrPopover>
            )
            })}
        </InView>
     </div>)
}