import Image from "next/image";
import Types from "./Types";
import { getPokemonTypeConfig } from "../lib/pokemonTypes";


interface PokemonProps {
    name: string;
    url: string;
    typesAsLinks?: boolean;
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

    const primaryConfig = getPokemonTypeConfig(typesCombined[0]);
    const secondaryConfig = typesCombined.length > 1 ? getPokemonTypeConfig(typesCombined[1]) : null;
    
    // Create gradient based on number of types
    let gradientStyle, gradientStyleHover;
    
    if (typesCombined.length > 1 && secondaryConfig) {
        // Dual-type gradient: primary type to secondary type
        gradientStyle = {
            background: `linear-gradient(45deg, ${secondaryConfig.gradientFrom.replace('1)', 'var(--pokemon-gradient-opacity-1))')} 0%, ${secondaryConfig.gradientFrom.replace('1)', 'var(--pokemon-gradient-opacity-2))')} 40%, ${primaryConfig.gradientFrom.replace('1)', 'var(--pokemon-gradient-opacity-2))')} 60%, ${primaryConfig.gradientFrom.replace('1)', 'var(--pokemon-gradient-opacity-1))')} 100%)`
        };
        gradientStyleHover = {
            background: `linear-gradient(45deg, ${secondaryConfig.gradientFrom.replace('1)', 'var(--pokemon-hover-opacity-1))')} 0%, ${secondaryConfig.gradientFrom.replace('1)', 'var(--pokemon-hover-opacity-2))')} 40%, ${primaryConfig.gradientFrom.replace('1)', 'var(--pokemon-hover-opacity-2))')} 60%, ${primaryConfig.gradientFrom.replace('1)', 'var(--pokemon-hover-opacity-1))')} 100%)`
        };
    } else {
        // Single-type gradient (original behavior)
        gradientStyle = {
            background: `linear-gradient(220deg, ${primaryConfig.gradientFrom.replace('1)', 'var(--pokemon-gradient-opacity-1))')}, ${primaryConfig.gradientFrom.replace('1)', 'var(--pokemon-gradient-opacity-2))')}, ${primaryConfig.gradientTo})`
        };
        gradientStyleHover = {
            background: `linear-gradient(220deg, ${primaryConfig.gradientFrom.replace('1)', 'var(--pokemon-hover-opacity-1))')}, ${primaryConfig.gradientFrom.replace('1)', 'var(--pokemon-hover-opacity-2))')}, ${primaryConfig.gradientTo})`
        };
    }


    return (
        <div className="text-left max-w-[400px] mx-auto group relative hover:transform hover:scale-102 transition-all active:scale-100 active:transition-none">
            <div className="relative">
                <div className="bg-background absolute rounded-4xl w-full h-full -z-50"></div>
                {miniImage && (
                    <Image unoptimized className="absolute bg-background/50 backdrop-blur-md transition-all z-100 flex w-[50px] h-[50px] group-hover:w-[75px] group-hover:h-[75px] items-center justify-center p-[2px] shadow-lg right-3 top-3 rounded-full" src={miniImage} width="75" height="75" alt={`${name}-sprite`} />
                )}

                <div className="absolute group-hover:opacity-100  group-hover:transform(scale(2)) opacity-0 -z-1 rounded-4xl h-full w-full" style={{
                    backgroundImage: `linear-gradient(var(--background), var(--background)), linear-gradient(220deg, ${primaryConfig.gradientFrom.replace('1)', '1)')}, rgba(0, 0, 0, 0) 100%, ${primaryConfig.gradientTo})`,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'content-box, border-box',
                    border: '2px solid transparent',
                    animation: "gradient 1.2s ease-in-out infinite",
                    backgroundSize: "199% 199%", // Increased size to make animation more visible
                    backgroundPosition: "0% 0%" // Explicitly set initial position
                }}>
                </div>
                <div
                className="relative p-2 flex items-center justify-center">
                        <div
                        style={gradientStyle} 
                        className="rounded-4xl group-hover:opacity-0 z-70 absolute w-full h-full bg-background group-hover:transition-opacity group-hover:duration-300"
                        > </div>
                            <div
                        style={gradientStyleHover} 
                        className="rounded-4xl group-hover:opacity-100 opacity-0 z-70 absolute w-full h-full bg-background group-hover:transition-opacity group-hover:duration-300"
                        > </div>
                    {image !== null ? <Image unoptimized className="relative z-80" quality="100" width="256" height="256" src={image} alt={name} /> : <div className="flex items-center justify-center opacity-50 w-[258px] h-[258px]">No image found</div>}
                </div>
        </div>
      
            <p className="capitalize text-xl py-2 font-bold">{name.replace("-", " ")}</p>
            <div className="flex gap-2 pointer-events-none">{typesCombined.map((type, index )=> {
               return (<Types asLink={props.typesAsLinks || false} key={index} type={type} />);
            })}</div>
        </div>
    );
}