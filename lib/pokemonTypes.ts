export interface PokemonTypeConfig {
  color: string;
  textColor: 'dark' | 'light';
  gradientFrom: string;
  gradientTo: string;
}

export const POKEMON_TYPES: Record<string, PokemonTypeConfig> = {
  water: {
    color: '#47A6FE',
    textColor: 'dark',
    gradientFrom: '#47A6FE',
    gradientTo: 'transparent'
  },
  fire: {
    color: '#FF624E',
    textColor: 'dark',
    gradientFrom: '#FF624E',
    gradientTo: 'transparent'
  },
  bug: {
    color: '#8EB719',
    textColor: 'dark',
    gradientFrom: '#8EB719',
    gradientTo: 'transparent'
  },
  normal: {
    color: '#BEB7AB',
    textColor: 'dark',
    gradientFrom: '#BEB7AB',
    gradientTo: 'transparent'
  },
  fairy: {
    color: '#F2ADF2',
    textColor: 'dark',
    gradientFrom: '#F2ADF2',
    gradientTo: 'transparent'
  },
  grass: {
    color: '#80CE44',
    textColor: 'dark',
    gradientFrom: '#80CE44',
    gradientTo: 'transparent'
  },
  poison: {
    color: '#B97FC9',
    textColor: 'dark',
    gradientFrom: '#B97FC9',
    gradientTo: 'transparent'
  },
  electric: {
    color: '#FFD84E',
    textColor: 'dark',
    gradientFrom: '#FFD84E',
    gradientTo: 'transparent'
  },
  rock: {
    color: '#C9B569',
    textColor: 'dark',
    gradientFrom: '#C9B569',
    gradientTo: 'transparent'
  },
  ground: {
    color: '#E6A74A',
    textColor: 'dark',
    gradientFrom: '#E6A74A',
    gradientTo: 'transparent'
  },
  psychic: {
    color: '#E86994',
    textColor: 'dark',
    gradientFrom: '#E86994',
    gradientTo: 'transparent'
  },
  flying: {
    color: '#839CF3',
    textColor: 'dark',
    gradientFrom: '#839CF3',
    gradientTo: 'transparent'
  },
  ghost: {
    color: '#A09CD0',
    textColor: 'dark',
    gradientFrom: '#A09CD0',
    gradientTo: 'transparent'
  },
  dark: {
    color: '#615047',
    textColor: 'light',
    gradientFrom: '#615047',
    gradientTo: 'transparent'
  },
  steel: {
    color: '#B9B9B9',
    textColor: 'dark',
    gradientFrom: '#B9B9B9',
    gradientTo: 'transparent'
  },
  fighting: {
    color: '#F68C51',
    textColor: 'dark',
    gradientFrom: '#F68C51',
    gradientTo: 'transparent'
  },
  dragon: {
    color: '#9C8EE6',
    textColor: 'dark',
    gradientFrom: '#9C8EE6',
    gradientTo: 'transparent'
  },
  ice: {
    color: '#4EDFFF',
    textColor: 'dark',
    gradientFrom: '#4EDFFF',
    gradientTo: 'transparent'
  }
};

// Helper functions
export function getPokemonTypeConfig(type: string): PokemonTypeConfig {
  return POKEMON_TYPES[type] || {
    color: '#6B7280',
    textColor: 'light',
    gradientFrom: '#6B7280',
    gradientTo: '#5A6268'
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