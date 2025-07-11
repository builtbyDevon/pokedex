"use client";

import { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Zap, ZapOff } from "lucide-react";

interface AnimationToggleProps {
  onToggle: (enabled: boolean) => void;
  defaultEnabled?: boolean;
}

export default function AnimationToggle({ onToggle, defaultEnabled = true }: AnimationToggleProps) {
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('pokemon-animations-enabled');
    if (saved !== null) {
      const enabled = JSON.parse(saved);
      setIsEnabled(enabled);
      onToggle(enabled);
    }
  }, [onToggle]);

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    onToggle(newState);
    
    // Save to localStorage
    localStorage.setItem('pokemon-animations-enabled', JSON.stringify(newState));
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleToggle}
          className="absolute top-4 right-4 z-20 bg-background/80 hover:bg-background/90 backdrop-blur-sm border border-input rounded-full p-2 transition-all duration-200 hover:scale-105"
        >
          {/* Slide toggle background */}
          <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
            isEnabled ? 'bg-[var(--red)]' : 'bg-gray-400'
          }`}>
            {/* Slide toggle circle */}
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
              isEnabled ? 'translate-x-6' : 'translate-x-0.5'
            }`}>
              {/* Icon inside the circle */}
                             <div className="w-full h-full flex items-center justify-center">
                {isEnabled ? (
                  <Zap className="h-3 w-3 text-[var(--red)] fill-[var(--red)]" />
                ) : (
                  <ZapOff className="h-3 w-3 text-gray-500" />
                )}
              </div>
            </div>
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isEnabled ? "Disable animations" : "Enable animations"}</p>
      </TooltipContent>
    </Tooltip>
  );
} 