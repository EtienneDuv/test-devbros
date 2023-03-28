import {Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {pokedex} from '../assets';
import {ThemeToggler} from './ThemeToggler';

export const MyNavbar = () => {
  return (
    <Navbar className='mb-3'>
      <NavLink to='/' className="navbar-brand">
        <Navbar.Brand>
          <img alt="Appliting" src={pokedex.toString()} width="50" className="me-2" />
        </Navbar.Brand>
      </NavLink>

      <div className="ms-auto me-1">
        <ThemeToggler />
      </div>
    </Navbar>
  );
};
