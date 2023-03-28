import {Card} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {PokemonCardData} from '../@types/interfaces';

interface Args {
  pokemon: PokemonCardData;
}

export const PokemonCard = ({pokemon}: Args) => {

  return (
    <div className="no-link-style">
      <NavLink to={`/pokemon/${pokemon.id}`} >
        <Card className='mb-3'>
          <Card.Img variant="top" loading='lazy' src={pokemon.spriteUrl} className='p-3 img-max-size mx-auto' />
          <Card.Body className='card-footer'>
            <div className="text-capitalize text-center">
              #{pokemon.id} {pokemon.name}
            </div>
          </Card.Body>
        </Card>
      </NavLink>
    </div>
  );
};