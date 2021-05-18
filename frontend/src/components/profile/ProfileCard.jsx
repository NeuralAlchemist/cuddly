// NPM packages
import React, { useState } from "react";

// Project files
import UserApi from "../../api/UserApi";
import ProfileForm from "../../components/profile/ProfileForm";

export default function ProfileCard({ thisUser, isLoggedInUser, buddiesFollowing }) {
  // Local state
  const [toggleEdit, setToggleEdit] = useState(false);

  // Constants
  const userURL = require("../../assets/images/user.svg");

  // Methods
  async function updateUser(updatedUser) {
    try {
      await UserApi.updateUser(updatedUser);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="ProfileCard">
      <div className="user-fields">
        <div className="name-pair">
          <img className="user-avatar" src={userURL} alt="User" />
          <h2 className="name">{thisUser.name}</h2>
        </div>
        {isLoggedInUser && (
          <button
            className="button edit-profile"
            onClick={() =>
              toggleEdit ? setToggleEdit(false) : setToggleEdit(true)
            }
          >
            {toggleEdit ? "Cancel edit" : "Edit profile"}
          </button>
        )}
        {!toggleEdit && (
          <section>
            <div className="profile-field-pair">
              <span className="field-label">I'm a: </span>
              <span className="field-data">{thisUser.accountType}</span>
            </div>
            <div>
              <span>Following {buddiesFollowing.length} buddies</span>
            </div>
            <div className="profile-field-pair">
              <span className="field-label">About me: </span>
              <span
                className={
                  thisUser.description === null
                    ? "field-data prompt"
                    : "field-data word-wrap"
                }
              >
                {thisUser.description === null &&
                  "Let us know who you are! Add a short description to your profile..."}
                {thisUser.description != null && thisUser.description}
              </span>
            </div>
            <div className="profile-field-pair">
              <span className="field-label">Email: </span>
              <span className="field-data">{thisUser.email}</span>
            </div>
          </section>
        )}
      </div>

      {toggleEdit && (
        <ProfileForm
          userDescription={thisUser.description}
          userName={thisUser.name}
          userAccountType={thisUser.accountType}
          onSubmit={(update) => updateUser(update)}
        />
      )}
    </div>
  );
}
