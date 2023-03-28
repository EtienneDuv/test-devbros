export interface LooseObject {
  [key: string]: unknown
}
export interface errorObject {
  extensions: object;
  message   : string;
}

export interface PokemonCardData {
  id: number;
  name: string;
  spriteUrl: string;
}
interface PokemonStatsObject {
  hp: number;
  attack: number;
  defense: number;
  "special-attack": number;
  "special-defense": number;
  speed: number;
} 
export interface PokemonFormattedData {
  id: number;
  name: string;
  weight: string;
  height: string;
  types: string[];
  stats: PokemonStatsObject;
}