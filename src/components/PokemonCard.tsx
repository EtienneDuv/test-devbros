import {Badge, Card, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {PokemonCardData} from '../@types/interfaces';

interface Args {
  pokemon: PokemonCardData;
}

export const PokemonCard = ({pokemon}: Args) => {

  return (
    <Card className='mb-3'>
      <Card.Img variant="top" src={pokemon.spriteUrl} />
      <Card.Body>
        <Card.Title className="text-capitalize">
          <strong>
            #{pokemon.id} {pokemon.name}
          </strong>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};