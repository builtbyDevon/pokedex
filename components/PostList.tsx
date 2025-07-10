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
    const amount = 25;
    const offsetAmount = (pageId - 1) * amount;

    const getPokemon = async () => {

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=${offsetAmount}`, {
                next: { revalidate: 3600 } // Cache for 1 hour
            });
            const data = await response.json();
            const count = await fetch (`https://pokeapi.co/api/v2/pokemon?limit=1`, {
                next: { revalidate: 3600 } // Cache for 1 hour
            });
            const countData = await count.json()

            const totalCount = countData.count;
            const fetchedData = {returnedPokemon: data.results, totalCount: totalCount}
            return fetchedData;
        }
        catch {
            console.log("error occured");
        }


    }
    
    const pokemon = await getPokemon();


    return (
    <main>
    <div className="grid grid-cols-1 sm:grid-cols-2 relative z-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 mt-4 container px-4 mx-auto">
        {pokemon?.returnedPokemon?.length === 0 && <p>No Pokemon found</p>}
        {pokemon?.returnedPokemon?.map((poke: Pokemon, index: number) => {
            return (<Link href={`/pokemon/${poke.name}`} key={index}><Pokemon name={poke.name} url={poke.url} /></Link>)
        })}
    </div>
        <Pagination pageId={pageId} pages={pokemon?.totalCount} amount={amount} />
    </main>
    )
}