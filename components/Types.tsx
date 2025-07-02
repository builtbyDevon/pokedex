import Image from "next/image";
import { getPokemonTypeConfig } from "../lib/pokemonTypes";

interface Types {
    type: string;
}

export default function Types(props: Types) {
    const type = props.type;
    const config = getPokemonTypeConfig(type);
    
    const typeStyle = {
        backgroundColor: config.color,
        color: config.textColor === 'dark' ? '#171717' : '#fafafa'
    };

    return (
        <div 
            style={typeStyle}
            className="uppercase inline-flex py-1 px-2 gap-1 rounded-full"
        >
            {type && <Image width="18" height="18" alt={type} src={"/types/"+type+".svg"} />}
            {props.type}
        </div>
    );
}