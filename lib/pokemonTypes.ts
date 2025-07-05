export interface PokemonTypeConfig {
  color: string;
  textColor: 'dark' | 'light';
  gradientFrom: string;
  gradientTo: string;
}

export const POKEMON_TYPES: Record<string, PokemonTypeConfig> = {
  water: {
    color: 'rgba(71, 166, 254, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(71, 166, 254, 1)',
    gradientTo: 'transparent'
  },
  fire: {
    color: 'rgba(255, 98, 78, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(255, 98, 78, 1)',
    gradientTo: 'transparent'
  },
  bug: {
    color: 'rgba(142, 183, 25, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(142, 183, 25, 1)',
    gradientTo: 'transparent'
  },
  normal: {
    color: 'rgba(190, 183, 171, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(190, 183, 171, 1)',
    gradientTo: 'transparent'
  },
  fairy: {
    color: 'rgba(242, 173, 242, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(242, 173, 242, 1)',
    gradientTo: 'transparent'
  },
  grass: {
    color: 'rgba(128, 206, 68, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(128, 206, 68, 1)',
    gradientTo: 'transparent'
  },
  poison: {
    color: 'rgba(185, 127, 201, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(185, 127, 201, 1)',
    gradientTo: 'transparent'
  },
  electric: {
    color: 'rgba(255, 216, 78, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(255, 216, 78, 1)',
    gradientTo: 'transparent'
  },
  rock: {
    color: 'rgba(201, 181, 105, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(201, 181, 105, 1)',
    gradientTo: 'transparent'
  },
  ground: {
    color: 'rgba(230, 167, 74, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(230, 167, 74, 1)',
    gradientTo: 'transparent'
  },
  psychic: {
    color: 'rgba(232, 105, 148, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(232, 105, 148, 1)',
    gradientTo: 'transparent'
  },
  flying: {
    color: 'rgba(131, 156, 243, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(131, 156, 243, 1)',
    gradientTo: 'transparent'
  },
  ghost: {
    color: 'rgba(160, 156, 208, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(160, 156, 208, 1)',
    gradientTo: 'transparent'
  },
  dark: {
    color: 'rgba(97, 80, 71, 1)',
    textColor: 'light',
    gradientFrom: 'rgba(97, 80, 71, 1)',
    gradientTo: 'transparent'
  },
  steel: {
    color: 'rgba(185, 185, 185, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(185, 185, 185, 1)',
    gradientTo: 'transparent'
  },
  fighting: {
    color: 'rgba(246, 140, 81, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(246, 140, 81, 1)',
    gradientTo: 'transparent'
  },
  dragon: {
    color: 'rgba(156, 142, 230, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(156, 142, 230, 1)',
    gradientTo: 'transparent'
  },
  ice: {
    color: 'rgba(78, 223, 255, 1)',
    textColor: 'dark',
    gradientFrom: 'rgba(78, 223, 255, 1)',
    gradientTo: 'transparent'
  }
};

// Helper functions
export function getPokemonTypeConfig(type: string): PokemonTypeConfig {
  return POKEMON_TYPES[type] || {
    color: 'rgba(107, 114, 128, 1)',
    textColor: 'light',
    gradientFrom: 'rgba(107, 114, 128, 1)',
    gradientTo: 'rgba(90, 98, 104, 1)'
  };
}

export function getTypeBackgroundClass(type: string): string {
  const config = getPokemonTypeConfig(type);
  return `bg-[${config.color}]`;
}

export function getTypeTextClass(type: string): string {
  const config = getPokemonTypeConfig(type);
  return config.textColor === 'dark' ? 'text-neutral-900' : 'text-neutral-100';
}

export function getTypeGradientClass(type: string, direction: 'to-r' | 'to-b' = 'to-r'): string {
  const config = getPokemonTypeConfig(type);
  return `bg-gradient-${direction} from-[${config.gradientFrom}] to-[${config.gradientTo}]`;
} 