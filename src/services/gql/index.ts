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