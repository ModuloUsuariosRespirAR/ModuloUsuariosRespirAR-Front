import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className='navbar navbar-expand-lg align-items-center bg-info d-flex flex-column'>
        <div className='container justify-content-around'>
          <Link to={'/users'}>
            <h3 className='m-2'>Modulo Usuarios RespirAR</h3>
          </Link>
        </div>
        <div className='container justify-content-around align-items-center p-1'>
          <Link className='nav-link' to={'/users/add-user'}>
            Nuevo Usuario
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
