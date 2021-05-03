// NPM Packages
import React, { useState } from "react";

// Project files
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import Auth from "../../services/Auth";

export default function LoginPage() {
  // Local state
  const [toggleRegister, setToggleRegister] = useState(false);

  // Constants
  const logoObject = require(`../../assets/images/logo.svg`);
  const logoURL = logoObject;
  const welcomeImageObject = require(`../../assets/images/welcome.jpg`);
  const welcomeImageURL = welcomeImageObject;

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
    <div className="AuthPage">
      <div className="auth-page-header">
        <img className="logo logo-auth" src={logoURL} alt="Cuddly logo" />
      </div>
      <div className="main-content">
        {" "}
        <img
          className="image-welcome"
          src={welcomeImageURL}
          alt="Cat and dog cuddling together"
        />
        <div className="welcome">
          <h1>Woof woof (welcome)</h1>
          <p>
            Ever wonder if you take too many photos of your pet? At Cuddly
            believe there’s no such thing! We are a community of animal-lovers
            who delight in sharing the special moments from our pet’s lives. Log
            in or register today!
          </p>
        </div>
        <div>
          <div>
            {!toggleRegister && (
              <div>
                <LoginForm onSubmit={login} onToggle={setToggleRegister} />
              </div>
            )}
            {toggleRegister && (
              <div>
                <RegisterForm
                  onSubmit={register}
                  onToggle={setToggleRegister}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
