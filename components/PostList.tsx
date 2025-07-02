import Link from "next/link";
import Pokemon from "./Pokemon";
import Pagination from "./Pagination";

interface PostList {
    pageId: number;
}

interface Pokemon {
    name: string;
    url: string;
}

export default async function PostList({ pageId }: PostList) {
    const amount = 15;
    const offsetAmount = (pageId - 1) * amount;

    const getPokemon = async () => {

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=15&offset=${offsetAmount}`, {
                next: { revalidate: 3600 } // Cache for 1 hour
            });
            const data = await response.json();
            return data.results;
        }
        catch {
            console.log("error occured");
        }


    }
    
    const pokemon = await getPokemon();


    
    return (
    <main>
    <div className="flex flex-wrap gap-5 justify-center mt-4 animate-fade-in">
        {pokemon?.length === 0 && <p>No Pokemon found</p>}
        {pokemon?.map((poke: Pokemon, index: number) => {
            return (<Link href={`/pokemon/${poke.name}`} key={index}><Pokemon name={poke.name} url={poke.url} /></Link>)
        })}
    </div>
        <Pagination pageId={pageId} />
    </main>
    )
}