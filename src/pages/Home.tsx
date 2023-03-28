import {useState} from 'react';
import {Row, Spinner, Col, Form} from 'react-bootstrap';
import {useQuery, UseQueryOptions} from 'react-query';
import {getAllPokemons} from '../services/gql';
import {ErrorAlerts, PokemonCard} from '../components';
import {Pokemon_V2_Pokemonspecies} from '../@types/gql';

export const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon_V2_Pokemonspecies[]>([]);
  const [searchString, setSearchString] = useState<string>('');
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
      <Row className='my-2'>
        <Col className='mx-50'>
          <Form.Control
            placeholder="Search pokemon"
            onChange={(event) => {
              setTimeout(() => {
                setSearchString(event?.target.value);
              }, 300);
            }}
          />
        </Col>
      </Row>
      <Row>
        {pokemons
          .filter(el => el.name.includes(searchString))
          .map((el, i) => {
            const pokemon = {
              ...el,
              spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${el.id}.png`
            };

            return <Col md={3} sm={6} key={i}>
              <PokemonCard pokemon={pokemon} />
            </Col>;
          })
        }
      </Row>
    </div>
  );
};
