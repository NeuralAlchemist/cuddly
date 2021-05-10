// NPM packages
import React, { useState, useEffect } from "react";

// Project files
import UserApi from "../../api/UserApi";

export default function ProfileCard() {
  // Local state
  const [currentUser, setCurrentUser] = useState({});

  // Constants
  // const response = UserApi.getUser().catch((err) => console.error(err));
  // const user = response.data;
  useEffect(() => {
    UserApi.getUser()
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
  }, [setCurrentUser]);

  //   function checkUserDescriptionIsNotNull() {
  //       return currentUser.description != null;
  //   }

  return (
    <div>
      <h2>About you</h2>
      {/* {currentUser.description === null && (
        <p>Why not add a description to your profile?</p>
      )} */}
      {/* {currentUser.description != null && (
        <p>Description: {currentUser.description}</p>
      )} */}
      <p>Debug description: {currentUser.description}</p>
    </div>
  );
}
