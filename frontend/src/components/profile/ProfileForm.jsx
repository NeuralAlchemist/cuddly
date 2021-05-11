// NPM Packages
import React, { useState, useEffect } from "react";

export default function ProfileForm({ desc, onSubmit }) {
  // Local state
  const [description, setDescription] = useState("");

  // Methods
  const handleSubmit = () => {
    onSubmit({ description: description });
    setDescription("");
  };

  // Set the initial description passed as props
  useEffect(() => {
    setDescription(desc);
  }, [desc]);

  return (
      <form className="ProfileForm">
        <textarea
          className="description-input"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button className="button-update" onClick={handleSubmit}>
          Update
        </button>
      </form>
  );
}
