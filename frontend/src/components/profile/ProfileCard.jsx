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

  useEffect(() => {
    UserApi.getUser()
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
  }, [setCurrentUser]);

  return (
    <div className="ProfileCard">
      <h2>Your information</h2>
      <div className="name-pair">
        <p>Name</p>
        <p>{currentUser.name}</p>
      </div>
      <div className="email-pair">
        <p>Email</p>
        <p>{currentUser.email}</p>
      </div>
      <div className="description-pair">
        <p>About</p>
        {currentUser.description === null && (
          <p>
            Let us know who you are! Add a short description to your profile
          </p>
        )}
        {currentUser.description != null && <p>{currentUser.description}</p>}
      </div>
    </div>
  );
}
