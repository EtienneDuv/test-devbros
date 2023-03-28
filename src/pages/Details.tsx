import {useState} from 'react';
import {Row, Spinner, Col, Card, Nav, ProgressBar} from 'react-bootstrap';
import {useQuery, UseQueryOptions} from 'react-query';
import {useParams} from 'react-router-dom';
import {getPokemon} from '../services/gql';
import {ErrorAlerts} from '../components';
import {PokemonFormattedData} from '../@types/interfaces';

export const Details = () => {
  const {id} = useParams();

  const [pokemon, setPokemon] = useState<PokemonFormattedData|null>(null);
  const [tab, setTab] = useState<string>('profile');
  const [errors, setErrors] = useState<object[]>([]);

  const {isFetching} = useQuery({
    queryKey : 'pokemons',
    queryFn  : () => getPokemon(Number(id)),
    onSuccess: ({data, errors}) => {
      if (errors) {
        setErrors(errors);
      }
      if (data?.targetPokemon) {
        const d = data.targetPokemon;

        const obj = {
          ...d,
          weight: d.weight/10+'kg',
          height: d.height/10+'m',
          types : d.pokemon_v2_pokemontypes.map((el: {pokemon_v2_type: {name: string}}) => el.pokemon_v2_type.name),
          stats : {},
        };

        d.pokemon_v2_pokemonstats.forEach((el: { pokemon_v2_stat: {name:string|number;}; base_stat:number;}) => {
          obj.stats[el.pokemon_v2_stat.name] = el.base_stat;
        });

        console.log(obj);
        setPokemon(obj);
      }
    },
  } as UseQueryOptions);

  const DetailTab = ():JSX.Element => {
    if (tab === 'profile') return (
      <>
        <Row className='mb-3'>
          <Col md={2}>
            <div className="profile-tab-category text-center fw-bold"> Type </div>
          </Col>
          <Col className='text-capitalize'>
            {pokemon?.types.join(' - ')}
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={2}>
            <div className="profile-tab-category text-center fw-bold"> Height </div>
          </Col>
          <Col>
            {pokemon?.height}
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={2}>
            <div className="profile-tab-category text-center fw-bold"> Weight </div>
          </Col>
          <Col>
            {pokemon?.weight}
          </Col>
        </Row>
      </>
    );

    if (tab === 'stats') return (
      <>
        <Row className='mb-3'>
          <Col md={3} className="fw-bold"> <div> HP </div> </Col>
          <Col className='text-capitalize'>
            <ProgressBar
              now={pokemon?.stats.hp}
              label={pokemon?.stats.hp}
              className="progress-bar-custom"
            />
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={3} className="fw-bold text-capitalize"> <div> attack </div> </Col>
          <Col className='text-capitalize'>
            <ProgressBar
              now={pokemon?.stats.attack}
              label={pokemon?.stats.attack}
              className="progress-bar-custom"
            />
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={3} className="fw-bold text-capitalize"> <div> defense </div> </Col>
          <Col className='text-capitalize'>
            <ProgressBar
              now={pokemon?.stats.defense}
              label={pokemon?.stats.defense}
              className="progress-bar-custom"
            />
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={3} className="fw-bold text-capitalize"> <div> sp attack </div> </Col>
          <Col className='text-capitalize'>
            <ProgressBar
              now={pokemon?.stats['special-attack']}
              label={pokemon?.stats['special-attack']}
              className="progress-bar-custom"
            />
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={3} className="fw-bold text-capitalize"> <div> sp defense </div> </Col>
          <Col className='text-capitalize'>
            <ProgressBar
              now={pokemon?.stats['special-defense']}
              label={pokemon?.stats['special-defense']}
              className="progress-bar-custom"
            />
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={3} className="fw-bold text-capitalize"> <div> speed </div> </Col>
          <Col className='text-capitalize'>
            <ProgressBar
              now={pokemon?.stats.speed}
              label={pokemon?.stats.speed}
              className="progress-bar-custom"
            />
          </Col>
        </Row>
      </>
    );

    else return <></>;
  };

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
    <Card>
      <Card.Header>
        <Nav className='mx-50'>
          <Nav.Item className='mx-auto'>
            <Nav.Link onClick={() => setTab('profile')}>
              <span className='text-red fw-bold'>
                <i className='me-1 icon bi-emoji-smile'></i> Profile
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='mx-auto'>
            <Nav.Link onClick={() => setTab('stats')}>
              <span className='text-red fw-bold'>
                <i className='me-1 icon bi-bar-chart'></i> Stats
              </span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>

      <Card.Body>
        <Row>
          <Col md={4} className="border-simple detail-image-container">
            <Row>
              <div className='text-capitalize text-center text-red h3'>
                <strong> {pokemon?.name} </strong>
              </div>
            </Row>
            <Row>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}>
              </img>
            </Row>
          </Col>

          <Col className='my-auto'>
            <DetailTab />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
