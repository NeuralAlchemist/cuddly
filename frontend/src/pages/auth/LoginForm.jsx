// NPM packages
import React, { useState } from "react";

export default function LoginForm({ onSubmit }) {
  // Local State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div >
      <div >
        <h4 >Login</h4>
        <div>
          <div >
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div >
            <button
              onClick={() => onSubmit({ email, password })}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
