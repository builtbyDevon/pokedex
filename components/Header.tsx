"use client";
import { useEffect, useState } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import PokemonSearch from "./PokemonSearch";
import Logo from "./Logo";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
    <header className={`fixed top-0 left-0 z-50 w-full items-center gap-4 px-4 transition-all duration-300 ${
        isScrolled ? ' backdrop-blur-lg shadow-lg py-2 border-b-3 border-white/20' : 'pt-12 bg-transparent'
    }`}>
        <div className="container mx-auto items-center items-center flex w-full justify-between">
            <Logo isScrolled={isScrolled} />
            <PokemonSearch isScrolled={isScrolled} />
            <DarkModeToggle />
        </div>
    </header>);
}