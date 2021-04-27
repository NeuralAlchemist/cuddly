// NPM Packages
import React from "react";

export default function CommentCard({ postId, comment, onDeleteClick }) {
  // Methods
  const handleDelete = () => {
    // Invoke the passed in event callback
    onDeleteClick(postId, comment);
  };

  return (
    <div>
      <p>{comment.contentText}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
