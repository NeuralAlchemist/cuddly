// NPM Packages
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

// Project files
import Auth from "./services/Auth";
import Navbar from "./components/navigation/Navbar";
import AuthPage from "./pages/auth/AuthPage";
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
    <RecoilRoot>
      <BrowserRouter>
        <Navbar onLogout={() => Auth.logout()} />

        <div className="main-container">
          <Switch>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Route path="/posts">
                <PostsPage />
              </Route>
              <Route path="/chat">
                <ChatPage />
              </Route>
              <Route exact path="/">
                <PostsPage />
              </Route>
              <Route path="/profile/:id" exact component={ProfilePage} />
            </React.Suspense>
          </Switch>
        </div>

        <Footer />
      </BrowserRouter>
    </RecoilRoot>
  );

  return loggedIn ? loggedInRouter : <AuthPage />;
}
