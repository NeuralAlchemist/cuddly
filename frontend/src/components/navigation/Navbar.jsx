// NPM Packages
import React from "react";
import { Link } from "react-router-dom";

// Project files
import SearchBar from "../search/SearchBar";

export default function Navbar({ onLogout }) {
  // Constants
  const logoURL = require("../../assets/images/logo.svg");
  const homeURL = require("../../assets/images/homepage.svg");
  const userURL = require("../../assets/images/user.svg");
  const logoutURL = require("../../assets/images/logout.svg");
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/posts">
          <img className="logo" src={logoURL} alt="Logo" />
        </Link>

        <Link to="/posts">
          <img className="homepageIcon nav-icon" src={homeURL} alt="Home" />
        </Link>

        <Link to="/profile/mine">
          <img className="user nav-icon" src={userURL} alt="Profile" />
        </Link>
        <SearchBar />
        <Link to="/" onClick={onLogout}>
          <img className="logout nav-icon" src={logoutURL} alt="Logout" />
        </Link>

        <Link to="/" className="logout-button-container">
          <button className="button" onClick={onLogout}>
            Logout
          </button>
        </Link>

        {/* <input type="text" class="searchTerm" id="input_text"></input>
        <button className="button-search" type="search">
          Search
        </button> */}
      </div>
    </nav>
  );
}
