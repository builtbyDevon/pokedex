// 'use client';

import Image from "next/image";

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
    
    // async function getPokemon() {
    //     console.log(props, ' props');
    // }

    const getPokemonResp = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}/`);
    const getPokemon = await getPokemonResp.json();

    const name = getPokemon.name;
    const image = getPokemon.sprites.other['official-artwork'].front_default;
    console.log(image, ' image')
    const types = getPokemon.types;


    const typesCombined: string[] = [];
    types.map((type: PokemonType)=> {
        typesCombined.push(type.type.name);
     })


    return (
            <div className="text-center">
                {name}
                {image !== null ? <Image width="238" height="238" src={image} alt={name} /> : <div>No image found</div>}
                {typesCombined.map((type, index )=> {
                   return (<div key={index}>{type}</div>);
                })}
            </div>
    );
}