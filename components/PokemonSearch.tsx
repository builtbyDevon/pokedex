'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Input } from "@/components/ui/input"

interface Pokemon {
    name: string;
    url: string;
    sprite?: string;
    id?: number;
}

interface isScrolled {
    isScrolled: boolean
}


export default function PokemonSearch(isScrolled: isScrolled) {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingSprites, setLoadingSprites] = useState<Set<string>>(new Set());
    const { theme } = useTheme();

    // Fetch all Pokemon once on component mount
    useEffect(() => {
        async function fetchAllPokemon() {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000', {
                    cache: 'force-cache' // ✅ Browser cache - works in client components
                });
                const data = await response.json();
                
                // Extract ID from URL and create Pokemon list
                const pokemonList = data.results.map((pokemon: Pokemon) => {
                    const id = pokemon.url.split('/').slice(-2, -1)[0];
                    return {
                        ...pokemon,
                        id: parseInt(id),
                        sprite: undefined
                    };
                });
                
                setPokemon(pokemonList);
                setFilteredPokemon(pokemonList);
            } catch (error) {
                console.error('Failed to fetch Pokemon:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchAllPokemon();
    }, []);

    // Filter Pokemon based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredPokemon(pokemon);
        } else {
            const filtered = pokemon.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPokemon(filtered);
        }
    }, [searchTerm, pokemon]);

    // Lazy load sprites for visible Pokemon
    const loadSprite = useCallback(async (pokemon: Pokemon) => {
        if (pokemon.sprite || loadingSprites.has(pokemon.name)) return;

        setLoadingSprites(prev => new Set(prev).add(pokemon.name));

        try {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            
            setPokemon(prev => prev.map(p => 
                p.name === pokemon.name 
                    ? { ...p, sprite: data.sprites.front_default }
                    : p
            ));
        } catch (error) {
            console.error(`Failed to load sprite for ${pokemon.name}:`, error);
        } finally {
            setLoadingSprites(prev => {
                const newSet = new Set(prev);
                newSet.delete(pokemon.name);
                return newSet;
            });
        }
    }, [loadingSprites]);

    // Load sprites for the first 10 visible Pokemon
    useEffect(() => {
        if (filteredPokemon.length > 0) {
            const visiblePokemon = filteredPokemon.slice(0, 10);
            visiblePokemon.forEach(pokemon => {
                if (!pokemon.sprite) {
                    loadSprite(pokemon);
                }
            });
        }
    }, [filteredPokemon, loadSprite]);

    function closeMenu() {
        setSearchTerm("");
    }

    if (loading) {
        return (
            <div className="w-full max-w-md mx-auto">
                <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading Pokemon database...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${`w-full relative transition-all duration-[500ms] max-w-xl`} ${isScrolled.isScrolled && `!max-w-md`}`}>
            <div className="relative">
                <div className={`${isScrolled.isScrolled && `!hidden`} ${`w-1 h-1 absolute -top-3 right-[30%] rounded-full bg-foreground`}`}></div>
                <div className={`${isScrolled.isScrolled && `!hidden`} ${`w-1 h-1 absolute -top-3 right-[33%] rounded-full bg-foreground`}`}></div>
                <div className={`${isScrolled.isScrolled && `!hidden`} ${`w-3 h-3 absolute -bottom-5 right-[20%] rounded-full bg-[var(--red)]`}`}></div>
                <Image 
                    className="pointer-events-none absolute right-5 z-5 top-1/2 -translate-y-1/2" 
                    alt="search-icon" 
                    src={theme === 'dark' ? "/search-icon-dark.svg" : "/search-icon.svg"} 
                    width={30} 
                    height={30} 
                />
                <svg className="absolute pointer-events-none w-[3rem] right-[.45rem] bottom-[.2rem]" width="57" height="44" viewBox="0 0 57 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 44C0 44 48.5 39 49.5 0C52 2.5 61 13.5 53.5 29C45.8084 44.8959 30.5 44 0 44Z" fill="var(--muted)"/>
                </svg>

                <Input 
                    type="text"
                    placeholder="Search the Dex for Pokemon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value.replace(" ", "-"))}
                    className={`${isScrolled.isScrolled && '!h-12'} ${`w-full !pr-20 bg-white dark:bg-muted font-bold px-8 h-14 border-3 shadow-none border-neutral-300 dark:border-input !text-lg rounded-full`}`}
                />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-15 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-foreground transition-colors"
                    >
                        ✕
                    </button>
                )}
            </div>

            {searchTerm && (
                <div className="mt-2 max-h-96 z-200 overflow-y-auto dark:bg-primary border border-bg-border rounded-4xl bg-white shadow-lg absolute w-full">
                    {filteredPokemon.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            No Pokemon found for &quot;{searchTerm}&quot;
                        </div>
                    ) : (
                        <>
                            <div className="p-2 px-5 text-sm text-base border-b border-bg-border">
                                {filteredPokemon.length} result{filteredPokemon.length !== 1 ? 's' : ''}
                            </div>
                            {filteredPokemon.slice(0, 20).map((pokemon) => (
                                <Link onClick={closeMenu} key={pokemon.name} href={`/pokemon/${pokemon.name}`}>
                                    <div className="flex items-center p-3 hover:bg-[var(--primary-hover)]  border-b border-bg-border last:border-b-0 cursor-pointer transition-colors">
                                        <div className="w-[48] h-[48] mr-1 flex items-center justify-center">
                                            {pokemon.sprite ? (
                                                <Image
                                                    src={pokemon.sprite}
                                                    alt={pokemon.name}
                                                    width={48}
                                                    height={48}
                                                    className="rounded"
                                                />
                                            ) : loadingSprites.has(pokemon.name) ? (
                                                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                                                    <span className="text-xs text-base">#{pokemon.id}</span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="capitalize font-bold text-base">{pokemon.name.replace("-", " ")}</span>
                                    </div>
                                </Link>
                            ))}
                            {filteredPokemon.length > 20 && (
                                <div className="p-3 text-center text-sm text-base border-t border-gray-100">
                                    Showing first 20 results. Type more to narrow down.
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}