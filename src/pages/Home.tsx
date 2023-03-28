import {useState} from 'react';
import {Row, Spinner} from 'react-bootstrap';
import {useQuery, UseQueryOptions} from 'react-query';
import {getAllPokemons} from '../services/gql';
import {ErrorAlerts, PokemonCard} from '../components';
import {PokemonFetchedData} from '../@types/interfaces';

// SPRITE /media/sprites/pokemon/1.png
export const Home = () => {
  const [pokemons, setPokemons] = useState<PokemonFetchedData[]>([]);
  const [errors, setErrors] = useState<object[]>([]);

  const {isFetching} = useQuery({
    queryKey : 'pokemons',
    queryFn  : () => getAllPokemons(),
    onSuccess: ({data, errors}) => {
      if (errors) {
        setErrors(errors);
      }
      if (data?.gen1Pokemons) {
        setPokemons(data.gen1Pokemons);
      }
    },
  } as UseQueryOptions);

  if (isFetching) return (
    <Row>
      <Spinner className="mx-auto mt-5" />
    </Row>
  );

  if (errors.length > 0) return (
    <Row>
      <ErrorAlerts errors={errors} />
    </Row>
  );

  return (
    <div>
      {pokemons.map((el, i) => {
        const pokemon = {
          ...el,
          spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${el.id}.png`
        };

        return <PokemonCard pokemon={pokemon} key={i} />;
      })}
    </div>
  );
};
