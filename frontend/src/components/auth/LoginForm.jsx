// NPM packages
import React, { useState } from "react";

export default function LoginForm({ onSubmit, onToggle }) {
  // Local State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Methods
  const handleToggle = () => {
    onToggle(true);
  };

  return (
    <div className="auth-form">
      <div className="auth-grid">
        <h2>Log in</h2>
        <div className="field-grid">
          <div className="field">
            <label>Email</label>
            <input
              className="user-entered-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              className="user-entered-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="button-auth"
            onClick={() => onSubmit({ email, password })}
          >
            Login
          </button>
        </div>
        <div className="toggle-register-login">
          <span>
            New to Cuddly?
            <span className="link" onClick={handleToggle}>
              Register today!
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
