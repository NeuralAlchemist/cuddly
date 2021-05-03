// NPM Packages
import React, { useState } from "react";

export default function CommentUpdateForm({ onSubmit, comment }) {
  // Local State
  const [contentText, setContentText] = useState(comment.contentText);

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
          <button type="button" onClick={handleSubmit}>Update comment</button>
        </div>
      </div>
    </form>
  );
}
