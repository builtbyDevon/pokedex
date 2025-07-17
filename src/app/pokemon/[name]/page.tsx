import Image from "next/image";
import Link from "next/link";
import PokemonStats from "@/components/PokemonStats";
import React from "react";
import Types from "@/components/Types";
import AbilitiesSection from "@/components/AbilitiesSection";
import { TooltipOrPopover } from "@/components/ui/tooltip-or-popover"
import { getPokemonTypeConfig } from "../../../../lib/pokemonTypes";
import PokemonPageClient from "@/components/PokemonPageClient";

interface PokemonDetails {
    name: string;
    height: string;
    weight: string;
    type: string;
    cries: {latest: string};
    image: string;
    stats: Array<{
        base_stat: number;
        stat: {
          name: string;
        }
      }>;
  }

  
  // Update Evolution type to include minLevel and trigger
  interface Evolution {
    name: string;
    image: string;
    abilities?: Array<{
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }>;
    level?: number; // Track evolution level for positioning (keep for tree logic)
    evolvesFrom?: string;
    minLevel?: number;
    triggerName?: string;
    item?: string;
    children?: Evolution[];
  }
  
  // Add proper types for evolution chain
  interface EvolutionChain {
    species: {
        name: string;
    };
    evolves_to: EvolutionChain[];
    evolution_details?: Array<{
      min_level?: number;
      trigger?: { name: string };
      item?: { name: string };
    }>;
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

    // Get next and previous Pokemon
    async function getNavigationPokemon(currentName: string) {
        try {
            const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
            const data = await res.json();
            const pokemonList = data.results;
            
            const currentIndex = pokemonList.findIndex((pokemon: { name: string }) => pokemon.name === currentName);
            
            if (currentIndex === -1) {
                return { previous: null, next: null };
            }
            
            const previous = currentIndex > 0 ? pokemonList[currentIndex - 1] : null;
            const next = currentIndex < pokemonList.length - 1 ? pokemonList[currentIndex + 1] : null;
            
            return { previous, next };
        } catch (error) {
            console.error('Failed to fetch navigation Pokemon:', error);
            return { previous: null, next: null };
        }
    }

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


    async function getPokemonDetails(pokename: string) { 
        const pokemonDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`);
        const pokemonDetailsJson = await pokemonDetails.json();
        
        return pokemonDetailsJson;
    };

    // Update getPokemonEvolutions to extract min_level from evolution_details
    async function getPokemonEvolutions(pokename: string) {
        try {
            const getEvolutionChainUrl = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokename}`);
            
            // Check if the response is ok (not 404)
            if (!getEvolutionChainUrl.ok) {
                console.log(`No evolution chain found for ${pokename}`);
                return { evolutions: [], flavorText: undefined };
            }
            
            const getEvolutionChainJsonUrl = await getEvolutionChainUrl.json();


            // Try to get flavor text with fallback: Yellow first, then any English version
            let flavorText: string | undefined;
            
            // First try Yellow version
            const yellowEntry = getEvolutionChainJsonUrl.flavor_text_entries.find((entry: { version: { name: string }; language: { name: string } }) => 
                entry.version.name === 'yellow' && entry.language.name === 'en'
            );
            
            if (yellowEntry) {
                flavorText = yellowEntry.flavor_text;
            } else {
                // Fallback to any English version
                const englishEntry = getEvolutionChainJsonUrl.flavor_text_entries.find((entry: { language: { name: string } }) => 
                    entry.language.name === 'en'
                );
                flavorText = englishEntry?.flavor_text;
            }


            // Check if evolution_chain exists
            if (!getEvolutionChainJsonUrl.evolution_chain) {
                console.log(`No evolution chain data for ${pokename}`);
                return { evolutions: [], flavorText };
            }

            const evolutionChainUrl = getEvolutionChainJsonUrl.evolution_chain.url;

            const getEvolutions = await fetch(evolutionChainUrl);
            
            // Check if evolution chain fetch is ok
            if (!getEvolutions.ok) {
                console.log(`Failed to fetch evolution chain for ${pokename}`);
                return { evolutions: [], flavorText };
            }
            
            const getEvolutionsJson: EvolutionChainResponse = await getEvolutions.json();



            // Recursive function to get all evolutions with their relationships and triggers
            function getAllEvolutionsWithRelations(chain: EvolutionChain, evolvesFrom?: string, details?: Array<{
                min_level?: number;
                trigger?: { name: string };
                item?: { name: string };
            }>): Array<Evolution> {
                const evolutions: Array<Evolution> = [];
                // Extract trigger info from details if present
                let minLevel: number | undefined = undefined;
                let triggerName: string | undefined = undefined;
                let item: string | undefined = undefined;
                if (details && details.length > 0) {
                    minLevel = details[0].min_level;
                    triggerName = details[0].trigger?.name;
                    item = details[0].item?.name;
                }
                evolutions.push({
                    name: chain.species.name,
                    evolvesFrom: evolvesFrom,
                    minLevel,
                    triggerName,
                    item,
                    image: "" // placeholder, will be filled later
                });
                if (chain.evolves_to && chain.evolves_to.length > 0) {
                    chain.evolves_to.forEach((evolution: EvolutionChain) => {
                        evolutions.push(...getAllEvolutionsWithRelations(evolution, chain.species.name, evolution.evolution_details));
                    });
                }
                return evolutions;
            }

            // Get all evolution relationships
            const evolutionRelations = getAllEvolutionsWithRelations(getEvolutionsJson.chain);

            // Remove duplicates while preserving order and keeping the highest level for each name
            const uniqueEvolutions = new Map<string, Evolution>();
            evolutionRelations.forEach(evo => {
                if (
                    !uniqueEvolutions.has(evo.name) ||
                    (uniqueEvolutions.get(evo.name)?.level !== undefined && evo.level !== undefined && uniqueEvolutions.get(evo.name)!.level! < evo.level)
                ) {
                    uniqueEvolutions.set(evo.name, evo);
                }
            });

            const evolutionNames = Array.from(uniqueEvolutions.values());

            const evolutions = await Promise.all(
                evolutionNames.map(async (evolutionData) => {
                    try {
                        const details = await getPokemonDetails(evolutionData.name);
                        return {
                            ...evolutionData,
                            image: details.sprites.other["official-artwork"].front_default,
                            abilities: details.abilities,
                        };
                    } catch (error) {
                        console.error(`Failed to fetch details for ${evolutionData.name}:`, error);
                        return {
                            ...evolutionData,
                            image: undefined,
                            abilities: [],
                        };
                    }
                })
            );

            return { evolutions, flavorText };
        } catch (error) {
            console.error(`Error fetching evolutions for ${pokename}:`, error);
            return { evolutions: [], flavorText: undefined };
        }
    }

    // --- Weaknesses Calculation ---
    async function getTypeWeaknessesWithMultipliers(types: Array<{ type: { name: string } }>) {
        const typeNames = types.map(t => t.type.name);
        const typeData = await Promise.all(
            typeNames.map(async (typeName) => {
                const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
                return res.json();
            })
        );
        const allTypes = [
            "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
        ];
        const multipliers: Record<string, number> = {};
        allTypes.forEach(type => (multipliers[type] = 1));
        typeData.forEach(typeInfo => {
            typeInfo.damage_relations.double_damage_from.forEach((t: { name: string }) => {
                multipliers[t.name] *= 2;
            });
            typeInfo.damage_relations.half_damage_from.forEach((t: { name: string }) => {
                multipliers[t.name] *= 0.5;
            });
            typeInfo.damage_relations.no_damage_from.forEach((t: { name: string }) => {
                multipliers[t.name] *= 0;
            });
        });
        // Return array of {type, multiplier} for types with multiplier > 1, sorted by multiplier desc
        return allTypes
            .map(type => ({ type, multiplier: multipliers[type] }))
            .filter(obj => obj.multiplier > 1)
            .sort((a, b) => b.multiplier - a.multiplier);
    }

    // --- Strengths Calculation ---
    async function getTypeStrengthsWithMultipliers(types: Array<{ type: { name: string } }>) {
        const typeNames = types.map(t => t.type.name);
        const typeData = await Promise.all(
            typeNames.map(async (typeName) => {
                const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
                return res.json();
            })
        );
        const allTypes = [
            "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
        ];
        const multipliers: Record<string, number> = {};
        allTypes.forEach(type => (multipliers[type] = 1));
        typeData.forEach(typeInfo => {
            typeInfo.damage_relations.double_damage_to.forEach((t: { name: string }) => {
                multipliers[t.name] *= 2;
            });
            typeInfo.damage_relations.half_damage_to.forEach((t: { name: string }) => {
                multipliers[t.name] *= 0.5;
            });
            typeInfo.damage_relations.no_damage_to.forEach((t: { name: string }) => {
                multipliers[t.name] *= 0;
            });
        });
        // Return array of {type, multiplier} for types with multiplier > 1, sorted by multiplier desc
        return allTypes
            .map(type => ({ type, multiplier: multipliers[type] }))
            .filter(obj => obj.multiplier > 1)
            .sort((a, b) => b.multiplier - a.multiplier);
    }

    const { evolutions: pokemonEvolutions, flavorText } = await getPokemonEvolutions(name);
    const pokemonObject = await getPokemonDetails(name);
    const { previous, next } = await getNavigationPokemon(name);

    // Get gradient configuration for the Pokemon's types
    const primaryConfig = getPokemonTypeConfig(pokemonObject.types[0].type.name);
    const secondaryConfig = pokemonObject.types.length > 1 ? getPokemonTypeConfig(pokemonObject.types[1].type.name) : null;
    
    // Create gradient based on number of types
    let gradientStyle;
    
    if (pokemonObject.types.length > 1 && secondaryConfig) {
        // Dual-type gradient: primary type to secondary type
        gradientStyle = {
            background: `linear-gradient(45deg, ${secondaryConfig.gradientFrom.replace('1)', 'var(--pokemon-gradient-opacity-1))')} 0%, ${secondaryConfig.gradientFrom.replace('1)', 'var(--pokemon-gradient-opacity-2))')} 40%, ${primaryConfig.gradientFrom.replace('1)', 'var(--pokemon-gradient-opacity-2))')} 60%, ${primaryConfig.gradientFrom.replace('1)', 'var(--pokemon-gradient-opacity-1))')} 100%)`
        };
    } else {
        // Single-type gradient (original behavior)
        gradientStyle = {
            background: `linear-gradient(220deg, ${primaryConfig.gradientFrom.replace('1)', 'var(--pokemon-gradient-opacity-1))')}, ${primaryConfig.gradientFrom.replace('1)', 'var(--pokemon-gradient-opacity-2))')}, ${primaryConfig.gradientTo})`
        };
    }

    
    const pokemonDetails: PokemonDetails = {
        name: pokemonObject.name,
        height: convertHeight(pokemonObject.height),
        weight: convertWeight(pokemonObject.weight),
        stats: pokemonObject.stats,
        cries: pokemonObject.cries,
        type: pokemonObject.types[0].type.name,
        image:
          pokemonObject.sprites.other["official-artwork"].front_default,
      };
    
    

    pokemonDetails.name = pokemonObject.name;
    pokemonDetails.cries = pokemonObject.cries;
    pokemonDetails.stats = pokemonObject.stats;
    pokemonDetails.height = convertHeight(pokemonObject.height);
    pokemonDetails.weight = convertWeight(pokemonObject.weight);
    pokemonDetails.type = pokemonObject["types"][0].type.name;
    pokemonDetails.image =  pokemonObject.sprites.other["official-artwork"].front_default;


    // Helper to build a tree from the flat pokemonEvolutions array
    function buildEvolutionTree(evolutions: Evolution[]): Evolution | null {
        if (!evolutions.length) return null;
        // Find the root (no evolvesFrom)
        const root = evolutions.find(e => !e.evolvesFrom);
        if (!root) return null;
        // Recursive function to build tree
        function build(node: Evolution): Evolution & { children: Evolution[] } {
            const children = evolutions.filter(e => e.evolvesFrom === node.name);
            return {
                ...node,
                children: children.map(build)
            };
        }
        return build(root);
    }

    // Update EvolutionBranch to show the real trigger
    function EvolutionBranch({ node, currentName }: { node: Evolution, currentName: string }) {
        // Helper to get trigger text
        function getTriggerText(child: Evolution) {
            if (child.item) return `Use ${child.item}`;
            if (child.triggerName && child.triggerName !== 'level-up') return child.triggerName.charAt(0).toUpperCase() + child.triggerName.slice(1);
            if (child.minLevel) return `Level ${child.minLevel}`;
            return '';
        }
        const isBranching = node.children && node.children.length > 1;
        return (
            <div className="flex flex-col xl:flex-row  gap-8 xl:items-baseline items-center justify-center">
                {/* Current Pokémon */}
                <div className="flex w-40 min-w-40 flex-shrink-0 flex-col items-center">
                    <Link href={`/pokemon/${node.name}`}>
                        <div className={`p-6 rounded-full text-center transition-all hover:scale-105 bg-muted ${
                            node.name === currentName.toLowerCase() ? "bg-highlight border-3 border-[var(--red)] text-white" : "bg-background border-3 border-input hover:bg-accent hover:text-accent-foreground"
                        }`}>
                            {node.image ? (
                                <Image unoptimized alt={node.name} width={256} height={256} src={node.image} />
                            ) : (
                                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-gray-500">?</span>
                                </div>
                            )}
                        </div>
                    </Link>
                    <h4 className="font-bold capitalize mt-4 text-lg">{node.name}</h4>
                </div>
                {/* If there are children, show arrow and next stage(s) */}
                {node.children && node.children.length > 0 && (
                    <>
                        <div className="flex flex-col items-center relative xl:bottom-15">
                            <span className="mx-4 text-4xl flex items-center text-foreground rotate-90 xl:rotate-0">→</span>
                            {/* For linear, show trigger under arrow; for branching, skip here */}
                            {!isBranching && node.children.length === 1 && (
                                <span className="text-sm mt-4 xl:mt-0 text-foreground">
                                    {getTriggerText(node.children[0]) && (
                                        <span>{getTriggerText(node.children[0]).replace("-", " ")}</span>
                                    )}
                                </span>
                            )}
                        </div>
                        {isBranching ? (
                            // Branching evolutions: show trigger under each card
                            <div className="flex flex-wrap gap-4">
                                {node.children?.map((child: Evolution) => (
                                    <div
                                        key={child.name}
                                        className="flex basis-37 sm:basis-37 md:basis-40 flex-shrink flex-grow flex-col items-center min-w-0 max-w-xs"
                                    >
                                        <EvolutionBranch node={{ ...child, children: [] }} currentName={currentName} />
                                        {getTriggerText(child) && (
                                            <span className="text-sm text-foreground mt-2">{getTriggerText(child).replace("-", " ")}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Linear evolution
                            <EvolutionBranch node={node.children[0]} currentName={currentName} />
                        )}
                    </>
                )}
            </div>
        );
    }

    // Fetch weaknesses (server-side)
    const weaknessesWithMultipliers = await getTypeWeaknessesWithMultipliers(pokemonObject.types);

    // Fetch strengths (server-side)
    const strengthsWithMultipliers = await getTypeStrengthsWithMultipliers(pokemonObject.types);

    return (
        <div className="container mx-auto px-4 py-8">
            
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center px-4 mb-6 md:mb-12">
                {previous ? (
                    <Link href={`/pokemon/${previous.name}`} className="flex items-center gap-2 px-4 md:px-6 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-gray-800 dark:text-white font-bold md:text-xl rounded-full transition-colors duration-200 capitalize">
                        ← {previous.name.replace("-", " ")}
                    </Link>
                ) : (
                    <div></div>
                )}
                
                {next ? (
                    <Link href={`/pokemon/${next.name}`} className="flex items-center gap-2 px-4 md:px-6 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-gray-800 dark:text-white font-bold md:text-xl rounded-full transition-colors duration-200 capitalize">
                        {next.name.replace("-", " ")} →
                    </Link>
                ) : (
                    <div></div>
                )}
            </div>
            
            <h1 className="text-4xl md:text-5xl text-left px-4 font-bold capitalize mb-3">{pokemonDetails.name}</h1>
                
                <div className="flex flex-col lg:flex-row gap-12 mt-5 md:mt-8">

                    <aside className="max-w-full min-w-80 lg:min-w-100 xl:min-w-110 xxl:min-w-120 relative flex flex-col">

                        <PokemonPageClient 
                            pokemonObject={pokemonObject}
                            pokemonDetails={pokemonDetails}
                            gradientStyle={gradientStyle}
                        />
                 
                            
                            
                   
                        {pokemonDetails.stats && 
                            <div className="w-full pl-4 xl:pl-7">
                                <p className="font-bold text-xl text-left mb-4">Base Stats</p>
                                <div className="flex flex-col gap-2 w-full">
                                    <PokemonStats stats={pokemonDetails.stats} />
                                </div>
                            </div>
                        }
                    </aside>
                    <main className="flex-1 min-w-0">
                        {flavorText && (
                            <div className={`items-end text-left flex gap-4 pb-4`}>
                                <div className="flex-1 font-medium text-base lg:text-[1.2rem] pl-4 xl:pl-7">
                                    {flavorText.replace(/[\f\n\r]+/g, " ")}
                                </div>
                                {pokemonObject.sprites.front_default && (
                                    <Image 
                                        unoptimized
                                        src={pokemonObject.sprites.front_default} 
                                        alt={`${pokemonDetails.name} sprite`}
                                        width={128} 
                                        height={128}
                                        className="flex-shrink-0 w-[64] h-[64] image-rendering-pixelated lg:trim-whitespace" 
                                    />
                                )}
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 border-3 max-w-500 border-input gap-4 mb-8 bg-muted p-4 px-6 xl:p-7 rounded-4xl">
                            <div className="">
                                <p className="font-bold text-lg lg:text-2xl mb-2 text-left">Height</p>
                                <p className="text-left text-xl">{pokemonDetails.height}</p>
                            </div>
                            <div className="">
                                <p className="font-bold text-lg lg:text-2xl mb-2 text-left">Weight</p>
                                <p className="text-left text-xl">{pokemonDetails.weight}</p>
                            </div>
                            <div className="">
                                <p className="font-bold text-lg lg:text-2xl mb-3 text-left">Type</p>
                                <div className="flex flex-wrap gap-2 items-center">
                                    {pokemonObject.types.map((t: { type: { name: string } }) => (
                                        <Types asLink={true} key={t.type.name} type={t.type.name} />
                                    ))}
                                </div>
                            </div>
                            <div className="">
                                <AbilitiesSection abilities={pokemonObject.abilities} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-7 rounded-4xl">

                         {/* Strengths Section */}
                         {strengthsWithMultipliers && strengthsWithMultipliers.length > 0 && (
                            <div className="mb-6">
                                <p className="font-bold text-xl text-left mb-4">Strengths</p>
                                <div className="flex flex-wrap gap-2 items-center">
                                    {strengthsWithMultipliers.map(({ type, multiplier }) => (
                                        <TooltipOrPopover
                                            key={type}
                                            content={<span><strong>Does {multiplier}×</strong> damage to {type.charAt(0).toUpperCase() + type.slice(1)}</span>}
                                        >
                                            <div>
                                                <Types asLink={true} type={type} />
                                            </div>
                                        </TooltipOrPopover>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Weaknesses Section */}
                        {weaknessesWithMultipliers && weaknessesWithMultipliers.length > 0 && (
                            <div className="mb-6">
                                <p className="font-bold text-xl  text-left mb-4">Weaknesses</p>
                                <div className="flex flex-wrap gap-2 items-center">
                                    {weaknessesWithMultipliers.map(({ type, multiplier }) => (
                                        <TooltipOrPopover
                                            key={type}
                                            content={<span><strong>Takes {multiplier}×</strong> damage from {type.charAt(0).toUpperCase() + type.slice(1)}</span>}
                                        >
                                            <div>
                                                <Types asLink={true} type={type} />
                                            </div>
                                        </TooltipOrPopover>
                                    ))}
                                </div>
                            </div>
                        )}
                        </div>

                        {pokemonEvolutions.length === 0 ? (
                            <div className="mt-4 text-left text-gray-500">
                                <p>This Pokemon has no evolution data.</p>
                            </div>
                        ) : (
                            <div className="mt-4 px-7 ">
                                <h3 className="text-left mt-5 text-xl font-bold mb-12">Evolutions</h3>   
                                {(() => {
                                    const tree = buildEvolutionTree(pokemonEvolutions);
                                    return tree ? <EvolutionBranch node={tree} currentName={name} /> : null;
                                })()}
                            </div>
                        )}
                    </main>
                </div>
                
                {/* View More Pokemon Button */}
                <div className="flex justify-center mt-12 mb-8">
                    <Link href="/" className="flex items-center gap-3 px-6 py-3 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-gray-800 dark:text-white font-bold rounded-full transition-colors duration-200 ">
                        <Image 
                            unoptimized
                            src="/pokeball.svg" 
                            alt="Pokeball" 
                            width={24} 
                            height={24}
                            className="w-6 h-6"
                        />
                        View More Pokemon!
                    </Link>
                </div>
        </div>
    );
}