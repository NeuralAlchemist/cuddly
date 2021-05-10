// NPM Packages
import React, { useState, useEffect } from "react";
import { useRecoilState} from "recoil";

// Project files
import UserApi from "../../api/UserApi";
import { userState } from "../../state/userData";

export default function ProfileForm() {
  // Global state
  const [thisUser, setThisUser] = useRecoilState(userState);
  console.log(thisUser);

  // Local state
  //const [currentUser, setCurrentUser] = useState({});
  const [description, setDescription] = useState(thisUser.data.description);
  console.log(description);

  // Methods
  async function updateUser(event) {
    try {
      // assign the current user's description
      thisUser.description = description;
      const response = await UserApi.updateUserDescription(thisUser);
      // update user details
      const user = response.data;
      setThisUser(user);
    } catch (e) {
      console.error(e.response);
    }
  }

  useEffect(() => {
    UserApi.getUser()
      .then((response) => {
        response.json()
      })
      .then((json) => setThisUser(json))
      .catch((err) => console.error(err));
  }, [setThisUser, setDescription]);

  return (
    <div className="ProfileForm">
      <form>
        <textarea
          className="description-input"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="button-update" onClick={updateUser}>
          Update
        </button>
      </form>
    </div>
  );
}
