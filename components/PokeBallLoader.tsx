import Image from "next/image"

export default function PokeBallLoader() {
    return (
        <Image
            className="pokeball-animate mx-auto"
            src="/pokeball.svg" 
            alt="Loading..."
            width={60}
            height={60}
        />
    )
}