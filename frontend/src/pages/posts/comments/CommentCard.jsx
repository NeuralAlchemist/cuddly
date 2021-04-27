// NPM Packages
import React from "react";

export default function Comment({ comment, onDeleteClick }) {
  // Methods
  const handleDelete = () => {
    // Invoke the passed in event callback
    onDeleteClick(comment);
  };

  return (
    <div>
      <p>{comment.contentText}</p>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
