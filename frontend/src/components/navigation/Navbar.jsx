// NPM Packages
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Project files
import SearchBar from "../search/SearchBar";

export default function Navbar({ onLogout }) {
  // Local state
  const [toggleSearch, setToggleSearch] = useState(false);

  // Constants
  const logoURL = require("../../assets/images/logo.svg");
  const userURL = require("../../assets/images/user.svg");
  const logoutURL = require("../../assets/images/logout.svg");
  const searchURL = require("../../assets/images/search-solid.svg");
  const chatURL = require("../../assets/images/message.svg");

  // Methods
  function toggle() {
    if (toggleSearch) {
      setToggleSearch(false);
    } else {
      setToggleSearch(true);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/posts">
          <img className="logo" src={logoURL} alt="Logo" />
        </Link>
        <Link to="/profile/mine">
          <img className="user nav-icon" src={userURL} alt="Profile" />
        </Link>
        {/* <img className="chat nav-icon" src={chatURL} alt="Chat" /> */}
        <img
          onClick={toggle}
          className="search nav-icon"
          src={searchURL}
          alt="Search"
        />
        <Link to="/" onClick={onLogout}>
          <img className="logout nav-icon" src={logoutURL} alt="Logout" />
        </Link>
        <Link to="/" className="logout-button-container">
          <button className="button" onClick={onLogout}>
            Logout
          </button>
        </Link>
      </div>
      <div className="search-container">{toggleSearch && <SearchBar />}</div>
    </nav>
  );
}
