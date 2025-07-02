'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from "@/components/ui/input"

interface Pokemon {
    name: string;
    url: string;
    sprite?: string;
    id?: number;
}


export default function PokemonSearch() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingSprites, setLoadingSprites] = useState<Set<string>>(new Set());

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

    if (loading) {
        return (
            <div className="w-full max-w-md mx-auto">
                <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading Pokemon database...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full relative max-w-md">
            <div className="relative">
                <Input 
                    type="text"
                    placeholder="Search Pokemon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg"
                />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        ✕
                    </button>
                )}
            </div>

            {searchTerm && (
                <div className="mt-2 max-h-96 z-50 overflow-y-auto border border-gray-200 rounded-lg bg-white shadow-lg absolute w-full">
                    {filteredPokemon.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            No Pokemon found for &quot;{searchTerm}&quot;
                        </div>
                    ) : (
                        <>
                            <div className="p-2 text-sm text-gray-500 border-b border-gray-100">
                                {filteredPokemon.length} result{filteredPokemon.length !== 1 ? 's' : ''}
                            </div>
                            {filteredPokemon.slice(0, 20).map((pokemon) => (
                                <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`}>
                                    <div className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors">
                                        <div className="w-8 h-8 mr-3 flex items-center justify-center">
                                            {pokemon.sprite ? (
                                                <Image
                                                    src={pokemon.sprite}
                                                    alt={pokemon.name}
                                                    width={32}
                                                    height={32}
                                                    className="rounded"
                                                />
                                            ) : loadingSprites.has(pokemon.name) ? (
                                                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                                                    <span className="text-xs text-gray-500">#{pokemon.id}</span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="capitalize font-medium text-gray-800">{pokemon.name}</span>
                                    </div>
                                </Link>
                            ))}
                            {filteredPokemon.length > 20 && (
                                <div className="p-3 text-center text-sm text-gray-500 border-t border-gray-100">
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