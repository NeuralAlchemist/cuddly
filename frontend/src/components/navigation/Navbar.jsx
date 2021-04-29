import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

export default function Navbar({ onLogout }) {
  const logoObject = require('../../assets/images/logo.svg');
  const logoURL = logoObject;
  const homeObject = require('../../assets/images/home.svg');
  const homeURL = homeObject;
  const userObject = require('../../assets/images/user.svg');
  const userURL = userObject;
  const bellObject = require('../../assets/images/bell.svg');
  const bellURL = bellObject;
  return (
    <nav>
      <Link to="/posts">
        <img className="logo" src={logoURL} alt="Logo" />
      </Link>


        <Link to="/posts">
          <img className="homeIcon" src={homeURL} alt="Home" />
          </Link>

        
            <Link to="/profile">
            <img className="user" src={userURL} alt="Profile" />
            </Link>
  
      
            <Link to="/notification">
            <img className="notification" src={bellURL} alt="Notificaton" />
            </Link>
     
        <button className="logout" onClick={onLogout}>Logout</button>
 
    </nav>
  );
}
