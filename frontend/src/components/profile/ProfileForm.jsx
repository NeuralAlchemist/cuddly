// NPM Packages
import React, { useState, useEffect } from "react";

// Project files
import UserApi from "../../api/UserApi";

export default function ProfileForm() {
  // Local state
  const [currentUser, setCurrentUser] = useState({});
  const [description, setDescription] = useState("");

  // Methods
  async function updateUser(event) {
    try {
      // assign the current user's description
      currentUser.description = description;
      const response = await UserApi.updateUserDescription(currentUser);
      // update user details
      const user = response.data;
      setCurrentUser(user);
    } catch (e) {
      console.error(e.response);
    }
  }

  useEffect(() => {
    UserApi.getUser()
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
  }, [setCurrentUser, setDescription]);

  return (
    <div className="ProfileForm">
      <form>
        <textarea
          className="description-input"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button className="button-update" onClick={updateUser}>
          Update
        </button>
      </form>
    </div>
  );
}
