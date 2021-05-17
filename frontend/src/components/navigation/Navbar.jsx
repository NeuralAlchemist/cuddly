import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar({ onLogout }) {
  const logoURL = require('../../assets/images/logo.svg');
  const homeURL = require('../../assets/images/homepage.svg');
  const userURL = require('../../assets/images/user.svg');
  const bellURL = require('../../assets/images/bell.svg');
  const logoutURL = require('../../assets/images/logout.svg');
  const chatURL = require('../../assets/images/chat.svg');
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

        <Link to="/threads">
          <FontAwesomeIcon className="chat nav-icon" icon="comment-dots" />
          {/* <img className="chat nav-icon" src={chatURL} alt="Chat" /> */}
        </Link>

        <Link to="/notification">
          <img className="notification" src={bellURL} alt="Notification" />
        </Link>

        <Link to="/" onClick={onLogout}>
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
