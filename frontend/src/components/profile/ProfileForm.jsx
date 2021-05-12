// NPM Packages
import React, { useState, useEffect } from "react";

// Project Files
import ResponsiveTextArea from "../ResponsiveTextArea";

export default function ProfileForm({
  userDescription,
  userName,
  userAccountType,
  onSubmit,
}) {
  // Local state
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [length, setLength] = useState();

  // Methods
  const handleSubmit = (event) => {
    console.log("handle submit called");
    onSubmit({
      name: name,
      accountType: accountType,
      description: description,
    });
    setDescription("");
    setName("");
    setAccountType("");
  };

  // Set the state passed as props
  useEffect(() => {
    setDescription(userDescription);
    setName(userName);
    setAccountType(userAccountType);
  }, [userDescription, userName, userAccountType]);

  const onFormContentChangeDescription = (value) => {
    setDescription(value);
    setLength(value.length);
  };

  const onFormContentChangeName = (value) => {
    setName(value);
  };

  return (
    <div className="ProfileForm">
      <form className="form">
        <div className="profile-fields">
          <div className="form-field">
            <label className="field-label">Name</label>
            <ResponsiveTextArea
              placeholder="Update your name"
              contentText={name}
              onFormContentChange={onFormContentChangeName}
              maxLength="100"
            />
          </div>
          <div className="form-field">
            <label className="field-label">I'm a</label>
            <select
              className="select-profile"
              selected={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="pet">pet</option>
              <option value="human">human</option>
              <option value="service provider">service provider</option>
              <option value="caretaker">caretaker</option>
            </select>
          </div>
          <div className="form-field">
            <label className="field-label">About me</label>
            <ResponsiveTextArea
              placeholder="Update your profile description"
              contentText={description}
              onFormContentChange={onFormContentChangeDescription}
              maxLength="1000"
            />
          </div>
        </div>
        <div className="button-counter">
          <button className="button" onClick={handleSubmit}>
            Update
          </button>
          <span className="length">{length == null ? 0 : length}/1000</span>{" "}
        </div>
      </form>
    </div>
  );
}
