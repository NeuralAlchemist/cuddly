// NPM packages
import React, { useState } from "react";

// Project files
import UserApi from "../../api/UserApi";
import ProfileForm from "../../components/profile/ProfileForm";
import getFileSizeInMB from "../../functions/getFileSizeInMB";

export default function ProfileCard({ thisUser, isLoggedInUser }) {
  // Local state
  const [toggleEdit, setToggleEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFileSelected, setIsFileSelected] = useState(false);

  // Constants
  const userURL = require("../../assets/images/user.svg");
  const hasImage =
    thisUser.mediaType == null ? false : thisUser.mediaType.includes("image");

  // Methods
  async function updateUser(updatedUser) {
    try {
      await UserApi.updateUser(updatedUser);
    } catch (e) {
      console.error(e);
    }
  }

  async function uploadImage(event){
    console.log("Sending");
    event.preventDefault();
    try{
      const formData = new FormData();
      formData.append("file", selectedFile);
      await UserApi.uploadImage(thisUser.id, formData);
    } catch (e){
      console.error(e);
    }
    window.location.reload();
  }

  const setFile = (event) => {
    setIsFileSelected(false);
    const file = event.target.files[0];
    if (getFileSizeInMB(file.size) > 10) {
      alert("Files larger than 10MB are not allowed!");
    } else if (file.size === 0) {
      alert("Empty files are not allowed!");
    } else {
      setSelectedFile(file);
      setIsFileSelected(true);
    }
  };

  return (
    <div className="ProfileCard">
      <div className="user-fields">
        <div className="name-pair">
          {!hasImage && (
          <img
            className="user-avatar"
            src={userURL}
            height="100%"
            width="100%"
            alt="User"
          />
        )}

          {hasImage && (
          <img
            className="user-avatar"
            src={`data:${thisUser.imageType};base64, ${thisUser.image}`}
            height="100%"
            width="100%"
            alt="User"
          />
        )}
          <h2 className="name">{thisUser.name}</h2>
          <input type="file" onChange={setFile}/><button onClick={uploadImage}>Upload</button>
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
