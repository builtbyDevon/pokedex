import DarkModeToggle from "@/components/DarkModeToggle";
import PokemonSearch from "./PokemonSearch";

export default function Header() {
    return (
    <header className="flex items-center gap-4 justify-center">
        <DarkModeToggle />
        <PokemonSearch />
    </header>);
}