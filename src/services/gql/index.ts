import {fetchGql} from '../utils';

export const getAllPokemons = () => fetchGql({
  body: `query {
    gen1Pokemons: pokemon_v2_pokemonspecies(
      where: {
        pokemon_v2_generation: {
          name: {_eq: "generation-i"}
        }
      }, 
      order_by: {id: asc}) {
        name
        id
    }
  }`
});

export const getPokemon = (id: number) => fetchGql({
  body: `query {
    targetPokemon: pokemon_v2_pokemon_by_pk (id: ${id}) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
  }`
});