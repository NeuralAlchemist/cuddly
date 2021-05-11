// NPM Packages
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Project files
import Auth from "./services/Auth";
import Navbar from "./components/navigation/Navbar";
import AuthPage from "./pages/auth/AuthPage";
import HomePage from "./pages/home/HomePage";
import PostsPage from "./pages/posts/PostsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ChatPage from "./pages/chat/ChatPage";
import Footer from "./components/Footer";
import "./styles/style.css";

export default function App() {
  // Local State
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());

  // Constants
  Auth.bindLoggedInStateSetter(setLoggedIn);

  // Components
  const loggedInRouter = (
    <BrowserRouter>
      <Navbar onLogout={() => Auth.logout()} />

      <div className="container">
        <Switch>
          <Route path="/posts">
            <PostsPage />
          </Route>

          <Route path="/chat">
            <ChatPage />
          </Route>

          <Route exact path="/">
            <HomePage />
          </Route>

          <Route path="/profile">
            <ProfilePage />
          </Route>
        </Switch>
      </div>

      <Footer />
    </BrowserRouter>
  );

  return loggedIn ? loggedInRouter : <AuthPage />;
}
