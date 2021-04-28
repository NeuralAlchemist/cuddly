// NPM Packages
import React, { useState } from "react";

export default function PostUpdateForm({ onSubmit, post }) {
  // Local State
  const [contentText, setContentText] = useState(post.contentText);

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
        <div>
          <textarea
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Update post</button>
        </div>
      </div>
    </form>
  );
}
