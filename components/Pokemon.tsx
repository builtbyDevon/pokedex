// 'use client';

import Image from "next/image";
import Types from "./Types";
import { getPokemonTypeConfig } from "../lib/pokemonTypes";

interface PokemonProps {
    name: string;
    url: string;
}

interface PokemonType {
    type: {
        name: string;
    };
}

export default async function Pokemon(props: PokemonProps) {


    const getPokemonResp = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}/`);
    const getPokemon = await getPokemonResp.json();

    const name = getPokemon.name;
    const image = getPokemon.sprites.other['official-artwork'].front_default;
    const types = getPokemon.types;

    const typesCombined: string[] = [];
    types.map((type: PokemonType)=> {
        typesCombined.push(type.type.name);
     })

    const config = getPokemonTypeConfig(typesCombined[0]);
    const gradientStyle = {
        background: `linear-gradient(220deg, ${config.gradientFrom}80, ${config.gradientFrom}20, ${config.gradientTo})`
    };

    return (
            <div className="text-left">
                <div style={gradientStyle} className="rounded-4xl">{image !== null ? <Image quality="100" width="238" height="238" src={image} alt={name} /> : <div>No image found</div>}</div>
                <p className="first-letter:uppercase py-2">{name}</p>
                <div className="flex gap-2">{typesCombined.map((type, index )=> {
                   return (<Types key={index} type={type} />);
                })}</div>
            </div>
    );
}