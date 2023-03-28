export interface LooseObject {
  [key: string]: unknown
}
export interface errorObject {
  extensions: object;
  message   : string;
}
export interface PokemonFetchedData {
  id: number;
  name: string;
}
export interface PokemonCardData {
  id: number;
  name: string;
  spriteUrl: string;
}