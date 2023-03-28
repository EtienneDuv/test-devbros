import {Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {pokeball} from '../assets';

export const MyNavbar = () => {
  return (
    <Navbar className='mb-3'>
      <NavLink to='/' className="navbar-brand">
        <Navbar.Brand>
          <img alt="Pokedex" src={pokeball.toString()} width="50" height="50" className="me-2" />
        </Navbar.Brand>
      </NavLink>
    </Navbar>
  );
};
