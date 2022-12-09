import React from 'react';
import { NavLink } from 'react-router-dom'

function Navbar() {   
    return (
        <nav className="navbar navbar-expand-lg bg-info">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
              <NavLink className='nav-link' to='/about'>About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className='nav-link' to='/portfolio'>Login</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className='nav-link' to='/resume'>Signup</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className='nav-link' to='/contact'>Contact</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
