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
    console.log("type here ", type);
    console.log("page id here ", pageId);
    const amount = 15;
    const offsetAmount = (pageId - 1) * amount;
    console.log(offsetAmount, ' offsetAmount')

    const getPokemon = async () => {
        console.log('ur on type page ', type);

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`, {
                    next: { revalidate: 3600 } // Cache for 1 hour
            });
            
            const data = await response.json();
            console.log('the data amount ', data.pokemon.length);
            const returnedData = {pokemon: data.pokemon.slice(offsetAmount, amount + offsetAmount), length: data.pokemon.length};
            console.log(returnedData);


            return returnedData;
        } catch {
            console.log("Error");
        }
        // try {
        //     const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=15&offset=${offsetAmount}`, {
        //         next: { revalidate: 3600 } // Cache for 1 hour
        //     });
        //     const data = await response.json();
        //     return data.results;
        // }
        // catch {
        //     console.log("error occured");
        // }


    }
    
    const pokemon = await getPokemon();


    
    return (
    <main>
    <div className="flex flex-wrap gap-5 justify-center mt-4 animate-fade-in">
        {pokemon?.length === 0 && <p>No Pokemon found</p>}
        {pokemon?.pokemon?.map((poke: Pokemon, index: number) => {
            // console.log(poke.pokemon.name);
            return (<Link href={`/pokemon/${poke.pokemon.name}`} key={index}><Pokemon name={poke.pokemon.name} url={poke.pokemon.url} /></Link>)
        })}
    </div>
        <Pagination pageId={pageId} type={type} pages={pokemon?.length} />
    </main>
    )
}