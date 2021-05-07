// NPM Packages
import React, { useState, useEffect } from "react";

// Project files
import UserApi from "../../api/UserApi";

export default function ProfileForm() {
  // Local state
  const [description, setDescription] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  // Methods
  async function updateUser() {
    try {
      const response = await UserApi.updateUserDescription(description);
      const user = response.data;
      setCurrentUser(user);
      // clear the input field
      setDescription("");
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    UserApi.getUser()
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
  }, [setCurrentUser]);

  return (
    <div className="ProfileForm">
      <form>
        <input
          className="description-input"
          type="text"
          placeholder="Share something about yourself..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="button-post" onClick={updateUser}>
          Update
        </button>
      </form>
      <p>{currentUser.description}</p>
    </div>
  );
}
