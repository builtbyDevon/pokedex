import Image from "next/image";
import { getPokemonTypeConfig } from "../lib/pokemonTypes";

interface TypesProps {
    type: string;
}

export default function Types(props: TypesProps) {
    const type = props.type;
    const config = getPokemonTypeConfig(type);
    
    const typeStyle = {
        backgroundColor: config.color,
        color: config.textColor === 'dark' ? '#171717' : '#fafafa'
    };

    return (
        <div 
            style={typeStyle}
            className="uppercase flex items-center font-press-start-2p text-[.5rem] inline-flex py-1 px-2 pr-3 gap-1 rounded-full"
        >
            {type && <Image width="18" height="18" alt={type} src={"/types/"+type+".svg"} />}
            <p className="margin-0 padding-0 relative">{props.type}</p>
        </div>
    );
}