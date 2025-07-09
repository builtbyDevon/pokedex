"use client"

import { useState } from "react"
import { HelpCircle } from "lucide-react"
import AbilityPopup from "./AbilityPopup"

interface Ability {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

interface AbilitiesSectionProps {
  abilities: Ability[]
}

export default function AbilitiesSection({ abilities }: AbilitiesSectionProps) {
  const [selectedAbility, setSelectedAbility] = useState<{
    name: string
    description: string
    flavorText: string
    generation: string
    isHidden: boolean
  } | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleAbilityClick = async (ability: Ability) => {
    try {
      const response = await fetch(ability.ability.url)
      const data = await response.json() as {
        effect_entries: Array<{ effect: string; language: { name: string } }>
        flavor_text_entries: Array<{ flavor_text: string; language: { name: string } }>
        generation: { name: string }
      }
      
      // Find English description
      const englishEntry = data.effect_entries.find((entry: { language: { name: string } }) => 
        entry.language.name === 'en'
      )
      
      // Find English flavor text
      const englishFlavorEntry = data.flavor_text_entries.find((entry: { language: { name: string } }) => 
        entry.language.name === 'en'
      )
      
      const description = englishEntry?.effect || "No description available"
      const flavorText = englishFlavorEntry?.flavor_text || "No flavor text available"
      const generation = data.generation?.name || "Unknown"
      
      setSelectedAbility({
        name: ability.ability.name,
        description,
        flavorText,
        generation,
        isHidden: ability.is_hidden
      })
      setIsPopupOpen(true)
    } catch (error) {
      console.error("Failed to fetch ability details:", error)
    }
  }

  return (
    <>
      <div>
        <p className="font-bold text-2xl mb-3 text-left">Abilities</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {abilities.map((ability, index) => (
            <button
              key={index}
              onClick={() => handleAbilityClick(ability)}
              className={`uppercase cursor-pointer flex items-center font-press-start-2p text-[.5rem] inline-flex py-1 pr-2 pl-4 gap-1 rounded-full transition-all hover:opacity-80 active:scale-95 active:transition-none ${
                ability.is_hidden
                  ? "border-1 border-yellow-500 hover:bg-yellow-500/30"
                  : "border-1 border-blue-500 hover:bg-blue-500/30"
              }`}
            >
              {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1).replace("-", " ")}
              {ability.is_hidden && " (H)"}
              <HelpCircle size={22} className={`ml-1 ${ability.is_hidden ? "ml-1 text-yellow-500" : "text-blue-500"} `} />
            </button>
          ))}
        </div>
      </div>

      {selectedAbility && (
        <AbilityPopup
          ability={selectedAbility}
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </>
  )
} 