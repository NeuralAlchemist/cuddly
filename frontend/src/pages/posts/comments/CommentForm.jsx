// NPM Packages
import React from "react";

export default function CommentForm({ post, onSubmit }) {
  // Local State
  const [commentContentText, setCommentContentText] = React.useState("");

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit(post.id, { contentText: commentContentText });

    // Clear the input field
      setCommentContentText("");
  };

  return (
    <form className="CommentForm">
      <textarea
        value={commentContentText}
        onChange={(e) => setCommentContentText(e.target.value)}
      />
      <button onClick={handleSubmit}> Comment </button>
    </form>
  );
}
