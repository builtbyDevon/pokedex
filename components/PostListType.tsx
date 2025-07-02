import Link from "next/link";
import Pokemon from "./Pokemon";
import Pagination from "./Pagination";

interface PostListType {
    pageId: number;
    type: string;
}

interface Pokemon {
    pokemon: {
        name: string;
        url: string;
    }
}

export default async function PostListType({ pageId, type }: PostListType) {
    const amount = 15;
    const offsetAmount = (pageId - 1) * amount;

    const getPokemon = async () => {

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`, {
                    next: { revalidate: 3600 } // Cache for 1 hour
            });
            
            const data = await response.json();
            const returnedData = {pokemon: data.pokemon.slice(offsetAmount, amount + offsetAmount), length: data.pokemon.length};


            return returnedData;
        } catch {
            console.log("Error");
        }

    }
    
    const pokemon = await getPokemon();


    
    return (
    <main>
    <div className="flex flex-wrap gap-5 justify-center mt-4 animate-fade-in">
        {pokemon?.length === 0 && <p>No Pokemon found</p>}
        {pokemon?.pokemon?.map((poke: Pokemon, index: number) => {
            return (<Link href={`/pokemon/${poke.pokemon.name}`} key={index}><Pokemon name={poke.pokemon.name} url={poke.pokemon.url} /></Link>)
        })}
    </div>
        <Pagination pageId={pageId} type={type} pages={pokemon?.length} />
    </main>
    )
}