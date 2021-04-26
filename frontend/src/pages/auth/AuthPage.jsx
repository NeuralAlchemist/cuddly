// NPM Packages
import React from "react";

// Project files
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Auth from "../../services/Auth";

export default function LoginPage() {
  // Methods
  async function login(loginData) {
    const loginSuccess = await Auth.login(loginData);
    if (!loginSuccess) {
      alert("Invalid credentials");
    }
  }

  async function register(registrationData) {
    const registerSuccess = await Auth.register(registrationData);
    if (!registerSuccess) {
      alert("Couldn't register check credentials and try again");
    }
  }

  return (
    <div>
      <div>
        <div>
          <div>
            <h1>Logo</h1>
            <p>Intro Text to Cuddly</p>
          </div>

          <div>
            <div>
              <div>
                <LoginForm onSubmit={login} />
              </div>

              <div>
                <RegisterForm onSubmit={register} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
