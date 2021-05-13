import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ onLogout }) {
  const logoObject = require('../../assets/images/logo.svg');
  const logoURL = logoObject;
  const homeObject = require('../../assets/images/homepage.svg');
  const homeURL = homeObject;
  const userObject = require('../../assets/images/user.svg');
  const userURL = userObject;
  const bellObject = require('../../assets/images/bell.svg');
  const bellURL = bellObject;
  const logoutObject = require('../../assets/images/logout.svg');
  const logoutURL = logoutObject;
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/posts">
          <img className="logo" src={logoURL} alt="Logo" />
        </Link>

        <Link to="/posts">
          <img className="homepageIcon nav-icon" src={homeURL} alt="Home" />
        </Link>

        <Link to="/profile">
          <img className="user nav-icon" src={userURL} alt="Profile" />
        </Link>

        <Link to="/notification">
          <img className="notification" src={bellURL} alt="Notification" />
        </Link>

        <Link onClick={onLogout}>
          <img className="logout nav-icon" src={logoutURL} alt="Logout" />
        </Link>

        <div className="logout-button-container">
          <button className="button" onClick={onLogout}>
            Logout
          </button>
        </div>

        {/* <input type="text" class="searchTerm" id="input_text"></input>
        <button className="button-search" type="search">
          Search
        </button> */}
      </div>
    </nav>
  );
}
