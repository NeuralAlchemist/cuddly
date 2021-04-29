// NPM Packages
import React, { useState } from "react";

export default function RegisterForm({ onSubmit }) {
  // Local States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

          <button className="button-auth" onClick={(e) => onSubmit({ name, email, password })}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}
