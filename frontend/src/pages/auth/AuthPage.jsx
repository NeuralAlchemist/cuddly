// NPM Packages
import React from "react";

// Project files
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
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
    <div className="AuthPage">
      <div className="welcome">
        <h1>Woof woof (welcome)</h1>
        <p>Ever wonder if you take too many photos of your pet? At Cuddly believe there’s no such thing! We are a community of animal-lovers who delight in sharing the special moments from our pet’s lives. Log in or register today!</p>
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
  );
}
