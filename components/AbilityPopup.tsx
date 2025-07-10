"use client"

import { X } from "lucide-react"

interface AbilityPopupProps {
  ability: {
    name: string
    description: string
    flavorText: string
    generation: string
    isHidden?: boolean
  }
  isOpen: boolean
  onClose: () => void
}

export default function AbilityPopup({ ability, isOpen, onClose }: AbilityPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-input rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold capitalize">{ability.name.replace("-", " ")}</h3>
            {ability.isHidden && (
              <span className="text-xs bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded-full">
                Hidden Ability
              </span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed italic">
                {ability.flavorText}
          </p>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Effect</h4>
              <p className="text-foreground leading-relaxed">
                {ability.description}
              </p>
            </div>
          
            
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Generation</h4>
              <p className="text-muted-foreground">
                {ability.generation.replace("-", " ").toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 