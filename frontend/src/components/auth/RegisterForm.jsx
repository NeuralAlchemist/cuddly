// NPM Packages
import React, { useState } from "react";

export default function RegisterForm({ onSubmit, onToggle }) {
  // Local States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("pet");

  // Methods
  const handleToggle = () => {
    onToggle(false);
  };

  return (
    <div className="auth-form">
      <div className="auth-grid">
        <h2>Register</h2>
        <div className="field-grid">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" Name"
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" Email"
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder=" Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="field">
            <label>I'm a:</label>
            <select className="register" onChange={(e) => setAccountType(e.target.value)}>
              <option value="pet">pet</option>
              <option value="human">human</option>
              <option value="service provider">service provider</option>
              <option value="caretaker">caretaker</option>
            </select>
          </div>

          <button
            className="button-auth"
            onClick={(e) => onSubmit({ name, email, password, accountType })}
          >
            Create account
          </button>
        </div>
        <div className="toggle-register-login">
          <span>
            Already joined?
            <span className="link" onClick={handleToggle}>
              Log in
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
