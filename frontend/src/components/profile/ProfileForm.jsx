// NPM Packages
import React, { useState, useEffect } from "react";

// Project Files
import ResponsiveTextArea from "../ResponsiveTextArea";

export default function ProfileForm({ desc, onSubmit }) {
  // Local state
  const [description, setDescription] = useState("");
  const [length, setLength] = useState();

  // Methods
  const handleSubmit = () => {
    onSubmit({ description: description });
    setDescription("");
  };

  // Set the initial description passed as props
  useEffect(() => {
    setDescription(desc);
  }, [desc]);

  const onFormContentChange = (value) => {
    setDescription(value);
    setLength(value.length);
  };

  return (
    <form className="ProfileForm">
      <ResponsiveTextArea
        placeholder="Update your profile description"
        contentText={description}
        onFormContentChange={onFormContentChange}
        maxLength="1000"
      />
      <p className="length">{length == null ? 0 : length}/1000</p>
      <button className="button-update" onClick={handleSubmit}>
        Update
      </button>
    </form>
  );
}
