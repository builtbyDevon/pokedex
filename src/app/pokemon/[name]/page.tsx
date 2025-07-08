import Image from "next/image";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"


interface PokemonDetails {
    name: string;
    height: string;
    weight: string;
    type: string;
    image: string;
    stats: any;
  }

  interface PokemonStatColors {
    hp: string;
    attack: string;
    defense: string;
    special_attack: string;
    special_defense: string;
    speed: string;
  }
  
  interface Evolution {
    name: string;
    image: string;
    level?: number; // Track evolution level for positioning
    evolvesFrom?: string; // Track what this evolves from
  }
  
  // Add proper types for evolution chain
  interface EvolutionChain {
    species: {
        name: string;
    };
    evolves_to: EvolutionChain[];
  }

  interface EvolutionChainResponse {
    chain: EvolutionChain;
  }

interface PageProps {
    params: Promise<{ name: string }>;
  }

export async function generateStaticParams(): Promise<
  { params: { name: string } }[]
> {
  // Get all Pokemon (not just first 151)
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
  const data = await res.json();

  return data.results.map((pokemon: { name: string }) => ({
    params: { name: pokemon.name },
  }));
}



export default async function Page({params}: PageProps) {

    const { name } = await params; // 🔑 unwrap the promise

    function convertHeight(dm: number): string {
        const inchesTotal = dm * 3.937; // 1 dm = 3.937 inches
        const feet = Math.floor(inchesTotal / 12);
        const inches = Math.round(inchesTotal % 12);
        return `${feet}' ${inches < 10 ? '0' : ''}${inches}"`;
    }

    function convertWeight(hg: number): string {
        const kg = hg / 10; // Convert hectograms to kilograms
        const lbs = kg * 2.20462; // Convert kilograms to pounds
        return `${lbs.toFixed(1)} lbs`;
    }

    function convertStatsProgressPercent(number: number) {
        const percent = Math.round(Math.min((number / 180) * 100, 100));
        return percent;
    }

    async function getPokemonDetails(pokename: string) { 
        const pokemonDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`);
        const pokemonDetailsJson = await pokemonDetails.json();
        
        return pokemonDetailsJson;
    };

    async function getPokemonEvolutions(pokename: string) {
        try {
            const getEvolutionChainUrl = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokename}`);
            
            // Check if the response is ok (not 404)
            if (!getEvolutionChainUrl.ok) {
                console.log(`No evolution chain found for ${pokename}`);
                return []; // Return empty array for Pokemon without evolutions
            }
            
            const getEvolutionChainJsonUrl = await getEvolutionChainUrl.json();

            // Check if evolution_chain exists
            if (!getEvolutionChainJsonUrl.evolution_chain) {
                console.log(`No evolution chain data for ${pokename}`);
                return [];
            }

            const evolutionChainUrl = getEvolutionChainJsonUrl.evolution_chain.url;

            const getEvolutions = await fetch(evolutionChainUrl);
            
            // Check if evolution chain fetch is ok
            if (!getEvolutions.ok) {
                console.log(`Failed to fetch evolution chain for ${pokename}`);
                return [];
            }
            
            const getEvolutionsJson: EvolutionChainResponse = await getEvolutions.json();

            // Recursive function to get all evolutions with their relationships
            function getAllEvolutionsWithRelations(chain: EvolutionChain, level: number = 0, evolvesFrom?: string): Array<{name: string, level: number, evolvesFrom?: string}> {
                const evolutions: Array<{name: string, level: number, evolvesFrom?: string}> = [];
                
                // Add the current species
                evolutions.push({
                    name: chain.species.name,
                    level: level,
                    evolvesFrom: evolvesFrom
                });
                
                // Recursively add all possible evolutions
                if (chain.evolves_to && chain.evolves_to.length > 0) {
                    chain.evolves_to.forEach((evolution: EvolutionChain) => {
                        evolutions.push(...getAllEvolutionsWithRelations(evolution, level + 1, chain.species.name));
                    });
                }
                
                return evolutions;
            }

            // Get all evolution relationships
            const evolutionRelations = getAllEvolutionsWithRelations(getEvolutionsJson.chain);

            // Remove duplicates while preserving order and keeping the highest level for each name
            const uniqueEvolutions = new Map<string, {name: string, level: number, evolvesFrom?: string}>();
            evolutionRelations.forEach(evo => {
                if (!uniqueEvolutions.has(evo.name) || uniqueEvolutions.get(evo.name)!.level < evo.level) {
                    uniqueEvolutions.set(evo.name, evo);
                }
            });

            const evolutionNames = Array.from(uniqueEvolutions.values());

            const evolutions = await Promise.all(
                evolutionNames.map(async (evolutionData) => {
                    try {
                        const details = await getPokemonDetails(evolutionData.name);
                        return {
                            name: details.name,
                            image: details.sprites.other["official-artwork"].front_default,
                            level: evolutionData.level,
                            evolvesFrom: evolutionData.evolvesFrom
                        };
                    } catch (error) {
                        console.error(`Failed to fetch details for ${evolutionData.name}:`, error);
                        return {
                            name: evolutionData.name,
                            image: undefined,
                            level: evolutionData.level,
                            evolvesFrom: evolutionData.evolvesFrom
                        };
                    }
                })
            );

            return evolutions;
        } catch (error) {
            console.error(`Error fetching evolutions for ${pokename}:`, error);
            return []; // Return empty array on any error
        }
    }

    const pokemonEvolutions = await getPokemonEvolutions(name);
    const pokemonObject = await getPokemonDetails(name);

    const statColors: PokemonStatColors = {
        hp: "#7DC94E",
        attack: "#FF624E",
        defense: "#0085FF",
        special_attack: "#FF624E",
        special_defense: "#0085FF",
        speed: "#FEA521",
    }
    // console.log('pokemonObject ', pokemonObject.stats);

    
    const pokemonDetails: PokemonDetails = {
        name: pokemonObject.name,
        height: convertHeight(pokemonObject.height),
        weight: convertWeight(pokemonObject.weight),
        stats: pokemonObject.stats,
        type: pokemonObject.types[0].type.name,
        image:
          pokemonObject.sprites.other["official-artwork"].front_default,
      };
    
    

    pokemonDetails.name = pokemonObject.name;
    pokemonDetails.stats = pokemonObject.stats;
    pokemonDetails.height = convertHeight(pokemonObject.height);
    pokemonDetails.weight = convertWeight(pokemonObject.weight);
    pokemonDetails.type = pokemonObject["types"][0].type.name;
    pokemonDetails.image =  pokemonObject.sprites.other["official-artwork"].front_default;


    return (
        <div className="container mx-auto px-4 py-8">
            
            <div className="text-center">
                <h1 className="text-4xl font-bold capitalize mb-6">{pokemonDetails.name}</h1>
                <Image alt={pokemonDetails.name} width={238} height={238} quality={100} src={pokemonDetails.image} className="mx-auto mb-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                    <div className="bg-background border border-input p-4 rounded-lg">
                        <p className="font-semibold">Height</p>
                        <p>{pokemonDetails.height}</p>
                    </div>
                       <div className="bg-background border border-input p-4 rounded-lg">
                        <p className="font-semibold">Weight</p>
                        <p>{pokemonDetails.weight}</p>
                    </div>
                       <div className="bg-background border border-input p-4 rounded-lg">
                        <p className="font-semibold">Type</p>
                        <p className="capitalize">{pokemonDetails.type}</p>
                    </div>
       
                </div>

                <div className="bg-background w-full border border-input p-4 rounded-lg">
                        <p className="font-semibold">Stats</p>
                        <div className="flex flex-col gap-2">
                            {pokemonDetails.stats.map((stat: any, index: number) => {
                                {console.log(convertStatsProgressPercent(stat.base_stat))}
                                return (
                                    <Tooltip  key={index} >
                                            <TooltipTrigger asChild>
                                    <div className="mb-2 flex gap-3 items-left justify-left">
                                        <span className="capitalize shrink-0 min-w-18 text-left inline">{stat.stat.name === "special-attack" ? "Sp. Attk" : stat.stat.name === "special-defense" ? "Sp. Def" : stat.stat.name}</span>
                                        <div className="relative w-full h-5 rounded-lg bg-muted mt-1 mb-1">
                                        
                                            <div
                                                className="w-full h-5 rounded-lg"
                                                style={{ width: `${convertStatsProgressPercent(stat.base_stat)}%`, backgroundColor: statColors[stat.stat.name.replace("-", "_") as keyof PokemonStatColors] }}
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
                        </div>
                    </div>


        <h3 className="mt-5  text-2xl">Evolutions</h3>

        {pokemonEvolutions.length === 0 ? (
            <div className="mt-4 text-center text-gray-500">
                <p>This Pokemon has no evolutions.</p>
            </div>
        ) : (
            <div className="mt-4">
                {(() => {
                    // Group evolutions by level
                    const evolutionsByLevel = pokemonEvolutions.reduce((acc, evo) => {
                        const level = evo.level || 0;
                        if (!acc[level]) acc[level] = [];
                        acc[level].push(evo);
                        return acc;
                    }, {} as Record<number, Evolution[]>);

                    const levels = Object.keys(evolutionsByLevel).map(Number).sort((a, b) => a - b);

                    return levels.map((level, levelIndex) => (
                        <div key={level} className="mb-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {evolutionsByLevel[level].map((evo: Evolution, index: number) => (
                                    <div key={index} className="relative">
                                        <Link href={`/pokemon/${evo.name}`}>
                                            <div className={`p-4 border rounded-lg text-center transition-all hover:scale-105 ${
                                                evo.name === name.toLowerCase() ? "bg-red-800/30 border border-red-500 text-white" : "bg-background border border-input hover:bg-accent hover:text-accent-foreground"
                                            }`}>
                                                <h4 className="font-semibold capitalize mb-2">{evo.name}</h4>
                                                {evo.image ? (
                                                    <Image alt={evo.name} width={96} height={96} src={evo.image} />
                                                ) : (
                                                    <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
                                                        <span className="text-gray-500">?</span>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                    
                            
                            {/* Add arrows pointing down to next level */}
                            {levelIndex < levels.length - 1 && (
                                <div className="flex justify-center mt-4">
                                    <div className="text-center">
                                        <div className="text-gray-400 text-2xl">↓</div>
                                        <div className="text-gray-400 text-sm mt-1">evolves to</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ));
                })()}
            </div>
        )}
            </div>
        </div>
    );
}