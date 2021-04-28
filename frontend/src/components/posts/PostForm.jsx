// NPM Packages
import React, { useState } from "react";

export default function PostForm({ onSubmit }) {
  // Local State
  const [contentText, setContentText] = useState("");

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({ contentText: contentText });

    // Clear the input field
    setContentText("");
  };

  return (
    <form>
      <div>
        <h4>What's on your mind?</h4>
        <div>
          <div>
            <textarea value={contentText} onChange={(e) => setContentText(e.target.value)} />
          </div>
          <div>
            <button onClick={handleSubmit}>Post</button>
          </div>
        </div>
      </div>
    </form>
  );
}
