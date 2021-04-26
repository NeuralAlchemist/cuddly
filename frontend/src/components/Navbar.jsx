import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onLogout }) {
  return (
    <nav>
      <Link to="/">Logo</Link>

      <div>
        <ul>
          <li>
            <Link to="/posts">Home</Link>
          </li>

          <li>
            <Link to="/profile/:id">Profile</Link>
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
