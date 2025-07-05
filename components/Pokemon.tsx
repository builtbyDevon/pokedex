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
    const miniImage = getPokemon.sprites.front_default;
    const types = getPokemon.types;

    const typesCombined: string[] = [];
    types.map((type: PokemonType)=> {
        typesCombined.push(type.type.name);
     })

    const config = getPokemonTypeConfig(typesCombined[0]);
    const gradientStyle = {
        background: `linear-gradient(220deg, ${config.gradientFrom.replace('1)', 'var(--pokemon-gradient-opacity-1))')}, ${config.gradientFrom.replace('1)', 'var(--pokemon-gradient-opacity-2))')}, ${config.gradientTo})`
    };
    const gradientStyleHover = {
        background: `linear-gradient(220deg, ${config.gradientFrom.replace('1)', 'var(--pokemon-hover-opacity-1))')}, ${config.gradientFrom.replace('1)', 'var(--pokemon-hover-opacity-2))')}, ${config.gradientTo})`
    };


    return (
        <div className="text-left max-w-[400px] mx-auto group relative hover:transform hover:scale-102 transition-all active:scale-100 active:transition-none">



            
            <div className="relative">
                {miniImage && (
                    <Image className="absolute bg-background/50 backdrop-blur-md transition-all z-100 flex w-[50px] h-[50px] group-hover:w-[75px] group-hover:h-[75px] items-center justify-center p-[2px] shadow-lg right-3 top-3 rounded-full" src={miniImage} width="75" height="75" alt={`${name}-sprite`} />
                )}

                <div className="absolute group-hover:opacity-100 group-hover:transform(scale(2)) opacity-0 transition-opacity -z-1 rounded-4xl h-full w-full" style={{
                    backgroundImage: `linear-gradient(var(--background), var(--background)), linear-gradient(220deg, ${config.gradientFrom.replace('1)', '0.8)')}, rgb(0, 0, 0) 80%, ${config.gradientTo})`,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'content-box, border-box',
                    border: '2px solid transparent',
                    animation: "gradient 2s ease-in-out infinite",
                    backgroundSize: "200% 200%"
                }}>
                </div>
                <div
                className="relative p-2 flex items-center justify-center">
                        <div
                        style={gradientStyle} 
                        className="rounded-4xl group-hover:opacity-0 z-70 absolute w-full h-full bg-background animate-gradient bg-[position:50%_80%] group-hover:transition-all group-hover:duration-300"
                        > </div>
                            <div
                        style={gradientStyleHover} 
                        className="rounded-4xl group-hover:opacity-100 opacity-0 z-70 absolute w-full h-full bg-background animate-gradient bg-[position:50%_80%] group-hover:transition-all group-hover:duration-300"
                        > </div>
                    {image !== null ? <Image className="relative z-80" quality="100" width="238" height="238" src={image} alt={name} /> : <div className="flex items-center justify-center opacity-50 w-[258px] h-[258px]">No image found</div>}
                </div>
            </div>
            <p className="first-letter:uppercase text-xl py-2 font-bold">{name}</p>
            <div className="flex gap-2">{typesCombined.map((type, index )=> {
               return (<Types key={index} type={type} />);
            })}</div>
        </div>
    );
}