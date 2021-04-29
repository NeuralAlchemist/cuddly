import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

export default function Navbar({ onLogout }) {
  const logoObject = require('../../assets/images/logo.svg');
  const lgoURL = logoObject;
  return (
    <nav>
      <Link to="/">
        {' '}
        <img className="logo" src={lgoURL} alt="Logo" />
      </Link>

      <div>
        <ul>
          <li>
            <Link to="/posts">Home</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>

          <li>
            <Link to="/chat">Chat</Link>
          </li>
        </ul>

        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}
