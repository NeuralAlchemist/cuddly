// NPM Packages
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PostsApi from "./api/PostsApi";


// Project files
import Auth from "./services/Auth";
import Navbar from "./components/navigation/Navbar";
import AuthPage from "./pages/auth/AuthPage";
import HomePage from "./pages/home/HomePage";
import PostsPage from "./pages/posts/PostsPage";
import ChatPage from "./pages/chat/ChatPage";
import Footer from "./components/Footer";
import "./styles/style.css";

export default function App() {
  // Local State
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());

  const [msg, setMsg] = useState("");
  const [file, setFile] = useState("");

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFileData = (event) => {
    event.preventDefault();
    setMsg("");

    let data = new FormData();
    data.append("file", file);
    PostsApi.upload(data)
      .then((response) => {
        console.log(response);
        setMsg("File successfully uploaded");
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  };
  console.log("[IMAGE]", file);

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

          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
      <div id="container">

        <h3>Upload a File</h3>
        <h4>{msg}</h4>
        <input onChange={onFileChange} type="file"></input>
        <button disabled={!file} onClick={uploadFileData}>
          Upload
        </button>
      </div>

      <Footer />
    </BrowserRouter>
  );

  return loggedIn ? loggedInRouter : <AuthPage />;
}
