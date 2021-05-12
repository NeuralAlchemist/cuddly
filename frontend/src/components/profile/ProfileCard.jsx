// NPM packages
import React, { useState } from "react";

// Project files
import UserApi from "../../api/UserApi";
import ProfileForm from "../../components/profile/ProfileForm";

export default function ProfileCard({ thisUser }) {
  // Local state
  const [toggleEdit, setToggleEdit] = useState(false);

  // Constants
  const userURL = require("../../assets/images/user.svg");

  // Methods
  async function updateDescription(updatedUserDescription) {
    try {
      await UserApi.updateUserDescription(updatedUserDescription);
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
        <div>
          <p className="field-label">Email </p>
          <p className="field-data">{thisUser.email}</p>
        </div>
        <div>
          <p className="field-label">Account type </p>
          <p className="field-data">PLACEHOLDER eg pet</p>
        </div>
        <div>
          <p className="field-label">About</p>
          <p
            className={
              thisUser.description === null ? "field-data prompt" : "field-data"
            }
          >
            {thisUser.description === null &&
              "Let us know who you are! Add a short description to your profile..."}
            {thisUser.description != null && thisUser.description}
          </p>
        </div>
      </div>
      <button
        className="button edit-profile"
        onClick={() =>
          toggleEdit ? setToggleEdit(false) : setToggleEdit(true)
        }
      >
        {toggleEdit ? "Cancel edit" : "Edit profile"}
      </button>
      {toggleEdit && (
        <ProfileForm
          desc={thisUser.description}
          onSubmit={(update) => updateDescription(update)}
        />
      )}
    </div>
  );
}
