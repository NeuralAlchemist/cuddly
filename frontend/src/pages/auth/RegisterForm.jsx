// NPM Packages
import React, { useState } from "react";

export default function RegisterForm({ onSubmit }) {
  // Local States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div >
        <h4 >Sign up</h4>
        <div>
          <div >
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              onClick={(e) => onSubmit({ name, email, password })}
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
