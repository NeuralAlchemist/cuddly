// NPM packages
import React from "react";

// Project files
import UserApi from "../../api/UserApi";
import ProfileForm from "../../components/profile/ProfileForm";

export default function ProfileCard({ thisUser }) {
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
        <h2>Your information</h2>
        <div className="name-pair">
          <p>Name</p>
          <p>{thisUser.name}</p>
        </div>
        <div className="email-pair">
          <p>Email</p>
          <p>{thisUser.email}</p>
        </div>
        <div className="description-pair">
          <p>About</p>
          {thisUser.description === null && (
            <p>
              Let us know who you are! Add a short description to your profile
            </p>
          )}
          {thisUser.description != null && <p>{thisUser.description}</p>}
        </div>
      </div>
      <ProfileForm
        desc={thisUser.description}
        onSubmit={(update) => updateDescription(update)}
      />
    </div>
  );
}
